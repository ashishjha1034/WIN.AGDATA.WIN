// APPLICATION/DTOs/EventDto.cs
namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

public class EventDto
{
    public string EventId { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public DateTime EventDate { get; set; }
    public bool IsActive { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; }
}
