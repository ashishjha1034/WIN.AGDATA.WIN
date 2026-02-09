using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class UserPointsAccountConfiguration : IEntityTypeConfiguration<UserPointsAccount>
{
    public void Configure(EntityTypeBuilder<UserPointsAccount> builder)
    {
        builder.HasKey(p => p.Id);

        builder.HasOne(p => p.User)
            .WithOne(u => u.PointsAccount)
            .HasForeignKey<UserPointsAccount>(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        // Points fields - use decimal(18,2) for 2 decimal places
        builder.Property(p => p.CurrentBalance)
            .HasPrecision(18, 2)
            .HasConversion(
                v => v.Value,
                v => Points.Create(v));
        
        builder.Property(p => p.TotalEarned)
            .HasPrecision(18, 2)
            .HasConversion(
                v => v.Value,
                v => Points.Create(v));
        
        builder.Property(p => p.TotalRedeemed)
            .HasPrecision(18, 2)
            .HasConversion(
                v => v.Value,
                v => Points.Create(v));

        builder.HasIndex(p => p.UserId).IsUnique();
    }
}