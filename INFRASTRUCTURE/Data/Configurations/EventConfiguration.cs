using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class EventConfiguration : IEntityTypeConfiguration<Event>
{
    public void Configure(EntityTypeBuilder<Event> builder)
    {
        builder.HasKey(e => e.Id);

        builder.Property(e => e.Name).HasMaxLength(200).IsRequired();
        builder.Property(e => e.Description).HasMaxLength(2000);
        builder.Property(e => e.Location).HasMaxLength(500);
        builder.Property(e => e.BannerImageUrl).HasMaxLength(1000);

        builder.Property(e => e.Status).HasConversion<int>();

        // Pool tracking - use decimal(18,2) for 2 decimal places
        builder.Property(e => e.TotalPointsPool)
            .HasPrecision(18, 2)
            .HasConversion(
                v => v != null ? v.Value : (decimal?)null,
                v => v.HasValue ? Points.Create(v.Value) : null);
        
        builder.Property(e => e.DistributedPoints)
            .HasPrecision(18, 2)
            .HasConversion(
                v => v.Value,
                v => Points.Create(v));
        
        // Optimistic concurrency for pool operations
        builder.Property(e => e.RowVersion)
            .IsRowVersion()
            .IsConcurrencyToken();

        builder.HasMany(e => e.Participants)
            .WithOne(ep => ep.Event)
            .HasForeignKey(ep => ep.EventId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}