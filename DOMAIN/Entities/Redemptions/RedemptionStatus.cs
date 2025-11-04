using System;
using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.Domain.Entities.Redemptions;

public class RedemptionStatus
{
    public Guid RedemptionId { get; }
    public StatusValue Value { get; private set; }  // ← Changed from CurrentStatus to Value
    public DateTime? ApprovedAt { get; private set; }
    public DateTime? DeliveredAt { get; private set; }
    public string? RejectionReason { get; private set; }

    private RedemptionStatus() { }

    public RedemptionStatus(Guid redemptionId)
    {
        if (redemptionId == Guid.Empty)
            throw new DomainException("Redemption ID is required");

        RedemptionId = redemptionId;
        Value = StatusValue.Pending;
    }

    public void Approve()
    {
        if (Value != StatusValue.Pending)
            throw new DomainException("Only pending redemptions can be approved");

        Value = StatusValue.Approved;
        ApprovedAt = DateTime.UtcNow;
        RejectionReason = null;
    }

    public void Reject(string reason)
    {
        if (Value != StatusValue.Pending)
            throw new DomainException("Only pending redemptions can be rejected");

        if (string.IsNullOrWhiteSpace(reason))
            throw new DomainException("Rejection reason is required");

        Value = StatusValue.Rejected;
        RejectionReason = reason.Trim();
    }

    public void MarkDelivered()
    {
        if (Value != StatusValue.Approved)
            throw new DomainException("Only approved redemptions can be marked delivered");

        Value = StatusValue.Delivered;
        DeliveredAt = DateTime.UtcNow;
    }

    public bool CanBeModified => Value == StatusValue.Pending;
    public bool IsCompleted => Value == StatusValue.Delivered || Value == StatusValue.Rejected;
}
