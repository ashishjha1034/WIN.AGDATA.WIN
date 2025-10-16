using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IRedemptionService
{
    Redemption RequestRedemption(string employeeId, Guid productId);
    void ApproveRedemption(Guid redemptionId);
    void RejectRedemption(Guid redemptionId, string reason);
    void MarkAsDelivered(Guid redemptionId);

    List<Redemption> GetUserRedemptions(string employeeId);
    List<Redemption> GetPendingRedemptions();
    Redemption? GetRedemptionById(Guid redemptionId);
}
