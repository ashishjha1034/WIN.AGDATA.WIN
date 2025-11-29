using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Users;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class UserRoleAssignmentConfiguration : IEntityTypeConfiguration<UserRoleAssignment>
{
    public void Configure(EntityTypeBuilder<UserRoleAssignment> builder)
    {
        builder.HasKey(ur => new { ur.UserId, ur.RoleId });

        builder.HasOne(ur => ur.User)
            .WithMany(u => u.Roles)
            .HasForeignKey(ur => ur.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(ur => ur.Role)
            .WithMany()
            .HasForeignKey(ur => ur.RoleId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}