using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories
{
    public class RedemptionRepository : IRedemptionRepository
    {
        private readonly ApplicationDbContext _context;
        public RedemptionRepository(ApplicationDbContext context) { _context = context; }

        public async Task<Redemption?> GetByIdAsync(Guid id)
        {
            return await _context.Redemptions.FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<IEnumerable<Redemption>> GetAllAsync()
        {
            return await _context.Redemptions.AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<Redemption>> GetByEmployeeIdAsync(string employeeId)
        {
            return await _context.Redemptions.Where(r => r.EmployeeId == employeeId).AsNoTracking().ToListAsync();
        }

        public Task AddAsync(Redemption redemption)
        {
            _context.Redemptions.Add(redemption);
            return Task.CompletedTask;
        }

        public Task UpdateAsync(Redemption redemption)
        {
            _context.Redemptions.Update(redemption);
            return Task.CompletedTask;
        }

        public Task DeleteAsync(Guid id)
        {
            var r = _context.Redemptions.FirstOrDefault(x => x.Id == id);
            if (r != null) _context.Redemptions.Remove(r);
            return Task.CompletedTask;
        }

        public Task ApproveRedemptionAsync(Guid redemptionId)
        {
            var r = _context.Redemptions.FirstOrDefault(x => x.Id == redemptionId);
            if (r != null) r.Approve("SYSTEM");
            return Task.CompletedTask;
        }

        public Task RejectRedemptionAsync(Guid redemptionId, string reason)
        {
            var r = _context.Redemptions.FirstOrDefault(x => x.Id == redemptionId);
            if (r != null) r.Reject(reason, "SYSTEM");
            return Task.CompletedTask;
        }

        public Task MarkRedemptionDeliveredAsync(Guid redemptionId)
        {
            var r = _context.Redemptions.FirstOrDefault(x => x.Id == redemptionId);
            if (r != null) r.MarkDelivered("SYSTEM");
            return Task.CompletedTask;
        }
    }
}
