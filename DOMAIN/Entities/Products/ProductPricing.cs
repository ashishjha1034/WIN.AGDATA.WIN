using WIN.AGDATA.WIN.Domain.Common;

namespace WIN.AGDATA.WIN.Domain.Entities.Products;

public class ProductPricing : Entity<Guid>
{
    public Guid ProductId { get; private set; }
    public int PointsCost { get; private set; }
    public DateTime EffectiveFrom { get; private set; }
    public DateTime? EffectiveTo { get; private set; }

    // EF needs parameterless ctor
    private ProductPricing() { }

    public ProductPricing(Guid productId, int pointsCost)
    {
        Id = Guid.NewGuid();
        ProductId = productId;
        PointsCost = pointsCost;
        EffectiveFrom = DateTime.UtcNow;
    }

    // This is the property used in mapping
    public int CurrentPricing => PointsCost;
}