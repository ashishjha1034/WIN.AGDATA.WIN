using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Data;
using WIN.AGDATA.WIN.Domain.Entities.Users;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.HasKey(r => r.Id);
        builder.Property(r => r.Name).HasMaxLength(100).IsRequired();
        builder.HasIndex(r => r.Name).IsUnique();
        builder.Property(r => r.Description).HasMaxLength(500);
        builder.Property(r => r.IsActive).HasDefaultValue(true);
    }
}