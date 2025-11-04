namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IProductService
{
    Product CreateProduct(string name, string description, int requiredPoints, int stockQuantity);
    Product? GetProductById(Guid productId);
    List<Product> GetAllProducts();
    List<Product> GetAvailableProducts();
    void UpdateProductDetails(Guid productId, string name, string description);
    void UpdateProductPoints(Guid productId, int newPoints);
    void UpdateProductStock(Guid productId, int newQuantity);  // ← ADD THIS
    void DeactivateProduct(Guid productId);
    void ActivateProduct(Guid productId);
}
