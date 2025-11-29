using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;

namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IPointsService
{
    Task<int> GetUserPointsBalanceAsync(string employeeId);
    Task<List<PointsTransaction>> GetUserTransactionHistoryAsync(string employeeId);

    Task AddPointsAsync(string employeeId, int points, string reason, string? eventId = null);
    Task SpendPointsAsync(string employeeId, int points, string reason, Guid? redemptionId = null);
    Task RefundPointsAsync(string employeeId, int points, string reason);

    Task AddPointsToUserAsync(string employeeId, int points, string reason, string? eventId = null);
    Task DeductPointsFromUserAsync(string employeeId, int points, string reason, Guid? redemptionId = null);
    Task RefundPointsToUserAsync(string employeeId, int points, string reason);
}