using WIN.AGDATA.WIN.Domain.Exceptions;

namespace Domain.Entities.Users
{
    public class Status
    {
        public bool IsActive { get; private set; }
        public DateTime CreatedAt { get; }
        public DateTime? LastModifiedAt { get; private set; }

        public Status()
        {
            IsActive = true;
            CreatedAt = DateTime.UtcNow;
        }

        public void Deactivate()
        {
            if (!IsActive) throw new DomainException("Already inactive");
            IsActive = false;
            UpdateModified();
        }

        public void Reactivate()
        {
            if (IsActive) throw new DomainException("Already active");
            IsActive = true;
            UpdateModified();
        }

        private void UpdateModified() => LastModifiedAt = DateTime.UtcNow;
    }
}