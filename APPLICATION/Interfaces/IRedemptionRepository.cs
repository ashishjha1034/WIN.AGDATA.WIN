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

    /// <summary>
    /// Gets the count of pending and approved redemptions for a specific user.
    /// Used to check hard blockers for user deactivation.
    /// </summary>
    Task<PendingApprovedCounts> GetPendingAndApprovedCountsForUserAsync(Guid userId);

    /// <summary>
    /// Gets the count of completed (fulfilled/delivered) redemptions for a user.
    /// Used to display soft warnings during user deactivation.
    /// </summary>
    Task<int> GetCompletedRedemptionsCountForUserAsync(Guid userId);

    /// <summary>
    /// Checks if the user has a pending or approved redemption for a specific product.
    /// Used to enforce the one-at-a-time redemption rule (user cannot redeem same product
    /// until previous redemption is delivered).
    /// </summary>
    Task<bool> HasPendingRedemptionForProductAsync(Guid userId, Guid productId);

    /// <summary>
    /// Gets all product IDs that have pending or approved (not yet delivered) redemptions for a user.
    /// Used by the frontend to disable redemption buttons for products with active redemptions.
    /// </summary>
    Task<IReadOnlyList<Guid>> GetPendingProductIdsForUserAsync(Guid userId);
}
