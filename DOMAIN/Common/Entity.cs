using System;

namespace WIN.AGDATA.WIN.Domain.Common;

public abstract class Entity<TId> where TId : notnull
{
    private readonly List<DomainEvent> _domainEvents = new();

    public TId Id { get; protected set; } = default!;

    public DateTime CreatedAt { get; protected set; }
    public Guid? CreatedBy { get; protected set; }
    public DateTime? UpdatedAt { get; protected set; }
    public Guid? UpdatedBy { get; protected set; }

    /// <summary>
    /// Domain events that have been raised by this entity but not yet published.
    /// </summary>
    public IReadOnlyCollection<DomainEvent> DomainEvents => _domainEvents.AsReadOnly();

    protected Entity() { } // EF needs parameterless ctor

    protected Entity(TId id)
    {
        Id = id;
        CreatedAt = DateTime.UtcNow;
        UpdatedAt = DateTime.UtcNow; // Initialize UpdatedAt to avoid NULL constraint violation
    }

    /// <summary>
    /// Raises a domain event by adding it to the entity's event collection.
    /// Events will be published when the aggregate is persisted.
    /// </summary>
    protected void RaiseDomainEvent(DomainEvent domainEvent)
    {
        _domainEvents.Add(domainEvent);
    }

    /// <summary>
    /// Clears all pending domain events. Called after events have been published.
    /// </summary>
    public void ClearDomainEvents()
    {
        _domainEvents.Clear();
    }

    public void SetCreator(Guid userId)
    {
        CreatedBy = userId;
        CreatedAt = DateTime.UtcNow;
    }

    public void SetUpdater(Guid userId)
    {
        UpdatedBy = userId;
        UpdatedAt = DateTime.UtcNow;
    }
}