
using System;

namespace WIN.AGDATA.WIN.Domain.ValueObjects
{
    
    public class ProductInventory
    {
        public int StockQuantity { get; private set; }

       
        private ProductInventory() { }

        public ProductInventory(int initialStock)
        {
            if (initialStock < 0) throw new DomainException("Stock cannot be negative");
            StockQuantity = initialStock;
        }

        public void DecreaseStock(int amount)
        {
            if (amount <= 0) throw new DomainException("Quantity must be positive");
            if (StockQuantity < amount) throw new DomainException("Insufficient stock");
            StockQuantity -= amount;
        }

       
        public void IncreaseStock(int amount)
        {
            if (amount <= 0) throw new DomainException("Quantity must be positive");
            StockQuantity += amount;
        }

        
        public void SetStock(int newStock)
        {
            if (newStock < 0) throw new DomainException("Stock cannot be negative");
            StockQuantity = newStock;
        }

  
        public bool IsAvailable() => StockQuantity > 0;

        public override string ToString() => $"Stock: {StockQuantity}";
    }
}
