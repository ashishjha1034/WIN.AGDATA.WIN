using MediatR;
using System;
using WIN.AGDATA.WIN.APPLICATION.DTOs;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;

namespace WIN.AGDATA.WIN.Application.Commands;

public class MarkRedemptionDeliveredCommand : IRequest<RedemptionDto>
{
    public Guid RedemptionId { get; }
    public string DeliveredBy { get; }

    public MarkRedemptionDeliveredCommand(Guid redemptionId, string deliveredBy)
    {
        RedemptionId = redemptionId;
        DeliveredBy = deliveredBy;
    }
}
