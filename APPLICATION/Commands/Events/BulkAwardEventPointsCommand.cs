using MediatR;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Events;

/// <summary>
/// Command to award points to multiple event participants in bulk.
/// All-or-nothing semantics: either all succeed or all fail.
/// </summary>
/// <param name="EventId">The event ID</param>
/// <param name="Awards">List of participant awards</param>
public record BulkAwardEventPointsCommand(
    Guid EventId,
    IReadOnlyList<ParticipantAward> Awards
) : IRequest<BulkAwardResult>;

/// <summary>
/// Individual participant award in a bulk operation.
/// </summary>
/// <param name="ParticipantId">The participant's user ID</param>
/// <param name="Points">Points to award (must be positive)</param>
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
