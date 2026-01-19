using WIN.AGDATA.WIN.Domain.Common;

namespace WIN.AGDATA.WIN.Domain.Entities.Products;

public class Product : AuditableEntity<Guid>, IActivatable
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string Name { get; private set; } = null!;
    public string? Description { get; private set; }
    public Guid CategoryId { get; private set; }
    public string? ImageUrl { get; private set; }
    public bool IsActive { get; private set; } = true;

    public ProductCategory Category { get; private set; } = null!;
    public InventoryItem Inventory { get; private set; } = null!;
    public ProductPricing Pricing { get; private set; } = null!;

    private Product() { }

    public Product(string name, string? description, Guid categoryId, int pointsCost, string? imageUrl)
    {
        ValidationGuards.NotNullOrWhiteSpace(name, nameof(name));
        if (pointsCost <= 0) throw new DomainException("PointsCost must be positive");

        Name = name;
        Description = description;
        CategoryId = categoryId;
        ImageUrl = imageUrl;

        Inventory = new InventoryItem(this);
        Pricing = new ProductPricing(Id, pointsCost);
    }

    public void UpdateDetails(string name, string? description, Guid categoryId, int pointsCost, string? imageUrl)
    {
        ValidationGuards.NotNullOrWhiteSpace(name, nameof(name));
        if (pointsCost <= 0) throw new DomainException("PointsCost must be positive");

        Name = name;
        Description = description;
        CategoryId = categoryId;
        ImageUrl = imageUrl;

        Pricing = new ProductPricing(Id, pointsCost);
    }

    public void Activate() => IsActive = true;
    public void Deactivate(string reason) => IsActive = false;

    public int CurrentPricing => Pricing?.CurrentPricing ?? 0;
}