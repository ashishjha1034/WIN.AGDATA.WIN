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
            .Include(p => p.CurrentPricing)
            .Include(p => p.Inventory)
            .Where(p => p.IsActive && p.Id == id)
            .FirstOrDefaultAsync();

    public async Task<IReadOnlyList<Product>> GetActiveWithDetailsAsync()
        => await _context.Products
            .Include(p => p.Category)
            .Include(p => p.CurrentPricing)
            .Include(p => p.Inventory)
            .Where(p => p.IsActive)
            .ToListAsync();

    public async Task<Product?> GetByIdWithInventoryAsync(Guid id)
        => await _context.Products
            .Include(p => p.Inventory)
            .FirstOrDefaultAsync(p => p.Id == id);

    public async Task UpdateAsync(Product product)
    {
        _dbSet.Update(product);
    }
    public async Task<IReadOnlyList<Product>> GetByCategoryAsync(Guid categoryId)
    => await _context.Products
        .Include(p => p.Category)
        .Include(p => p.Inventory)
        .Where(p => p.CategoryId == categoryId && p.IsActive)
        .ToListAsync();

    public async Task<IReadOnlyList<ProductCategory>> GetCategoriesAsync()
        => await _context.ProductCategories.ToListAsync();
}