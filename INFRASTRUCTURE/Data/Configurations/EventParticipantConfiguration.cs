using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class EventParticipantConfiguration : IEntityTypeConfiguration<EventParticipant>
{
    public void Configure(EntityTypeBuilder<EventParticipant> builder)
    {
        builder.HasKey(ep => ep.Id);

        builder.HasOne(ep => ep.User)
            .WithMany()
            .HasForeignKey(ep => ep.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Property(ep => ep.AttendanceStatus).HasConversion<int>();

        // Points awarded - use decimal(18,2) for 2 decimal places
        builder.Property(ep => ep.PointsAwarded).HasPrecision(18, 2);

        builder.HasIndex(ep => new { ep.EventId, ep.UserId }).IsUnique();
    }
}