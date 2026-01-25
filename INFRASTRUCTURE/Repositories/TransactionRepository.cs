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

    public async Task<UserPointsTransaction?> GetByIdWithUserAsync(Guid id)
    {
        return await _context.UserPointsTransactions
            .AsNoTracking()
            .Include(t => t.User)
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

    public async Task<int> GetTotalAdjustedAsync()
    {
        return await _context.UserPointsTransactions
            .Where(t => t.Source == "Admin")
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

    public async Task<(IReadOnlyList<UserPointsTransaction> Items, int TotalCount)> GetAllPagedAsync(
        int pageNumber,
        int pageSize,
        Guid? userId = null,
        PointsTransactionType? transactionType = null,
        DateTime? startDate = null,
        DateTime? endDate = null,
        string? source = null,
        string? searchQuery = null,
        string sortBy = "Timestamp",
        bool sortDescending = true)
    {
        var query = _context.UserPointsTransactions
            .AsNoTracking()
            .Include(t => t.User)
            .AsQueryable();

        // Apply filters
        if (userId.HasValue)
        {
            query = query.Where(t => t.UserId == userId.Value);
        }

        if (transactionType.HasValue)
        {
            query = query.Where(t => t.TransactionType == transactionType.Value);
        }

        if (startDate.HasValue)
        {
            query = query.Where(t => t.Timestamp >= startDate.Value);
        }

        if (endDate.HasValue)
        {
            var endOfDay = endDate.Value.Date.AddDays(1).AddTicks(-1);
            query = query.Where(t => t.Timestamp <= endOfDay);
        }

        if (!string.IsNullOrWhiteSpace(source))
        {
            query = query.Where(t => t.Source == source);
        }

        if (!string.IsNullOrWhiteSpace(searchQuery))
        {
            var search = searchQuery.ToLower();
            query = query.Where(t =>
                t.Description.ToLower().Contains(search) ||
                t.User.FirstName.ToLower().Contains(search) ||
                t.User.LastName.ToLower().Contains(search) ||
                t.User.Email.Value.ToLower().Contains(search) ||
                t.User.EmployeeId.ToLower().Contains(search));
        }

        // Get total count before pagination
        var totalCount = await query.CountAsync();

        // Apply sorting
        query = sortBy?.ToLower() switch
        {
            "amount" or "points" => sortDescending
                ? query.OrderByDescending(t => t.Points)
                : query.OrderBy(t => t.Points),
            "type" => sortDescending
                ? query.OrderByDescending(t => t.TransactionType)
                : query.OrderBy(t => t.TransactionType),
            "user" => sortDescending
                ? query.OrderByDescending(t => t.User.LastName).ThenByDescending(t => t.User.FirstName)
                : query.OrderBy(t => t.User.LastName).ThenBy(t => t.User.FirstName),
            "source" => sortDescending
                ? query.OrderByDescending(t => t.Source)
                : query.OrderBy(t => t.Source),
            _ => sortDescending
                ? query.OrderByDescending(t => t.Timestamp)
                : query.OrderBy(t => t.Timestamp)
        };

        // Apply pagination
        var items = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, totalCount);
    }

    public async Task<(int TotalEarned, int TotalRedeemed, int TotalAdjusted, int TransactionCount)> GetFilteredSummaryAsync(
        Guid? userId = null,
        PointsTransactionType? transactionType = null,
        DateTime? startDate = null,
        DateTime? endDate = null,
        string? source = null)
    {
        var query = _context.UserPointsTransactions.AsNoTracking().AsQueryable();

        // Apply same filters as GetAllPagedAsync
        if (userId.HasValue)
        {
            query = query.Where(t => t.UserId == userId.Value);
        }

        if (transactionType.HasValue)
        {
            query = query.Where(t => t.TransactionType == transactionType.Value);
        }

        if (startDate.HasValue)
        {
            query = query.Where(t => t.Timestamp >= startDate.Value);
        }

        if (endDate.HasValue)
        {
            var endOfDay = endDate.Value.Date.AddDays(1).AddTicks(-1);
            query = query.Where(t => t.Timestamp <= endOfDay);
        }

        if (!string.IsNullOrWhiteSpace(source))
        {
            query = query.Where(t => t.Source == source);
        }

        var transactions = await query.ToListAsync();

        var totalEarned = transactions
            .Where(t => t.TransactionType == PointsTransactionType.Earned)
            .Sum(t => t.Points);

        var totalRedeemed = transactions
            .Where(t => t.TransactionType == PointsTransactionType.Redeemed)
            .Sum(t => t.Points);

        var totalAdjusted = transactions
            .Where(t => t.Source == "Admin")
            .Sum(t => t.Points);

        return (totalEarned, totalRedeemed, totalAdjusted, transactions.Count);
    }

    public async Task<IReadOnlyList<(int Month, int Year, int PointsEarned, int PointsRedeemed)>> GetMonthlyPointsChartAsync(int months = 6)
    {
        var startDate = DateTime.UtcNow.AddMonths(-months);
        
        var transactions = await _context.UserPointsTransactions
            .AsNoTracking()
            .Where(t => t.Timestamp >= startDate)
            .ToListAsync();

        var chartData = transactions
            .GroupBy(t => new { t.Timestamp.Year, t.Timestamp.Month })
            .OrderBy(g => g.Key.Year)
            .ThenBy(g => g.Key.Month)
            .Select(g => (
                Month: g.Key.Month,
                Year: g.Key.Year,
                PointsEarned: g.Where(t => t.TransactionType == PointsTransactionType.Earned).Sum(t => t.Points),
                PointsRedeemed: g.Where(t => t.TransactionType == PointsTransactionType.Redeemed).Sum(t => t.Points)
            ))
            .ToList()
            .AsReadOnly();

        return chartData;
    }

    public void Add(UserPointsTransaction transaction)
    {
        _dbSet.Add(transaction);
    }
}
