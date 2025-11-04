using System;
using System.Collections.Generic;
using System.Linq;
using WIN.AGDATA.WIN.Infrastructure.Data;

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
        return _context.PointsTransactions
            .Where(t => t.EmployeeId == employeeId)
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

    public void Update(PointsTransaction transaction)  // ← ADD THIS
    {
        _context.PointsTransactions.Update(transaction);
        _context.SaveChanges();
    }

    public void Delete(Guid transactionId)  // ← ADD THIS
    {
        var transaction = GetById(transactionId);
        if (transaction != null)
        {
            _context.PointsTransactions.Remove(transaction);
            _context.SaveChanges();
        }
    }
}
