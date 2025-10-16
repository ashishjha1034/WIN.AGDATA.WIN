using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Infrastructure.Repositories;
using WIN_AGDATA_WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.Application.Services;


public class EventService : IEventService
{
    private readonly IEventRepository _eventRepository;
    private readonly IUserRepository _userRepository;
    private readonly IPointsManagementService _pointsService;
    private readonly ILogger<EventService> _logger;

    public EventService(
        IEventRepository eventRepository,
        IUserRepository userRepository,
        IPointsManagementService pointsService,
        ILogger<EventService> logger)
    {
        _eventRepository = eventRepository ?? throw new ArgumentNullException(nameof(eventRepository));
        _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        _pointsService = pointsService ?? throw new ArgumentNullException(nameof(pointsService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public Event CreateEvent(string eventId, string name, string description, DateTime eventDate, List<EventPrizeTier> prizes)
    {
        try
        {
            if (_eventRepository.ExistsById(eventId))
                throw new DomainException($"Event with ID '{eventId}' already exists");

            var eventObj = new Event(eventId, name, description, eventDate, prizes);
            _eventRepository.Add(eventObj);

            _logger.LogInformation("Event created successfully: {EventId}", eventId);
            return eventObj;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create event: {EventId}", eventId);
            throw;
        }
    }

    public Event? GetEventById(string eventId)
    {
        return _eventRepository.GetById(eventId);
    }

    public List<Event> GetAllEvents()
    {
        return _eventRepository.GetAll();
    }

    public List<Event> GetActiveEvents()
    {
        return _eventRepository.GetActiveEvents();
    }

    public List<Event> GetUpcomingEvents()
    {
        return _eventRepository.GetUpcomingEvents();
    }

    public void CompleteEvent(string eventId, List<EventWinner> winners)
    {
        try
        {
            var eventObj = GetEventOrThrow(eventId);

            ValidateEventCompletion(eventObj, winners);

            eventObj.CompleteEvent(winners);
            _eventRepository.Update(eventObj);

            AwardPointsToWinners(eventObj, winners);

            _logger.LogInformation("Event completed successfully: {EventId} with {WinnerCount} winners", eventId, winners.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to complete event: {EventId}", eventId);
            throw;
        }
    }

    public void DeactivateEvent(string eventId, string reason = "Manual deactivation")
    {
        try
        {
            var eventObj = GetEventOrThrow(eventId);
            eventObj.Status.Deactivate(reason);
            _eventRepository.Update(eventObj);

            _logger.LogInformation("Event deactivated: {EventId} - {Reason}", eventId, reason);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to deactivate event: {EventId}", eventId);
            throw;
        }
    }

    public void ReactivateEvent(string eventId)
    {
        try
        {
            var eventObj = GetEventOrThrow(eventId);
            eventObj.Status.Reactivate();
            _eventRepository.Update(eventObj);

            _logger.LogInformation("Event reactivated: {EventId}", eventId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to reactivate event: {EventId}", eventId);
            throw;
        }
    }

    public void AddPrizeTier(string eventId, EventPrizeTier prizeTier)
    {
        try
        {
            var eventObj = GetEventOrThrow(eventId);

            if (!eventObj.Status.CanBeModified)
                throw new DomainException("Cannot modify inactive or completed event");

            eventObj.AddPrizeTier(prizeTier);
            _eventRepository.Update(eventObj);

            _logger.LogInformation("Prize tier added to event {EventId}: Rank {Rank} - {Points} points", eventId, prizeTier.Rank, prizeTier.Points);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to add prize tier to event: {EventId}", eventId);
            throw;
        }
    }

    public void ProcessExpiredEvents()
    {
        try
        {
            var activeEvents = _eventRepository.GetActiveEvents();
            var expiredCount = 0;

            foreach (var eventObj in activeEvents)
            {
                eventObj.Status.AutoDeactivateIfExpired(eventObj.Info.EventDate);
                if (!eventObj.Status.IsActive)
                {
                    _eventRepository.Update(eventObj);
                    expiredCount++;
                }
            }

            if (expiredCount > 0)
                _logger.LogInformation("Auto-deactivated {ExpiredCount} expired events", expiredCount);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to process expired events");
            throw;
        }
    }

    private void ValidateEventCompletion(Event eventObj, List<EventWinner> winners)
    {
        if (!eventObj.Status.CanBeModified)
            throw new DomainException("Cannot complete inactive or completed event");

        foreach (var winner in winners)
        {
            var user = _userRepository.GetByEmployeeId(winner.EmployeeId);
            if (user == null)
                throw new DomainException($"Winner user not found: {winner.EmployeeId}");

            if (!user.CanParticipateInEvents)
                throw new DomainException($"User {winner.EmployeeId} cannot participate in events");
        }
    }

    private void AwardPointsToWinners(Event eventObj, List<EventWinner> winners)
    {
        foreach (var winner in winners)
        {
            var points = eventObj.GetPointsForRank(winner.Rank);
            if (points.HasValue)
            {
                _pointsService.AddPointsToUser(
                    winner.EmployeeId,
                    points.Value,
                    $"Won {winner.Rank} place in event {eventObj.EventId}",
                    eventObj.EventId);
            }
        }
    }

    private Event GetEventOrThrow(string eventId)
    {
        var eventObj = _eventRepository.GetById(eventId);
        if (eventObj == null)
            throw new DomainException($"Event not found: {eventId}");

        return eventObj;
    }
}
