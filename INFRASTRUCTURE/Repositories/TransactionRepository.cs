using Microsoft.EntityFrameworkCore;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public class TransactionRepository : Repository<UserPointsTransaction>, ITransactionRepository
{
    public TransactionRepository(ApplicationDbContext context) : base(context) { }

    public async Task<IReadOnlyList<UserPointsTransaction>> GetByUserIdAsync(Guid userId) =>
        await _context.UserPointsTransactions
            .Where(t => t.UserPointsAccount.UserId == userId)
            .OrderByDescending(t => t.Timestamp)
            .ToListAsync();

    public async Task<int> GetTotalEarnedAsync() =>
        await _context.UserPointsTransactions
            .Where(t => t.Type == PointsTransactionType.Earned)
            .SumAsync(t => t.Amount);

    public async Task<int> GetTotalRedeemedAsync() =>
        await _context.UserPointsTransactions
            .Where(t => t.Type == PointsTransactionType.Redeemed)
            .SumAsync(t => t.Amount);
}
