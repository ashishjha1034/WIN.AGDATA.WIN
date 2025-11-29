// INFRASTRUCTURE/Data/Configurations/ProductPricingConfiguration.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class ProductPricingConfiguration : IEntityTypeConfiguration<ProductPricing>
{
    public void Configure(EntityTypeBuilder<ProductPricing> builder)
    {
        builder.HasKey(pp => pp.Id);

        builder.Property(pp => pp.ProductId)
               .IsRequired();

        builder.Property(pp => pp.PointsCost)
               .IsRequired();

        builder.Property(pp => pp.EffectiveFrom)
               .IsRequired();

        builder.Ignore(pp => pp.IsActive); // calculated

        // CRYSTAL CLEAR ONE-TO-MANY
        builder.HasOne<Product>()                     // ← ProductPricing belongs to Product
               .WithMany(p => p.Pricings)             // ← Product has many Pricings
               .HasForeignKey(pp => pp.ProductId)     // ← Using this exact column
               .OnDelete(DeleteBehavior.Cascade)
               .HasConstraintName("FK_ProductPricing_Product");

        builder.HasIndex(pp => new { pp.ProductId, pp.EffectiveFrom })
               .HasDatabaseName("IX_ProductPricing_ProductId_EffectiveFrom");
    }
}