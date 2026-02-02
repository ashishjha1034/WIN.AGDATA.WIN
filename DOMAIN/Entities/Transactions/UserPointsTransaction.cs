using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Transactions;

public class UserPointsTransaction : Entity<Guid>
{
    public Guid UserId { get; private set; }
    public decimal Points { get; private set; } // positive = earn, negative = spend
    public PointsTransactionType TransactionType { get; private set; }
    public string Source { get; private set; } = null!;
    public Guid? SourceId { get; private set; }
    public string Description { get; private set; } = null!;
    public decimal BalanceAfter { get; private set; }
    public DateTime Timestamp { get; private set; }
    public Guid? ProcessedBy { get; private set; }

    public User User { get; private set; } = null!;

    private UserPointsTransaction() { }

    public UserPointsTransaction(
        Guid userId,
        decimal points,
        PointsTransactionType type,
        string source,
        Guid? sourceId,
        string description,
        decimal balanceAfter,
        Guid processedBy)
        : base(Guid.NewGuid())
    {
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

    // Factory method for easy creation
    public static UserPointsTransaction CreateEarned(
        Guid userId,
        decimal points,
        string source,
        Guid? sourceId,
        string description,
        decimal balanceAfter,
        Guid processedBy)
        => new(userId, points, PointsTransactionType.Earned, source, sourceId, description, balanceAfter, processedBy);

    public static UserPointsTransaction CreateRedeemed(
        Guid userId,
        decimal points,
        string source,
        Guid? sourceId,
        string description,
        decimal balanceAfter,
        Guid processedBy)
        => new(userId, points, PointsTransactionType.Redeemed, source, sourceId, description, balanceAfter, processedBy);

    public static UserPointsTransaction CreateAdjusted(
        Guid userId,
        decimal points,
        string source,
        Guid? sourceId,
        string description,
        decimal balanceAfter,
        Guid processedBy)
    {
        var transactionType = points > 0 ? PointsTransactionType.Earned : PointsTransactionType.Redeemed;
        var absPoints = Math.Abs(points);
        return new(userId, absPoints, transactionType, source, sourceId, description, balanceAfter, processedBy);
    }

    public static UserPointsTransaction CreateRefunded(
        Guid userId,
        decimal points,
        string source,
        Guid? sourceId,
        string description,
        decimal balanceAfter,
        Guid processedBy)
        => new(userId, points, PointsTransactionType.Refunded, source, sourceId, description, balanceAfter, processedBy);
}