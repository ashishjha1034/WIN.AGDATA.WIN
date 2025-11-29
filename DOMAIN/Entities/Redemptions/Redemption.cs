using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.Domain.Entities.Redemptions;

public class Redemption : AuditableEntity<Guid>
{
    public Guid Id { get; private set; }
    public Guid UserId { get; private set; }
    public Guid ProductId { get; private set; }
    public int PointsSpent { get; private set; }
    public int Quantity { get; private set; }
    public RedemptionStatus Status { get; private set; }
    public DateTime RequestedAt { get; private set; }

    // Audit fields
    public DateTime? ApprovedAt { get; private set; }
    public Guid? ApprovedBy { get; private set; }
    public DateTime? RejectedAt { get; private set; }
    public Guid? RejectedBy { get; private set; }
    public string? RejectionReason { get; private set; }
    public DateTime? DeliveredAt { get; private set; }
    public Guid? DeliveredBy { get; private set; }
    public string? DeliveryNotes { get; private set; }

    // Navigation
    public User User { get; private set; } = null!;
    public Product Product { get; private set; } = null!;

    private Redemption() { }

    public Redemption(Guid userId, Guid productId, int pointsSpent, int quantity)
    {
        Id = Guid.NewGuid();
        UserId = userId;
        ProductId = productId;
        PointsSpent = pointsSpent;
        Quantity = quantity;
        Status = RedemptionStatus.Pending;
        RequestedAt = DateTime.UtcNow;
    }

    public void Approve(Guid approvedBy)
    {
        if (Status != RedemptionStatus.Pending) throw new DomainException("Only pending redemptions can be approved");
        Status = RedemptionStatus.Approved;
        ApprovedAt = DateTime.UtcNow;
        ApprovedBy = approvedBy;
    }

    public void Reject(string reason, Guid rejectedBy)
    {
        if (Status != RedemptionStatus.Pending) throw new DomainException("Only pending redemptions can be rejected");
        Status = RedemptionStatus.Rejected;
        RejectionReason = reason;
        RejectedAt = DateTime.UtcNow;
        RejectedBy = rejectedBy;
    }

    public void MarkDelivered(string? notes, Guid deliveredBy)
    {
        if (Status != RedemptionStatus.Approved) throw new DomainException("Only approved redemptions can be delivered");
        Status = RedemptionStatus.Delivered;
        DeliveredAt = DateTime.UtcNow;
        DeliveredBy = deliveredBy;
        DeliveryNotes = notes;
    }
}