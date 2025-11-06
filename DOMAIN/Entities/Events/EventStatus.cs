using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace WIN.AGDATA.WIN.Domain.Entities.Events;

public class EventStatus
{
    [Required]
    public bool IsActive { get; private set; }

    [Required]
    public bool IsCompleted { get; private set; }

    public DateTime? CompletedAt { get; private set; }

    [StringLength(255)]
    public string? DeactivationReason { get; private set; }

    public DateTime? DeactivatedAt { get; private set; }

    [Required]
    public DateTime CreatedAt { get; private set; }

    public List<Winner> Winners { get; private set; } = new();

    public bool CanBeModified => IsActive && !IsCompleted;

    public EventStatus()
    {
        IsActive = true;
        IsCompleted = false;
        CreatedAt = DateTime.UtcNow;
    }

    public void Complete(List<Winner> winners)
    {
        if (!IsActive)
            throw new DomainException("Cannot complete inactive event");

        if (IsCompleted)
            throw new DomainException("Event already completed");

        if (winners == null || !winners.Any())
            throw new DomainException("At least one winner is required");

        Winners = winners;
        IsCompleted = true;
        CompletedAt = DateTime.UtcNow;
    }

    public void Deactivate(string reason)
    {
        if (!IsActive)
            throw new DomainException("Event already inactive");

        IsActive = false;
        DeactivationReason = reason;
        DeactivatedAt = DateTime.UtcNow;
    }

    public void Reactivate()
    {
        if (IsCompleted)
            throw new DomainException("Cannot reactivate completed event");

        IsActive = true;
        DeactivationReason = null;
        DeactivatedAt = null;
    }

    public override string? ToString() => $"Status: {(IsActive ? "Active" : "Inactive")}, Completed: {IsCompleted}";



}
