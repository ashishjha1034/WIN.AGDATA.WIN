using WIN.AGDATA.WIN.Domain.Common;

namespace WIN.AGDATA.WIN.Domain.Entities.Events;

public class Event : AuditableEntity<Guid>
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = null!;
    public string Description { get; private set; } = null!;
    public DateTime EventDate { get; private set; }
    public EventStatus Status { get; private set; }
    public int? TotalPointsPool { get; private set; }
    public string? Location { get; private set; }
    public int? MaxParticipants { get; private set; }
    public DateTime? RegistrationEndDate { get; private set; }
    public string? BannerImageUrl { get; private set; }
    public int PointsPerParticipant { get; private set; } = 0;

    // Navigation
    public IReadOnlyCollection<EventParticipant> Participants => _participants.AsReadOnly();
    private readonly List<EventParticipant> _participants = new();

    private Event() { }

    public Event(
        string name,
        string description,
        DateTime eventDate,
        int? totalPointsPool = null,
        string? location = null,
        int? maxParticipants = null,
        DateTime? registrationEndDate = null,
        string? bannerImageUrl = null)
    {
        Id = Guid.NewGuid();
        Name = name;
        Description = description;
        EventDate = eventDate;
        TotalPointsPool = totalPointsPool;
        Location = location;
        MaxParticipants = maxParticipants;
        RegistrationEndDate = registrationEndDate;
        BannerImageUrl = bannerImageUrl;
        Status = EventStatus.Draft;
    }

    public void Start() => Status = EventStatus.Active;
    public void Complete() => Status = EventStatus.Completed;
    public void Cancel() => Status = EventStatus.Cancelled;

    public void SetPointsReward(int points)
    {
        if (Status != EventStatus.Draft)
            throw new DomainException("Cannot change points reward after event started");
        PointsPerParticipant = points;
    }
}