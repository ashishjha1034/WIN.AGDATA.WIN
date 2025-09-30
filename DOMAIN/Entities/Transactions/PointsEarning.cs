using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.Exceptions;

public class PointsEarning : PointsTransaction
{
    public string EventId { get; } // Changed from Guid to string

    public PointsEarning(string employeeId, int points, string eventId, string description) // Changed Guid to string
        : base(employeeId, Math.Abs(points), description)
    {
        ValidateEventId(eventId);
        EventId = eventId;
    }

    private void ValidateEventId(string eventId)
    {
        if (string.IsNullOrWhiteSpace(eventId))
            throw new DomainException("Event ID is required for points earning");
    }
}