using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.Domain.Entities.Events;

/// <summary>
/// Represents a user's participation in an event.
/// This is NOT a full aggregate root - it's a child entity managed by the Event aggregate.
/// </summary>
public class EventParticipant
{
    public Guid Id { get; private set; }
    public Guid EventId { get; private set; }
    public Guid UserId { get; private set; }
    public Points PointsAwarded { get; private set; } = Points.Zero;
    public int? Rank { get; private set; }
    public DateTime RegisteredAt { get; private set; }
    public DateTime? AwardedAt { get; private set; }
    public Guid? AwardedBy { get; private set; }
    public AttendanceStatus AttendanceStatus { get; private set; }
    public DateTime? CheckedInAt { get; private set; }

    // Navigation
    public Event Event { get; private set; } = null!;
    public User User { get; private set; } = null!;

    private EventParticipant() { }

    public EventParticipant(Guid eventId, Guid userId)
    {
        Id = Guid.NewGuid();
        EventId = eventId;
        UserId = userId;
        RegisteredAt = DateTime.UtcNow;
        AttendanceStatus = AttendanceStatus.Registered;
        PointsAwarded = Points.Zero;
    }

    /// <summary>
    /// Awards points to this participant with full validation.
    /// </summary>
    /// <param name="points">Number of points to award</param>
    /// <param name="rank">Optional rank position</param>
    /// <param name="awardedBy">ID of the admin awarding points</param>
    /// <exception cref="AlreadyAwardedException">Thrown if participant already has points awarded</exception>
    /// <exception cref="NotCheckedInException">Thrown if participant is not checked-in</exception>
    public void AwardPoints(Points points, int? rank, Guid awardedBy)
    {
        if (points == null || !points.IsPositive())
            throw new ArgumentException("Points to award must be positive", nameof(points));

        // Prevent double-award
        if (PointsAwarded.IsPositive())
            throw new AlreadyAwardedException(UserId, PointsAwarded.Value);

        // Must be checked-in (Attended) to receive awards
        if (AttendanceStatus != AttendanceStatus.Attended)
            throw new NotCheckedInException(UserId, AttendanceStatus.ToString());

        // Validate rank if provided
        if (rank.HasValue && rank.Value <= 0)
            throw new ArgumentException("Rank must be a positive integer", nameof(rank));

        PointsAwarded = points;
        Rank = rank;
        AwardedAt = DateTime.UtcNow;
        AwardedBy = awardedBy;
    }

    /// <summary>
    /// Marks the participant as checked-in (attended).
    /// </summary>
    public void MarkCheckedIn()
    {
        if (AttendanceStatus == AttendanceStatus.Attended)
            return; // Idempotent - already checked in

        CheckedInAt = DateTime.UtcNow;
        AttendanceStatus = AttendanceStatus.Attended;
    }

    /// <summary>
    /// Determines if this participant has been awarded points.
    /// </summary>
    public bool HasBeenAwarded() => PointsAwarded.IsPositive();

    /// <summary>
    /// Determines if this participant is checked-in.
    /// </summary>
    public bool IsCheckedIn() => AttendanceStatus == AttendanceStatus.Attended;
}
