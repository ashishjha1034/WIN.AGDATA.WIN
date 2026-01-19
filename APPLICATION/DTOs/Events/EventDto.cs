namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

public class EventDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public DateTime EventDate { get; set; }
    public string Description { get; set; } = null!;
    public string Status { get; set; } = null!;
    public int ParticipantCount { get; set; }
}

