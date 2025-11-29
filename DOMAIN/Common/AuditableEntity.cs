namespace WIN.AGDATA.WIN.Domain.Common;

public abstract class AuditableEntity<TId> : Entity<TId> where TId : notnull
{
    protected AuditableEntity() : base() { }

    protected AuditableEntity(TId id) : base(id) { }
}