using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Events;

/// <summary>
/// Handler for bulk awarding points to multiple participants.
/// Implements all-or-nothing semantics with pool enforcement.
/// </summary>
public class BulkAwardEventPointsHandler : IRequestHandler<BulkAwardEventPointsCommand, BulkAwardResult>
{
    private readonly IEventRepository _eventRepository;
    private readonly IUserRepository _userRepository;
    private readonly ITransactionRepository _transactionRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public BulkAwardEventPointsHandler(
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

    public async Task<BulkAwardResult> Handle(BulkAwardEventPointsCommand request, CancellationToken ct)
    {
        // Validate request
        if (request.Awards == null || request.Awards.Count == 0)
            throw new InvalidOperationException("At least one award is required.");

        if (request.Awards.Any(a => a.Points <= 0))
            throw new InvalidOperationException("All points values must be positive.");

        // Load event with participants in single query
        var @event = await _eventRepository.GetByIdWithParticipantsAsync(request.EventId)
                     ?? throw new InvalidOperationException("Event not found");

        // Enforce event lifecycle
        if (!@event.CanAward())
            throw new InvalidOperationException($"Cannot award points. Event status is {@event.Status}. Points can only be awarded when event is Active.");

        var currentUserId = _currentUserService.GetCurrentUserId();
        var totalPointsRequested = request.Awards.Sum(a => a.Points);
        var errors = new List<string>();

        // Pre-validate all participants before making any changes (fail-fast)
        var participantMap = @event.Participants.ToDictionary(p => p.UserId);
        var usersToLoad = new List<Guid>();

        foreach (var award in request.Awards)
        {
            if (!participantMap.TryGetValue(award.ParticipantId, out var participant))
            {
                errors.Add($"Participant {award.ParticipantId} not found in this event.");
                continue;
            }

            if (participant.AttendanceStatus != AttendanceStatus.Attended)
            {
                errors.Add($"Participant {award.ParticipantId} is not checked-in. Current status: {participant.AttendanceStatus}.");
                continue;
            }

            if (participant.PointsAwarded > 0)
            {
                errors.Add($"Participant {award.ParticipantId} already has points awarded ({participant.PointsAwarded} points).");
                continue;
            }

            usersToLoad.Add(participant.UserId);
        }

        // All-or-nothing: if any participant is ineligible, reject entire batch
        if (errors.Count > 0)
        {
            throw new InvalidOperationException($"Bulk award failed. Ineligible participants: {string.Join("; ", errors)}");
        }

        // Pool enforcement: validate total requested points against remaining pool
        if (!@event.CanDistributePoints(totalPointsRequested))
        {
            var remaining = @event.RemainingPoints ?? 0;
            throw new InvalidOperationException($"Insufficient points in event pool. Total requested: {totalPointsRequested}, Remaining: {remaining}");
        }

        // Load all users in batch for efficiency
        var users = await _userRepository.GetByIdsWithPointsAsync(usersToLoad);
        var userMap = users.ToDictionary(u => u.Id);

        // Apply all awards - all validation passed, proceed with single transaction
        @event.ReservePoints(totalPointsRequested);

        foreach (var award in request.Awards)
        {
            var participant = participantMap[award.ParticipantId];
            var user = userMap[participant.UserId];

            // Credit user's points account
            user.PointsAccount.AddPoints(award.Points, currentUserId);

            // Award points to participant
            participant.AwardPoints(award.Points, award.Rank, currentUserId);

            // Create transaction record
            var transaction = UserPointsTransaction.CreateEarned(
                userId: participant.UserId,
                points: award.Points,
                source: "Event Participation (Bulk)",
                sourceId: request.EventId,
                description: $"Points awarded for event: {@event.Name}" +
                            (award.Rank.HasValue ? $" (Rank: {award.Rank})" : ""),
                balanceAfter: user.PointsAccount.CurrentBalance,
                processedBy: currentUserId
            );

            _transactionRepository.Add(transaction);
        }

        // Single save with optimistic concurrency on Event.RowVersion
        await _unitOfWork.SaveChangesAsync(ct);

        return new BulkAwardResult(
            Success: true,
            TotalPointsAwarded: totalPointsRequested,
            ParticipantsAwarded: request.Awards.Count,
            RemainingPoolPoints: @event.RemainingPoints
        );
    }
}
