using MediatR;
using System;
using WIN.AGDATA.WIN.APPLICATION.DTOs;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;

namespace WIN.AGDATA.WIN.Application.Commands;

public class ApproveRedemptionCommand : IRequest<RedemptionDto>
{
    public Guid RedemptionId { get; }
    public string ApprovedBy { get; }
    public ApproveRedemptionCommand(Guid redemptionId, string approvedBy)
    {
        RedemptionId = redemptionId;
        ApprovedBy = approvedBy;
    }
}
