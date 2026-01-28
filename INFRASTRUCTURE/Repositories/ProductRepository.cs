using Microsoft.EntityFrameworkCore;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Products;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public class ProductRepository : Repository<Product>, IProductRepository
{
    public ProductRepository(ApplicationDbContext context) : base(context) { }

    public async Task<Product?> GetActiveWithDetailsAsync(Guid id)
        => await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Pricing)
            .Include(p => p.Inventory)
            .Where(p => p.IsActive && p.Id == id)
            .FirstOrDefaultAsync();

    public async Task<IReadOnlyList<Product>> GetActiveWithDetailsAsync()
        => await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Pricing)
            .Include(p => p.Inventory)
            .Where(p => p.IsActive)
            .ToListAsync();

    public async Task<IReadOnlyList<Product>> GetAllWithDetailsAsync()
        => await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Pricing)
            .Include(p => p.Inventory)
            .ToListAsync();

    public async Task<Product?> GetByIdWithInventoryAsync(Guid id)
        => await _context.Products
            .Include(p => p.Inventory)
            .FirstOrDefaultAsync(p => p.Id == id);

    public async Task<IReadOnlyList<Product>> GetLowStockProductsAsync(int threshold = 10)
        => await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Pricing)
            .Include(p => p.Inventory)
            .Where(p => p.IsActive && p.Inventory != null && p.Inventory.QuantityAvailable < threshold)
            .OrderBy(p => p.Inventory!.QuantityAvailable)
            .ToListAsync();

    public async Task<Product?> GetByIdForUpdateAsync(Guid id)
        => await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Pricing)
            .Include(p => p.Inventory)
            .FirstOrDefaultAsync(p => p.Id == id);

    public async Task UpdateAsync(Product product)
    {
        _dbSet.Update(product);
    }

    public async Task DeleteAsync(Product product)
    {
        _dbSet.Remove(product);
    }
    
    public async Task<IReadOnlyList<Product>> GetByCategoryAsync(Guid categoryId)
        => await _context.Products
            .Include(p => p.Category)
            .Include(p => p.Inventory)
            .Where(p => p.CategoryId == categoryId && p.IsActive)
            .ToListAsync();

    public async Task<IReadOnlyList<ProductCategory>> GetCategoriesAsync()
        => await _context.ProductCategories.ToListAsync();

    public void AddCategory(ProductCategory category)
    {
        _context.ProductCategories.Add(category);
    }

    public async Task<ProductCategory?> GetCategoryByIdAsync(Guid id)
        => await _context.ProductCategories.FirstOrDefaultAsync(c => c.Id == id);

}