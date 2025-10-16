using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IProductService
{
    Product CreateProduct(string name, string description, int requiredPoints, int stockQuantity = 0);
    List<Product> GetAllProducts();
    List<Product> GetAvailableProducts();
    Product? GetProductById(Guid productId);

    void UpdateProductStock(Guid productId, int newQuantity);
    void UpdateProductPricing(Guid productId, int newPoints);
}
