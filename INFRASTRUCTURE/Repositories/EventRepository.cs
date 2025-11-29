using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly ApplicationDbContext _context;
        public EventRepository(ApplicationDbContext context) { _context = context; }

        public async Task AddAsync(Event ev)
        {
            await _context.Events.AddAsync(ev);
        }

        public async Task DeleteAsync(string eventId)
        {
            var ev = await _context.Events.FirstOrDefaultAsync(e => e.EventId == eventId);
            if (ev != null)
                _context.Events.Remove(ev);
        }

        public async Task<IEnumerable<Event>> GetAllAsync()
        {
            return await _context.Events
                .Include(e => e.Prizes)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Event?> GetByIdAsync(string eventId)
        {
            return await _context.Events
                .Include(e => e.Prizes)
                .FirstOrDefaultAsync(e => e.EventId == eventId);
        }

        public async Task<IEnumerable<Event>> GetActiveAsync()
        {
            var now = DateTime.UtcNow;
            return await _context.Events
                .Include(e => e.Prizes)
                .Where(e => e.IsActive && e.Info.EventDate >= now)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetUpcomingAsync(DateTime from)
        {
            return await _context.Events
                .Include(e => e.Prizes)
                .Where(e => e.Info.EventDate >= from && e.IsActive)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetPastAsync(DateTime to)
        {
            return await _context.Events
                .Include(e => e.Prizes)
                .Where(e => e.Info.EventDate < to)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<IEnumerable<Event>> GetExpiredButNotProcessedAsync(DateTime now)
        {
            return await _context.Events
                .Include(e => e.Prizes)
                .Where(e => e.Info.EventDate < now && e.IsActive && !e.Status.IsCompleted)
                .ToListAsync();
        }

        public async Task UpdateAsync(Event ev)
        {
            _context.Events.Update(ev);
        }
    }
}