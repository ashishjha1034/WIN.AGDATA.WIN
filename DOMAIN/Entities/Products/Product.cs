using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.Domain.Entities.Products;

public class Product : AuditableEntity<Guid>, IActivatable
{
    public string Name { get; private set; } = null!;
    public string? Description { get; private set; }
    public Guid CategoryId { get; private set; }
    public ImageUrl? ImageUrl { get; private set; }
    public bool IsActive { get; private set; } = true;
    public string? DeactivationReason { get; private set; }

    public ProductCategory Category { get; private set; } = null!;
    public InventoryItem Inventory { get; private set; } = null!;
    public ProductPricing Pricing { get; private set; } = null!;

    private Product() { }

    public Product(string name, string? description, Guid categoryId, Points pointsCost, string? imageUrl)
        : base(Guid.NewGuid())
    {
        ValidationGuards.NotNullOrWhiteSpace(name, nameof(name));
        if (pointsCost == null || !pointsCost.IsPositive())
            throw new DomainException("Points cost must be positive");

        Name = name;
        Description = description;
        CategoryId = categoryId;
        ImageUrl = imageUrl != null ? ValueObjects.ImageUrl.CreateOptional(imageUrl) : null;

        Inventory = new InventoryItem(this);
        Pricing = new ProductPricing(Id, pointsCost);
    }

    public void UpdateDetails(string name, string? description, Guid categoryId, Points pointsCost, string? imageUrl)
    {
        ValidationGuards.NotNullOrWhiteSpace(name, nameof(name));
        if (pointsCost == null || !pointsCost.IsPositive())
            throw new DomainException("Points cost must be positive");

        Name = name;
        Description = description;
        CategoryId = categoryId;
        ImageUrl = imageUrl != null ? ValueObjects.ImageUrl.CreateOptional(imageUrl) : null;

        // Update existing pricing instead of creating new one to avoid EF tracking conflicts
        if (Pricing != null)
        {
            Pricing.UpdatePricing(pointsCost);
        }
        else
        {
            Pricing = new ProductPricing(Id, pointsCost);
        }
    }

    public void Activate(Guid activatedBy)
    {
        if (IsActive)
            return; // Already active - idempotent

        IsActive = true;
        DeactivationReason = null;

        // Raise domain event
        RaiseDomainEvent(new Domain.Events.ProductActivatedEvent(
            Id, Name, activatedBy, DateTime.UtcNow));
    }

    /// <summary>
    /// Validates whether the product can be deactivated based on redemption counts.
    /// Throws ProductDeactivationBlockedException if hard blockers exist.
    /// Returns warnings if soft warning conditions are met.
    /// </summary>
    public ProductDeactivationWarnings? ValidateDeactivation(
        int pendingRedemptions,
        int approvedRedemptions,
        int recentRedemptions7d = 0,
        int uniqueUsers7d = 0,
        int recentRedemptions30d = 0,
        int uniqueUsers30d = 0,
        DateTime? lastRedemptionDate = null)
    {
        // Hard block: cannot deactivate if there are pending or approved redemptions
        if (pendingRedemptions > 0 || approvedRedemptions > 0)
        {
            throw new ProductDeactivationBlockedException(pendingRedemptions, approvedRedemptions);
        }

        // Soft warnings: stock > 0 or recent demand
        var stock = Inventory?.QuantityAvailable ?? 0;
        if (stock > 0 || recentRedemptions7d > 0)
        {
            return new ProductDeactivationWarnings(
                stock,
                recentRedemptions7d,
                uniqueUsers7d,
                recentRedemptions30d,
                uniqueUsers30d,
                lastRedemptionDate);
        }

        return null;
    }

    /// <summary>
    /// Deactivates the product after validating business rules.
    /// This is the domain method that encapsulates all deactivation logic.
    /// </summary>
    /// <param name="reason">Reason for deactivation</param>
    /// <param name="deactivatedBy">Who is deactivating the product</param>
    /// <param name="pendingRedemptions">Number of pending redemptions</param>
    /// <param name="approvedRedemptions">Number of approved redemptions</param>
    /// <param name="force">If true, bypasses soft warnings (but not hard blocks)</param>
    public void Deactivate(
        string reason,
        Guid deactivatedBy,
        int pendingRedemptions = 0,
        int approvedRedemptions = 0,
        bool force = false)
    {
        ValidationGuards.NotNullOrWhiteSpace(reason, nameof(reason));

        // Always enforce hard blocks
        if (pendingRedemptions > 0 || approvedRedemptions > 0)
        {
            throw new ProductDeactivationBlockedException(pendingRedemptions, approvedRedemptions);
        }

        if (IsActive == false)
            return; // Already deactivated - idempotent

        IsActive = false;
        DeactivationReason = reason;

        // Raise domain event
        RaiseDomainEvent(new Domain.Events.ProductDeactivatedEvent(
            Id, Name, reason, deactivatedBy, DateTime.UtcNow));
    }

    #region Legacy Methods

    // Keep backward compatible overload
    [Obsolete("Use Deactivate(reason, deactivatedBy, ...) instead")]
    public void Deactivate(string reason)
    {
        IsActive = false;
        DeactivationReason = reason;
    }

    [Obsolete("Use Activate(activatedBy) instead")]
    public void Activate()
    {
        IsActive = true;
        DeactivationReason = null;
    }

    #endregion

    public Points CurrentPricing => Pricing?.CurrentPricing ?? Points.Zero;
}