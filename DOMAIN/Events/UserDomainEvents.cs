using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.Domain.Events;

/// <summary>
/// Event raised when points are earned by a user.
/// </summary>
public sealed record PointsEarnedEvent : DomainEvent
{
    public Guid UserId { get; }
    public Points PointsEarned { get; }
    public Points BalanceAfter { get; }
    public string Source { get; }
    public Guid? SourceId { get; }
    public Guid ProcessedBy { get; }

    public PointsEarnedEvent(Guid userId, Points pointsEarned, Points balanceAfter, string source, Guid? sourceId, Guid processedBy)
    {
        UserId = userId;
        PointsEarned = pointsEarned;
        BalanceAfter = balanceAfter;
        Source = source;
        SourceId = sourceId;
        ProcessedBy = processedBy;
    }
}

/// <summary>
/// Event raised when points are spent by a user.
/// </summary>
public sealed record PointsSpentEvent : DomainEvent
{
    public Guid UserId { get; }
    public Points PointsSpent { get; }
    public Points BalanceAfter { get; }
    public string Purpose { get; }
    public Guid? PurposeId { get; }
    public Guid ProcessedBy { get; }

    public PointsSpentEvent(Guid userId, Points pointsSpent, Points balanceAfter, string purpose, Guid? purposeId, Guid processedBy)
    {
        UserId = userId;
        PointsSpent = pointsSpent;
        BalanceAfter = balanceAfter;
        Purpose = purpose;
        PurposeId = purposeId;
        ProcessedBy = processedBy;
    }
}

/// <summary>
/// Event raised when a user is deactivated.
/// </summary>
public sealed record UserDeactivatedEvent : DomainEvent
{
    public Guid UserId { get; }
    public string EmployeeId { get; }
    public string Reason { get; }
    public Guid DeactivatedBy { get; }

    public UserDeactivatedEvent(Guid userId, string employeeId, string reason, Guid deactivatedBy)
    {
        UserId = userId;
        EmployeeId = employeeId;
        Reason = reason;
        DeactivatedBy = deactivatedBy;
    }
}

/// <summary>
/// Event raised when points are manually adjusted for a user.
/// </summary>
public sealed record PointsAdjustedEvent : DomainEvent
{
    public Guid UserId { get; }
    public Points AdjustmentAmount { get; }
    public Points BalanceAfter { get; }
    public string Reason { get; }
    public Guid AdjustedBy { get; }

    public PointsAdjustedEvent(Guid userId, Points adjustmentAmount, Points balanceAfter, string reason, Guid adjustedBy)
    {
        UserId = userId;
        AdjustmentAmount = adjustmentAmount;
        BalanceAfter = balanceAfter;
        Reason = reason;
        AdjustedBy = adjustedBy;
    }
}
