namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IPointsManagementService
{
    void AddPointsToUser(string employeeId, int points, string reason, string? eventId = null);
    void DeductPointsFromUser(string employeeId, int points, string reason);
    void RefundPointsToUser(string employeeId, int points, string reason);
    int GetUserPointsBalance(string employeeId);
}
