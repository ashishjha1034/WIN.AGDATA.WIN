using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.Domain.Entities.Events;

public class Event : AuditableEntity<Guid>
{
    public string Name { get; private set; } = null!;
    public string Description { get; private set; } = null!;
    public DateTime EventDate { get; private set; }
    public EventStatus Status { get; private set; }
    public Points? TotalPointsPool { get; private set; }
    public string? Location { get; private set; }
    public int? MaxParticipants { get; private set; }
    public DateTime? RegistrationEndDate { get; private set; }
    public string? BannerImageUrl { get; private set; }

    /// <summary>
    /// Tracks total points distributed from this event's pool.
    /// Used for O(1) remaining pool calculation: Remaining = TotalPointsPool - DistributedPoints.
    /// </summary>
    public Points DistributedPoints { get; private set; } = Points.Zero;

    /// <summary>
    /// Concurrency token for optimistic locking on pool operations.
    /// </summary>
    public byte[] RowVersion { get; private set; } = null!;

    // Navigation
    public IReadOnlyCollection<EventParticipant> Participants => _participants.AsReadOnly();
    private readonly List<EventParticipant> _participants = new();

    private Event() { }

    public Event(
        string name,
        string description,
        DateTime eventDate,
        Points? totalPointsPool = null,
        string? location = null,
        int? maxParticipants = null,
        DateTime? registrationEndDate = null,
        string? bannerImageUrl = null)
        : base(Guid.NewGuid())
    {
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
    /// Cancel is only allowed in Draft (Upcoming) status.
    /// </summary>
    public bool CanCancel() => Status == EventStatus.Draft;

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

    #region Pool Management

    /// <summary>
    /// Gets the remaining points available in the pool.
    /// Returns null if pool is unlimited (TotalPointsPool is null).
    /// </summary>
    public Points? RemainingPoints => TotalPointsPool != null
        ? TotalPointsPool - DistributedPoints
        : null;

    /// <summary>
    /// Validates if the requested points can be distributed from the pool.
    /// </summary>
    /// <param name="requestedPoints">Points to distribute</param>
    /// <returns>True if pool is unlimited or has sufficient remaining points</returns>
    public bool CanDistributePoints(Points requestedPoints)
    {
        if (requestedPoints == null || requestedPoints.IsZero())
            return false;

        // Unlimited pool
        if (TotalPointsPool == null)
            return true;

        return (DistributedPoints + requestedPoints) <= TotalPointsPool;
    }

    /// <summary>
    /// Reserves points from the pool for distribution.
    /// Must be called within a transaction with optimistic concurrency check.
    /// </summary>
    /// <param name="points">Points to reserve</param>
    /// <exception cref="InsufficientPoolException">Thrown if insufficient points in pool</exception>
    private void ReservePoints(Points points)
    {
        if (points == null || points.IsZero() || !points.IsPositive())
            throw new DomainException("Points to reserve must be positive.");

        if (TotalPointsPool != null && (DistributedPoints + points) > TotalPointsPool)
        {
            var remaining = TotalPointsPool - DistributedPoints;
            throw new InsufficientPoolException(points.Value, remaining.Value);
        }

        DistributedPoints += points;
    }

    #endregion

    #region Domain Methods - Registration

    /// <summary>
    /// Registers a participant for the event with full domain validation.
    /// </summary>
    /// <param name="userId">User ID to register</param>
    /// <param name="nowUtc">Current UTC time for deadline validation</param>
    public void RegisterParticipant(Guid userId, DateTime nowUtc)
    {
        // Validate registration is allowed
        if (!CanRegister(nowUtc))
        {
            if (Status != EventStatus.Draft)
                throw new InvalidStatusTransitionException(Status.ToString(), "register participants");

            if (!RegistrationEndDate.HasValue)
                throw new DomainException("Registration deadline is not set for this event.");

            throw new RegistrationClosedException(RegistrationEndDate.Value);
        }

        // Check for duplicate
        if (_participants.Any(p => p.UserId == userId))
            throw new DuplicateRegistrationException(Id, userId);

        // Check capacity
        if (MaxParticipants.HasValue && _participants.Count >= MaxParticipants.Value)
            throw new CapacityExceededException(MaxParticipants.Value, _participants.Count);

        // Create and add participant
        var participant = new EventParticipant(Id, userId);
        _participants.Add(participant);

        // Raise domain event
        RaiseDomainEvent(new Domain.Events.ParticipantRegisteredEvent(Id, userId, DateTime.UtcNow));
    }

    /// <summary>
    /// Removes a participant from the event by their user ID.
    /// </summary>
    /// <param name="userId">The user ID to remove</param>
    public void UnregisterParticipant(Guid userId)
    {
        if (Status == EventStatus.Completed)
            throw new InvalidStatusTransitionException(Status.ToString(), "unregister participants");

        var participant = _participants.FirstOrDefault(p => p.UserId == userId)
            ?? throw new DomainException($"User {userId} is not registered for this event.");

        if (participant.PointsAwarded != null && !participant.PointsAwarded.IsZero())
            throw new DomainException("Cannot remove participant who has been awarded points.");

        _participants.Remove(participant);
    }

    #endregion

    #region Domain Methods - Check-In

    /// <summary>
    /// Checks in a participant by user ID. Only allowed when event is Active.
    /// </summary>
    /// <param name="userId">The user ID to check in</param>
    /// <param name="byAdmin">ID of the admin performing the check-in</param>
    public void CheckInParticipant(Guid userId, Guid byAdmin)
    {
        if (!CanCheckIn())
            throw new InvalidStatusTransitionException(Status.ToString(), "check-in participants");

        var participant = _participants.FirstOrDefault(p => p.UserId == userId)
            ?? throw new DomainException($"User {userId} is not registered for this event.");

        participant.MarkCheckedIn();

        // Raise domain event
        RaiseDomainEvent(new Domain.Events.ParticipantCheckedInEvent(Id, userId, byAdmin, DateTime.UtcNow));
    }

    #endregion

    #region Domain Methods - Award Points

    /// <summary>
    /// Awards points to a specific participant with full validation.
    /// This method encapsulates all the business rules for awarding points.
    /// </summary>
    /// <param name="participantUserId">User ID of the participant</param>
    /// <param name="points">Points to award</param>
    /// <param name="rank">Optional rank position</param>
    /// <param name="byAdmin">Admin awarding the points</param>
    public void AwardPoints(Guid participantUserId, Points points, int? rank, Guid byAdmin)
    {
        // Lifecycle validation
        if (!CanAward())
            throw new InvalidStatusTransitionException(Status.ToString(), "award points");

        // Find participant
        var participant = _participants.FirstOrDefault(p => p.UserId == participantUserId)
            ?? throw new DomainException($"User {participantUserId} is not registered for this event.");

        // Validate participant state (checked-in, not already awarded) - delegated to participant
        participant.AwardPoints(points, rank, byAdmin);

        // Pool enforcement
        ReservePoints(points);

        // Raise domain event
        RaiseDomainEvent(new Domain.Events.PointsAwardedEvent(
            Id, participantUserId, points, rank, byAdmin, DateTime.UtcNow));

        // Auto-complete if pool exhausted
        if (TotalPointsPool != null && RemainingPoints != null && RemainingPoints.IsZero())
        {
            Complete(byAdmin, autoCompleted: true);
        }
    }

    #endregion

    #region Lifecycle Transitions

    /// <summary>
    /// Activates the event, transitioning from Draft to Active.
    /// </summary>
    /// <param name="byAdmin">ID of the admin performing the activation</param>
    public void Activate(Guid byAdmin)
    {
        if (!CanActivate())
            throw new InvalidStatusTransitionException(Status.ToString(), "activate");

        Status = EventStatus.Active;
    }

    /// <summary>
    /// Completes the event, transitioning from Active to Completed.
    /// </summary>
    /// <param name="byAdmin">ID of the admin completing the event</param>
    /// <param name="autoCompleted">Whether this was auto-completed by the system</param>
    public void Complete(Guid byAdmin, bool autoCompleted = false)
    {
        if (!CanComplete())
            throw new InvalidStatusTransitionException(Status.ToString(), "complete");

        Status = EventStatus.Completed;

        // Raise domain event
        RaiseDomainEvent(new Domain.Events.EventCompletedEvent(
            Id, Name, byAdmin, DateTime.UtcNow, autoCompleted));
    }

    /// <summary>
    /// Cancels the event. Can only be cancelled from Draft state.
    /// </summary>
    /// <param name="byAdmin">ID of the admin cancelling the event</param>
    /// <param name="reason">Reason for cancellation</param>
    public void Cancel(Guid byAdmin, string? reason = null)
    {
        if (!CanCancel())
            throw new InvalidStatusTransitionException(Status.ToString(), "cancel");

        Status = EventStatus.Cancelled;

        // Raise domain event
        RaiseDomainEvent(new Domain.Events.EventCancelledEvent(
            Id, Name, byAdmin, reason, DateTime.UtcNow));
    }

    /// <summary>
    /// Applies automated state transitions based on the current time (compute-on-read).
    /// </summary>
    public bool ApplyAutomatedTransitions(DateTime nowUtc)
    {
        if (Status != EventStatus.Draft)
            return false;

        // Auto-go-live when event start time arrives
        if (nowUtc >= EventDate)
        {
            Status = EventStatus.Active;
            return true;
        }

        // Auto-cancel when registration deadline passes with 0 registrations
        if (RegistrationEndDate.HasValue && nowUtc >= RegistrationEndDate.Value && _participants.Count == 0)
        {
            Status = EventStatus.Cancelled;
            return true;
        }

        return false;
    }

    #endregion

    #region Update Methods

    /// <summary>
    /// Updates event details. Only allowed in Draft status.
    /// </summary>
    public void UpdateDetails(
        string? name = null,
        string? description = null,
        DateTime? eventDate = null,
        Points? totalPointsPool = null,
        string? location = null,
        int? maxParticipants = null,
        DateTime? registrationEndDate = null,
        string? bannerImageUrl = null)
    {
        if (!CanEdit())
            throw new InvalidStatusTransitionException(Status.ToString(), "edit details");

        if (name != null) Name = name;
        if (description != null) Description = description;
        if (eventDate.HasValue) EventDate = eventDate.Value;
        if (totalPointsPool != null) TotalPointsPool = totalPointsPool;
        if (location != null) Location = location;
        if (maxParticipants.HasValue) MaxParticipants = maxParticipants.Value;
        if (registrationEndDate.HasValue) RegistrationEndDate = registrationEndDate.Value;
        if (bannerImageUrl != null) BannerImageUrl = bannerImageUrl;
    }

    #endregion

    #region Legacy/Migration Support

    /// <summary>
    /// Sets the distributed points counter. Used for backfill migration.
    /// </summary>
    [Obsolete("For migration only")]
    internal void SetDistributedPoints(Points totalDistributed)
    {
        DistributedPoints = totalDistributed ?? Points.Zero;
    }

    /// <summary>
    /// Legacy method - use RegisterParticipant instead
    /// </summary>
    [Obsolete("Use RegisterParticipant(Guid userId, DateTime nowUtc) instead")]
    public void AddParticipant(Guid userId)
    {
        if (_participants.Any(p => p.UserId == userId))
            throw new DuplicateRegistrationException(Id, userId);

        var participant = new EventParticipant(Id, userId);
        _participants.Add(participant);
    }

    #endregion
}