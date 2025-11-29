using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Users;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);
        builder.Property(u => u.Id).ValueGeneratedOnAdd();

        builder.Property(u => u.EmployeeId)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(u => u.FirstName)
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(u => u.LastName)
            .HasMaxLength(100)
            .IsRequired();

        builder.OwnsOne(u => u.Email, email =>
        {
            email.Property(e => e.Value)
                .HasColumnName("Email")
                .HasMaxLength(255)
                .IsRequired();

            email.HasIndex(e => e.Value).IsUnique();
        });

        builder.Property(u => u.Status).HasConversion<int>();
        builder.Property(u => u.IsActive).HasDefaultValue(true);

        builder.HasIndex(u => u.EmployeeId).IsUnique();
        builder.HasIndex(u => u.IsActive);
    }
}