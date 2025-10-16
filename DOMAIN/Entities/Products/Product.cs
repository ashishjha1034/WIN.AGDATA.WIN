using Domain.Entities.Users;

namespace WIN.AGDATA.WIN.Domain.Entities.Products
{
    public class Product
    {
        public ProductIdentity Identity { get; }
        public ProductPricing Pricing { get; }
        public ProductInventory Inventory { get; }

        public Product(string name, string description, int requiredPoints, int stockQuantity = 0)
        {
            Identity = new ProductIdentity(name, description);
            Pricing = new ProductPricing(requiredPoints);
            Inventory = new ProductInventory(stockQuantity);
        }
        public void UpdateDetails(string name, string description, int points)
        {
            Identity.UpdateName(name);
            Identity.UpdateDescription(description);
            Pricing.UpdatePoints(points);
        }

        public void IncreaseStock(int quantity) => Inventory.IncreaseStock(quantity);
        public void DecreaseStock(int quantity) => Inventory.DecreaseStock(quantity);

        //availability
        public bool IsAvailable() => Inventory.IsInStock();

        public bool CanBeRedeemedBy(User user)
            => IsAvailable() && Pricing.CanAfford(user.Points.Balance);
    }
}