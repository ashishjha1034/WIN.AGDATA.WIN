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

    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Event> Events { get; set; } = null!;
    public DbSet<EventParticipant> EventParticipants { get; set; } = null!;
    public DbSet<Product> Products { get; set; } = null!;
    public DbSet<Redemption> Redemptions { get; set; } = null!;
    public DbSet<PointsTransaction> PointsTransactions { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("Users");
            entity.HasKey(u => u.Id);

            entity.Property(u => u.CreatedAt).IsRequired();
            entity.Property(u => u.CreatedBy).HasMaxLength(50).IsRequired();
            entity.Property(u => u.LastModifiedAt).IsRequired(false);
            entity.Property(u => u.LastModifiedBy).HasMaxLength(50).IsRequired(false);
            entity.Property(u => u.Role).IsRequired().HasConversion<int>();

            entity.OwnsOne(u => u.Identity, identity =>
            {
                identity.Property(i => i.EmployeeId).HasColumnName("Identity_EmployeeId").HasMaxLength(20).IsRequired();
                identity.Property(i => i.Email).HasColumnName("Identity_Email").HasMaxLength(255).IsRequired();
                identity.Property(i => i.FirstName).HasColumnName("Identity_FirstName").HasMaxLength(50).IsRequired();
                identity.Property(i => i.LastName).HasColumnName("Identity_LastName").HasMaxLength(50).IsRequired();

                identity.HasIndex(i => i.EmployeeId).IsUnique().HasDatabaseName("IX_Users_EmployeeId");
                identity.HasIndex(i => i.Email).IsUnique().HasDatabaseName("IX_Users_Email");
            });

            entity.OwnsOne(u => u.Status, status =>
            {
                status.Property(s => s.IsActive).HasColumnName("Status_IsActive").IsRequired();
                status.Property(s => s.DeactivatedAt).HasColumnName("Status_DeactivatedAt").IsRequired(false);
                status.Property(s => s.DeactivationReason).HasColumnName("Status_DeactivationReason").HasMaxLength(255).IsRequired(false);
            });

            entity.OwnsOne(u => u.Points, points =>
            {
                points.Property(p => p.EarnedPoints).HasColumnName("Points_EarnedPoints").IsRequired();
                points.Property(p => p.SpentPoints).HasColumnName("Points_SpentPoints").IsRequired();
                points.Property(p => p.CurrentBalance).HasColumnName("Points_CurrentBalance").IsRequired();
            });
        });

      
        modelBuilder.Entity<Event>(entity =>
        {
            entity.ToTable("Events");
            entity.HasKey(e => e.EventId);
            entity.Property(e => e.EventId).HasMaxLength(20).IsRequired();
            entity.Property(e => e.CreatedAt).IsRequired();
            entity.Property(e => e.CreatedBy).HasMaxLength(50).IsRequired();
            entity.Property(e => e.LastModifiedAt).IsRequired(false);
            entity.Property(e => e.LastModifiedBy).HasMaxLength(50).IsRequired(false);

            entity.OwnsOne(e => e.Info, info =>
            {
                info.Property(i => i.Name).HasColumnName("Info_Name").HasMaxLength(100).IsRequired();
                info.Property(i => i.Description).HasColumnName("Info_Description").HasMaxLength(500).IsRequired();
                info.Property(i => i.EventDate).HasColumnName("Info_EventDate").IsRequired();
                info.Property(i => i.CreatedAt).HasColumnName("Info_CreatedAt").IsRequired();
                info.WithOwner().HasForeignKey("EventId");
            });

            entity.OwnsOne(e => e.Status, status =>
            {
                status.Property(s => s.IsActive).HasColumnName("Status_IsActive").IsRequired();
                status.Property(s => s.IsCompleted).HasColumnName("Status_IsCompleted").IsRequired();
                status.Property(s => s.CompletedAt).HasColumnName("Status_CompletedAt").IsRequired(false);
                status.Property(s => s.DeactivationReason).HasColumnName("Status_DeactivationReason").HasMaxLength(255).IsRequired(false);
                status.Property(s => s.DeactivatedAt).HasColumnName("Status_DeactivatedAt").IsRequired(false);
                status.Property(s => s.CreatedAt).HasColumnName("Status_CreatedAt").IsRequired();

                
                status.OwnsMany(s => s.Winners, winner =>
                {
                    winner.ToTable("Winner"); 
                    winner.Property<int>("Id").ValueGeneratedOnAdd();
                    winner.HasKey("EventStatusEventId", "Id");

                    
                    winner.Property(w => w.EmployeeId).HasColumnName("EmployeeId").HasMaxLength(20).IsRequired();
                    winner.Property(w => w.Rank).HasColumnName("Rank").IsRequired();
                    winner.Property(w => w.WonAt).HasColumnName("WonAt").IsRequired();

                    
                    winner.WithOwner().HasForeignKey("EventStatusEventId");
                });
            });

           
            entity.OwnsMany(e => e.Prizes, prizes =>
            {
                prizes.ToTable("PrizeTier");
                prizes.Property<int>("Id").ValueGeneratedOnAdd();
                prizes.HasKey("Id", "EventId");

                prizes.Property(p => p.Rank).HasColumnName("Rank").IsRequired();
                prizes.Property(p => p.Points).HasColumnName("Points").IsRequired();
                prizes.Property(p => p.Description).HasColumnName("Description").HasMaxLength(255).IsRequired(false);

                
                prizes.WithOwner().HasForeignKey("EventId");
            });
        });

        
        modelBuilder.Entity<EventParticipant>(entity =>
        {
            entity.ToTable("EventParticipants");
            entity.HasKey(ep => new { ep.EventId, ep.UserId });
            entity.Property(ep => ep.EventId).HasMaxLength(20).IsRequired();
            entity.Property(ep => ep.ParticipatedAt).IsRequired();
            entity.Property(ep => ep.PointsAwarded).IsRequired();
            entity.Property(ep => ep.Rank).IsRequired(false);

            entity.HasOne<Event>().WithMany().HasForeignKey(ep => ep.EventId).OnDelete(DeleteBehavior.Cascade);
            entity.HasOne<User>().WithMany().HasForeignKey(ep => ep.UserId).OnDelete(DeleteBehavior.Cascade);

            entity.HasIndex(ep => ep.UserId).HasDatabaseName("IX_EventParticipants_UserId");
        });

        
        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("Products");
            entity.HasKey(p => p.Id);
            entity.Property(p => p.Id).ValueGeneratedOnAdd();
            entity.Property(p => p.IsActive).IsRequired();
            entity.Property(p => p.CreatedAt).IsRequired();
            entity.Property(p => p.CreatedBy).HasMaxLength(50).IsRequired();
            entity.Property(p => p.LastModifiedAt).IsRequired(false);
            entity.Property(p => p.LastModifiedBy).HasMaxLength(50).IsRequired(false);

            entity.OwnsOne(p => p.Identity, identity =>
            {
                identity.Property(i => i.Name).HasColumnName("Identity_Name").IsRequired();
                identity.Property(i => i.Description).HasColumnName("Identity_Description").IsRequired();
                identity.WithOwner().HasForeignKey("ProductId");
            });

            entity.OwnsOne(p => p.Pricing, pricing =>
            {
                pricing.Property(pp => pp.RequiredPoints).HasColumnName("Pricing_RequiredPoints").IsRequired();
                pricing.Property(pp => pp.LastUpdated).HasColumnName("Pricing_LastUpdated").IsRequired();
                pricing.WithOwner().HasForeignKey("ProductId");
            });

            entity.OwnsOne(p => p.Inventory, inventory =>
            {
                inventory.Property(pi => pi.StockQuantity).HasColumnName("Inventory_StockQuantity").IsRequired();
                inventory.Property(pi => pi.LastStockUpdate).HasColumnName("Inventory_LastStockUpdate").IsRequired(false);
                inventory.WithOwner().HasForeignKey("ProductId");
            });
        });

       
        modelBuilder.Entity<Redemption>(entity =>
        {
            entity.ToTable("Redemptions");
            entity.HasKey(r => r.Id);
            entity.Property(r => r.EmployeeId).HasMaxLength(20).IsRequired();
            entity.Property(r => r.PointsCost).IsRequired();
            entity.Property(r => r.ProductId).IsRequired();
            entity.Property(r => r.RequestedAt).IsRequired();
            entity.Property(r => r.CreatedBy).HasMaxLength(50).IsRequired();

            
            entity.OwnsOne(r => r.Status, status =>
            {
                
                status.WithOwner().HasForeignKey("Id");
                status.Property(s => s.Value).HasColumnName("Status_Value").IsRequired();
                status.Property(s => s.ApprovedAt).HasColumnName("Status_ApprovedAt").IsRequired(false);
                status.Property(s => s.DeliveredAt).HasColumnName("Status_DeliveredAt").IsRequired(false);
                status.Property(s => s.RejectionReason).HasColumnName("Status_RejectionReason").IsRequired(false);
            });
        });

        
        modelBuilder.Entity<PointsTransaction>(entity =>
        {
            entity.ToTable("PointsTransactions");
            entity.HasKey(pt => pt.Id);
            entity.Property(pt => pt.EmployeeId).HasMaxLength(20).IsRequired();
            entity.Property(pt => pt.Points).IsRequired();
            entity.Property(pt => pt.Type).IsRequired();
            entity.Property(pt => pt.Description).HasMaxLength(500).IsRequired();
            entity.Property(pt => pt.EventId).HasMaxLength(20).IsRequired(false);
            entity.Property(pt => pt.RedemptionId).IsRequired(false);
            entity.Property(pt => pt.TransactionDate).IsRequired();
        });
    }
}
