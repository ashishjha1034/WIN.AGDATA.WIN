namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IRedemptionService
{
    Redemption RequestRedemption(string employeeId, Guid productId);
    Redemption? GetRedemptionById(Guid redemptionId);
    List<Redemption> GetUserRedemptions(string employeeId);
    List<Redemption> GetPendingRedemptions();
    void ApproveRedemption(Guid redemptionId);
    void RejectRedemption(Guid redemptionId, string reason);
    void MarkAsDelivered(Guid redemptionId);
}
