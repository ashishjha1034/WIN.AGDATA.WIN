
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Products;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Application.Services
{
    public class ProductService : IProductService
    {
        private readonly List<Product> _products = new();

        public Product CreateProduct(string name, string description, int requiredPoints, int stockQuantity)
        {
            var product = new Product(name, description, requiredPoints, stockQuantity);
            _products.Add(product);
            return product;
        }

        public Product? GetProduct(Guid productId)
            => _products.FirstOrDefault(p => p.GetHashCode() == productId.GetHashCode());

        public List<Product> GetAllProducts() => _products.ToList();

        public void UpdateProduct(Guid productId, string name, string description, int requiredPoints)
        {
            var product = GetProduct(productId) ?? throw new DomainException("Product not found");
            product.UpdateDetails(name, description, requiredPoints);
        }

        public void UpdateStock(Guid productId, int newStock)
        {
            var product = GetProduct(productId) ?? throw new DomainException("Product not found");
            product.Inventory.SetStock(newStock);
        }

        public void DeleteProduct(Guid productId)
        {
            var product = GetProduct(productId) ?? throw new DomainException("Product not found");
            _products.Remove(product);
        }
    }
}