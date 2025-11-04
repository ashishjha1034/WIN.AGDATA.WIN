using System;
using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.Domain.Entities.Products;

public class Product
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

    public void UpdateDetails(string name, string description, string modifiedBy)
    {
        Identity = new ProductIdentity(name, description);
        UpdateModificationInfo(modifiedBy);
    }

    public void UpdatePoints(int newPoints, string modifiedBy)
    {
        Pricing = new ProductPoints(newPoints);
        UpdateModificationInfo(modifiedBy);
    }

    public void UpdateStock(int newQuantity, string modifiedBy)
    {
        Inventory.SetStock(newQuantity);
        UpdateModificationInfo(modifiedBy);
    }

    public void DecreaseStock(int quantity)
    {
        Inventory.DecreaseStock(quantity);
    }

    public void IncreaseStock(int quantity)
    {
        Inventory.IncreaseStock(quantity);
    }

    public bool IsAvailable() => IsActive && Inventory.IsAvailable();

    public bool CanBeRedeemedBy(int userPointsBalance) => IsAvailable() && Pricing.HasSufficientPoints(userPointsBalance);

    public void Deactivate(string modifiedBy)
    {
        IsActive = false;
        UpdateModificationInfo(modifiedBy);
    }

    public void Activate(string modifiedBy)
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
