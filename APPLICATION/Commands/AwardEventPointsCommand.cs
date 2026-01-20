using MediatR;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Events;

/// <summary>
/// Command to award points to a single event participant.
/// </summary>
/// <param name="EventId">The event ID</param>
/// <param name="ParticipantId">The participant's user ID</param>
/// <param name="Points">Points to award (must be positive)</param>
/// <param name="Rank">Optional rank position (1st, 2nd, etc.)</param>
public record AwardEventPointsCommand(
    Guid EventId,
    Guid ParticipantId,
    int Points,
    int? Rank = null
) : IRequest;
