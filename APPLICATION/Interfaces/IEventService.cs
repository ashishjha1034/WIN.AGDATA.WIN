using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN_AGDATA_WIN.Domain.Entities.Events;

namespace WIN_AGDATA_WIN.Application.Interfaces
{
    public interface IEventService
    {
        Event CreateEvent(string name, string description, DateTime eventDate, List<PrizeTier> prizeTiers);
        Event? GetEvent(string eventId);  // Changed from Guid to string
        List<Event> GetAllEvents();
        void AddPrizeTier(string eventId, PrizeTier prizeTier);  // Changed from Guid to string
        void CompleteEvent(string eventId, List<Winner> winners);  // Changed from Guid to string
    }
}