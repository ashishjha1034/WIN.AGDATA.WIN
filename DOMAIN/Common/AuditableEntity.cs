using System;

namespace WIN.AGDATA.WIN.Domain.Common
{
    public abstract class AuditableEntity<TId> : Entity<TId>
    {
        public DateTime CreatedAt { get; protected set; }
        public string CreatedBy { get; protected set; } = "SYSTEM";
        public DateTime? LastModifiedAt { get; protected set; }
        public string? LastModifiedBy { get; protected set; }

        protected AuditableEntity() { }

        protected AuditableEntity(TId id, string createdBy = "SYSTEM") : base(id)
        {
            CreatedAt = DateTime.UtcNow;
            CreatedBy = string.IsNullOrWhiteSpace(createdBy) ? "SYSTEM" : createdBy;
        }

        protected void UpdateModificationInfo(string modifiedBy = "SYSTEM")
        {
            LastModifiedAt = DateTime.UtcNow;
            LastModifiedBy = string.IsNullOrWhiteSpace(modifiedBy) ? "SYSTEM" : modifiedBy;
        }
    }
}
