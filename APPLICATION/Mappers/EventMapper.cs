
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.Application.Mappers;

public static class EventMapper
{
    public static EventDto ToDto(Event e)
    {
        if (e == null) return null!;

        return new EventDto
        {
            EventId = e.EventId,
            Name = e.Info.Name,
            Description = e.Info.Description,
            EventDate = e.Info.EventDate,
            IsActive = e.Status.IsActive,
            IsCompleted = e.Status.IsCompleted,
            CreatedAt = e.CreatedAt
        };
    }
}
