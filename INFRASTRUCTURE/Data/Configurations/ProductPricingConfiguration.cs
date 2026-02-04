using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class ProductPricingConfiguration : IEntityTypeConfiguration<ProductPricing>
{
    public void Configure(EntityTypeBuilder<ProductPricing> builder)
    {
        builder.ToTable("ProductPricing");
        
        builder.HasKey(pp => pp.Id);

        builder.Property(pp => pp.ProductId).IsRequired();
        builder.Property(pp => pp.PointsCost).IsRequired();
        builder.Property(pp => pp.EffectiveFrom).IsRequired();

        // ONE-TO-ONE: Product has exactly one active ProductPricing
        builder.HasOne<Product>()
               .WithOne(p => p.Pricing)
               .HasForeignKey<ProductPricing>(pp => pp.ProductId)
               .OnDelete(DeleteBehavior.Cascade)
               .HasConstraintName("FK_ProductPricing_Product");

        builder.HasIndex(pp => pp.ProductId)
               .HasDatabaseName("IX_ProductPricing_ProductId");
    }
}