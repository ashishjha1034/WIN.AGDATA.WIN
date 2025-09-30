using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Products
{
    public class Inventory
    {
        public int StockQuantity { get; private set; }
        public DateTime? LastStockUpdate { get; private set; }

        public Inventory(int initialStock = 0)
        {
            ValidateStockQuantity(initialStock);
            StockQuantity = initialStock;
        }

        public void IncreaseStock(int quantity)
        {
            if (quantity <= 0)
                throw new DomainException("Quantity to add must be positive");

            StockQuantity += quantity;
            UpdateTimestamp();
        }

        public void DecreaseStock(int quantity)
        {
            if (quantity <= 0)
                throw new DomainException("Quantity to deduct must be positive");

            if (StockQuantity < quantity)
                throw new DomainException($"Insufficient stock. Available: {StockQuantity}, Requested: {quantity}");

            StockQuantity -= quantity;
            UpdateTimestamp();
        }

        public void SetStock(int newQuantity)
        {
            ValidateStockQuantity(newQuantity);
            StockQuantity = newQuantity;
            UpdateTimestamp();
        }

        public bool IsInStock() => StockQuantity > 0;

        private void ValidateStockQuantity(int quantity)
        {
            if (quantity < 0)
                throw new DomainException("Stock quantity cannot be negative");
        }

        private void UpdateTimestamp() => LastStockUpdate = DateTime.UtcNow;
    }
}