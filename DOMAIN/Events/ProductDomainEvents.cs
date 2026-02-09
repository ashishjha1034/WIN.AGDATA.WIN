using WIN.AGDATA.WIN.Domain.Common;

namespace WIN.AGDATA.WIN.Domain.Events;

/// <summary>
/// Event raised when a product is deactivated.
/// </summary>
public sealed record ProductDeactivatedEvent : DomainEvent
{
    public Guid ProductId { get; }
    public string ProductName { get; }
    public string Reason { get; }
    public Guid DeactivatedBy { get; }
    public DateTime DeactivatedAtUtc { get; }

    public ProductDeactivatedEvent(Guid productId, string productName, string reason, Guid deactivatedBy, DateTime deactivatedAtUtc)
    {
        ProductId = productId;
        ProductName = productName;
        Reason = reason;
        DeactivatedBy = deactivatedBy;
        DeactivatedAtUtc = deactivatedAtUtc;
    }
}

/// <summary>
/// Event raised when a product is activated.
/// </summary>
public sealed record ProductActivatedEvent : DomainEvent
{
    public Guid ProductId { get; }
    public string ProductName { get; }
    public Guid ActivatedBy { get; }
    public DateTime ActivatedAtUtc { get; }

    public ProductActivatedEvent(Guid productId, string productName, Guid activatedBy, DateTime activatedAtUtc)
    {
        ProductId = productId;
        ProductName = productName;
        ActivatedBy = activatedBy;
        ActivatedAtUtc = activatedAtUtc;
    }
}
