using Microsoft.EntityFrameworkCore;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public class EventRepository : Repository<Event>, IEventRepository
{
    public EventRepository(ApplicationDbContext context) : base(context) { }

    public async Task<Event?> GetByIdWithParticipantsAsync(Guid id) =>
        await _context.Events
            .Include(e => e.Participants)
            .FirstOrDefaultAsync(e => e.Id == id);

    public async Task UpdateAsync(Event @event)
    {
        _dbSet.Update(@event);
    }
}
