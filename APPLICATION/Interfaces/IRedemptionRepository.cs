using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public interface IRedemptionRepository
{
    void Add(Redemption redemption);
    void Update(Redemption redemption);
    void UpdateStatus(RStatus status);

    Redemption? GetById(Guid redemptionId);
    RStatus? GetStatusById(Guid redemptionId);
    List<Redemption> GetByEmployeeId(string employeeId);
    List<Redemption> GetByStatus(StatusValue status);
    List<Redemption> GetAll();
}
