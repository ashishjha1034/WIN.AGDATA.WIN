using WIN.AGDATA.WIN.Domain.Common;

namespace WIN.AGDATA.WIN.Domain.Entities.Products;

public class ProductCategory : Entity<Guid>
{
    public string Name { get; private set; } = null!;
    public string? Description { get; private set; }
    public int DisplayOrder { get; private set; }
    public bool IsActive { get; private set; }

    private ProductCategory() { }

    public ProductCategory(string name, string? description = null, int displayOrder = 0)
        : base(Guid.NewGuid())
    {
        Name = name;
        Description = description;
        DisplayOrder = displayOrder;
        IsActive = true;
    }
    public static ProductCategory Create(string name, int displayOrder)
    {
        return new ProductCategory(name, null, displayOrder);
    }
}