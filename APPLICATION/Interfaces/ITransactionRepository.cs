namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface ITransactionRepository
{
    PointsTransaction? GetById(Guid transactionId);
    List<PointsTransaction> GetByEmployeeId(string employeeId);
    List<PointsTransaction> GetAll();
    void Add(PointsTransaction transaction);
    void Update(PointsTransaction transaction);  // ← ADD THIS
    void Delete(Guid transactionId);             // ← ADD THIS
}
