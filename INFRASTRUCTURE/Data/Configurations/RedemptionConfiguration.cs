using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class RedemptionConfiguration : IEntityTypeConfiguration<Redemption>
{
    public void Configure(EntityTypeBuilder<Redemption> builder)
    {
        builder.HasKey(r => r.Id);

        builder.HasOne(r => r.User)
            .WithMany()
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(r => r.Product)
            .WithMany()
            .HasForeignKey(r => r.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Property(r => r.Status).HasConversion<int>();
        builder.Property(r => r.RejectionReason).HasMaxLength(1000);
        builder.Property(r => r.DeliveryNotes).HasMaxLength(1000);

        builder.HasIndex(r => r.Status);
        builder.HasIndex(r => r.RequestedAt);
    }
}