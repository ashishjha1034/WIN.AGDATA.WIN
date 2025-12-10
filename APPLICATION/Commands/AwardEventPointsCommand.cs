using MediatR;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Events;

public record AwardEventPointsCommand(
    Guid EventId,
    Guid ParticipantId,
    int Points
) : IRequest;
