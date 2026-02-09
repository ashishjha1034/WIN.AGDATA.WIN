using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.Infrastructure.Data;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context, ILogger logger)
    {
        try
        {
            logger.LogInformation("Starting database seeding...");

            // Check if any users exist
            if (await context.Users.AnyAsync())
            {
                logger.LogInformation("Users already exist. Skipping seed.");
                return;
            }

            logger.LogInformation("Seeding initial admin user...");

            // Create admin user
            var adminUser = new User(
                employeeId: EmployeeId.Create("ADM100001"),
                email: EmailAddress.Create("admin.master@agdata.com"),
                firstName: PersonName.Create("Admin"),
                lastName: PersonName.Create("Master"),
                password: "Password@123"
            );

            context.Users.Add(adminUser);

            // Create PointsAccount for admin
            var adminAccount = new UserPointsAccount(adminUser.Id);
            context.UserPointsAccounts.Add(adminAccount);

            // Create Admin role
            var adminRole = new Role("Admin");
            context.Roles.Add(adminRole);

            await context.SaveChangesAsync();

            // Assign admin role (assigned by system - use admin's own ID)
            var roleAssignment = new UserRoleAssignment(adminUser, adminRole, adminUser.Id);
            context.UserRoleAssignments.Add(roleAssignment);

            await context.SaveChangesAsync();

            logger.LogInformation("✓ Database seeded successfully");
            logger.LogInformation("  - Admin user: admin.master@agdata.com");
            logger.LogInformation("  - Password: Password@123");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error seeding database");
            throw;
        }
    }
}
