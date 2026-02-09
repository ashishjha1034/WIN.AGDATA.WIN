using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.Domain.Events;

/// <summary>
/// Event raised when a participant is successfully registered for an event.
/// </summary>
public sealed record ParticipantRegisteredEvent : DomainEvent
{
    public Guid AggregateId { get; }
    public Guid UserId { get; }
    public DateTime RegisteredAtUtc { get; }

    public ParticipantRegisteredEvent(Guid eventId, Guid userId, DateTime registeredAtUtc)
    {
        AggregateId = eventId;
        UserId = userId;
        RegisteredAtUtc = registeredAtUtc;
    }
}

/// <summary>
/// Event raised when a participant checks in to an event.
/// </summary>
public sealed record ParticipantCheckedInEvent : DomainEvent
{
    public Guid AggregateId { get; }
    public Guid UserId { get; }
    public Guid CheckedInBy { get; }
    public DateTime CheckedInAtUtc { get; }

    public ParticipantCheckedInEvent(Guid eventId, Guid userId, Guid checkedInBy, DateTime checkedInAtUtc)
    {
        AggregateId = eventId;
        UserId = userId;
        CheckedInBy = checkedInBy;
        CheckedInAtUtc = checkedInAtUtc;
    }
}

/// <summary>
/// Event raised when points are awarded to a participant.
/// </summary>
public sealed record PointsAwardedEvent : DomainEvent
{
    public Guid AggregateId { get; }
    public Guid UserId { get; }
    public Points PointsAwarded { get; }
    public int? Rank { get; }
    public Guid AwardedBy { get; }
    public DateTime AwardedAtUtc { get; }

    public PointsAwardedEvent(Guid eventId, Guid userId, Points pointsAwarded, int? rank, Guid awardedBy, DateTime awardedAtUtc)
    {
        AggregateId = eventId;
        UserId = userId;
        PointsAwarded = pointsAwarded;
        Rank = rank;
        AwardedBy = awardedBy;
        AwardedAtUtc = awardedAtUtc;
    }
}

/// <summary>
/// Event raised when an event is completed.
/// </summary>
public sealed record EventCompletedEvent : DomainEvent
{
    public Guid AggregateId { get; }
    public string EventName { get; }
    public Guid CompletedBy { get; }
    public DateTime CompletedAtUtc { get; }
    public bool WasAutoCompleted { get; }

    public EventCompletedEvent(Guid eventId, string eventName, Guid completedBy, DateTime completedAtUtc, bool wasAutoCompleted = false)
    {
        AggregateId = eventId;
        EventName = eventName;
        CompletedBy = completedBy;
        CompletedAtUtc = completedAtUtc;
        WasAutoCompleted = wasAutoCompleted;
    }
}

/// <summary>
/// Event raised when an event is cancelled.
/// </summary>
public sealed record EventCancelledEvent : DomainEvent
{
    public Guid AggregateId { get; }
    public string EventName { get; }
    public Guid CancelledBy { get; }
    public string? Reason { get; }
    public DateTime CancelledAtUtc { get; }

    public EventCancelledEvent(Guid eventId, string eventName, Guid cancelledBy, string? reason, DateTime cancelledAtUtc)
    {
        AggregateId = eventId;
        EventName = eventName;
        CancelledBy = cancelledBy;
        Reason = reason;
        CancelledAtUtc = cancelledAtUtc;
    }
}
