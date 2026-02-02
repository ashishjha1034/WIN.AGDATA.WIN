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
    Task<(decimal TotalEarned, decimal TotalRedeemed, decimal TotalAdjusted, int TransactionCount)> GetFilteredSummaryAsync(
        Guid? userId = null,
        PointsTransactionType? transactionType = null,
        DateTime? startDate = null,
        DateTime? endDate = null,
        string? source = null);

    Task<int> GetUserTransactionCountAsync(Guid userId);
    Task<decimal> GetTotalEarnedAsync();
    Task<decimal> GetTotalRedeemedAsync();
    Task<decimal> GetTotalAdjustedAsync();
    Task<IReadOnlyList<(int Month, int Year, decimal PointsEarned, decimal PointsRedeemed)>> GetMonthlyPointsChartAsync(int months = 6);
    
    /// <summary>
    /// Get monthly points chart data with filters (same filters as GetAllPagedAsync)
    /// to ensure KPIs, Chart, and Table stay in sync
    /// </summary>
    Task<IReadOnlyList<(int Month, int Year, decimal PointsEarned, decimal PointsRedeemed)>> GetFilteredMonthlyPointsChartAsync(
        Guid? userId = null,
        PointsTransactionType? transactionType = null,
        DateTime? startDate = null,
        DateTime? endDate = null,
        string? source = null);
    
    void Add(UserPointsTransaction transaction);

    /// <summary>
    /// Gets the most recent transaction date for a user.
    /// Used as a proxy for "last activity" in user deactivation warnings.
    /// </summary>
    Task<DateTime?> GetLastTransactionDateForUserAsync(Guid userId);
}
