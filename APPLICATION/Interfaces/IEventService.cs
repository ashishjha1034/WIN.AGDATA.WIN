namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IEventService
{
    Event CreateEvent(string eventId, string name, string description, DateTime eventDate, List<PrizeTier> prizes);
    Event? GetEventById(string eventId);
    List<Event> GetAllEvents();
    List<Event> GetActiveEvents();
    List<Event> GetUpcomingEvents();
    List<Event> GetDowncomingEvents();
    void CompleteEvent(string eventId, List<Winner> winners);
    void ProcessExpiredEvents();
    void DeactivateEvent(string eventId, string reason);
    void ReactivateEvent(string eventId);
    void AddPrizeTier(string eventId, PrizeTier prizeTier);
}
