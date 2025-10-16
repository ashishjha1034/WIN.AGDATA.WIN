using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public class TransactionRepository : ITransactionRepository
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<TransactionRepository> _logger;

    public TransactionRepository(ApplicationDbContext context, ILogger<TransactionRepository> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public void Add(PointsTransaction transaction)
    {
        try
        {
            _context.Transactions.Add(transaction);
            _context.SaveChanges();
            _logger.LogInformation("Transaction added successfully: {TransactionId}", transaction.Id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to add transaction: {TransactionId}", transaction.Id);
            throw;
        }
    }

    public PointsTransaction? GetById(Guid id)
    {
        return _context.Transactions
            .FirstOrDefault(t => t.Id == id);
    }

    public List<PointsTransaction> GetByEmployeeId(string employeeId)
    {
        return _context.Transactions
            .Where(t => t.EmployeeId == employeeId.Trim().ToUpper())
            .OrderByDescending(t => t.TransactionDate)
            .ToList();
    }

    public List<PointsTransaction> GetByEventId(string eventId)
    {
        return _context.Transactions
            .OfType<PointsEarning>()
            .Where(t => t.EventId == eventId.Trim().ToUpper())
            .Cast<PointsTransaction>()
            .OrderByDescending(t => t.TransactionDate)
            .ToList();
    }

    public List<PointsTransaction> GetByRedemptionId(Guid redemptionId)
    {
        return _context.Transactions
            .OfType<PointsSpending>()
            .Where(t => t.RedemptionId == redemptionId)
            .Cast<PointsTransaction>()
            .OrderByDescending(t => t.TransactionDate)
            .ToList();
    }

    public List<PointsTransaction> GetAll()
    {
        return _context.Transactions
            .OrderByDescending(t => t.TransactionDate)
            .ToList();
    }
}
