using BCrypt.Net;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Domain.Entities.Products;
using WIN.AGDATA.WIN.Domain.ValueObjects;
using WIN.AGDATA.WIN.Domain.Enums;
using Microsoft.EntityFrameworkCore;

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

            // Seed Sample Products
            await SeedSampleProductsAsync(context);

            // Seed Sample Events
            await SeedSampleEventsAsync(context);

            // Seed Sample Transactions
            await SeedSampleTransactionsAsync(context);

            // Seed Sample Redemptions
            await SeedSampleRedemptionsAsync(context);

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
        var user = await context.Users
            .Include(u => u.Roles).ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Email.Value == adminEmail);

        if (user == null)
        {
            try
            {
                var email = EmailAddress.Create(adminEmail);
                user = new User(
                    employeeId: "ADMIN001",
                    email: email,
                    firstName: "Admin",
                    lastName: "User",
                    password: "Admin@123456"
                );

                context.Users.Add(user);
                await context.SaveChangesAsync();
                Console.WriteLine($"✓ Created admin user: {adminEmail}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"✗ Admin user creation failed: {ex.Message}");
                return;
            }
        }

        // Ensure user has Admin role
        var adminRole = await context.Roles.FirstOrDefaultAsync(r => r.Name == "Admin");
        if (adminRole == null)
        {
            Console.WriteLine("✗ Admin role not found");
            return;
        }

        if (!user.Roles.Any(ur => ur.RoleId == adminRole.Id))
        {
            user.AssignRole(adminRole, Guid.Empty);
            await context.SaveChangesAsync();
            Console.WriteLine($"✓ Assigned Admin role to user: {adminEmail}");
        }
        else
        {
            Console.WriteLine($"✓ Admin user already has Admin role: {adminEmail}");
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

    private static async Task SeedSampleProductsAsync(ApplicationDbContext context)
    {
        if (context.Products.Any())
            return; // Already seeded

        var categories = await context.ProductCategories.ToListAsync();
        if (!categories.Any())
            return;

        var products = new[]
        {
            ("Corporate Mug", "Branded coffee mug", categories.First(c => c.Name == "Mugs").Id, 150, null as string),
            ("Thank You Card", "Professional thank you card", categories.First(c => c.Name == "Greeting Cards").Id, 25, null as string),
            ("Gift Voucher $50", "$50 gift voucher for local stores", categories.First(c => c.Name == "Vouchers").Id, 500, null as string),
            ("Wireless Mouse", "Ergonomic wireless mouse", categories.First(c => c.Name == "Gadgets").Id, 200, null as string),
            ("Notebook Set", "Premium notebook and pen set", categories.First(c => c.Name == "Stationery").Id, 75, null as string)
        };

        foreach (var (name, desc, categoryId, points, imageUrl) in products)
        {
            var product = new Product(name, desc, categoryId, points, imageUrl);
            context.Products.Add(product);
            Console.WriteLine($"✓ Seeded product: {name}");
        }

        await context.SaveChangesAsync();
    }

    private static async Task SeedSampleEventsAsync(ApplicationDbContext context)
    {
        if (context.Events.Any())
            return; // Already seeded

        var adminUser = await context.Users.FirstOrDefaultAsync(u => u.Email.Value == "admin@agdata.com");
        if (adminUser == null)
            return;

        var events = new[]
        {
            ("Q4 Team Building", "End of year team building event", DateTime.UtcNow.AddDays(30), "Conference Room A", 1000, EventStatus.Active),
            ("Customer Appreciation Day", "Special event for top customers", DateTime.UtcNow.AddDays(15), "Main Hall", 2000, EventStatus.Active),
            ("Product Launch Event", "New product line launch celebration", DateTime.UtcNow.AddDays(-10), "Auditorium", 1500, EventStatus.Completed),
            ("Holiday Charity Drive", "Annual charity event", DateTime.UtcNow.AddDays(-30), "Lobby", 800, EventStatus.Completed)
        };

        foreach (var (name, desc, date, location, points, status) in events)
        {
            var evt = new Event(name, desc, date, points, location);
            if (status == EventStatus.Active)
                evt.Start();
            else if (status == EventStatus.Completed)
                evt.Complete();
            context.Events.Add(evt);
            Console.WriteLine($"✓ Seeded event: {name}");
        }

        await context.SaveChangesAsync();
    }

    private static async Task SeedSampleTransactionsAsync(ApplicationDbContext context)
    {
        if (context.UserPointsTransactions.Any())
            return; // Already seeded

        var adminUser = await context.Users.FirstOrDefaultAsync(u => u.Email.Value == "admin@agdata.com");
        if (adminUser == null)
            return;

        var transactions = new[]
        {
            (adminUser.Id, 500, PointsTransactionType.Earned, "Performance", null as Guid?, "Performance bonus", 500, adminUser.Id),
            (adminUser.Id, 250, PointsTransactionType.Earned, "Team", null as Guid?, "Team contribution", 750, adminUser.Id),
            (adminUser.Id, 300, PointsTransactionType.Earned, "Project", null as Guid?, "Project completion", 1050, adminUser.Id),
            (adminUser.Id, 150, PointsTransactionType.Earned, "Recognition", null as Guid?, "Monthly recognition", 1200, adminUser.Id),
            (adminUser.Id, 200, PointsTransactionType.Earned, "Feedback", null as Guid?, "Customer feedback", 1400, adminUser.Id)
        };

        foreach (var (userId, points, type, source, sourceId, desc, balanceAfter, processedBy) in transactions)
        {
            var transaction = new UserPointsTransaction(userId, points, type, source, sourceId, desc, balanceAfter, processedBy);
            context.UserPointsTransactions.Add(transaction);
            Console.WriteLine($"✓ Seeded transaction: {desc} ({points} points)");
        }

        await context.SaveChangesAsync();
    }

    private static async Task SeedSampleRedemptionsAsync(ApplicationDbContext context)
    {
        if (context.Redemptions.Any())
            return; // Already seeded

        var adminUser = await context.Users.FirstOrDefaultAsync(u => u.Email.Value == "admin@agdata.com");
        var products = await context.Products.ToListAsync();

        if (adminUser == null || !products.Any())
            return;

        var redemptions = new[]
        {
            (adminUser.Id, products.First().Id, 150, 1, RedemptionStatus.Pending, adminUser.Id),
            (adminUser.Id, products.Skip(1).First().Id, 25, 2, RedemptionStatus.Approved, adminUser.Id),
            (adminUser.Id, products.Skip(2).First().Id, 500, 1, RedemptionStatus.Delivered, adminUser.Id)
        };

        foreach (var (userId, productId, points, qty, status, processedBy) in redemptions)
        {
            var redemption = new Redemption(userId, productId, points, qty);
            if (status == RedemptionStatus.Approved)
                redemption.Approve(processedBy);
            else if (status == RedemptionStatus.Delivered)
            {
                redemption.Approve(processedBy);
                // Note: Delivered status would need additional method, for now just approve
            }
            context.Redemptions.Add(redemption);
            Console.WriteLine($"✓ Seeded redemption: {status} ({points} points)");
        }

        await context.SaveChangesAsync();
    }
}
