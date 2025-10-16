namespace WIN.AGDATA.WIN.Domain.Entities.Events;

public class EventInfo
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Name { get; private set; }

    [Required]
    [StringLength(500, MinimumLength = 10)]
    public string Description { get; private set; }

    public DateTime EventDate { get; private set; }
    public DateTime CreatedAt { get; }

    public bool IsUpcoming => EventDate > DateTime.UtcNow;
    public bool IsRecent => EventDate >= DateTime.UtcNow.AddDays(-30);
    public bool IsCurrent => EventDate.Date == DateTime.UtcNow.Date;

    public EventInfo(string name, string description, DateTime eventDate)
    {
        Name = ValidateAndNormalizeName(name);
        Description = ValidateAndNormalizeDescription(description);
        EventDate = ValidateEventDate(eventDate);
        CreatedAt = DateTime.UtcNow;
    }

    public void UpdateDetails(string name, string description, DateTime eventDate)
    {
        Name = ValidateAndNormalizeName(name);
        Description = ValidateAndNormalizeDescription(description);
        EventDate = ValidateEventDate(eventDate);
    }

    private static string ValidateAndNormalizeName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new DomainException("Event name is required");

        var normalized = name.Trim();
        if (normalized.Length < 3 || normalized.Length > 100)
            throw new DomainException("Event name must be between 3 and 100 characters");

        return normalized;
    }

    private static string ValidateAndNormalizeDescription(string description)
    {
        if (string.IsNullOrWhiteSpace(description))
            throw new DomainException("Event description is required");

        var normalized = description.Trim();
        if (normalized.Length < 10 || normalized.Length > 500)
            throw new DomainException("Event description must be between 10 and 500 characters");

        return normalized;
    }

    private static DateTime ValidateEventDate(DateTime eventDate)
    {
        if (eventDate > DateTime.UtcNow.AddYears(2))
            throw new DomainException("Event date cannot be more than 2 years in future");

        if (eventDate < DateTime.UtcNow.AddYears(-1))
            throw new DomainException("Event date cannot be more than 1 year in the past");

        return eventDate;
    }
}
