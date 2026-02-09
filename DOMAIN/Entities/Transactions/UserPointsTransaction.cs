using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.Domain.Entities.Transactions;

public class UserPointsTransaction : Entity<Guid>
{
    public Guid UserId { get; private set; }
    public Points Points { get; private set; } = ValueObjects.Points.Zero;
    public PointsTransactionType TransactionType { get; private set; }
    public string Source { get; private set; } = null!;
    public Guid? SourceId { get; private set; }
    public string Description { get; private set; } = null!;
    public Points BalanceAfter { get; private set; } = ValueObjects.Points.Zero;
    public DateTime Timestamp { get; private set; }
    public Guid? ProcessedBy { get; private set; }

    public User User { get; private set; } = null!;

    private UserPointsTransaction() { }

    public UserPointsTransaction(
        Guid userId,
        Points points,
        PointsTransactionType type,
        string source,
        Guid? sourceId,
        string description,
        Points balanceAfter,
        Guid processedBy)
        : base(Guid.NewGuid())
    {
        UserId = userId;
        Points = points ?? throw new ArgumentNullException(nameof(points));
        TransactionType = type;
        Source = source;
        SourceId = sourceId;
        Description = description;
        BalanceAfter = balanceAfter ?? throw new ArgumentNullException(nameof(balanceAfter));
        Timestamp = DateTime.UtcNow;
        ProcessedBy = processedBy;
    }

    // Factory method for easy creation
    public static UserPointsTransaction CreateEarned(
        Guid userId,
        Points points,
        string source,
        Guid? sourceId,
        string description,
        Points balanceAfter,
        Guid processedBy)
        => new(userId, points, PointsTransactionType.Earned, source, sourceId, description, balanceAfter, processedBy);

    public static UserPointsTransaction CreateRedeemed(
        Guid userId,
        Points points,
        string source,
        Guid? sourceId,
        string description,
        Points balanceAfter,
        Guid processedBy)
        => new(userId, points, PointsTransactionType.Redeemed, source, sourceId, description, balanceAfter, processedBy);

    public static UserPointsTransaction CreateAdjusted(
        Guid userId,
        Points points,
        string source,
        Guid? sourceId,
        string description,
        Points balanceAfter,
        Guid processedBy)
        => new(userId, points, PointsTransactionType.Adjusted, source, sourceId, description, balanceAfter, processedBy);

    public static UserPointsTransaction CreateRefunded(
        Guid userId,
        Points points,
        string source,
        Guid? sourceId,
        string description,
        Points balanceAfter,
        Guid processedBy)
        => new(userId, points, PointsTransactionType.Refunded, source, sourceId, description, balanceAfter, processedBy);
}