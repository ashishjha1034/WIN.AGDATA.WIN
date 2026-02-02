using Microsoft.EntityFrameworkCore;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public class RedemptionRepository : Repository<Redemption>, IRedemptionRepository
{
    public RedemptionRepository(ApplicationDbContext context) : base(context) { }

    public async Task<Redemption?> GetByIdWithDetailsAsync(Guid id) =>
        await _context.Redemptions
            .Include(r => r.User)
                .ThenInclude(u => u.PointsAccount)
            .Include(r => r.Product)
                .ThenInclude(p => p.Category)
            .Include(r => r.Product)
                .ThenInclude(p => p.Pricing)
            .FirstOrDefaultAsync(r => r.Id == id);

    public async Task<IReadOnlyList<Redemption>> GetByUserIdAsync(Guid userId) =>
        await _context.Redemptions
            .Include(r => r.User)
            .Include(r => r.Product)
            .Where(r => r.UserId == userId)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();

    public async Task<IReadOnlyList<Redemption>> GetPendingAsync() =>
        await _context.Redemptions
            .Include(r => r.User)
            .Include(r => r.Product)
            .Where(r => r.Status == RedemptionStatus.Pending)
            .ToListAsync();

    public async Task<IReadOnlyList<Redemption>> GetAllWithDetailsAsync() =>
        await _context.Redemptions
            .Include(r => r.User)
                .ThenInclude(u => u.PointsAccount)
            .Include(r => r.Product)
                .ThenInclude(p => p.Category)
            .Include(r => r.Product)
                .ThenInclude(p => p.Pricing)
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();

    public async Task UpdateAsync(Redemption redemption)
    {
        _dbSet.Update(redemption);
    }

    public async Task<int> GetPendingCountAsync() =>
        await _context.Redemptions.CountAsync(r => r.Status == RedemptionStatus.Pending);

    public async Task SaveChangesAsync() =>
        await _context.SaveChangesAsync();

    /// <summary>
    /// Gets the count of pending and approved redemptions for a specific product.
    /// Used to check hard blockers for product deactivation.
    /// </summary>
    public async Task<PendingApprovedCounts> GetPendingAndApprovedCountsForProductAsync(Guid productId)
    {
        var counts = await _context.Redemptions
            .Where(r => r.ProductId == productId && 
                       (r.Status == RedemptionStatus.Pending || r.Status == RedemptionStatus.Approved))
            .GroupBy(r => r.Status)
            .Select(g => new { Status = g.Key, Count = g.Count() })
            .ToListAsync();

        var pendingCount = counts.FirstOrDefault(c => c.Status == RedemptionStatus.Pending)?.Count ?? 0;
        var approvedCount = counts.FirstOrDefault(c => c.Status == RedemptionStatus.Approved)?.Count ?? 0;

        return new PendingApprovedCounts(pendingCount, approvedCount);
    }

    /// <summary>
    /// Gets recent redemption statistics for a product within the specified number of days.
    /// Used to display soft warnings during product deactivation.
    /// </summary>
    public async Task<RecentRedemptionStats> GetRecentRedemptionStatsForProductAsync(Guid productId, int days)
    {
        var cutoffDate = DateTime.UtcNow.AddDays(-days);

        var stats = await _context.Redemptions
            .Where(r => r.ProductId == productId && r.CreatedAt >= cutoffDate)
            .GroupBy(r => 1) // Group all into one
            .Select(g => new
            {
                TotalRedemptions = g.Count(),
                UniqueUsers = g.Select(r => r.UserId).Distinct().Count(),
                LastRedemptionDate = g.Max(r => (DateTime?)r.CreatedAt)
            })
            .FirstOrDefaultAsync();

        if (stats == null)
        {
            // No redemptions in the time period - check for last redemption date ever
            var lastRedemption = await _context.Redemptions
                .Where(r => r.ProductId == productId)
                .OrderByDescending(r => r.CreatedAt)
                .Select(r => (DateTime?)r.CreatedAt)
                .FirstOrDefaultAsync();

            return new RecentRedemptionStats(0, 0, lastRedemption);
        }

        return new RecentRedemptionStats(
            stats.TotalRedemptions,
            stats.UniqueUsers,
            stats.LastRedemptionDate);
    }

    /// <summary>
    /// Gets the count of pending and approved redemptions for a specific user.
    /// Used to check hard blockers for user deactivation.
    /// </summary>
    public async Task<PendingApprovedCounts> GetPendingAndApprovedCountsForUserAsync(Guid userId)
    {
        var counts = await _context.Redemptions
            .Where(r => r.UserId == userId &&
                       (r.Status == RedemptionStatus.Pending || r.Status == RedemptionStatus.Approved))
            .GroupBy(r => r.Status)
            .Select(g => new { Status = g.Key, Count = g.Count() })
            .ToListAsync();

        var pendingCount = counts.FirstOrDefault(c => c.Status == RedemptionStatus.Pending)?.Count ?? 0;
        var approvedCount = counts.FirstOrDefault(c => c.Status == RedemptionStatus.Approved)?.Count ?? 0;

        return new PendingApprovedCounts(pendingCount, approvedCount);
    }

    /// <summary>
    /// Gets the count of completed (delivered) redemptions for a user.
    /// Used to display soft warnings during user deactivation.
    /// </summary>
    public async Task<int> GetCompletedRedemptionsCountForUserAsync(Guid userId)
    {
        return await _context.Redemptions
            .Where(r => r.UserId == userId && r.Status == RedemptionStatus.Delivered)
            .CountAsync();
    }

    /// <summary>
    /// Checks if the user has a pending or approved redemption for a specific product.
    /// Used to enforce the one-at-a-time redemption rule.
    /// </summary>
    public async Task<bool> HasPendingRedemptionForProductAsync(Guid userId, Guid productId)
    {
        return await _context.Redemptions
            .AnyAsync(r => r.UserId == userId && 
                          r.ProductId == productId && 
                          (r.Status == RedemptionStatus.Pending || r.Status == RedemptionStatus.Approved));
    }

    /// <summary>
    /// Gets all product IDs that have pending or approved (not yet delivered) redemptions for a user.
    /// </summary>
    public async Task<IReadOnlyList<Guid>> GetPendingProductIdsForUserAsync(Guid userId)
    {
        return await _context.Redemptions
            .Where(r => r.UserId == userId && 
                       (r.Status == RedemptionStatus.Pending || r.Status == RedemptionStatus.Approved))
            .Select(r => r.ProductId)
            .Distinct()
            .ToListAsync();
    }
}
