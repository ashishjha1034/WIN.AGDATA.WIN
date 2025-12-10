// DOMAIN/Entities/Products/InventoryItem.cs
public class InventoryItem : Entity<Guid>
{
    public Guid ProductId { get; private set; }   // ← keep this name
    public int QuantityAvailable { get; private set; }
    public int QuantityReserved { get; private set; }
    public int CurrentStock { get; private set; } = 0;

    public Product Product { get; private set; } = null!;

    private InventoryItem() { }
    public InventoryItem(Product product)
    {
        Id = Guid.NewGuid();
        ProductId = product.Id;
        QuantityAvailable = 0;
        QuantityReserved = 0;
    }

    public void AdjustStock(int amount, Guid byUserId)
    {
        QuantityAvailable = Math.Max(0, QuantityAvailable + amount);
    }

    public void Reserve(int quantity)
    {
        if (QuantityAvailable - QuantityReserved < quantity)
            throw new InvalidOperationException("Not enough stock");
        QuantityReserved += quantity;
    }

    public void Release(int quantity)
    {
        QuantityReserved = Math.Max(0, QuantityReserved - quantity);
    }
}