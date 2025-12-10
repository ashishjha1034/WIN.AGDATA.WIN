namespace WIN.AGDATA.WIN.Domain.Entities.Events;

public class PrizeTier
{
    public Guid Id { get; private set; }
    public Guid EventId { get; private set; }
    public int Rank { get; private set; }
    public int Points { get; private set; }

    public Event Event { get; private set; } = null!;

    private PrizeTier() { }

    public PrizeTier(Guid eventId, int rank, int points)
    {
        Id = Guid.NewGuid();
        EventId = eventId;
        Rank = rank;
        Points = points;
    }
}