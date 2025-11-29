// INFRASTRUCTURE/Data/Configurations/InventoryItemConfiguration.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;
public class InventoryItemConfiguration : IEntityTypeConfiguration<InventoryItem>
{
    public void Configure(EntityTypeBuilder<InventoryItem> builder)
    {
        builder.HasKey(i => i.Id);

        builder.Property(i => i.ProductId)
               .IsRequired();

        builder.HasIndex(i => i.ProductId)
               .IsUnique();

        // ONE-TO-ONE: InventoryItem → Product
        builder.HasOne(i => i.Product)
               .WithOne(p => p.Inventory)
               .HasForeignKey<InventoryItem>(i => i.ProductId)
               .OnDelete(DeleteBehavior.Cascade)
               .HasConstraintName("FK_InventoryItem_Product");
    }
}