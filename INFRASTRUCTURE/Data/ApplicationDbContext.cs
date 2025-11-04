using Microsoft.EntityFrameworkCore;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Entities.Products;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.Entities.Users;

namespace WIN.AGDATA.WIN.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Event> Events { get; set; }
    public DbSet<EventParticipant> EventParticipants { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Redemption> Redemptions { get; set; }
    public DbSet<PointsTransaction> PointsTransactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // USER
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.OwnsOne(u => u.Identity);
            entity.OwnsOne(u => u.Status);
            entity.OwnsOne(u => u.Points);
        });

        // EVENT
        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.EventId);
            entity.Property(e => e.EventId).HasMaxLength(20);
            entity.OwnsOne(e => e.Info);
            entity.OwnsOne(e => e.Status, status =>
            {
                status.OwnsMany(s => s.Winners);
            });
            entity.OwnsMany(e => e.Prizes, prizes =>
            {
                prizes.WithOwner().HasForeignKey("EventId");
                prizes.HasKey("Id", "EventId");
            });
        });

        // PRODUCT
        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(p => p.Id);
            entity.OwnsOne(p => p.Identity);
            entity.OwnsOne(p => p.Pricing);
            entity.OwnsOne(p => p.Inventory);
            // Do NOT try to .OwnsOne for IsActive; it's just a bool.
        });

        // REDEMPTION
        modelBuilder.Entity<Redemption>(entity =>
        {
            entity.HasKey(r => r.Id);
            entity.OwnsOne(r => r.Status);
        });

        // POINTS TRANSACTION
        modelBuilder.Entity<PointsTransaction>(entity =>
        {
            entity.HasKey(pt => pt.Id);
            entity.Property(pt => pt.EmployeeId).HasMaxLength(20);
            entity.Property(pt => pt.EventId).HasMaxLength(20);
            entity.Property(pt => pt.Description).HasMaxLength(500);
        });

        // EVENT PARTICIPANT
        modelBuilder.Entity<EventParticipant>(entity =>
        {
            entity.HasKey(ep => new { ep.EventId, ep.UserId });
            entity.Property(ep => ep.EventId).HasMaxLength(20);
            entity.HasOne<Event>().WithMany().HasForeignKey(ep => ep.EventId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne<User>().WithMany().HasForeignKey(ep => ep.UserId).OnDelete(DeleteBehavior.Cascade);
        });
    }
}
