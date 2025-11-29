using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.Application.Interfaces
{
    public interface IEventRepository
    {
        Task<IEnumerable<Event>> GetAllAsync();
        Task<Event?> GetByIdAsync(string eventId);
        Task AddAsync(Event ev);
        Task UpdateAsync(Event ev);
        Task DeleteAsync(string eventId);

        Task<IEnumerable<Event>> GetActiveAsync();
        Task<IEnumerable<Event>> GetUpcomingAsync(DateTime from);
        Task<IEnumerable<Event>> GetPastAsync(DateTime to);

        Task<IEnumerable<Event>> GetExpiredButNotProcessedAsync(DateTime now);
    }
}
