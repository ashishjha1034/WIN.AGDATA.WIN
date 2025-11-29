using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace WIN.AGDATA.WIN.Application.Interfaces
{
    public interface IRedemptionRepository
    {
        Task<IEnumerable<Redemption>> GetAllAsync();
        Task<Redemption?> GetByIdAsync(Guid id);
        Task<IEnumerable<Redemption>> GetByEmployeeIdAsync(string employeeId);
        Task AddAsync(Redemption redemption);
        Task UpdateAsync(Redemption redemption);
        Task DeleteAsync(Guid id);
        Task ApproveRedemptionAsync(Guid redemptionId);
        Task RejectRedemptionAsync(Guid redemptionId, string reason);
        Task MarkRedemptionDeliveredAsync(Guid redemptionId);
    }
}
