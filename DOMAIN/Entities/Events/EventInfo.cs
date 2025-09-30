using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Events
{
    public class EventInfo
    {
        public string Name { get; private set; }
        public string Description { get; private set; }
        public DateTime EventDate { get; private set; }
        public DateTime CreatedAt { get; }
        public DateTime Date { get; set; }

        public EventInfo(string name, string description, DateTime eventDate)
        {
            ValidateName(name);
            ValidateDescription(description);
            ValidateEventDate(eventDate);

            Name = name.Trim();
            Description = description.Trim();
            EventDate = eventDate;
            CreatedAt = DateTime.UtcNow;
        }

        public void UpdateDetails(string name, string description, DateTime eventDate)
        {
            ValidateName(name);
            ValidateDescription(description);
            ValidateEventDate(eventDate);

            Name = name.Trim();
            Description = description.Trim();
            EventDate = eventDate;
        }

        public bool IsRecent() => EventDate >= DateTime.UtcNow.AddDays(-30);

        private void ValidateName(string name)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new DomainException("Event name is required");
            if (name.Trim().Length < 3)
                throw new DomainException("Event name must be at least 3 characters");
        }

        private void ValidateDescription(string description)
        {
            if (string.IsNullOrWhiteSpace(description))
                throw new DomainException("Event description is required");
            if (description.Trim().Length < 10)
                throw new DomainException("Event description must be at least 10 characters");
        }

        private void ValidateEventDate(DateTime eventDate)
        {
            if (eventDate > DateTime.UtcNow.AddYears(1))
                throw new DomainException("Event date cannot be more than 1 year in future");
        }
    }
}