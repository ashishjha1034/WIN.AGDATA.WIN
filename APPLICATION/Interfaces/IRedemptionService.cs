using WIN.AGDATA.WIN.Domain.Entities.Redemptions;


namespace WIN_AGDATA_WIN.Application.Interfaces
{
    public interface IRedemptionService
    {
        Redemption RequestRedemption(string employeeId, Guid productId);
        void ApproveRedemption(Guid redemptionId);
        void RejectRedemption(Guid redemptionId, string reason);
        void MarkRedemptionDelivered(Guid redemptionId);
        List<Redemption> GetUserRedemptions(string employeeId);
        List<Redemption> GetPendingRedemptions();
    }
}