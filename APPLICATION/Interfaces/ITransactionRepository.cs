using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.Enums;

namespace WIN.AGDATA.WIN.APPLICATION.Interfaces;

public interface ITransactionRepository
{
    Task<UserPointsTransaction?> GetByIdAsync(Guid id);
    Task<UserPointsTransaction?> GetByIdWithUserAsync(Guid id);
    Task<IReadOnlyList<UserPointsTransaction>> GetByUserIdAsync(Guid userId);

    Task<(IReadOnlyList<UserPointsTransaction> Items, int TotalCount)> GetPagedByUserIdAsync(
        Guid userId,
        int pageNumber,
        int pageSize);

    /// <summary>
    /// Get all transactions with pagination and optional filters for admin view
    /// </summary>
    Task<(IReadOnlyList<UserPointsTransaction> Items, int TotalCount)> GetAllPagedAsync(
        int pageNumber,
        int pageSize,
        Guid? userId = null,
        PointsTransactionType? transactionType = null,
        DateTime? startDate = null,
        DateTime? endDate = null,
        string? source = null,
        string? searchQuery = null,
        string sortBy = "Timestamp",
        bool sortDescending = true);

    /// <summary>
    /// Get summary statistics for filtered transactions
    /// </summary>
    Task<(int TotalEarned, int TotalRedeemed, int TotalAdjusted, int TransactionCount)> GetFilteredSummaryAsync(
        Guid? userId = null,
        PointsTransactionType? transactionType = null,
        DateTime? startDate = null,
        DateTime? endDate = null,
        string? source = null);

    Task<int> GetUserTransactionCountAsync(Guid userId);
    Task<int> GetTotalEarnedAsync();
    Task<int> GetTotalRedeemedAsync();
    Task<int> GetTotalAdjustedAsync();
    Task<IReadOnlyList<(int Month, int Year, int PointsEarned, int PointsRedeemed)>> GetMonthlyPointsChartAsync(int months = 6);
    void Add(UserPointsTransaction transaction);
}
