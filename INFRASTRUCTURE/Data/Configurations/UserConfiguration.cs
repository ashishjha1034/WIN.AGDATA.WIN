using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Users;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);
        builder.Property(u => u.EmployeeId).IsRequired().HasMaxLength(50);
        builder.OwnsOne(u => u.Email, e =>
        {
            e.Property(em => em.Value).HasColumnName("Email").IsRequired().HasMaxLength(255);
            e.HasIndex(em => em.Value).IsUnique();
        });
        builder.Property(u => u.FirstName).IsRequired().HasMaxLength(100);
        builder.Property(u => u.LastName).IsRequired().HasMaxLength(100);
        builder.Property(u => u.IsActive).HasDefaultValue(true);
        builder.Property("_passwordHash").HasColumnName("PasswordHash").IsRequired();

        builder.HasOne(u => u.PointsAccount)
            .WithOne()
            .HasForeignKey<UserPointsAccount>(pa => pa.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(u => u.Roles)
            .WithOne(ur => ur.User)
            .HasForeignKey(ur => ur.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}