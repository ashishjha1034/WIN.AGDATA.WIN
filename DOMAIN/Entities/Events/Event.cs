using System.Reflection;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN_AGDATA_WIN.Domain.Entities.Events
{
    public class Event
    {
        public string EventId { get; }  // Simple string ID like EmployeeId
        public WIN.AGDATA.WIN.Domain.Entities.Events.EventInfo Info { get; }
        public PrizePool Prizes { get; }
        public EventStatus Status { get; }

        public Event(string eventId, string name, string description, DateTime eventDate, List<PrizeTier> prizeTiers)
        {
            ValidateEventId(eventId);

            EventId = eventId.Trim().ToUpper();
            Info = new WIN.AGDATA.WIN.Domain.Entities.Events.EventInfo(name, description, eventDate);
            Prizes = new PrizePool(prizeTiers);
            Status = new EventStatus();
        }

        // Simple delegation methods
        public void AddPrizeTier(PrizeTier tier) => Prizes.AddTier(tier);
        public void RemovePrizeTier(int rank) => Prizes.RemoveTier(rank);
        public void CompleteEvent(List<Winner> winners) => Status.Complete(winners, Prizes);

        public bool CanAllocatePoints() => Status.IsActive && Info.IsRecent();
        public int? GetPointsForRank(int rank) => Prizes.GetPoints(rank);

        private void ValidateEventId(string eventId)
        {
            if (string.IsNullOrWhiteSpace(eventId))
                throw new DomainException("Event ID is required");

            if (eventId.Trim().Length < 3)
                throw new DomainException("Event ID must be at least 3 characters");
        }

        public override bool Equals(object obj)
        {
            return obj is Event eventObj && EventId == eventObj.EventId;
        }

        public override int GetHashCode() => EventId.GetHashCode();
    }
}