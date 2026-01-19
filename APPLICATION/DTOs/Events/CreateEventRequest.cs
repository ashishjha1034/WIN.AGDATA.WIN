namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

public class CreateEventRequest
{
    public string Name { get; set; } = null!;
    public DateTime EventDate { get; set; }
    public string Description { get; set; } = null!;
    public int? TotalPointsPool { get; set; }
    public string? Location { get; set; }
    public int? MaxParticipants { get; set; }
    public DateTime? RegistrationEndDate { get; set; }
    public string? BannerImageUrl { get; set; }
}

