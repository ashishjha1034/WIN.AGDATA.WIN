using System.Reflection;

namespace WIN.AGDATA.WIN.Domain.Entities.Events;

public class EventStatus
{
    public bool IsActive { get; private set; }
    public bool IsCompleted { get; private set; }
    public List<EventWinner> Winners { get; private set; } = new();
    public DateTime CreatedAt { get; }
    public DateTime? CompletedAt { get; private set; }
    public DateTime? DeactivatedAt { get; private set; }
    public string? DeactivationReason { get; private set; }

    public EventStatus()
    {
        IsActive = true;
        IsCompleted = false;
        CreatedAt = DateTime.UtcNow;
    }

    public void Deactivate(string reason = "Manual deactivation")
    {
        if (!IsActive)
            throw new DomainException("Event is already inactive");

        if (IsCompleted)
            throw new DomainException("Cannot deactivate completed event");

        IsActive = false;
        DeactivatedAt = DateTime.UtcNow;
        DeactivationReason = reason?.Trim() ?? "Manual deactivation";
    }

    public void Reactivate()
    {
        if (IsActive)
            throw new DomainException("Event is already active");

        if (IsCompleted)
            throw new DomainException("Cannot reactivate completed event");

        IsActive = true;
        DeactivatedAt = null;
        DeactivationReason = null;
    }

    public void Complete(List<EventWinner> winners)
    {
        if (!IsActive)
            throw new DomainException("Cannot complete inactive event");

        if (IsCompleted)
            throw new DomainException("Event is already completed");

        if (winners == null || !winners.Any())
            throw new DomainException("At least one winner required");

        Winners = winners.ToList();
        IsCompleted = true;
        CompletedAt = DateTime.UtcNow;
        IsActive = false;
    }

    public void AutoDeactivateIfExpired(DateTime eventDate)
    {
        if (!IsActive || IsCompleted) return;

        if (eventDate < DateTime.UtcNow.AddDays(-30))
        {
            Deactivate("Auto-deactivated: Event expired");
        }
    }

    public bool CanAcceptParticipants => IsActive && !IsCompleted;
    public bool CanBeModified => IsActive && !IsCompleted;
}
