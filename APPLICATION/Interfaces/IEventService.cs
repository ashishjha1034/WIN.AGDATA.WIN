using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IEventService
{
    Task<Event> CreateEventAsync(string eventId, string name, string description, DateTime eventDate, List<PrizeTier> prizes, string createdBy = "SYSTEM");
    Task<Event?> GetEventByIdAsync(string eventId);
    Task<List<Event>> GetAllEventsAsync();
    Task<List<Event>> GetActiveEventsAsync();
    Task<List<Event>> GetUpcomingEventsAsync();
    Task<List<Event>> GetPastEventsAsync();
    Task CompleteEventAsync(string eventId, List<Winner> winners, string completedBy = "SYSTEM");
    Task ProcessExpiredEventsAsync();
    Task DeactivateEventAsync(string eventId, string reason, string performedBy = "SYSTEM");
    Task ReactivateEventAsync(string eventId, string performedBy = "SYSTEM");
    Task AddPrizeTierAsync(string eventId, PrizeTier prizeTier, string createdBy = "SYSTEM");
}