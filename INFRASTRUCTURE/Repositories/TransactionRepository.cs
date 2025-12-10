using Microsoft.EntityFrameworkCore;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public class TransactionRepository : Repository<UserPointsTransaction>, ITransactionRepository
{
    public TransactionRepository(ApplicationDbContext context)
        : base(context)
    {
    }

    public async Task<UserPointsTransaction?> GetByIdAsync(Guid id)
    {
        return await _context.UserPointsTransactions
            .AsNoTracking()
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<IReadOnlyList<UserPointsTransaction>> GetByUserIdAsync(Guid userId)
    {
        return await _context.UserPointsTransactions
            .AsNoTracking()
            .Where(t => t.UserId == userId)
            .OrderByDescending(t => t.Timestamp)
            .ToListAsync();
    }

    public async Task<int> GetUserTransactionCountAsync(Guid userId)
    {
        return await _context.UserPointsTransactions
            .CountAsync(t => t.UserId == userId);
    }

    public async Task<int> GetTotalEarnedAsync()
    {
        return await _context.UserPointsTransactions
            .Where(t => t.TransactionType == PointsTransactionType.Earned)
            .SumAsync(t => t.Points);
    }

    public async Task<int> GetTotalRedeemedAsync()
    {
        return await _context.UserPointsTransactions
            .Where(t => t.TransactionType == PointsTransactionType.Redeemed)
            .SumAsync(t => t.Points);
    }

    public async Task<(IReadOnlyList<UserPointsTransaction> Items, int TotalCount)> GetPagedByUserIdAsync(
    Guid userId,
    int pageNumber,
    int pageSize)
    {
        var query = _context.UserPointsTransactions
            .AsNoTracking()
            .Where(t => t.UserId == userId);

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderByDescending(t => t.Timestamp)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

}
