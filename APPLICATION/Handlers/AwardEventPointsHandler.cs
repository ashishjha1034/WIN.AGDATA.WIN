using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Events;

/// <summary>
/// Orchestrates awarding points to an event participant.
/// Business rules are enforced in the domain (Event aggregate).
/// </summary>
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
        var currentUserId = _currentUserService.GetCurrentUserId();
        var points = Points.Create(request.Points);

        // Load aggregates
        var @event = await _eventRepository.GetByIdWithParticipantsAsync(request.EventId)
                     ?? throw new InvalidOperationException("Event not found");

        var user = await _userRepository.GetByIdWithPointsAsync(request.ParticipantId)
                   ?? throw new InvalidOperationException("User not found");

        // Domain method enforces all business rules:
        // - Event must be Active
        // - Participant must be checked-in
        // - No double-award
        // - Pool enforcement
        // - Auto-complete when pool exhausted
        @event.AwardPoints(request.ParticipantId, points, request.Rank, currentUserId);

        // Update user's points account
        user.PointsAccount.Earn(
            points,
            source: "Event Participation",
            sourceId: request.EventId,
            processedBy: currentUserId);

        // Create transaction record
        var transaction = UserPointsTransaction.CreateEarned(
            userId: request.ParticipantId,
            points: points,
            source: "Event Participation",
            sourceId: request.EventId,
            description: $"Points awarded for event participation: {@event.Name}" +
                        (request.Rank.HasValue ? $" (Rank: {request.Rank})" : ""),
            balanceAfter: user.PointsAccount.CurrentBalance,
            processedBy: currentUserId
        );

        _transactionRepository.Add(transaction);

        await _unitOfWork.SaveChangesAsync(ct);
    }
}