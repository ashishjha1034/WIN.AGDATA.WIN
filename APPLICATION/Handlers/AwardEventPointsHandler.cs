using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;

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

        // ParticipantId is actually the user ID, find participant by UserId not by Id
        var participant = @event.Participants.FirstOrDefault(p => p.UserId == request.ParticipantId)
                          ?? throw new InvalidOperationException("Participant not found in this event");

        var user = await _userRepository.GetByIdWithPointsAsync(participant.UserId)
                   ?? throw new InvalidOperationException("User not found");

        var currentUserId = _currentUserService.GetCurrentUserId();

        user.PointsAccount.AddPoints(request.Points, currentUserId);

        // AwardPoints requires: (int points, int? rank, Guid awardedBy)
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
