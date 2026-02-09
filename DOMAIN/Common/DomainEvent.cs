namespace WIN.AGDATA.WIN.Domain.Common;

/// <summary>
/// Base class for all domain events. Domain events represent significant 
/// state transitions or business occurrences within aggregates.
/// </summary>
public abstract record DomainEvent
{
    /// <summary>
    /// Unique identifier for this domain event instance.
    /// </summary>
    public Guid EventId { get; } = Guid.NewGuid();

    /// <summary>
    /// UTC timestamp when this event occurred.
    /// </summary>
    public DateTime OccurredOnUtc { get; } = DateTime.UtcNow;
}
