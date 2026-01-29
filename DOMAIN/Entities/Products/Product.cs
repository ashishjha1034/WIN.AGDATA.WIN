using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Products;

public class Product : AuditableEntity<Guid>, IActivatable
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string Name { get; private set; } = null!;
    public string? Description { get; private set; }
    public Guid CategoryId { get; private set; }
    public string? ImageUrl { get; private set; }
    public bool IsActive { get; private set; } = true;
    public string? DeactivationReason { get; private set; }

    public ProductCategory Category { get; private set; } = null!;
    public InventoryItem Inventory { get; private set; } = null!;
    public ProductPricing Pricing { get; private set; } = null!;

    private Product() { }

    public Product(string name, string? description, Guid categoryId, int pointsCost, string? imageUrl)
    {
        ValidationGuards.NotNullOrWhiteSpace(name, nameof(name));
        if (pointsCost <= 0) throw new DomainException("PointsCost must be positive");

        Name = name;
        Description = description;
        CategoryId = categoryId;
        ImageUrl = imageUrl;

        Inventory = new InventoryItem(this);
        Pricing = new ProductPricing(Id, pointsCost);
    }

    public void UpdateDetails(string name, string? description, Guid categoryId, int pointsCost, string? imageUrl)
    {
        ValidationGuards.NotNullOrWhiteSpace(name, nameof(name));
        if (pointsCost <= 0) throw new DomainException("PointsCost must be positive");

        Name = name;
        Description = description;
        CategoryId = categoryId;
        ImageUrl = imageUrl;

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

    public void Activate() => IsActive = true;

    /// <summary>
    /// Validates whether the product can be deactivated based on redemption counts.
    /// Throws ProductDeactivationBlockedException if hard blockers exist.
    /// Returns warnings if soft warning conditions are met.
    /// </summary>
    /// <param name="pendingRedemptions">Number of pending redemptions for this product</param>
    /// <param name="approvedRedemptions">Number of approved redemptions for this product</param>
    /// <param name="recentRedemptions7d">Number of redemptions in last 7 days</param>
    /// <param name="uniqueUsers7d">Number of unique users who redeemed in last 7 days</param>
    /// <param name="recentRedemptions30d">Number of redemptions in last 30 days</param>
    /// <param name="uniqueUsers30d">Number of unique users who redeemed in last 30 days</param>
    /// <param name="lastRedemptionDate">Date of last redemption</param>
    /// <returns>Warnings if any soft warning conditions are met, null otherwise</returns>
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
    /// Call ValidateDeactivation first to check for warnings if force is false.
    /// </summary>
    /// <param name="reason">Reason for deactivation</param>
    /// <param name="pendingRedemptions">Number of pending redemptions</param>
    /// <param name="approvedRedemptions">Number of approved redemptions</param>
    /// <param name="force">If true, bypasses soft warnings (but not hard blocks)</param>
    public void Deactivate(
        string reason,
        int pendingRedemptions = 0,
        int approvedRedemptions = 0,
        bool force = false)
    {
        // Always enforce hard blocks
        if (pendingRedemptions > 0 || approvedRedemptions > 0)
        {
            throw new ProductDeactivationBlockedException(pendingRedemptions, approvedRedemptions);
        }

        IsActive = false;
        DeactivationReason = reason;
    }

    // Keep backward compatible overload
    public void Deactivate(string reason)
    {
        IsActive = false;
        DeactivationReason = reason;
    }

    public int CurrentPricing => Pricing?.CurrentPricing ?? 0;
}