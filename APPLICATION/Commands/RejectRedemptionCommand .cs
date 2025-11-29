using MediatR;
using System;
using WIN.AGDATA.WIN.APPLICATION.DTOs;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;

namespace WIN.AGDATA.WIN.Application.Commands;

public class RejectRedemptionCommand : IRequest<RedemptionDto>
{
    public Guid RedemptionId { get; }
    public string Reason { get; }
    public string RejectedBy { get; }

    public RejectRedemptionCommand(Guid redemptionId, string reason, string rejectedBy)
    {
        RedemptionId = redemptionId;
        Reason = reason;
        RejectedBy = rejectedBy;
    }
}
