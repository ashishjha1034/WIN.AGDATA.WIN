using System;
using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.Domain.Entities.Products;

public class ProductInventory
{
    [Required]
    [Range(0, int.MaxValue)]
    public int StockQuantity { get; private set; }

    public DateTime? LastStockUpdate { get; private set; }

    private ProductInventory() { }

    public ProductInventory(int initialStock = 0)
    {
        ValidationGuards.ValidateStock(initialStock);
        StockQuantity = initialStock;
        LastStockUpdate = DateTime.UtcNow;
    }

    public void IncreaseStock(int quantity)
    {
        ValidationGuards.ValidatePositiveNumber(quantity, "Quantity to add");
        StockQuantity += quantity;
        UpdateTimestamp();
    }

    public void DecreaseStock(int quantity)
    {
        ValidationGuards.ValidatePositiveNumber(quantity, "Quantity to deduct");

        if (StockQuantity < quantity)
            throw new DomainException($"Insufficient stock. Available: {StockQuantity}, Requested: {quantity}");

        StockQuantity -= quantity;
        UpdateTimestamp();
    }

    public void SetStock(int newQuantity)
    {
        ValidationGuards.ValidateStock(newQuantity);
        StockQuantity = newQuantity;
        UpdateTimestamp();
    }

    public bool IsInStock() => StockQuantity > 0;

    public bool IsAvailable() => IsInStock();

    private void UpdateTimestamp() => LastStockUpdate = DateTime.UtcNow;

    public override string? ToString() => $"Stock: {StockQuantity} (Last updated: {LastStockUpdate:yyyy-MM-dd HH:mm:ss})";
}
