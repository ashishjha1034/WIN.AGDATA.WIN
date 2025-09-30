using WIN.AGDATA.WIN.Domain.Entities.Transactions;


namespace WIN_AGDATA_WIN.Application.Interfaces
{
    public interface IPointsService
    {
        void AllocatePoints(string employeeId, int points, string eventId, string description); // Changed Guid to string
        void SpendPoints(string employeeId, int points, Guid redemptionId, string description);
        List<PointsTransaction> GetUserTransactionHistory(string employeeId);
        int GetUserPointsBalance(string employeeId);
    }
}