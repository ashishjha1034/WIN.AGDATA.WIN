using Microsoft.EntityFrameworkCore;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public class EventRepository : Repository<Event>, IEventRepository
{
    public EventRepository(ApplicationDbContext context) : base(context) { }

    public override async Task<IReadOnlyList<Event>> GetAllAsync() =>
        await _context.Events
            .Include(e => e.Participants)
            .OrderByDescending(e => e.EventDate)
            .ToListAsync();

    public async Task<Event?> GetByIdWithParticipantsAsync(Guid id) =>
        await _context.Events
            .Include(e => e.Participants)
                .ThenInclude(p => p.User)
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
        await _context.SaveChangesAsync();
    }

    /// <summary>
    /// Get user event registration statistics for deactivation checks.
    /// Returns count of active (Draft/Active) and completed events.
    /// </summary>
    public async Task<(int ActiveEventRegistrations, int CompletedEventCount)> GetUserEventRegistrationStatsAsync(Guid userId)
    {
        var stats = await _context.EventParticipants
            .Where(ep => ep.UserId == userId)
            .Include(ep => ep.Event)
            .GroupBy(_ => true)
            .Select(g => new
            {
                ActiveCount = g.Count(ep => 
                    ep.Event.Status == Domain.Enums.EventStatus.Draft || 
                    ep.Event.Status == Domain.Enums.EventStatus.Active),
                CompletedCount = g.Count(ep => ep.Event.Status == Domain.Enums.EventStatus.Completed)
            })
            .FirstOrDefaultAsync();

        return (
            ActiveEventRegistrations: stats?.ActiveCount ?? 0,
            CompletedEventCount: stats?.CompletedCount ?? 0
        );
    }

    /// <inheritdoc />
    public async Task<bool> ExistsByNameAsync(string name, Guid? excludeEventId = null)
    {
        if (string.IsNullOrWhiteSpace(name))
            return false;

        var normalizedName = name.Trim().ToLowerInvariant();
        
        var query = _context.Events.Where(e => e.Name.ToLower() == normalizedName);
        
        if (excludeEventId.HasValue)
        {
            query = query.Where(e => e.Id != excludeEventId.Value);
        }
        
        return await query.AnyAsync();
    }

    /// <inheritdoc />
    public async Task<int> GetTotalEventRegistrationsAsync()
    {
        return await _context.EventParticipants.CountAsync();
    }

    /// <inheritdoc />
    public async Task SaveChangesAsync(CancellationToken ct = default)
    {
        await _context.SaveChangesAsync(ct);
    }
}
