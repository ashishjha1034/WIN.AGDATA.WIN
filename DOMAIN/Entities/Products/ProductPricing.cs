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

    /// <summary>
    /// Update the pricing without creating a new entity
    /// </summary>
    public void UpdatePricing(int newPointsCost)
    {
        if (newPointsCost <= 0) 
            throw new DomainException("PointsCost must be positive");
        
        PointsCost = newPointsCost;
    }

    // This is the property used in mapping
    public int CurrentPricing => PointsCost;
}