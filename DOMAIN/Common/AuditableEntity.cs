namespace WIN.AGDATA.WIN.Domain.Common;

public abstract class AuditableEntity<TId> : Entity<TId> where TId : notnull
{
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid CreatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public Guid? UpdatedBy { get; set; }
    protected AuditableEntity() : base() { }

    protected AuditableEntity(TId id) : base(id) { }
}