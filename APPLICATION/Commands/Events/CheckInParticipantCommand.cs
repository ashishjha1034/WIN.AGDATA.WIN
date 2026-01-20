using MediatR;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Events;

/// <summary>
/// Command to check-in a participant for an active event.
/// Admin-only operation.
/// </summary>
public record CheckInParticipantCommand(
    Guid EventId,
    Guid ParticipantUserId
) : IRequest;
