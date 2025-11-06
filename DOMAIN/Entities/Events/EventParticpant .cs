namespace WIN.AGDATA.WIN.Domain.Entities.Events;

public class EventParticipant
{
    public string EventId { get; set; }
    public Guid UserId { get; set; }
    public int? Rank { get; set; }
    public int PointsAwarded { get; set; }
    public DateTime ParticipatedAt { get; set; }
}
