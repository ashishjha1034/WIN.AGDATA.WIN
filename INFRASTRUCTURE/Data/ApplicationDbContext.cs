using Microsoft.EntityFrameworkCore;
using System.Data;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Entities.Products;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

namespace WIN.AGDATA.WIN.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<UserRoleAssignment> UserRoleAssignments => Set<UserRoleAssignment>();
    public DbSet<UserPointsAccount> UserPointsAccounts => Set<UserPointsAccount>();
    public DbSet<UserPointsTransaction> UserPointsTransactions => Set<UserPointsTransaction>();
    public DbSet<PasswordResetToken> PasswordResetTokens => Set<PasswordResetToken>();

    public DbSet<ProductCategory> ProductCategories => Set<ProductCategory>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<ProductPricing> ProductPricings => Set<ProductPricing>();
    public DbSet<InventoryItem> InventoryItems => Set<InventoryItem>();

    public DbSet<Event> Events => Set<Event>();
    public DbSet<EventParticipant> EventParticipants => Set<EventParticipant>();
    public DbSet<PrizeTier> PrizeTiers => Set<PrizeTier>();

    public DbSet<Redemption> Redemptions => Set<Redemption>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(UserConfiguration).Assembly);
        
        // Ignore abstract base types & domain events - they should not be persisted
        modelBuilder.Ignore<Domain.Common.DomainEvent>();
    }
}