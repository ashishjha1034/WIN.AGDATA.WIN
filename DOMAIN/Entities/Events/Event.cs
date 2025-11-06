using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace WIN.AGDATA.WIN.Domain.Entities.Events;

public class Event
{
    [Key]
    [StringLength(20)]
    [Required]
    public string EventId { get; private set; }

    [Required]
    public EventInfo Info { get; private set; }

    [Required]
    public EventStatus Status { get; private set; }

    [Required]
    public List<PrizeTier> Prizes { get; private set; } = new();

    [Required]
    public DateTime CreatedAt { get; private set; }

    [Required]
    [StringLength(50)]
    public string CreatedBy { get; private set; }

    public DateTime? LastModifiedAt { get; private set; }

    [StringLength(50)]
    public string? LastModifiedBy { get; private set; }

    private Event() { }

    public Event(string eventId, string name, string description, DateTime eventDate, List<PrizeTier> prizes, string createdBy = "SYSTEM")
    {
        EventId = ValidationGuards.ValidateAndNormalizeId(eventId, "Event ID");
        Info = new EventInfo(name, description, eventDate);
        Status = new EventStatus();
        Prizes = prizes ?? new List<PrizeTier>();
        CreatedAt = DateTime.UtcNow;
        CreatedBy = createdBy;

        if (!Prizes.Any())
            throw new DomainException("At least one prize tier is required");

        ValidatePrizesUnique();
    }

    public void CompleteEvent(List<Winner> winners)
    {
        if (!Status.IsActive)
            throw new DomainException("Cannot complete inactive event");

        if (winners == null || !winners.Any())
            throw new DomainException("At least one winner is required");

        Status.Complete(winners);
        UpdateModificationInfo("SYSTEM");
    }

    public void AddPrizeTier(PrizeTier prizeTier)
    {
        if (!Status.CanBeModified)
            throw new DomainException("Cannot modify inactive or completed event");

        if (Prizes.Any(p => p.Rank == prizeTier.Rank))
            throw new DomainException($"Prize tier for rank {prizeTier.Rank} already exists");

        Prizes.Add(prizeTier);
        UpdateModificationInfo("SYSTEM");
    }

    public int? GetPointsForRank(int rank) => Prizes.FirstOrDefault(p => p.Rank == rank)?.Points;

    public void Deactivate(string reason, string modifiedBy = "SYSTEM")
    {
        Status.Deactivate(reason);
        UpdateModificationInfo(modifiedBy);
    }

    public void Activate(string modifiedBy = "SYSTEM")
    {
        Status.Reactivate();
        UpdateModificationInfo(modifiedBy);
    }

    private void ValidatePrizesUnique()
    {
        var ranks = Prizes.Select(p => p.Rank).ToList();
        if (ranks.Distinct().Count() != ranks.Count)
            throw new DomainException("Duplicate prize ranks found");
    }

    private void UpdateModificationInfo(string modifiedBy)
    {
        LastModifiedAt = DateTime.UtcNow;
        LastModifiedBy = modifiedBy;
    }

    public override string? ToString() => $"Event: {EventId} - {Info.Name}";
}
