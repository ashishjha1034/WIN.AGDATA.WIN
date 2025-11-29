
using System;
using System.ComponentModel.DataAnnotations;
using WIN.AGDATA.WIN.Domain.Common;

namespace WIN.AGDATA.WIN.Domain.Entities.Products;

public class Product : IActivatable
{
    [Key]
    public Guid Id { get; private set; }

    [Required]
    public ProductIdentity Identity { get; private set; }

    [Required]
    public ProductPoints Pricing { get; private set; }

    [Required]
    public ProductInventory Inventory { get; private set; }

    [Required]
    public bool IsActive { get; private set; }

    [Required]
    public DateTime CreatedAt { get; private set; }

    [Required]
    [StringLength(50)]
    public string CreatedBy { get; private set; }

    public DateTime? LastModifiedAt { get; private set; }

    [StringLength(50)]
    public string? LastModifiedBy { get; private set; }

    private Product() { }

    public Product(string name, string description, int requiredPoints, int stockQuantity, string createdBy = "SYSTEM")
    {
        Id = Guid.NewGuid();
        Identity = new ProductIdentity(name, description);
        Pricing = new ProductPoints(requiredPoints);
        Inventory = new ProductInventory(stockQuantity);
        IsActive = true;
        CreatedAt = DateTime.UtcNow;
        CreatedBy = createdBy;
    }

    public void UpdateDetails(string name, string description, string modifiedBy = "SYSTEM")
    {
        Identity = new ProductIdentity(name, description);
        UpdateModificationInfo(modifiedBy);
    }

    public void UpdatePoints(int newPoints, string modifiedBy = "SYSTEM")
    {
        Pricing.UpdatePoints(newPoints);
        UpdateModificationInfo(modifiedBy);
    }

    public void UpdateStock(int newQuantity, string modifiedBy = "SYSTEM")
    {
        Inventory.SetStock(newQuantity);
        UpdateModificationInfo(modifiedBy);
    }

    public void DecreaseStock(int quantity, string modifiedBy = "SYSTEM")
    {
        Inventory.DecreaseStock(quantity);
        UpdateModificationInfo(modifiedBy);
    }

    public void IncreaseStock(int quantity, string modifiedBy = "SYSTEM")
    {
        Inventory.IncreaseStock(quantity);
        UpdateModificationInfo(modifiedBy);
    }

    public bool IsAvailable() => IsActive && Inventory.IsAvailable();

    public bool CanBeRedeemedBy(int userPointsBalance) => IsAvailable() && Pricing.HasSufficientPoints(userPointsBalance);

    public void Deactivate(string reason, string modifiedBy = "SYSTEM")
    {
        IsActive = false;
        UpdateModificationInfo(modifiedBy);
        // optionally log/store reason somewhere if you add field; repo didn't have a DeactivationReason for Product
    }

    public void Activate(string modifiedBy = "SYSTEM")
    {
        IsActive = true;
        UpdateModificationInfo(modifiedBy);
    }

    private void UpdateModificationInfo(string modifiedBy)
    {
        LastModifiedAt = DateTime.UtcNow;
        LastModifiedBy = modifiedBy;
    }

    public override string? ToString() => $"Product: {Identity.Name} ({Pricing.RequiredPoints} points, Stock: {Inventory.StockQuantity})";
}
