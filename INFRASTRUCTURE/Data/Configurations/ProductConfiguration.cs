using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.Name).HasMaxLength(200).IsRequired();
        builder.Property(p => p.Description).HasMaxLength(1000).IsRequired();
        builder.Property(p => p.ImageUrl).HasMaxLength(1000);

        builder.HasOne(p => p.Category)
            .WithMany()
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(p => p.Inventory)
            .WithOne(i => i.Product)
            .HasForeignKey<InventoryItem>(i => i.ProductId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasIndex(p => p.IsActive);
    }
}