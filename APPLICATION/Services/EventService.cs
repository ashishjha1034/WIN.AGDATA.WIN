using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN_AGDATA_WIN.Application.Interfaces;
using WIN_AGDATA_WIN.Domain.Entities.Events;



namespace WIN_AGDATA_WIN.Application.Services
{
    public class EventService : IEventService
    {
        private readonly List<Event> _events = new();
        private readonly object _lock = new object();

        public Event CreateEvent(string name, string description, DateTime eventDate, List<PrizeTier> prizeTiers)
        {
            lock (_lock)
            {
                // Generate simple event ID like "EVT001", "EVT002", etc.
                var eventId = GenerateEventId();
                var eventObj = new Event(eventId, name, description, eventDate, prizeTiers);
                _events.Add(eventObj);
                return eventObj;
            }
        }

        public Event? GetEvent(string eventId)  // Changed from Guid to string
        {
            lock (_lock)
                return _events.FirstOrDefault(e =>
                    string.Equals(e.EventId, eventId, StringComparison.OrdinalIgnoreCase));
        }

        public List<Event> GetAllEvents()
        {
            lock (_lock)
                return _events.ToList();
        }

        public void AddPrizeTier(string eventId, PrizeTier prizeTier)  // Changed from Guid to string
        {
            lock (_lock)
            {
                var eventObj = GetEvent(eventId)
                    ?? throw new DomainException($"Event with ID {eventId} not found");
                eventObj.AddPrizeTier(prizeTier);
            }
        }

        public void CompleteEvent(string eventId, List<Winner> winners)  // Changed from Guid to string
        {
            lock (_lock)
            {
                var eventObj = GetEvent(eventId)
                    ?? throw new DomainException($"Event with ID {eventId} not found");
                eventObj.CompleteEvent(winners);
            }
        }

        private string GenerateEventId()
        {
            var nextNumber = _events.Count + 1;
            return $"EVT{nextNumber:D3}";  // EVT001, EVT002, etc.
        }
    }
}