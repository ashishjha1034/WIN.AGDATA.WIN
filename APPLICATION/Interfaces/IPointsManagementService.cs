using WIN.AGDATA.WIN.Domain.Entities.Transactions;

namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IPointsManagementService
{
    void AddPointsToUser(string employeeId, int points, string reason, string eventId);
    void DeductPointsFromUser(string employeeId, int points, string reason, Guid redemptionId);
    bool CanUserRedeem(string employeeId, int requiredPoints);
    int GetUserPointsBalance(string employeeId);
    List<PointsTransaction> GetUserPointsHistory(string employeeId);
}
