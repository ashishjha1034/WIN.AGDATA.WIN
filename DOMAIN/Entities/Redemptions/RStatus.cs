using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Redemptions
{
    public class RStatus
    {
        public Guid RedemptionId { get; }
        public StatusValue CurrentStatus { get; private set; }
        public DateTime? ApprovedAt { get; private set; }
        public DateTime? DeliveredAt { get; private set; }
        public string? RejectionReason { get; private set; }

        public RStatus(Guid redemptionId)
        {
            if (redemptionId == Guid.Empty)
                throw new DomainException("Redemption ID is required");

            RedemptionId = redemptionId;
            CurrentStatus = StatusValue.Pending;
        }

        public void Approve()
        {
            if (CurrentStatus != StatusValue.Pending)
                throw new DomainException("Only pending redemptions can be approved");

            CurrentStatus = StatusValue.Approved;
            ApprovedAt = DateTime.UtcNow;
            RejectionReason = null;
        }

        public void Reject(string reason)
        {
            if (CurrentStatus != StatusValue.Pending)
                throw new DomainException("Only pending redemptions can be rejected");

            if (string.IsNullOrWhiteSpace(reason))
                throw new DomainException("Rejection reason is required");

            CurrentStatus = StatusValue.Rejected;
            RejectionReason = reason.Trim();
        }

        public void MarkDelivered()
        {
            if (CurrentStatus != StatusValue.Approved)
                throw new DomainException("Only approved redemptions can be marked delivered");

            CurrentStatus = StatusValue.Delivered;
            DeliveredAt = DateTime.UtcNow;
        }

        public bool CanBeModified => CurrentStatus == StatusValue.Pending;
        public bool IsCompleted => CurrentStatus == StatusValue.Delivered || CurrentStatus == StatusValue.Rejected;
    }
}