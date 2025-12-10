using MediatR;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Events;

public record RegisterEventParticipantCommand(
    Guid EventId,
    Guid UserId
) : IRequest;
