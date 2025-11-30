using BCrypt.Net;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.Infrastructure.Data;

public static class SeedData
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        try
        {
            // Seed Roles
            await SeedRolesAsync(context);

            // Seed Admin User
            await SeedAdminUserAsync(context);

            // Seed Product Categories
            await SeedProductCategoriesAsync(context);

            await context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Seeding error: {ex.Message}");
        }
    }

    private static async Task SeedRolesAsync(ApplicationDbContext context)
    {
        var roles = new[] { "Admin", "Manager", "Employee" };

        foreach (var roleName in roles)
        {
            var roleExists = context.Roles.Any(r => r.Name == roleName);

            if (!roleExists)
            {
                var role = new Role(roleName, $"{roleName} role for reward points system");
                context.Roles.Add(role);
                Console.WriteLine($"✓ Seeded role: {roleName}");
            }
        }

        await context.SaveChangesAsync();
    }

    private static async Task SeedAdminUserAsync(ApplicationDbContext context)
    {
        var adminEmail = "admin@agdata.com";
        var userExists = context.Users.Any(u => u.Email.Value == adminEmail);

        if (userExists)
            return;

        try
        {
            var email = EmailAddress.Create(adminEmail);
            var user = new User(
                employeeId: "ADMIN001",
                email: email,
                firstName: "Admin",
                lastName: "User",
                password: "Admin@123456"
            );

            // Get or create Admin role
            var adminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "Admin")
                ?? throw new InvalidOperationException("Admin role must exist before creating admin user");

            user.AssignRole(adminRole, Guid.Empty);
            user.Activate();

            context.Users.Add(user);
            await context.SaveChangesAsync();

            Console.WriteLine($"✓ Seeded admin user: {adminEmail}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"✗ Admin user seeding failed: {ex.Message}");
        }
    }

    private static async Task SeedProductCategoriesAsync(ApplicationDbContext context)
    {
        var categories = new[]
        {
            ("Greeting Cards", "Special occasion greeting cards"),
            ("Mugs", "Branded and personalized mugs"),
            ("Books", "Professional and recreational books"),
            ("Vouchers", "Gift vouchers for partner retailers"),
            ("Stationery", "Office and writing supplies"),
            ("Gadgets", "Tech accessories and gadgets")
        };

        foreach (var (name, description) in categories)
        {
            var categoryExists = context.ProductCategories.Any(c => c.Name == name);

            if (!categoryExists)
            {
                var category = new ProductCategory(name, description);
                context.ProductCategories.Add(category);
                Console.WriteLine($"✓ Seeded category: {name}");
            }
        }

        await context.SaveChangesAsync();
    }
}
