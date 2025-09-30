using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.Application.Interfaces
{
    public interface IProductService
    {
        Product CreateProduct(string name, string description, int requiredPoints, int stockQuantity);
        Product? GetProduct(Guid productId);
        List<Product> GetAllProducts();
        void UpdateProduct(Guid productId, string name, string description, int requiredPoints);
        void UpdateStock(Guid productId, int newStock);
        void DeleteProduct(Guid productId);
    }
}