// DOMAIN/Entities/Products/ProductPricing.cs
public class ProductPricing : Entity<Guid>
{
    public Guid ProductId { get; private set; }           // ← FK
    public int PointsCost { get; private set; }
    public DateTime EffectiveFrom { get; private set; }
    public DateTime? EffectiveTo { get; private set; }

    public bool IsActive => EffectiveTo == null;

    private ProductPricing() { }

    public ProductPricing(Guid productId, int pointsCost, DateTime effectiveFrom)
    {
        ProductId = productId;
        PointsCost = pointsCost;
        EffectiveFrom = effectiveFrom;
    }

    public void Deactivate(DateTime effectiveTo) => EffectiveTo = effectiveTo;
}