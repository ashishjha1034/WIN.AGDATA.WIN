namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

/// <summary>
/// Request to update participant attendance status
/// </summary>
public class UpdateAttendanceRequest
{
    /// <summary>
    /// New attendance status: "Registered" or "Attended"/"Checked-In"
    /// </summary>
    public string Status { get; set; } = string.Empty;
}
