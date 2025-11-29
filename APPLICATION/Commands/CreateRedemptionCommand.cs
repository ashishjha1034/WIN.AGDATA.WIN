using System;
using MediatR;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;

namespace WIN.AGDATA.WIN.Application.Commands;

public class CreateRedemptionCommand : IRequest<RedemptionDto>
{
    public Guid UserId { get; }
    public Guid ProductId { get; }
    public string CreatedBy { get; }

    public CreateRedemptionCommand(Guid userId, Guid productId, string createdBy)
    {
        UserId = userId;
        ProductId = productId;
        CreatedBy = createdBy;
    }
}
