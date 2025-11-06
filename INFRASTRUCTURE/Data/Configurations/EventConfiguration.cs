using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class EventConfiguration : IEntityTypeConfiguration<Event>
{
    public void Configure(EntityTypeBuilder<Event> builder)
    {
        builder.ToTable("Events");

        builder.HasKey(e => e.EventId);

        builder.Property(e => e.EventId)
            .HasMaxLength(20)
            .IsRequired();

        builder.OwnsOne(e => e.Info, info =>
        {
            info.Property(i => i.Name)
                .HasMaxLength(100)
                .IsRequired();

            info.Property(i => i.Description)
                .HasMaxLength(500)
                .IsRequired();

            info.Property(i => i.EventDate)
                .IsRequired();

            info.Property(i => i.CreatedAt)
                .IsRequired();
        });

        builder.OwnsOne(e => e.Status, status =>
        {
            status.Property(s => s.IsActive)
                .IsRequired();

            status.Property(s => s.IsCompleted)
                .IsRequired();

            status.Property(s => s.CreatedAt)
                .IsRequired();

            status.Property(s => s.CompletedAt);

            status.Property(s => s.DeactivatedAt);

            status.Property(s => s.DeactivationReason)
                .HasMaxLength(255);

            status.OwnsMany(s => s.Winners, winner =>
            {
                winner.Property(w => w.EmployeeId)
                    .HasMaxLength(20)
                    .IsRequired();

                winner.Property(w => w.Rank)
                    .IsRequired();

                winner.Property(w => w.WonAt)
                    .IsRequired();

                winner.WithOwner();
            });
        });

        builder.OwnsMany(e => e.Prizes, prize =>
        {
            prize.Property(p => p.Rank)
                .IsRequired();

            prize.Property(p => p.Points)
                .IsRequired();

            prize.Property(p => p.Description)
                .HasMaxLength(255);

            prize.WithOwner();
        });
    }
}
