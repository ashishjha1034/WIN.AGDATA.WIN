using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Infrastructure.Repositories;

namespace WIN.AGDATA.WIN.Application.Services;

public class EventService : IEventService
{
    private readonly IEventRepository _eventRepository;
    private readonly IUserRepository _userRepository;
    private readonly IPointsService _pointsService;
    private readonly ILogger<EventService> _logger;

    public EventService(
        IEventRepository eventRepository,
        IUserRepository userRepository,
        IPointsService pointsService,
        ILogger<EventService> logger)
    {
        _eventRepository = eventRepository ?? throw new ArgumentNullException(nameof(eventRepository));
        _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        _pointsService = pointsService ?? throw new ArgumentNullException(nameof(pointsService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public Event CreateEvent(string eventId, string name, string description, DateTime eventDate, List<PrizeTier> prizes)
    {
        try
        {
            if (_eventRepository.ExistsById(eventId))
                throw new DomainException($"Event with ID '{eventId}' already exists");

            var @event = new Event(eventId, name, description, eventDate, prizes, "SYSTEM");
            _eventRepository.Add(@event);

            _logger.LogInformation($"Event created: {eventId}");
            return @event;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error creating event: {eventId}");
            throw;
        }
    }

    public Event? GetEventById(string eventId)
    {
        try
        {
            return _eventRepository.GetById(eventId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error retrieving event: {eventId}");
            throw;
        }
    }

    public List<Event> GetAllEvents()
    {
        try
        {
            return _eventRepository.GetAll();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving all events");
            throw;
        }
    }

    public List<Event> GetActiveEvents()
    {
        try
        {
            return _eventRepository.GetAll().Where(e => e.Status.IsActive && !e.Status.IsCompleted).ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving active events");
            throw;
        }
    }

    public List<Event> GetUpcomingEvents()
    {
        try
        {
            return _eventRepository.GetAll().Where(e => e.Info.IsUpcoming && e.Status.IsActive).ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving upcoming events");
            throw;
        }
    }

    // Renamed: returns events that are active but not upcoming (past or ongoing as per previous logic)
    public List<Event> GetPastEvents()
    {
        try
        {
            return _eventRepository.GetAll().Where(e => !e.Info.IsUpcoming && e.Status.IsActive).ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving past events");
            throw;
        }
    }

    public void CompleteEvent(string eventId, List<Winner> winners)
    {
        try
        {
            var @event = _eventRepository.GetById(eventId);
            if (@event == null)
                throw new DomainException($"Event not found: {eventId}");

            foreach (var winner in winners)
            {
                var user = _userRepository.GetByEmployeeId(winner.EmployeeId);
                if (user == null)
                    throw new DomainException($"User not found: {winner.EmployeeId}");

                if (!user.CanParticipateInEvents())
                    throw new DomainException($"User {winner.EmployeeId} cannot participate in events");
            }

            @event.CompleteEvent(winners);

            foreach (var winner in winners)
            {
                var pointsForRank = @event.GetPointsForRank(winner.Rank);
                if (pointsForRank.HasValue)
                {
                    _pointsService.AddPointsToUser(winner.EmployeeId, pointsForRank.Value, $"Won event {eventId}", eventId);
                }
            }

            _eventRepository.Update(@event);
            _logger.LogInformation($"Event completed: {eventId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error completing event: {eventId}");
            throw;
        }
    }

    public void ProcessExpiredEvents()
    {
        try
        {
            var expiredEvents = _eventRepository.GetAll()
                .Where(e => e.Info.EventDate < DateTime.UtcNow && e.Status.IsActive && !e.Status.IsCompleted)
                .ToList();

            foreach (var @event in expiredEvents)
            {
                @event.Deactivate("SYSTEM - Auto-deactivated expired event", "SYSTEM");
                _eventRepository.Update(@event);
            }

            _logger.LogInformation($"Processed {expiredEvents.Count} expired events");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing expired events");
            throw;
        }
    }

    public void DeactivateEvent(string eventId, string reason)
    {
        try
        {
            var @event = _eventRepository.GetById(eventId);
            if (@event == null)
                throw new DomainException($"Event not found: {eventId}");

            @event.Deactivate(reason, "SYSTEM");
            _eventRepository.Update(@event);

            _logger.LogInformation($"Event deactivated: {eventId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error deactivating event: {eventId}");
            throw;
        }
    }

    public void ReactivateEvent(string eventId)
    {
        try
        {
            var @event = _eventRepository.GetById(eventId); ;
            if (@event == null)
                throw new DomainException($"Event not found: {eventId}");

            @event.Activate("SYSTEM");
            _eventRepository.Update(@event);

            _logger.LogInformation($"Event reactivated: {eventId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error reactivating event: {eventId}");
            throw;
        }
    }

    public void AddPrizeTier(string eventId, PrizeTier prizeTier)
    {
        try
        {
            var @event = _eventRepository.GetById(eventId);
            if (@event == null)
                throw new DomainException($"Event not found: {eventId}");

            @event.AddPrizeTier(prizeTier);
            _eventRepository.Update(@event);

            _logger.LogInformation($"Prize tier added to event: {eventId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error adding prize tier to event: {eventId}");
            throw;
        }
    }
}
