using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.Entities.Products;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Enums;

namespace WIN.AGDATA.WIN.Domain.Entities.Redemptions;

public class Redemption : AuditableEntity<Guid>
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public Guid UserId { get; private set; }
    public Guid ProductId { get; private set; }
    public int PointsSpent { get; private set; }
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

    public Redemption(Guid userId, Guid productId, int pointsSpent, int quantity)
    {
        UserId = userId;
        ProductId = productId;
        PointsSpent = pointsSpent;
        Quantity = quantity;
    }

    public void Approve(Guid approvedBy, string? notes = null)
    {
        if (Status != RedemptionStatus.Pending)
            throw new DomainException("Only pending redemptions can be approved");

        Status = RedemptionStatus.Approved;
        ApprovedBy = approvedBy;
        ApprovedAt = DateTime.UtcNow;
        AdminNotes = notes;
    }

    public void Reject(Guid rejectedBy, string reason)
    {
        if (Status != RedemptionStatus.Pending)
            throw new DomainException("Only pending redemptions can be rejected");

        Status = RedemptionStatus.Rejected;
        ApprovedBy = rejectedBy;
        ApprovedAt = DateTime.UtcNow;
        AdminNotes = reason;
    }

    public void MarkDelivered(Guid deliveredBy, string? notes = null)
    {
        if (Status != RedemptionStatus.Approved)
            throw new DomainException("Only approved redemptions can be delivered");

        Status = RedemptionStatus.Delivered;
        DeliveredBy = deliveredBy;
        DeliveredAt = DateTime.UtcNow;
        AdminNotes = notes ?? AdminNotes;
    }

    public void Cancel(Guid cancelledBy, string? reason = null)
    {
        if (Status is RedemptionStatus.Delivered or RedemptionStatus.Rejected)
            throw new DomainException("Delivered or rejected redemptions cannot be cancelled");

        Status = RedemptionStatus.Cancelled;
        AdminNotes = reason ?? AdminNotes;
    }
}