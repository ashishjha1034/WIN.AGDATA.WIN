namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

/// <summary>
/// DTO for event participant data
/// </summary>
public class EventParticipantDto
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string EmployeeId { get; set; } = string.Empty;
    public string AttendanceStatus { get; set; } = "Registered";
    public int PointsAwarded { get; set; }
    public int? EventRank { get; set; }
    public DateTime RegisteredAt { get; set; }
    public DateTime? CheckedInAt { get; set; }
    public DateTime? AwardedAt { get; set; }
    public Guid? AwardedBy { get; set; }
    public string? AwardedByName { get; set; }
}
