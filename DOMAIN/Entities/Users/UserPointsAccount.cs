using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.Domain.Entities.Users;

/// <summary>
/// Aggregate managing user points balance and transactions.
/// All point movements (earn/spend) must go through this aggregate to ensure invariants.
/// </summary>
public class UserPointsAccount : Entity<Guid>
{
    public Guid UserId { get; private set; }
    public Points CurrentBalance { get; private set; } = Points.Zero;
    public Points TotalEarned { get; private set; } = Points.Zero;
    public Points TotalRedeemed { get; private set; } = Points.Zero;
    public DateTime LastUpdatedAt { get; private set; }

    // Navigation
    public User User { get; private set; } = null!;

    internal UserPointsAccount() { } // EF

    public UserPointsAccount(Guid userId)
        : base(Guid.NewGuid())
    {
        UserId = userId;
        CurrentBalance = Points.Zero;
        TotalEarned = Points.Zero;
        TotalRedeemed = Points.Zero;
        LastUpdatedAt = DateTime.UtcNow;
    }

    /// <summary>
    /// Earns points (credits the account). Emits PointsEarnedEvent.
    /// </summary>
    /// <param name="points">Points to earn</param>
    /// <param name="source">Source description (e.g., "Event Participation")</param>
    /// <param name="sourceId">Source entity ID</param>
    /// <param name="processedBy">Who processed this earning</param>
    public void Earn(Points points, string source, Guid? sourceId, Guid processedBy)
    {
        if (points == null || !points.IsPositive())
            throw new ArgumentException("Points to earn must be positive", nameof(points));

        ValidationGuards.NotNullOrWhiteSpace(source, nameof(source));

        CurrentBalance += points;
        TotalEarned += points;
        UpdateAudit(processedBy);

        // Raise domain event
        RaiseDomainEvent(new Domain.Events.PointsEarnedEvent(
            UserId, points, CurrentBalance, source, sourceId, processedBy));
    }

    /// <summary>
    /// Spends points (debits the account). Emits PointsSpentEvent.
    /// Throws InsufficientPointsException if balance is insufficient.
    /// </summary>
    /// <param name="points">Points to spend</param>
    /// <param name="purpose">Purpose description (e.g., "Product Redemption")</param>
    /// <param name="purposeId">Purpose entity ID</param>
    /// <param name="processedBy">Who processed this spending</param>
    public void Spend(Points points, string purpose, Guid? purposeId, Guid processedBy)
    {
        if (points == null || !points.IsPositive())
            throw new ArgumentException("Points to spend must be positive", nameof(points));

        ValidationGuards.NotNullOrWhiteSpace(purpose, nameof(purpose));

        if (CurrentBalance < points)
            throw new InsufficientPointsException(points.Value, CurrentBalance.Value);

        CurrentBalance -= points;
        TotalRedeemed += points;
        UpdateAudit(processedBy);

        // Raise domain event
        RaiseDomainEvent(new Domain.Events.PointsSpentEvent(
            UserId, points, CurrentBalance, purpose, purposeId, processedBy));
    }

    /// <summary>
    /// Refunds points (credits back to account). Emits PointsEarnedEvent.
    /// </summary>
    public void Refund(Points points, string reason, Guid? sourceId, Guid processedBy)
    {
        if (points == null || !points.IsPositive())
            throw new ArgumentException("Points to refund must be positive", nameof(points));

        ValidationGuards.NotNullOrWhiteSpace(reason, nameof(reason));

        CurrentBalance += points;
        // Note: Do NOT add to TotalEarned for refunds - only adjust balance
        UpdateAudit(processedBy);

        // Raise domain event
        RaiseDomainEvent(new Domain.Events.PointsEarnedEvent(
            UserId, points, CurrentBalance, $"Refund: {reason}", sourceId, processedBy));
    }

    /// <summary>
    /// Manual adjustment of points (can be positive or negative). Emits PointsAdjustedEvent.
    /// Use for admin corrections only.
    /// </summary>
    public void Adjust(Points adjustmentAmount, string reason, Guid adjustedBy)
    {
        if (adjustmentAmount == null || adjustmentAmount.IsZero())
            throw new ArgumentException("Adjustment amount cannot be zero", nameof(adjustmentAmount));

        ValidationGuards.NotNullOrWhiteSpace(reason, nameof(reason));

        // For negative adjustments, ensure we don't go below zero
        if (adjustmentAmount.Value < 0)
        {
            var absoluteAmount = Points.Create(Math.Abs(adjustmentAmount.Value));
            if (CurrentBalance < absoluteAmount)
                throw new InsufficientPointsException(absoluteAmount.Value, CurrentBalance.Value);
        }

        CurrentBalance = Points.Create(CurrentBalance.Value + adjustmentAmount.Value);
        UpdateAudit(adjustedBy);

        // Raise domain event
        RaiseDomainEvent(new Domain.Events.PointsAdjustedEvent(
            UserId, adjustmentAmount, CurrentBalance, reason, adjustedBy));
    }

    private void UpdateAudit(Guid processedBy)
    {
        LastUpdatedAt = DateTime.UtcNow;
        UpdatedBy = processedBy;
    }

    #region Legacy Methods (for migration compatibility)

    [Obsolete("Use Earn() instead")]
    public void Credit(decimal points, Guid transactionId)
    {
        Earn(Points.Create(points), "Legacy Credit", null, transactionId);
    }

    [Obsolete("Use Spend() instead")]
    public void Debit(decimal points, Guid transactionId)
    {
        Spend(Points.Create(points), "Legacy Debit", null, transactionId);
    }

    [Obsolete("Use Earn() instead")]
    public void AddPoints(decimal points, Guid processedBy)
        => Earn(Points.Create(points), "Manual Addition", null, processedBy);

    [Obsolete("Use Spend() instead")]
    public void SpendPoints(decimal points, Guid processedBy)
        => Spend(Points.Create(points), "Manual Spend", null, processedBy);

    [Obsolete("Use Refund() instead")]
    public void RefundPoints(decimal points, Guid processedBy, string reason)
        => Refund(Points.Create(points), reason, null, processedBy);

    [Obsolete("Use Adjust() instead")]
    public void AdjustPoints(decimal points, Guid processedBy, string reason)
        => Adjust(Points.Create(points), reason, processedBy);

    #endregion
}