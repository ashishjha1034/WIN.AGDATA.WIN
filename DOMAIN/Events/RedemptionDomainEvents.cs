using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.Enums;

namespace WIN.AGDATA.WIN.Domain.Events;

/// <summary>
/// Event raised when a redemption is approved.
/// </summary>
public sealed record RedemptionApprovedEvent : DomainEvent
{
    public Guid RedemptionId { get; }
    public Guid UserId { get; }
    public Guid ProductId { get; }
    public Guid ApprovedBy { get; }
    public DateTime ApprovedAtUtc { get; }

    public RedemptionApprovedEvent(Guid redemptionId, Guid userId, Guid productId, Guid approvedBy, DateTime approvedAtUtc)
    {
        RedemptionId = redemptionId;
        UserId = userId;
        ProductId = productId;
        ApprovedBy = approvedBy;
        ApprovedAtUtc = approvedAtUtc;
    }
}

/// <summary>
/// Event raised when a redemption is delivered.
/// </summary>
public sealed record RedemptionDeliveredEvent : DomainEvent
{
    public Guid RedemptionId { get; }
    public Guid UserId { get; }
    public Guid ProductId { get; }
    public Guid DeliveredBy { get; }
    public DateTime DeliveredAtUtc { get; }

    public RedemptionDeliveredEvent(Guid redemptionId, Guid userId, Guid productId, Guid deliveredBy, DateTime deliveredAtUtc)
    {
        RedemptionId = redemptionId;
        UserId = userId;
        ProductId = productId;
        DeliveredBy = deliveredBy;
        DeliveredAtUtc = deliveredAtUtc;
    }
}

/// <summary>
/// Event raised when a redemption is rejected.
/// </summary>
public sealed record RedemptionRejectedEvent : DomainEvent
{
    public Guid RedemptionId { get; }
    public Guid UserId { get; }
    public Guid ProductId { get; }
    public string Reason { get; }
    public Guid RejectedBy { get; }
    public DateTime RejectedAtUtc { get; }

    public RedemptionRejectedEvent(Guid redemptionId, Guid userId, Guid productId, string reason, Guid rejectedBy, DateTime rejectedAtUtc)
    {
        RedemptionId = redemptionId;
        UserId = userId;
        ProductId = productId;
        Reason = reason;
        RejectedBy = rejectedBy;
        RejectedAtUtc = rejectedAtUtc;
    }
}

/// <summary>
/// Event raised when a redemption is cancelled.
/// </summary>
public sealed record RedemptionCancelledEvent : DomainEvent
{
    public Guid RedemptionId { get; }
    public Guid UserId { get; }
    public Guid ProductId { get; }
    public string? Reason { get; }
    public Guid CancelledBy { get; }
    public DateTime CancelledAtUtc { get; }

    public RedemptionCancelledEvent(Guid redemptionId, Guid userId, Guid productId, string? reason, Guid cancelledBy, DateTime cancelledAtUtc)
    {
        RedemptionId = redemptionId;
        UserId = userId;
        ProductId = productId;
        Reason = reason;
        CancelledBy = cancelledBy;
        CancelledAtUtc = cancelledAtUtc;
    }
}
