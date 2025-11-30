using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace WIN.AGDATA.WIN.APPLICATION.Interfaces;

public interface IRedemptionRepository
{
    Task<Redemption?> GetByIdAsync(Guid id);
    Task<Redemption?> GetByIdWithDetailsAsync(Guid id);
    Task<IReadOnlyList<Redemption>> GetByUserIdAsync(Guid userId);
    Task<IReadOnlyList<Redemption>> GetPendingAsync();
    void Add(Redemption redemption);
    Task UpdateAsync(Redemption redemption);
    Task<int> GetPendingCountAsync();
}
