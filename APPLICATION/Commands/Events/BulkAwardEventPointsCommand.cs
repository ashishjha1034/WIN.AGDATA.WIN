using MediatR;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Events;

/// <summary>
/// Command to award points to multiple event participants in bulk.
/// All-or-nothing semantics: either all succeed or all fail.
/// Supports distribution modes: Manual, EqualSplit, RankBased.
/// </summary>
/// <param name="EventId">The event ID</param>
/// <param name="Awards">List of participant awards (can contain just participant IDs for EqualSplit/RankBased)</param>
/// <param name="Mode">Distribution mode (Manual, EqualSplit, RankBased)</param>
/// <param name="ConsumeEntirePool">Whether to consume the entire remaining pool</param>
/// <param name="RankPoints">Points for each rank position (used only in RankBased mode)</param>
public record BulkAwardEventPointsCommand(
    Guid EventId,
    IReadOnlyList<ParticipantAward> Awards,
    DistributionMode Mode = DistributionMode.Manual,
    bool ConsumeEntirePool = false,
    IReadOnlyList<int>? RankPoints = null
) : IRequest<BulkAwardResult>;

/// <summary>
/// Individual participant award in a bulk operation.
/// </summary>
/// <param name="ParticipantId">The participant's user ID</param>
/// <param name="Points">Points to award (can be 0 for EqualSplit/RankBased modes where points are computed)</param>
/// <param name="Rank">Optional rank position</param>
public record ParticipantAward(
    Guid ParticipantId,
    int Points,
    int? Rank = null
);

/// <summary>
/// Result of a bulk award operation.
/// </summary>
/// <param name="Success">Whether all awards were applied</param>
/// <param name="TotalPointsAwarded">Total points distributed</param>
/// <param name="ParticipantsAwarded">Number of participants who received awards</param>
/// <param name="RemainingPoolPoints">Remaining points in event pool after operation (null if unlimited)</param>
public record BulkAwardResult(
    bool Success,
    int TotalPointsAwarded,
    int ParticipantsAwarded,
    int? RemainingPoolPoints
);
