using MediatR;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Admin;

public record AdjustPointsCommand(
    Guid UserId,
    int Amount,
    string Reason
) : IRequest;
