using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.Exceptions;

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

    #region Lifecycle Guards

    /// <summary>
    /// Determines if the event can be edited. Only Draft (Created) events can be edited.
    /// </summary>
    public bool CanEdit() => Status == EventStatus.Draft;

    /// <summary>
    /// Determines if registration is allowed based on status and deadline.
    /// Registration is allowed only in Draft status AND when current time is on or before RegistrationEndDate.
    /// </summary>
    public bool CanRegister(DateTime nowUtc) =>
        Status == EventStatus.Draft &&
        RegistrationEndDate.HasValue &&
        nowUtc <= RegistrationEndDate.Value;

    /// <summary>
    /// Determines if the event can transition to Active state.
    /// </summary>
    public bool CanActivate() => Status == EventStatus.Draft;

    /// <summary>
    /// Determines if the event can transition to Completed state.
    /// </summary>
    public bool CanComplete() => Status == EventStatus.Active;

    /// <summary>
    /// Determines if the event can be cancelled.
    /// </summary>
    public bool CanCancel() => Status == EventStatus.Draft || Status == EventStatus.Active;

    /// <summary>
    /// Determines if points can be awarded to participants.
    /// Awards are only allowed when the event is Active.
    /// </summary>
    public bool CanAward() => Status == EventStatus.Active;

    /// <summary>
    /// Determines if attendance can be recorded (check-in).
    /// Check-in is only allowed when the event is Active.
    /// </summary>
    public bool CanCheckIn() => Status == EventStatus.Active;

    #endregion

    #region Lifecycle Transitions

    /// <summary>
    /// Activates the event, transitioning from Draft to Active.
    /// </summary>
    /// <param name="adminId">ID of the admin performing the activation</param>
    public void Activate(Guid adminId)
    {
        if (!CanActivate())
            throw new DomainException($"Cannot activate event. Current status is {Status}. Only Draft events can be activated.");

        Status = EventStatus.Active;
    }

    /// <summary>
    /// Completes the event, transitioning from Active to Completed.
    /// </summary>
    /// <param name="adminId">ID of the admin completing the event</param>
    public void CompleteEvent(Guid adminId)
    {
        if (!CanComplete())
            throw new DomainException($"Cannot complete event. Current status is {Status}. Only Active events can be completed.");

        Status = EventStatus.Completed;
    }

    /// <summary>
    /// Cancels the event. Can be cancelled from Draft or Active states.
    /// </summary>
    /// <param name="adminId">ID of the admin cancelling the event</param>
    public void CancelEvent(Guid adminId)
    {
        if (!CanCancel())
            throw new DomainException($"Cannot cancel event. Current status is {Status}. Only Draft or Active events can be cancelled.");

        Status = EventStatus.Cancelled;
    }

    #endregion

    #region Legacy methods (kept for backwards compatibility)

    [Obsolete("Use Activate(Guid adminId) instead")]
    public void Start() => Status = EventStatus.Active;

    [Obsolete("Use CompleteEvent(Guid adminId) instead")]
    public void Complete() => Status = EventStatus.Completed;

    [Obsolete("Use CancelEvent(Guid adminId) instead")]
    public void Cancel() => Status = EventStatus.Cancelled;

    #endregion

    /// <summary>
    /// Updates event details. Only allowed in Draft status.
    /// </summary>
    public void UpdateDetails(
        string? name = null,
        string? description = null,
        DateTime? eventDate = null,
        int? totalPointsPool = null,
        string? location = null,
        int? maxParticipants = null,
        DateTime? registrationEndDate = null,
        string? bannerImageUrl = null)
    {
        if (!CanEdit())
            throw new DomainException($"Cannot edit event. Current status is {Status}. Only Draft events can be edited.");

        if (name != null) Name = name;
        if (description != null) Description = description;
        if (eventDate.HasValue) EventDate = eventDate.Value;
        if (totalPointsPool.HasValue) TotalPointsPool = totalPointsPool.Value;
        if (location != null) Location = location;
        if (maxParticipants.HasValue) MaxParticipants = maxParticipants.Value;
        if (registrationEndDate.HasValue) RegistrationEndDate = registrationEndDate.Value;
        if (bannerImageUrl != null) BannerImageUrl = bannerImageUrl;
    }

    public void SetPointsReward(int points)
    {
        if (!CanEdit())
            throw new DomainException("Cannot change points reward after event started");
        PointsPerParticipant = points;
    }

    /// <summary>
    /// Registers a user for the event.
    /// </summary>
    /// <param name="userId">User ID to register</param>
    /// <param name="nowUtc">Current UTC time for deadline validation</param>
    public void Register(Guid userId, DateTime nowUtc)
    {
        if (!CanRegister(nowUtc))
        {
            if (Status != EventStatus.Draft)
                throw new DomainException($"Registration is closed. Event status is {Status}. Registration is only allowed for Draft events.");

            if (!RegistrationEndDate.HasValue)
                throw new DomainException("Registration deadline is not set for this event.");

            throw new DomainException($"Registration deadline has passed. Deadline was {RegistrationEndDate.Value:u}.");
        }

        if (_participants.Any(p => p.UserId == userId))
            throw new DomainException($"User {userId} is already registered for this event");

        if (MaxParticipants.HasValue && _participants.Count >= MaxParticipants.Value)
            throw new DomainException($"Event has reached maximum capacity of {MaxParticipants.Value} participants.");

        var participant = new EventParticipant(Id, userId);
        _participants.Add(participant);
    }

    /// <summary>
    /// Legacy method for adding participants without deadline check.
    /// </summary>
    [Obsolete("Use Register(Guid userId, DateTime nowUtc) instead")]
    public void AddParticipant(Guid userId)
    {
        if (_participants.Any(p => p.UserId == userId))
            throw new DomainException($"User {userId} is already registered for this event");

        var participant = new EventParticipant(Id, userId);
        _participants.Add(participant);
    }

    /// <summary>
    /// Checks in a participant (marks attendance). Only allowed when event is Active.
    /// </summary>
    /// <param name="participantId">The participant's event registration ID</param>
    /// <param name="adminId">ID of the admin performing the check-in</param>
    public void CheckInParticipant(Guid participantId, Guid adminId)
    {
        if (!CanCheckIn())
            throw new DomainException($"Cannot check in participants. Event status is {Status}. Check-in is only allowed for Active events.");

        var participant = _participants.FirstOrDefault(p => p.Id == participantId)
            ?? throw new DomainException($"Participant {participantId} not found in this event.");

        participant.MarkCheckedIn();
    }

    /// <summary>
    /// Checks in a participant by user ID. Only allowed when event is Active.
    /// </summary>
    /// <param name="userId">The user ID to check in</param>
    /// <param name="adminId">ID of the admin performing the check-in</param>
    public void CheckInParticipantByUserId(Guid userId, Guid adminId)
    {
        if (!CanCheckIn())
            throw new DomainException($"Cannot check in participants. Event status is {Status}. Check-in is only allowed for Active events.");

        var participant = _participants.FirstOrDefault(p => p.UserId == userId)
            ?? throw new DomainException($"User {userId} is not registered for this event.");

        participant.MarkCheckedIn();
    }
}