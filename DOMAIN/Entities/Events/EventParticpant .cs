namespace WIN.AGDATA.WIN.Domain.Entities.Events;

public class EventParticipant
{
    public Guid Id { get; private set; }
    public Guid EventId { get; private set; }
    public Guid UserId { get; private set; }
    public int PointsAwarded { get; private set; }
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

    public void AwardPoints(int points, int? rank, Guid awardedBy)
    {
        PointsAwarded = points;
        EventRank = rank;
        AwardedAt = DateTime.UtcNow;
        AwardedBy = awardedBy;
        AttendanceStatus = AttendanceStatus.Attended;
    }

    public void MarkCheckedIn()
    {
        CheckedInAt = DateTime.UtcNow;
        AttendanceStatus = AttendanceStatus.Attended;
    }
}