using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.ToTable("Products");
        builder.HasKey(p => p.Id); // <<-- correct primary key
        builder.Property(p => p.Id).ValueGeneratedOnAdd();

        // Owned value objects mapped to same table (as in your DbContext)
        builder.OwnsOne(p => p.Identity, identity =>
        {
            identity.Property(i => i.Name).HasColumnName("Identity_Name").IsRequired();
            identity.Property(i => i.Description).HasColumnName("Identity_Description").IsRequired();
        });

        builder.OwnsOne(p => p.Pricing, pricing =>
        {
            pricing.Property(pp => pp.RequiredPoints).HasColumnName("Pricing_RequiredPoints").IsRequired();
            pricing.Property(pp => pp.LastUpdated).HasColumnName("Pricing_LastUpdated").IsRequired();
        });

        builder.OwnsOne(p => p.Inventory, inventory =>
        {
            //inventory.Property(pi => pi.StockQuantity).HasColumnName("Inventory_StockQuantity").IsRequired();
            //inventory.Property(pi => pi.LastStockUpdate).HasColumnName("Inventory_LastStockUpdate");
        });

        builder.Property(p => p.IsActive).IsRequired();
        builder.Property(p => p.CreatedAt).IsRequired();
        builder.Property(p => p.CreatedBy).HasMaxLength(50).IsRequired();
        builder.Property(p => p.LastModifiedAt).IsRequired(false);
        builder.Property(p => p.LastModifiedBy).HasMaxLength(50).IsRequired(false);
    }
}
