using System;
using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.Domain.Entities.Events;

public class EventInfo
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Name { get; private set; }

    [Required]
    [StringLength(500, MinimumLength = 10)]
    public string Description { get; private set; }

    [Required]
    public DateTime EventDate { get; private set; }

    [Required]
    public DateTime CreatedAt { get; private set; }

    public bool IsUpcoming => EventDate > DateTime.UtcNow;

    public bool IsRecent => EventDate >= DateTime.UtcNow.AddDays(-30);

    public bool IsCurrent => EventDate.Date == DateTime.UtcNow.Date;

    private EventInfo() { }

    public EventInfo(string name, string description, DateTime eventDate)
    {
        // Use ValidationGuards instead of custom methods
        Name = ValidationGuards.ValidateAndNormalizeName(name, "Event name", 3, 100);
        Description = ValidationGuards.ValidateAndNormalizeDescription(description, 10, 500);

        // Validate date is in future
        ValidationGuards.ValidateFutureDate(eventDate, "Event date");

        EventDate = eventDate;
        CreatedAt = DateTime.UtcNow;
    }

    public override string? ToString() => $"{Name} on {EventDate:yyyy-MM-dd}";
}
