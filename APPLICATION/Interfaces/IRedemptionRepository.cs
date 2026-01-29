using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace WIN.AGDATA.WIN.APPLICATION.Interfaces;

/// <summary>
/// Statistics about recent redemptions for a product
/// </summary>
public record RecentRedemptionStats(
    int TotalRedemptions,
    int UniqueUsers,
    DateTime? LastRedemptionDate = null);

/// <summary>
/// Counts of pending and approved redemptions for a product
/// </summary>
public record PendingApprovedCounts(int PendingCount, int ApprovedCount);

public interface IRedemptionRepository
{
    Task<Redemption?> GetByIdAsync(Guid id);
    Task<Redemption?> GetByIdWithDetailsAsync(Guid id);
    Task<IReadOnlyList<Redemption>> GetByUserIdAsync(Guid userId);
    Task<IReadOnlyList<Redemption>> GetPendingAsync();
    Task<IReadOnlyList<Redemption>> GetAllWithDetailsAsync();
    void Add(Redemption redemption);
    Task UpdateAsync(Redemption redemption);
    Task<int> GetPendingCountAsync();
    Task SaveChangesAsync();

    /// <summary>
    /// Gets the count of pending and approved redemptions for a specific product.
    /// Used to check hard blockers for product deactivation.
    /// </summary>
    Task<PendingApprovedCounts> GetPendingAndApprovedCountsForProductAsync(Guid productId);

    /// <summary>
    /// Gets recent redemption statistics for a product within the specified number of days.
    /// Used to display soft warnings during product deactivation.
    /// </summary>
    Task<RecentRedemptionStats> GetRecentRedemptionStatsForProductAsync(Guid productId, int days);
}
