using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Entities.Products;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.ValueObjects;
using WIN.AGDATA.WIN.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace WIN.AGDATA.WIN.Tests.Api.Setup;

/// <summary>
/// Seed data for integration tests.
/// Provides a realistic data graph including roles, users, products, events, and transactions.
/// </summary>
public static class TestSeedData
{
    // ================================
    // IDs for reference in tests
    // ================================
    
    // Roles
    public static readonly Guid AdminRoleId = Guid.Parse("10000000-0000-0000-0000-000000000001");
    public static readonly Guid EmployeeRoleId = Guid.Parse("10000000-0000-0000-0000-000000000002");
    
    // Users
    public static readonly Guid AdminUserId = Guid.Parse("20000000-0000-0000-0000-000000000001");
    public static readonly Guid EmployeeUserId = Guid.Parse("20000000-0000-0000-0000-000000000002");
    public static readonly Guid SecondEmployeeId = Guid.Parse("20000000-0000-0000-0000-000000000003");
    public static readonly Guid InactiveUserId = Guid.Parse("20000000-0000-0000-0000-000000000004");
    public static readonly Guid UserWithPendingRedemptionId = Guid.Parse("20000000-0000-0000-0000-000000000005");
    public static readonly Guid SecondAdminUserId = Guid.Parse("20000000-0000-0000-0000-000000000006");
    
    // Emails (for login testing)
    public const string AdminEmail = "admin.user@agdata.com";
    public const string EmployeeEmail = "employee.user@agdata.com";
    public const string SecondEmployeeEmail = "second.employee@agdata.com";
    public const string SecondAdminEmail = "second.admin@agdata.com";
    public const string TestPassword = "TestP@ssword123!";
    
    // Product Categories
    public static readonly Guid ElectronicsCategoryId = Guid.Parse("30000000-0000-0000-0000-000000000001");
    public static readonly Guid MerchandiseCategoryId = Guid.Parse("30000000-0000-0000-0000-000000000002");
    
    // Products
    public static readonly Guid ActiveProductId = Guid.Parse("40000000-0000-0000-0000-000000000001");
    public static readonly Guid InactiveProductId = Guid.Parse("40000000-0000-0000-0000-000000000002");
    public static readonly Guid LowStockProductId = Guid.Parse("40000000-0000-0000-0000-000000000003");
    public static readonly Guid ProductWithPendingRedemptionId = Guid.Parse("40000000-0000-0000-0000-000000000004");
    public static readonly Guid ExpensiveProductId = Guid.Parse("40000000-0000-0000-0000-000000000005");
    public const string ActiveProductName = "Active Product";
    
    // Events
    public static readonly Guid DraftEventId = Guid.Parse("50000000-0000-0000-0000-000000000001");
    public static readonly Guid ActiveEventId = Guid.Parse("50000000-0000-0000-0000-000000000002");
    public static readonly Guid CompletedEventId = Guid.Parse("50000000-0000-0000-0000-000000000003");
    public static readonly Guid CancelledEventId = Guid.Parse("50000000-0000-0000-0000-000000000004");
    public static readonly Guid EventWithParticipantsId = Guid.Parse("50000000-0000-0000-0000-000000000005");
    public const string ActiveEventName = "Active Event";
    
    // Redemptions
    public static readonly Guid PendingRedemptionId = Guid.Parse("60000000-0000-0000-0000-000000000001");
    public static readonly Guid ApprovedRedemptionId = Guid.Parse("60000000-0000-0000-0000-000000000002");
    public static readonly Guid DeliveredRedemptionId = Guid.Parse("60000000-0000-0000-0000-000000000003");
    public static readonly Guid RejectedRedemptionId = Guid.Parse("60000000-0000-0000-0000-000000000004");
    public static readonly Guid EmployeeRedemptionId = Guid.Parse("60000000-0000-0000-0000-000000000005");
    public static readonly Guid OtherEmployeeRedemptionId = Guid.Parse("60000000-0000-0000-0000-000000000006");
    public static readonly Guid AnotherPendingRedemptionId = Guid.Parse("60000000-0000-0000-0000-000000000007");
    
    // Transactions
    public static readonly Guid EmployeeTransactionId = Guid.Parse("80000000-0000-0000-0000-000000000001");
    public static readonly Guid OtherEmployeeTransactionId = Guid.Parse("80000000-0000-0000-0000-000000000002");
    
    // Participants
    public static readonly Guid CheckedInParticipantId = Guid.Parse("70000000-0000-0000-0000-000000000001");
    public static readonly Guid NotCheckedInParticipantId = Guid.Parse("70000000-0000-0000-0000-000000000002");
    public static readonly Guid AwardedParticipantId = Guid.Parse("70000000-0000-0000-0000-000000000003");

    public static async Task SeedAsync(ApplicationDbContext context)
    {
        // Check if already seeded
        if (await context.Roles.AnyAsync())
            return;

        // Step 1: Create roles first
        var adminRole = Role.Create("Admin", "Administrator role");
        var employeeRole = Role.Create("Employee", "Employee role");
        SetEntityId(adminRole, AdminRoleId);
        SetEntityId(employeeRole, EmployeeRoleId);
        context.Roles.AddRange(adminRole, employeeRole);
        await context.SaveChangesAsync();

        // Step 2: Create users
        var adminUser = CreateUser(AdminUserId, "Admin", "User", "ADMINUSR1", AdminEmail, true);
        var employeeUser = CreateUser(EmployeeUserId, "Employee", "User", "EMPLEUSR2", EmployeeEmail, true);
        var secondEmployee = CreateUser(SecondEmployeeId, "Second", "Employee", "SECEMP003", SecondEmployeeEmail, true);
        var inactiveUser = CreateUser(InactiveUserId, "Inactive", "User", "INACTUSR4", "inactive.user@agdata.com", false);
        var userWithPendingRedemption = CreateUser(UserWithPendingRedemptionId, "Pending", "User", "PENDRUSR5", "pending.user@agdata.com", true);
        var secondAdmin = CreateUser(SecondAdminUserId, "Second", "Admin", "SECADM006", SecondAdminEmail, true);
        
        context.Users.AddRange(adminUser, employeeUser, secondEmployee, inactiveUser, userWithPendingRedemption, secondAdmin);
        await context.SaveChangesAsync();
        
        // Step 3: Award points after users are saved
        adminUser.PointsAccount.Earn(Points.Create(1000m), "Initial balance", null, AdminUserId);
        employeeUser.PointsAccount.Earn(Points.Create(500m), "Initial balance", null, AdminUserId);
        secondEmployee.PointsAccount.Earn(Points.Create(1500m), "Initial balance", null, AdminUserId);
        userWithPendingRedemption.PointsAccount.Earn(Points.Create(200m), "Initial balance", null, AdminUserId);
        await context.SaveChangesAsync();

        // Step 4: Role assignments
        var adminRoleAssignment = new UserRoleAssignment(adminUser, adminRole, AdminUserId);
        var secondAdminRoleAssignment = new UserRoleAssignment(secondAdmin, adminRole, AdminUserId);
        var employeeRoleAssignment = new UserRoleAssignment(employeeUser, employeeRole, AdminUserId);
        var secondEmployeeRoleAssignment = new UserRoleAssignment(secondEmployee, employeeRole, AdminUserId);
        var inactiveUserRoleAssignment = new UserRoleAssignment(inactiveUser, employeeRole, AdminUserId);
        var pendingUserRoleAssignment = new UserRoleAssignment(userWithPendingRedemption, employeeRole, AdminUserId);
        
        context.UserRoleAssignments.AddRange(
            adminRoleAssignment, 
            secondAdminRoleAssignment, 
            employeeRoleAssignment, 
            secondEmployeeRoleAssignment,
            inactiveUserRoleAssignment,
            pendingUserRoleAssignment);
        await context.SaveChangesAsync();

        // Step 5: Product categories
        var electronicsCategory = new ProductCategory("Electronics", "Electronic items", 1);
        var merchandiseCategory = new ProductCategory("Merchandise", "Company merchandise", 2);
        SetEntityId(electronicsCategory, ElectronicsCategoryId);
        SetEntityId(merchandiseCategory, MerchandiseCategoryId);
        context.ProductCategories.AddRange(electronicsCategory, merchandiseCategory);
        await context.SaveChangesAsync();

        // Step 6: Products - using simplified approach
        var activeProduct = new Product(
            "Active Product",
            "This is an active product with full stock and ready for redemption.",
            ElectronicsCategoryId,
            Points.Create(100m),
            "https://example.com/product1.jpg");
        SetEntityId(activeProduct, ActiveProductId);
        
        var inactiveProduct = new Product(
            "Inactive Product",
            "This product is inactive and should not be available for redemption.",
            MerchandiseCategoryId,
            Points.Create(200m),
            null);
        SetEntityId(inactiveProduct, InactiveProductId);
        
        var lowStockProduct = new Product(
            "Low Stock Item",
            "This product has low stock for testing stock-related warnings.",
            ElectronicsCategoryId,
            Points.Create(50m),
            null);
        SetEntityId(lowStockProduct, LowStockProductId);
        
        var expensiveProduct = new Product(
            "Expensive Product",
            "This is an expensive product for testing point balance validation.",
            ElectronicsCategoryId,
            Points.Create(50000m),
            null);
        SetEntityId(expensiveProduct, ExpensiveProductId);
        
        context.Products.AddRange(activeProduct, inactiveProduct, lowStockProduct, expensiveProduct);
        await context.SaveChangesAsync();
        
        // Adjust stock after save
        activeProduct.Inventory.AdjustStock(50, AdminUserId);
        inactiveProduct.Inventory.AdjustStock(10, AdminUserId);
        lowStockProduct.Inventory.AdjustStock(2, AdminUserId);
        expensiveProduct.Inventory.AdjustStock(10, AdminUserId);
        await context.SaveChangesAsync();
        
        // Deactivate inactive product
        inactiveProduct.Deactivate("Test deactivation", AdminUserId, 0, 0, false);
        await context.SaveChangesAsync();

        // Step 7: Events
        var futureDate = DateTime.UtcNow.AddDays(30);
        var futureRegistrationDeadline = DateTime.UtcNow.AddDays(25);
        
        var draftEvent = new Event(
            "Draft Event",
            "This is a draft event for testing event creation and registration.",
            futureDate,
            Points.Create(5000m),
            "Conference Room A",
            100,
            futureRegistrationDeadline, 
            null);
        SetEntityId(draftEvent, DraftEventId);
        
        var activeEvent = new Event(
            "Active Event",
            "This event is currently active and participants can check in.",
            DateTime.UtcNow.AddDays(1),
            Points.Create(10000m),
            "Main Hall",
            50,
            DateTime.UtcNow.AddDays(-1),
            null);
        SetEntityId(activeEvent, ActiveEventId);
        
        var completedEvent = new Event(
            "Completed Event",
            "This event has been completed with all points distributed.",
            DateTime.UtcNow.AddDays(-10),
            Points.Create(3000m),
            "Meeting Room B",
            30,
            DateTime.UtcNow.AddDays(-15),
            null);
        SetEntityId(completedEvent, CompletedEventId);
        
        var eventWithParticipants = new Event(
            "Event With Participants",
            "This event has registered participants for testing check-in and awards.",
            DateTime.UtcNow.AddDays(2),
            Points.Create(8000m),
            "Training Center",
            10,
            DateTime.UtcNow.AddDays(1),
            null);
        SetEntityId(eventWithParticipants, EventWithParticipantsId);
        
        context.Events.AddRange(draftEvent, activeEvent, completedEvent, eventWithParticipants);
        await context.SaveChangesAsync();
        
        // Activate events using proper domain methods
        activeEvent.Activate(AdminUserId);
        completedEvent.Activate(AdminUserId);
        completedEvent.Complete(AdminUserId);
        eventWithParticipants.Activate(AdminUserId);
        await context.SaveChangesAsync();
        
        // Step 8: Redemptions - Create redemptions with various statuses for workflow tests
        var pendingRedemption = new Redemption(
            UserWithPendingRedemptionId,
            ActiveProductId,
            Points.Create(100m),
            1);
        SetEntityId(pendingRedemption, PendingRedemptionId);
        
        var anotherPendingRedemption = new Redemption(
            UserWithPendingRedemptionId,
            ActiveProductId,
            Points.Create(100m),
            1);
        SetEntityId(anotherPendingRedemption, AnotherPendingRedemptionId);
        
        var approvedRedemption = new Redemption(
            EmployeeUserId,
            ActiveProductId,
            Points.Create(100m),
            1);
        SetEntityId(approvedRedemption, ApprovedRedemptionId);
        approvedRedemption.Approve(AdminUserId, "Approved for testing");
        
        var deliveredRedemption = new Redemption(
            SecondEmployeeId,
            ActiveProductId,
            Points.Create(100m),
            1);
        SetEntityId(deliveredRedemption, DeliveredRedemptionId);
        deliveredRedemption.Approve(AdminUserId, "Approved for delivery test");
        deliveredRedemption.MarkDelivered(AdminUserId, "Delivered for testing");
        
        var rejectedRedemption = new Redemption(
            SecondEmployeeId,
            ActiveProductId,
            Points.Create(100m),
            1);
        SetEntityId(rejectedRedemption, RejectedRedemptionId);
        rejectedRedemption.Reject(AdminUserId, "Rejected for testing");
        
        var employeeRedemption = new Redemption(
            EmployeeUserId,
            ActiveProductId,
            Points.Create(50m),
            1);
        SetEntityId(employeeRedemption, EmployeeRedemptionId);
        
        var otherEmployeeRedemption = new Redemption(
            SecondEmployeeId,
            ActiveProductId,
            Points.Create(50m),
            1);
        SetEntityId(otherEmployeeRedemption, OtherEmployeeRedemptionId);
        
        context.Redemptions.AddRange(
            pendingRedemption,
            anotherPendingRedemption,
            approvedRedemption,
            deliveredRedemption,
            rejectedRedemption,
            employeeRedemption,
            otherEmployeeRedemption);
        await context.SaveChangesAsync();
    }

    private static User CreateUser(Guid id, string firstName, string lastName, string employeeId, string email, bool isActive)
    {
        var user = new User(employeeId, email, firstName, lastName, TestPassword);
        SetEntityId(user, id);
        
        if (!isActive)
            user.Deactivate("Test setup");
        
        return user;
    }

    private static void SetEntityId<T>(T entity, Guid id) where T : class
    {
        // Use reflection to set the Id property which has private setter
        var type = typeof(T);
        while (type != null)
        {
            var idProperty = type.GetProperty("Id", BindingFlags.Public | BindingFlags.Instance);
            if (idProperty != null)
            {
                // Try to get the backing field
                var backingField = type.GetField("<Id>k__BackingField", BindingFlags.NonPublic | BindingFlags.Instance);
                if (backingField != null)
                {
                    backingField.SetValue(entity, id);
                    return;
                }
                
                // Try direct setter (might work with protected setter)
                var setter = idProperty.GetSetMethod(true);
                if (setter != null)
                {
                    setter.Invoke(entity, new object[] { id });
                    return;
                }
            }
            type = type.BaseType;
        }
    }
}
