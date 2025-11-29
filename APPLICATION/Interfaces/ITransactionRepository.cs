using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;

namespace WIN.AGDATA.WIN.Application.Interfaces
{
    public interface ITransactionRepository
    {
        Task<IEnumerable<PointsTransaction>> GetAllAsync();
        Task<PointsTransaction?> GetByIdAsync(Guid id);
        Task<IEnumerable<PointsTransaction>> GetByEmployeeIdAsync(string employeeId);
        Task AddAsync(PointsTransaction transaction);
        Task UpdateAsync(PointsTransaction transaction);
        Task DeleteAsync(Guid id);
    }
}
