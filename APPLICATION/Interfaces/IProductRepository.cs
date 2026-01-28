using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.APPLICATION.Interfaces;

public interface IProductRepository
{
    Task<Product?> GetByIdAsync(Guid id);
    Task<Product?> GetActiveWithDetailsAsync(Guid id);
    Task<IReadOnlyList<Product>> GetActiveWithDetailsAsync();
    Task<IReadOnlyList<Product>> GetAllWithDetailsAsync();
    Task<Product?> GetByIdWithInventoryAsync(Guid id);
    Task<Product?> GetByIdForUpdateAsync(Guid id);
    Task<IReadOnlyList<Product>> GetLowStockProductsAsync(int threshold = 10);
    void Add(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(Product product);
    Task<IReadOnlyList<Product>> GetByCategoryAsync(Guid categoryId);
    Task<IReadOnlyList<ProductCategory>> GetCategoriesAsync();
    void AddCategory(ProductCategory category);
    Task<ProductCategory?> GetCategoryByIdAsync(Guid id);
}
