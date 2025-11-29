using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Exceptions;
using Microsoft.Extensions.Logging;

namespace WIN.AGDATA.WIN.Application.Services
{
    public class EventService : IEventService
    {
        private readonly IEventRepository _eventRepository;
        private readonly IUnitOfWork _uow;
        private readonly ILogger<EventService> _logger;

        public EventService(IEventRepository eventRepository, IUnitOfWork uow, ILogger<EventService> logger)
        {
            _eventRepository = eventRepository ?? throw new ArgumentNullException(nameof(eventRepository));
            _uow = uow ?? throw new ArgumentNullException(nameof(uow));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<Event> CreateEventAsync(string eventId, string name, string description, DateTime eventDate, List<PrizeTier> prizes, string createdBy = "SYSTEM")
        {
            var ev = new Event(eventId, name, description, eventDate, prizes, createdBy);
            await _eventRepository.AddAsync(ev);
            await _uow.SaveChangesAsync();
            _logger.LogInformation("Event created {EventId}", eventId);
            return ev;
        }

        public async Task<Event?> GetEventByIdAsync(string eventId)
        {
            return await _eventRepository.GetByIdAsync(eventId);
        }

        public async Task<List<Event>> GetAllEventsAsync()
        {
            var list = await _eventRepository.GetAllAsync();
            return list.ToList();
        }

        public async Task<List<Event>> GetActiveEventsAsync()
        {
            var list = await _eventRepository.GetActiveAsync();
            return list.ToList();
        }

        public async Task<List<Event>> GetUpcomingEventsAsync()
        {
            var now = DateTime.UtcNow;
            var list = await _eventRepository.GetUpcomingAsync(now);
            return list.ToList();
        }

        public async Task<List<Event>> GetPastEventsAsync()
        {
            var now = DateTime.UtcNow;
            var list = await _eventRepository.GetPastAsync(now);
            return list.ToList();
        }

        public async Task CompleteEventAsync(string eventId, List<Winner> winners, string completedBy = "SYSTEM")
        {
            var ev = await _eventRepository.GetByIdAsync(eventId);
            if (ev == null) throw new DomainException("Event not found");
            ev.CompleteEvent(winners, completedBy);
            await _eventRepository.UpdateAsync(ev);
            await _uow.SaveChangesAsync();
            _logger.LogInformation("Event completed {EventId}", eventId);
        }

        public async Task ProcessExpiredEventsAsync()
        {
            var now = DateTime.UtcNow;
            var expired = await _eventRepository.GetExpiredButNotProcessedAsync(now);
            foreach (var ev in expired)
            {
                try
                {
                    
                    ev.Deactivate("Event expired", "SYSTEM");
                    await _eventRepository.UpdateAsync(ev);
                    _logger.LogInformation("Expired event processed {EventId}", ev.EventId);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error processing expired event {EventId}", ev.EventId);
                }
            }
            await _uow.SaveChangesAsync();
        }

        public async Task DeactivateEventAsync(string eventId, string reason, string performedBy = "SYSTEM")
        {
            var ev = await _eventRepository.GetByIdAsync(eventId);
            if (ev == null) throw new DomainException("Event not found");
            ev.Deactivate(reason, performedBy);
            await _eventRepository.UpdateAsync(ev);
            await _uow.SaveChangesAsync();
            _logger.LogInformation("Event deactivated {EventId}", eventId);
        }

        public async Task ReactivateEventAsync(string eventId, string performedBy = "SYSTEM")
        {
            var ev = await _eventRepository.GetByIdAsync(eventId);
            if (ev == null) throw new DomainException("Event not found");
            ev.Activate(performedBy);
            await _eventRepository.UpdateAsync(ev);
            await _uow.SaveChangesAsync();
            _logger.LogInformation("Event reactivated {EventId}", eventId);
        }

        public async Task AddPrizeTierAsync(string eventId, PrizeTier prizeTier, string createdBy = "SYSTEM")
        {
            var ev = await _eventRepository.GetByIdAsync(eventId);
            if (ev == null) throw new DomainException("Event not found");
            ev.AddPrizeTier(prizeTier, createdBy);
            await _eventRepository.UpdateAsync(ev);
            await _uow.SaveChangesAsync();
            _logger.LogInformation("Prize tier added to event {EventId}", eventId);
        }
    }
}