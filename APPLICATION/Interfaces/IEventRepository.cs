using WIN_AGDATA_WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public interface IEventRepository
{
    void Add(Event eventObj);
    void Update(Event eventObj);
    void Delete(string eventId);

    Event? GetById(string eventId);
    List<Event> GetAll();
    List<Event> GetActiveEvents();
    List<Event> GetCompletedEvents();
    List<Event> GetUpcomingEvents();
    List<Event> GetRecentEvents();

    bool ExistsById(string eventId);
}
