using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.Entities.Users;

namespace WIN.AGDATA.WIN.Domain.Entities.Transactions;

public class UserPointsTransaction : Entity<Guid>
{
    public Guid Id { get; private set; }
    public Guid UserId { get; private set; }
    public int Points { get; private set; } // positive = earn, negative = spend
    public PointsTransactionType TransactionType { get; private set; }
    public string Source { get; private set; } = null!;
    public Guid? SourceId { get; private set; }
    public string Description { get; private set; } = null!;
    public int BalanceAfter { get; private set; }
    public DateTime Timestamp { get; private set; }
    public Guid? ProcessedBy { get; private set; }

    public User User { get; private set; } = null!;

    private UserPointsTransaction() { }

    public UserPointsTransaction(
        Guid userId,
        int points,
        PointsTransactionType type,
        string source,
        Guid? sourceId,
        string description,
        int balanceAfter,
        Guid processedBy)
    {
        Id = Guid.NewGuid();
        UserId = userId;
        Points = points;
        TransactionType = type;
        Source = source;
        SourceId = sourceId;
        Description = description;
        BalanceAfter = balanceAfter;
        Timestamp = DateTime.UtcNow;
        ProcessedBy = processedBy;
    }
}