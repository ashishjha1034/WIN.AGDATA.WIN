namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IRedemptionRepository
{
    Redemption? GetById(Guid redemptionId);
    List<Redemption> GetByEmployeeId(string employeeId);
    List<Redemption> GetAll();
    void Add(Redemption redemption);
    void Update(Redemption redemption);
    void Delete(Guid redemptionId);
}
