using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);

        // User root properties
        builder.Property(u => u.CreatedAt)
            .IsRequired();

        builder.Property(u => u.CreatedBy)
            .HasMaxLength(50)
            .IsRequired();

        builder.Property(u => u.LastModifiedAt)
            .IsRequired(false);

        builder.Property(u => u.LastModifiedBy)
            .HasMaxLength(50)
            .IsRequired(false);

        builder.Property(u => u.Role)
            .IsRequired()
            .HasConversion<int>();

        // UserIdentity (Value Object - Owned)
        builder.OwnsOne(u => u.Identity, identity =>
        {
            identity.Property(ui => ui.EmployeeId)
                .HasColumnName("EmployeeId")
                .HasMaxLength(20)
                .IsRequired();

            identity.Property(ui => ui.Email)
                .HasColumnName("Email")
                .HasMaxLength(255)
                .IsRequired();

            identity.Property(ui => ui.FirstName)
                .HasColumnName("FirstName")
                .HasMaxLength(50)
                .IsRequired();

            identity.Property(ui => ui.LastName)
                .HasColumnName("LastName")
                .HasMaxLength(50)
                .IsRequired();

            identity.HasIndex(ui => ui.EmployeeId)
                .IsUnique();

            identity.HasIndex(ui => ui.Email)
                .IsUnique();
        });

        // UserStatus (Value Object - Owned)
        builder.OwnsOne(u => u.Status, status =>
        {
            status.Property(us => us.IsActive)
                .HasColumnName("IsActive")
                .IsRequired();

            status.Property(us => us.DeactivatedAt)
                .HasColumnName("DeactivatedAt")
                .IsRequired(false);

            status.Property(us => us.DeactivationReason)
                .HasColumnName("DeactivationReason")
                .HasMaxLength(255)
                .IsRequired(false);
        });

        // UserPoints (Value Object - Owned)
        builder.OwnsOne(u => u.Points, points =>
        {
            points.Property(up => up.EarnedPoints)
                .HasColumnName("EarnedPoints")
                .IsRequired();

            points.Property(up => up.SpentPoints)
                .HasColumnName("SpentPoints")
                .IsRequired();

            points.Property(up => up.CurrentBalance)
                .HasColumnName("CurrentBalance")
                .IsRequired();
        });

        builder.ToTable("Users");
    }
}
