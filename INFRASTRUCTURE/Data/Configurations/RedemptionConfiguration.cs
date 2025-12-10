using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Domain.Enums;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class RedemptionConfiguration : IEntityTypeConfiguration<Redemption>
{
    public void Configure(EntityTypeBuilder<Redemption> builder)
    {
        builder.HasKey(r => r.Id);

        builder.Property(r => r.UserId).IsRequired();
        builder.Property(r => r.ProductId).IsRequired();
        builder.Property(r => r.PointsSpent).IsRequired();
        builder.Property(r => r.Quantity).IsRequired();
        builder.Property(r => r.Status)
               .HasDefaultValue(RedemptionStatus.Pending)
               .HasConversion<string>();

        builder.Property(r => r.AdminNotes)
               .HasMaxLength(500);

        builder.HasOne(r => r.User)
               .WithMany()
               .HasForeignKey(r => r.UserId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(r => r.Product)
               .WithMany()
               .HasForeignKey(r => r.ProductId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasIndex(r => r.UserId);
        builder.HasIndex(r => r.Status);
        builder.HasIndex(r => r.CreatedAt);
    }
}