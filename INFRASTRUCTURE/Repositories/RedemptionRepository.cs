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
}
