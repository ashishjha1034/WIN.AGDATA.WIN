using Domain.Entities.Users;

namespace WIN.AGDATA.WIN.Domain.Entities.Products
{
    public class Product
    {
        public Identity Identity { get; }
        public Pricing Pricing { get; }
        public Inventory Inventory { get; }

        public Product(string name, string description, int requiredPoints, int stockQuantity = 0)
        {
            Identity = new Identity(name, description);
            Pricing = new Pricing(requiredPoints);
            Inventory = new Inventory(stockQuantity);
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