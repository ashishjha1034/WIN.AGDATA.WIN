using WIN.AGDATA.WIN.Domain.Entities.Transactions;

namespace WIN.AGDATA.WIN.APPLICATION.Interfaces;

public interface ITransactionRepository
{
    Task<UserPointsTransaction?> GetByIdAsync(Guid id);
    Task<IReadOnlyList<UserPointsTransaction>> GetByUserIdAsync(Guid userId);

    Task<(IReadOnlyList<UserPointsTransaction> Items, int TotalCount)> GetPagedByUserIdAsync(
        Guid userId,
        int pageNumber,
        int pageSize);

    Task<int> GetUserTransactionCountAsync(Guid userId);
    Task<int> GetTotalEarnedAsync();
    Task<int> GetTotalRedeemedAsync();
}
