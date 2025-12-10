using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class UserPointsTransactionConfiguration : IEntityTypeConfiguration<UserPointsTransaction>
{
    public void Configure(EntityTypeBuilder<UserPointsTransaction> builder)
    {
        builder.HasKey(t => t.Id);

        builder.HasOne(t => t.User)
            .WithMany()
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Property(t => t.TransactionType).HasConversion<int>();
        builder.Property(t => t.Source).HasMaxLength(50);
        builder.Property(t => t.Description).HasMaxLength(500);

        builder.HasIndex(t => t.Timestamp);
        builder.HasIndex(t => new { t.UserId, t.Timestamp });
    }
}