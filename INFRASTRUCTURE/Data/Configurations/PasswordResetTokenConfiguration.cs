using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Users;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class PasswordResetTokenConfiguration : IEntityTypeConfiguration<PasswordResetToken>
{
    public void Configure(EntityTypeBuilder<PasswordResetToken> builder)
    {
        builder.HasKey(p => p.Id);

        builder.Property(p => p.UserId)
            .IsRequired();

        builder.Property(p => p.Token)
            .IsRequired()
            .HasMaxLength(256);

        builder.Property(p => p.CreatedAt)
            .IsRequired()
            .HasDefaultValueSql("GETUTCDATE()")
            .HasColumnType("datetime2");

        builder.Property(p => p.ExpiresAt)
            .IsRequired()
            .HasColumnType("datetime2");

        builder.Property(p => p.IsUsed)
            .IsRequired()
            .HasDefaultValue(false);

        builder.Property(p => p.UsedAt)
            .HasColumnType("datetime2");

        builder.HasIndex(p => p.Token)
            .IsUnique()
            .HasDatabaseName("IX_PasswordResetToken_Token");

        builder.HasIndex(p => p.UserId)
            .HasDatabaseName("IX_PasswordResetToken_UserId");

        builder.HasOne(p => p.User)
            .WithMany()
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.ToTable("PasswordResetTokens");
    }
}

