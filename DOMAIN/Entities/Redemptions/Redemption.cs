using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.Entities.Products;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.Domain.Entities.Redemptions;

public class Redemption : AuditableEntity<Guid>
{
    public Guid UserId { get; private set; }
    public Guid ProductId { get; private set; }
    public Points PointsSpent { get; private set; } = Points.Zero;
    public int Quantity { get; private set; }
    public RedemptionStatus Status { get; private set; } = RedemptionStatus.Pending;
    public string? AdminNotes { get; private set; }
    public Guid? ApprovedBy { get; private set; }
    public DateTime? ApprovedAt { get; private set; }
    public Guid? DeliveredBy { get; private set; }
    public DateTime? DeliveredAt { get; private set; }

    public User User { get; private set; } = null!;
    public Product Product { get; private set; } = null!;

    private Redemption() { }

    public Redemption(Guid userId, Guid productId, Points pointsSpent, int quantity)
        : base(Guid.NewGuid())
    {
        if (pointsSpent == null || !pointsSpent.IsPositive())
            throw new ArgumentException("Points spent must be positive", nameof(pointsSpent));

        if (quantity <= 0)
            throw new ArgumentException("Quantity must be positive", nameof(quantity));

        UserId = userId;
        ProductId = productId;
        PointsSpent = pointsSpent;
        Quantity = quantity;
        Status = RedemptionStatus.Pending;
    }

    /// <summary>
    /// Approves the redemption. Only Pending redemptions can be approved.
    /// </summary>
    public void Approve(Guid approvedBy, string? notes = null)
    {
        if (Status != RedemptionStatus.Pending)
            throw new InvalidStatusTransitionException(Status.ToString(), "approve");

        Status = RedemptionStatus.Approved;
        ApprovedBy = approvedBy;
        ApprovedAt = DateTime.UtcNow;
        AdminNotes = notes;

        // Raise domain event
        RaiseDomainEvent(new Domain.Events.RedemptionApprovedEvent(
            Id, UserId, ProductId, approvedBy, DateTime.UtcNow));
    }

    /// <summary>
    /// Rejects the redemption. Only Pending redemptions can be rejected.
    /// </summary>
    public void Reject(Guid rejectedBy, string reason)
    {
        ValidationGuards.NotNullOrWhiteSpace(reason, nameof(reason));

        if (Status != RedemptionStatus.Pending)
            throw new InvalidStatusTransitionException(Status.ToString(), "reject");

        Status = RedemptionStatus.Rejected;
        ApprovedBy = rejectedBy;
        ApprovedAt = DateTime.UtcNow;
        AdminNotes = reason;

        // Raise domain event
        RaiseDomainEvent(new Domain.Events.RedemptionRejectedEvent(
            Id, UserId, ProductId, reason, rejectedBy, DateTime.UtcNow));
    }

    /// <summary>
    /// Marks the redemption as delivered. Only Approved redemptions can be delivered.
    /// </summary>
    public void MarkDelivered(Guid deliveredBy, string? notes = null)
    {
        if (Status != RedemptionStatus.Approved)
            throw new InvalidStatusTransitionException(Status.ToString(), "mark as delivered");

        Status = RedemptionStatus.Delivered;
        DeliveredBy = deliveredBy;
        DeliveredAt = DateTime.UtcNow;
        AdminNotes = notes ?? AdminNotes;

        // Raise domain event
        RaiseDomainEvent(new Domain.Events.RedemptionDeliveredEvent(
            Id, UserId, ProductId, deliveredBy, DateTime.UtcNow));
    }

    /// <summary>
    /// Cancels the redemption. Cannot cancel Delivered or Rejected redemptions.
    /// </summary>
    public void Cancel(Guid cancelledBy, string? reason = null)
    {
        if (Status is RedemptionStatus.Delivered or RedemptionStatus.Rejected)
            throw new InvalidStatusTransitionException(Status.ToString(), "cancel");

        Status = RedemptionStatus.Cancelled;
        AdminNotes = reason ?? AdminNotes;

        // Raise domain event
        RaiseDomainEvent(new Domain.Events.RedemptionCancelledEvent(
            Id, UserId, ProductId, reason, cancelledBy, DateTime.UtcNow));
    }

    /// <summary>
    /// Determines if this redemption is in an active state (Pending or Approved).
    /// </summary>
    public bool IsActive() => Status is RedemptionStatus.Pending or RedemptionStatus.Approved;

    /// <summary>
    /// Determines if points should be refunded (for cancelled or rejected redemptions).
    /// </summary>
    public bool ShouldRefundPoints() => Status is RedemptionStatus.Cancelled or RedemptionStatus.Rejected;
}