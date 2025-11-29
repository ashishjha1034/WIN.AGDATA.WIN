using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IRedemptionService
{
    Task<Redemption> RequestRedemptionAsync(string employeeId, Guid productId, string createdBy = "SYSTEM");
    Task<Redemption?> GetRedemptionByIdAsync(Guid redemptionId);
    Task<List<Redemption>> GetUserRedemptionsAsync(string employeeId);
    Task<List<Redemption>> GetPendingRedemptionsAsync();
    Task ApproveRedemptionAsync(Guid redemptionId, string approvedBy = "SYSTEM");
    Task RejectRedemptionAsync(Guid redemptionId, string reason, string rejectedBy = "SYSTEM");
    Task MarkAsDeliveredAsync(Guid redemptionId, string deliveredBy = "SYSTEM");
}