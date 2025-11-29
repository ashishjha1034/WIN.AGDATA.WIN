using WIN.AGDATA.WIN.Domain.Common;

namespace WIN.AGDATA.WIN.Domain.Entities.Products;

public class Product : AuditableEntity<Guid>
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = null!;
    public string Description { get; private set; } = null!;
    public Guid CategoryId { get; private set; }
    public string? ImageUrl { get; private set; }
    public bool IsActive { get; private set; }

    // Navigation
    public ProductCategory Category { get; private set; } = null!;

    // ONE-TO-ONE: Product → one InventoryItem
    public InventoryItem Inventory { get; private set; } = null!;

    // ONE-TO-MANY: Product → many ProductPricing
    private readonly List<ProductPricing> _pricings = new();
    public IReadOnlyList<ProductPricing> Pricings => _pricings.AsReadOnly();

    // Current active pricing (calculated)
    public ProductPricing CurrentPricing =>
        _pricings.OrderByDescending(p => p.EffectiveFrom)
                 .FirstOrDefault(p => p.IsActive);

    private Product() { }

    public Product(string name, string description, Guid categoryId, string? imageUrl = null)
    {
        Id = Guid.NewGuid();
        Name = name;
        Description = description;
        CategoryId = categoryId;
        ImageUrl = imageUrl;
        IsActive = true;
    }
    public static Product Create(string name, string description, Guid categoryId, string? imageUrl = null)
    {
        return new Product
        {
            Id = Guid.NewGuid(),
            Name = name,
            Description = description,
            CategoryId = categoryId,
            ImageUrl = imageUrl,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };
    }

    public void Deactivate() => IsActive = false;
    public void Activate() => IsActive = true;
}