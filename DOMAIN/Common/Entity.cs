using System;

namespace WIN.AGDATA.WIN.Domain.Common;

public abstract class Entity<TId> where TId : notnull
{
    public TId Id { get; protected set; } = default!;

    public DateTime CreatedAt { get; protected set; }
    public Guid? CreatedBy { get; protected set; }
    public DateTime? UpdatedAt { get; protected set; }
    public Guid? UpdatedBy { get; protected set; }

    protected Entity() { } // EF needs parameterless ctor

    protected Entity(TId id)
    {
        Id = id;
        CreatedAt = DateTime.UtcNow;
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