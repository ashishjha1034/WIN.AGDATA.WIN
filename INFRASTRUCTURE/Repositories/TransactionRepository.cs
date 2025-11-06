using System;
using System.Collections.Generic;
using System.Linq;
using WIN.AGDATA.WIN.Infrastructure.Data;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public class TransactionRepository : ITransactionRepository
{
    private readonly ApplicationDbContext _context;

    public TransactionRepository(ApplicationDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public PointsTransaction? GetById(Guid transactionId)
    {
        return _context.PointsTransactions.FirstOrDefault(t => t.Id == transactionId);
    }

    public List<PointsTransaction> GetByEmployeeId(string employeeId)
    {
        if (string.IsNullOrWhiteSpace(employeeId))
            return new List<PointsTransaction>();

        var normalized = NormalizeId(employeeId);
        return _context.PointsTransactions
            .Where(t => t.EmployeeId == normalized)
            .OrderByDescending(t => t.TransactionDate)
            .ToList();
    }

    public List<PointsTransaction> GetAll()
    {
        return _context.PointsTransactions.ToList();
    }

    public void Add(PointsTransaction transaction)
    {
        _context.PointsTransactions.Add(transaction);
        _context.SaveChanges();
    }

    public void Update(PointsTransaction transaction)
    {
        _context.PointsTransactions.Update(transaction);
        _context.SaveChanges();
    }

    public void Delete(Guid transactionId)
    {
        var transaction = GetById(transactionId);
        if (transaction != null)
        {
            _context.PointsTransactions.Remove(transaction);
            _context.SaveChanges();
        }
    }

    private static string NormalizeId(string id) => id.Trim().ToUpperInvariant();
}
