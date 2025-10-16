using WIN.AGDATA.WIN.Domain.Entities.Transactions;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public interface ITransactionRepository
{
    void Add(PointsTransaction transaction);
    PointsTransaction? GetById(Guid id);
    List<PointsTransaction> GetByEmployeeId(string employeeId);
    List<PointsTransaction> GetByEventId(string eventId);
    List<PointsTransaction> GetByRedemptionId(Guid redemptionId);
    List<PointsTransaction> GetAll();
}
