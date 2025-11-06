using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;

namespace WIN.AGDATA.WIN.Infrastructure.Data.Configurations;

public class TransactionConfiguration : IEntityTypeConfiguration<PointsTransaction>
{
    public void Configure(EntityTypeBuilder<PointsTransaction> builder)
    {
        builder.ToTable("PointsTransactions"); // match migrations/snapshot
        builder.HasKey(t => t.Id);

        builder.Property(t => t.EmployeeId).HasMaxLength(20).IsRequired();
        builder.Property(t => t.Description).HasMaxLength(500).IsRequired();
        builder.Property(t => t.EventId).HasMaxLength(20).IsRequired(false);
        builder.Property(t => t.RedemptionId).IsRequired(false);
        builder.Property(t => t.TransactionDate).IsRequired();
    }
}
