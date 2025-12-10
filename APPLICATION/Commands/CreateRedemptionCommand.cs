using MediatR;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Redemptions;

public record CreateRedemptionCommand(Guid UserId, Guid ProductId, int Quantity)
    : IRequest<RedemptionDto>;