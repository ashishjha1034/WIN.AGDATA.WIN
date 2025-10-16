using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.Exceptions;

public class PointsEarning : PointsTransaction
{
    public string EventId { get; } 

    public PointsEarning(string employeeId, int points, string eventId, string description) 
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