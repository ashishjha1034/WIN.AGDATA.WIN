using WIN.AGDATA.WIN.Domain.Common;

namespace WIN.AGDATA.WIN.Domain.Entities.Products;

public class ProductCategory : Entity<Guid>
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = null!;
    public string? Description { get; private set; }
    public int DisplayOrder { get; private set; }
    public bool IsActive { get; private set; }
    public DateTime CreatedAt { get; private set; }

    private ProductCategory() { }

    public ProductCategory(string name, string? description = null, int displayOrder = 0)
    {
        Id = Guid.NewGuid();
        Name = name;
        Description = description;
        DisplayOrder = displayOrder;
        IsActive = true;
        CreatedAt = DateTime.UtcNow;
    }
    public static ProductCategory Create(string name, int displayOrder)
    {
        return new ProductCategory
        {
            Id = Guid.NewGuid(),
            Name = name,
            DisplayOrder = displayOrder,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };
    }
}