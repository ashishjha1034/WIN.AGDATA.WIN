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

    public async Task<IReadOnlyList<Event>> GetRecentEventsAsync(int count = 5) =>
        await _context.Events
            .OrderByDescending(e => e.EventDate)
            .Take(count)
            .ToListAsync();

    public async Task<bool> IsUserRegisteredForEventAsync(Guid eventId, Guid userId) =>
        await _context.EventParticipants
            .AnyAsync(ep => ep.EventId == eventId && ep.UserId == userId);

    public async Task AddParticipantAsync(Guid eventId, Guid userId)
    {
        // Check if already registered
        var exists = await IsUserRegisteredForEventAsync(eventId, userId);
        if (exists)
            throw new InvalidOperationException("You are already registered for this event");

        // Create and add participant directly without loading event
        var participant = new EventParticipant(eventId, userId);
        _context.EventParticipants.Add(participant);
        await _context.SaveChangesAsync();
    }

    public async Task<IReadOnlyList<Event>> GetUserEventsAsync(Guid userId) =>
        await _context.Events
            .Include(e => e.Participants)
            .Where(e => e.Participants.Any(p => p.UserId == userId))
            .ToListAsync();

    public async Task UpdateAsync(Event @event)
    {
        _dbSet.Update(@event);
    }
}
