using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.ValueObjects;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Products;

public class ProductPricing : Entity<Guid>
{
    public Guid ProductId { get; private set; }
    public Points PointsCost { get; private set; } = Points.Zero;
    public DateTime EffectiveFrom { get; private set; }
    public DateTime? EffectiveTo { get; private set; }

    private ProductPricing() { }

    public ProductPricing(Guid productId, Points pointsCost)
    {
        Id = Guid.NewGuid();
        ProductId = productId;
        PointsCost = pointsCost ?? throw new ArgumentNullException(nameof(pointsCost));
        
        if (!PointsCost.IsPositive())
            throw new DomainException("Points cost must be positive");
            
        EffectiveFrom = DateTime.UtcNow;
    }

    /// <summary>
    /// Update the pricing without creating a new entity
    /// </summary>
    public void UpdatePricing(Points newPointsCost)
    {
        if (newPointsCost == null || !newPointsCost.IsPositive())
            throw new DomainException("Points cost must be positive");

        PointsCost = newPointsCost;
    }

    public Points CurrentPricing => PointsCost;
}