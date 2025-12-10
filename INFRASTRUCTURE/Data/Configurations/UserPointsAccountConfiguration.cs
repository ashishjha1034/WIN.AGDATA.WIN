using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Users;

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

        builder.Property(p => p.CurrentBalance).HasDefaultValue(0);
        builder.Property(p => p.TotalEarned).HasDefaultValue(0);
        builder.Property(p => p.TotalRedeemed).HasDefaultValue(0);

        builder.HasIndex(p => p.UserId).IsUnique();
    }
}