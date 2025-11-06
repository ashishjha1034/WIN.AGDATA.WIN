using System;
using System.Collections.Generic;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;

namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IPointsService
{

    int GetUserPointsBalance(string employeeId);
    List<PointsTransaction> GetUserTransactionHistory(string employeeId);

    void AddPoints(string employeeId, int points, string reason, string? eventId = null);
    void SpendPoints(string employeeId, int points, string reason, Guid? redemptionId = null);
    void RefundPoints(string employeeId, int points, string reason);

    
    void AddPointsToUser(string employeeId, int points, string reason, string? eventId = null);
    //void DeductPointsFromUser(string employeeId, int points, string reason, Guid? redemptionId = null);
}
