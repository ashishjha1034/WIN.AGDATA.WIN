using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories
{
    public class PointsTransactionRepository : ITransactionRepository
    {
        private readonly ApplicationDbContext _context;
        public PointsTransactionRepository(ApplicationDbContext context) { _context = context; }

        public async Task<IEnumerable<PointsTransaction>> GetAllAsync()
        {
            return await _context.PointsTransactions.AsNoTracking().ToListAsync();
        }

        public async Task<PointsTransaction?> GetByIdAsync(Guid id)
        {
            return await _context.PointsTransactions.FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<IEnumerable<PointsTransaction>> GetByEmployeeIdAsync(string employeeId)
        {
            return await _context.PointsTransactions.Where(t => t.EmployeeId == employeeId).AsNoTracking().ToListAsync();
        }

        public Task AddAsync(PointsTransaction transaction)
        {
            _context.PointsTransactions.Add(transaction);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(PointsTransaction transaction)
        {
            _context.PointsTransactions.Update(transaction);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Guid id)
        {
            var t = _context.PointsTransactions.FirstOrDefault(x => x.Id == id);
            if (t != null) _context.PointsTransactions.Remove(t);
            return Task.CompletedTask;
        }
    }
}
