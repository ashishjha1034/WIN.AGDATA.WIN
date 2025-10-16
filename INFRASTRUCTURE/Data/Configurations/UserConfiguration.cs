using Domain.Entities.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");

        builder.HasKey(u => u.Identity.EmployeeId);

        builder.OwnsOne(u => u.Identity, identity =>
        {
            identity.Property(i => i.EmployeeId)
                .HasMaxLength(20)
                .IsRequired();

            identity.OwnsOne(i => i.Email, email =>
            {
                email.Property(e => e.Value)
                    .HasColumnName("Email")
                    .HasMaxLength(255)
                    .IsRequired();
            });

            identity.Property(i => i.FirstName)
                .HasMaxLength(50)
                .IsRequired();

            identity.Property(i => i.LastName)
                .HasMaxLength(50)
                .IsRequired();
        });

        builder.OwnsOne(u => u.Status, status =>
        {
            status.Property(s => s.IsActive)
                .IsRequired();

            status.Property(s => s.CreatedAt)
                .IsRequired();

            status.Property(s => s.LastModifiedAt);
        });

        builder.OwnsOne(u => u.Points, points =>
        {
            points.Property(p => p.Balance)
                .IsRequired();

            points.Property(p => p.LastUpdated)
                .IsRequired();
        });

        builder.Property(u => u.Role)
            .HasConversion<int>()
            .IsRequired();

        builder.Property(u => u.CreatedAt)
            .IsRequired();

        builder.Property(u => u.CreatedBy)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(u => u.LastModifiedAt);

        builder.Property(u => u.LastModifiedBy)
            .HasMaxLength(50);

        builder.HasIndex(u => u.Identity.Email.Value)
            .IsUnique()
            .HasDatabaseName("IX_Users_Email");
    }
}
