using System.Reflection;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN_AGDATA_WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IEventService
{
    Event CreateEvent(string eventId, string name, string description, DateTime eventDate, List<EventPrizeTier> prizes);
    Event? GetEventById(string eventId);
    List<Event> GetAllEvents();
    List<Event> GetActiveEvents();
    List<Event> GetUpcomingEvents();

    void CompleteEvent(string eventId, List<EventWinner> winners);
    void DeactivateEvent(string eventId, string reason = "Manual deactivation");
    void ReactivateEvent(string eventId);
    void AddPrizeTier(string eventId, EventPrizeTier prizeTier);

    void ProcessExpiredEvents();
}
