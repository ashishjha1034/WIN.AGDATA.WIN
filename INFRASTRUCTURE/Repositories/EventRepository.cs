using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.Infrastructure.Data;
using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public class EventRepository : IEventRepository
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<EventRepository> _logger;

    public EventRepository(ApplicationDbContext context, ILogger<EventRepository> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public void Add(Event eventObj)
    {
        try
        {
            _context.Events.Add(eventObj);
            _context.SaveChanges();
            _logger.LogInformation("Event added successfully: {EventId}", eventObj.EventId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to add event: {EventId}", eventObj.EventId);
            throw;
        }
    }

    public void Update(Event eventObj)
    {
        try
        {
            _context.Events.Update(eventObj);
            _context.SaveChanges();
            _logger.LogInformation("Event updated successfully: {EventId}", eventObj.EventId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to update event: {EventId}", eventObj.EventId);
            throw;
        }
    }

    public void Delete(string eventId)
    {
        try
        {
            var eventObj = GetById(eventId);
            if (eventObj != null)
            {
                _context.Events.Remove(eventObj);
                _context.SaveChanges();
                _logger.LogInformation("Event deleted successfully: {EventId}", eventId);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to delete event: {EventId}", eventId);
            throw;
        }
    }

    public Event? GetById(string eventId)
    {
        return _context.Events
            .FirstOrDefault(e => e.EventId == eventId.Trim().ToUpper());
    }

    public List<Event> GetAll()
    {
        return _context.Events.ToList();
    }

    public List<Event> GetActiveEvents()
    {
        return _context.Events
            .Where(e => e.Status.IsActive)
            .ToList();
    }

    public List<Event> GetCompletedEvents()
    {
        return _context.Events
            .Where(e => e.Status.IsCompleted)
            .ToList();
    }

    public List<Event> GetUpcomingEvents()
    {
        return _context.Events
            .Where(e => e.Info.IsUpcoming && e.Status.IsActive)
            .ToList();
    }

    public List<Event> GetRecentEvents()
    {
        return _context.Events
            .Where(e => e.Info.IsRecent)
            .ToList();
    }

    public bool ExistsById(string eventId)
    {
        return _context.Events
            .Any(e => e.EventId == eventId.Trim().ToUpper());
    }
}
