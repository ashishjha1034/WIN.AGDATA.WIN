using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Events;

public class EventParticipant
{
    public Guid Id { get; private set; }
    public Guid EventId { get; private set; }
    public Guid UserId { get; private set; }
    public decimal PointsAwarded { get; private set; }
    public int? EventRank { get; private set; }
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
    }

    /// <summary>
    /// Awards points to this participant.
    /// </summary>
    /// <param name="points">Number of points to award</param>
    /// <param name="rank">Optional rank position</param>
    /// <param name="awardedBy">ID of the admin awarding points</param>
    /// <exception cref="DomainException">Thrown if participant is not checked-in or already has points awarded</exception>
    public void AwardPoints(decimal points, int? rank, Guid awardedBy)
    {
        // Prevent double-award
        if (PointsAwarded > 0)
            throw new DomainException($"Points have already been awarded to this participant. Current points: {PointsAwarded}. Cannot award again.");

        // Must be checked-in (Attended) to receive awards
        if (AttendanceStatus != AttendanceStatus.Attended)
            throw new DomainException($"Participant must be checked-in to receive points. Current status: {AttendanceStatus}.");

        PointsAwarded = points;
        EventRank = rank;
        AwardedAt = DateTime.UtcNow;
        AwardedBy = awardedBy;
    }

    /// <summary>
    /// Marks the participant as checked-in (attended).
    /// </summary>
    public void MarkCheckedIn()
    {
        CheckedInAt = DateTime.UtcNow;
        AttendanceStatus = AttendanceStatus.Attended;
    }
}