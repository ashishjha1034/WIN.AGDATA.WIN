using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Events;

/// <summary>
/// Handler for bulk awarding points to multiple participants.
/// Implements all-or-nothing semantics with pool enforcement.
/// Supports distribution modes: Manual, EqualSplit, RankBased.
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
        // Load event with participants in single query
        var @event = await _eventRepository.GetByIdWithParticipantsAsync(request.EventId)
                     ?? throw new InvalidOperationException("Event not found");

        // Enforce event lifecycle
        if (!@event.CanAward())
            throw new InvalidOperationException($"Cannot award points. Event status is {@event.Status}. Points can only be awarded when event is Active.");

        var currentUserId = _currentUserService.GetCurrentUserId();

        // Build computed awards based on distribution mode
        var computedAwards = ComputeAwards(request, @event);

        // Validate request
        if (computedAwards.Count == 0)
            throw new InvalidOperationException("At least one award is required.");

        if (computedAwards.Any(a => a.Points <= 0))
            throw new InvalidOperationException("All points values must be positive.");

        var errors = new List<string>();

        // Pre-validate all participants before making any changes (fail-fast)
        var participantMap = @event.Participants.ToDictionary(p => p.UserId);
        var usersToLoad = new List<Guid>();

        foreach (var award in computedAwards)
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

        var totalPointsRequested = computedAwards.Sum(a => a.Points);

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

        foreach (var award in computedAwards)
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

        // Auto-complete event when pool is fully exhausted
        if (@event.RemainingPoints == 0)
        {
            @event.CompleteEvent(currentUserId);
        }

        // Single save with optimistic concurrency on Event.RowVersion
        await _unitOfWork.SaveChangesAsync(ct);

        return new BulkAwardResult(
            Success: true,
            TotalPointsAwarded: totalPointsRequested,
            ParticipantsAwarded: computedAwards.Count,
            RemainingPoolPoints: @event.RemainingPoints
        );
    }

    /// <summary>
    /// Computes award items based on the distribution mode.
    /// </summary>
    private List<ParticipantAward> ComputeAwards(BulkAwardEventPointsCommand request, Event @event)
    {
        // Default to Manual mode - use provided awards as-is
        if (request.Mode == DistributionMode.Manual || !request.ConsumeEntirePool)
        {
            return request.Awards?.ToList() ?? new List<ParticipantAward>();
        }

        var remainingPoints = @event.RemainingPoints ?? 0;
        if (remainingPoints <= 0)
            throw new InvalidOperationException("No remaining points in the pool to distribute.");

        var participantIds = request.Awards?.Select(a => a.ParticipantId).ToList() ?? new List<Guid>();
        if (participantIds.Count == 0)
            throw new InvalidOperationException("At least one participant must be selected for distribution.");

        return request.Mode switch
        {
            DistributionMode.EqualSplit => ComputeEqualSplitAwards(participantIds, remainingPoints),
            DistributionMode.RankBased => ComputeRankBasedAwards(participantIds, remainingPoints, request.RankPoints),
            _ => request.Awards?.ToList() ?? new List<ParticipantAward>()
        };
    }

    /// <summary>
    /// Computes equal split distribution across all participants.
    /// Uses deterministic remainder handling: first N participants get floor+1, rest get floor.
    /// </summary>
    private List<ParticipantAward> ComputeEqualSplitAwards(List<Guid> participantIds, int totalPoints)
    {
        var count = participantIds.Count;
        var basePoints = totalPoints / count;
        var remainder = totalPoints % count;

        var awards = new List<ParticipantAward>();
        for (int i = 0; i < count; i++)
        {
            // First 'remainder' participants get one extra point (deterministic)
            var points = basePoints + (i < remainder ? 1 : 0);
            awards.Add(new ParticipantAward(participantIds[i], points, null));
        }

        return awards;
    }

    /// <summary>
    /// Computes rank-based distribution.
    /// Admin specifies points for top N-1 ranks, last rank gets remainder.
    /// </summary>
    private List<ParticipantAward> ComputeRankBasedAwards(List<Guid> participantIds, int totalPoints, IReadOnlyList<int>? rankPoints)
    {
        if (rankPoints == null || rankPoints.Count == 0)
            throw new InvalidOperationException("RankPoints must be specified for RankBased distribution mode.");

        var count = participantIds.Count;
        if (count == 0)
            throw new InvalidOperationException("At least one participant must be selected.");

        // Calculate sum of specified rank points
        var specifiedRanksCount = Math.Min(rankPoints.Count, count - 1);
        var specifiedPointsSum = rankPoints.Take(specifiedRanksCount).Sum();

        // Last rank(s) get the remaining points
        var remainingForLastRank = totalPoints - specifiedPointsSum;
        if (remainingForLastRank < 0)
            throw new InvalidOperationException(
                $"Sum of specified rank points ({specifiedPointsSum}) exceeds total pool ({totalPoints}). " +
                "Reduce rank points or select fewer participants.");

        var awards = new List<ParticipantAward>();
        for (int i = 0; i < count; i++)
        {
            int points;
            int rank = i + 1;

            if (i < specifiedRanksCount)
            {
                // Use specified points for this rank
                points = rankPoints[i];
            }
            else
            {
                // Last rank position(s) - divide remaining equally
                var remainingParticipants = count - specifiedRanksCount;
                if (remainingParticipants == 1)
                {
                    points = remainingForLastRank;
                }
                else
                {
                    // Multiple participants for "last rank" - split equally
                    var lastRankIdx = i - specifiedRanksCount;
                    var baseLastPoints = remainingForLastRank / remainingParticipants;
                    var lastRemainder = remainingForLastRank % remainingParticipants;
                    points = baseLastPoints + (lastRankIdx < lastRemainder ? 1 : 0);
                }
            }

            awards.Add(new ParticipantAward(participantIds[i], points, rank));
        }

        return awards;
    }
}
