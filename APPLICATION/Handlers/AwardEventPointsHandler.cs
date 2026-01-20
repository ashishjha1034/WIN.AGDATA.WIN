using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Events;

public class AwardEventPointsHandler : IRequestHandler<AwardEventPointsCommand>
{
    private readonly IEventRepository _eventRepository;
    private readonly IUserRepository _userRepository;
    private readonly ITransactionRepository _transactionRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public AwardEventPointsHandler(
        IEventRepository eventRepository,
        IUserRepository userRepository,
        ITransactionRepository transactionRepository,
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _eventRepository = eventRepository;
        _userRepository = userRepository;
        _transactionRepository = transactionRepository;
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task Handle(AwardEventPointsCommand request, CancellationToken ct)
    {
        var @event = await _eventRepository.GetByIdWithParticipantsAsync(request.EventId)
                     ?? throw new InvalidOperationException("Event not found");

        // Enforce event lifecycle - awards only allowed in Active state
        if (!@event.CanAward())
            throw new InvalidOperationException($"Cannot award points. Event status is {@event.Status}. Points can only be awarded when event is Active.");

        // ParticipantId is actually the user ID, find participant by UserId not by Id
        var participant = @event.Participants.FirstOrDefault(p => p.UserId == request.ParticipantId)
                          ?? throw new InvalidOperationException("Participant not found in this event");

        // Domain-level validation: must be checked-in (Attended)
        if (participant.AttendanceStatus != Domain.Enums.AttendanceStatus.Attended)
            throw new InvalidOperationException($"Participant must be checked-in to receive points. Current status: {participant.AttendanceStatus}.");

        // Domain-level validation: prevent double-award
        if (participant.PointsAwarded > 0)
            throw new InvalidOperationException($"Points have already been awarded to this participant. Current points: {participant.PointsAwarded}. Cannot award again.");

        var user = await _userRepository.GetByIdWithPointsAsync(participant.UserId)
                   ?? throw new InvalidOperationException("User not found");

        var currentUserId = _currentUserService.GetCurrentUserId();

        user.PointsAccount.AddPoints(request.Points, currentUserId);

        // AwardPoints will also validate internally (checked-in, no double-award)
        participant.AwardPoints(request.Points, rank: null, currentUserId);

        // Create transaction record
        var transaction = UserPointsTransaction.CreateEarned(
            userId: participant.UserId,
            points: request.Points,
            source: "Event Participation",
            sourceId: request.EventId,
            description: $"Points awarded for event participation: {@event.Name}",
            balanceAfter: user.PointsAccount.CurrentBalance,
            processedBy: currentUserId
        );

        _transactionRepository.Add(transaction);

        await _unitOfWork.SaveChangesAsync(ct);
    }
}
