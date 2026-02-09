namespace WIN.AGDATA.WIN.Domain.ValueObjects;

/// <summary>
/// Value object representing an event's time window.
/// Ensures all dates are in UTC and RegistrationEndUtc occurs before EventDateUtc.
/// </summary>
public sealed record EventWindow
{
    public DateTime EventDateUtc { get; }
    public DateTime RegistrationEndUtc { get; }

    private EventWindow(DateTime eventDateUtc, DateTime registrationEndUtc)
    {
        EventDateUtc = eventDateUtc;
        RegistrationEndUtc = registrationEndUtc;
    }

    public static EventWindow Create(DateTime eventDateUtc, DateTime registrationEndUtc)
    {
        // Ensure dates are in UTC
        if (eventDateUtc.Kind != DateTimeKind.Utc)
            throw new ArgumentException("Event date must be in UTC", nameof(eventDateUtc));

        if (registrationEndUtc.Kind != DateTimeKind.Utc)
            throw new ArgumentException("Registration end date must be in UTC", nameof(registrationEndUtc));

        // Validate temporal ordering
        if (registrationEndUtc >= eventDateUtc)
            throw new ArgumentException(
                $"Registration must end before the event begins. Registration End: {registrationEndUtc:u}, Event Date: {eventDateUtc:u}",
                nameof(registrationEndUtc));

        return new EventWindow(eventDateUtc, registrationEndUtc);
    }

    /// <summary>
    /// Checks if registration is currently open based on the provided current UTC time.
    /// </summary>
    public bool IsRegistrationOpen(DateTime nowUtc)
    {
        if (nowUtc.Kind != DateTimeKind.Utc)
            throw new ArgumentException("Current time must be in UTC", nameof(nowUtc));

        return nowUtc <= RegistrationEndUtc;
    }

    /// <summary>
    /// Checks if the event has already occurred.
    /// </summary>
    public bool HasEventPassed(DateTime nowUtc)
    {
        if (nowUtc.Kind != DateTimeKind.Utc)
            throw new ArgumentException("Current time must be in UTC", nameof(nowUtc));

        return nowUtc > EventDateUtc;
    }

    public override string ToString() => $"Event: {EventDateUtc:u}, Registration Ends: {RegistrationEndUtc:u}";
}
