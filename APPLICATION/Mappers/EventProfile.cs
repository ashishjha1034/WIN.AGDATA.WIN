using AutoMapper;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.APPLICATION.Mappers;

public class EventProfile : Profile
{
    public EventProfile()
    {
        CreateMap<Event, EventDto>()
            .ForMember(d => d.Status, o => o.MapFrom(s => MapStatusToLabel(s.Status)));
    }

    /// <summary>
    /// Maps EventStatus enum to user-friendly labels.
    /// Draft is displayed as "Created" per MVP spec.
    /// </summary>
    private static string MapStatusToLabel(Domain.Enums.EventStatus status)
    {
        return status switch
        {
            Domain.Enums.EventStatus.Draft => "Created",
            Domain.Enums.EventStatus.Active => "Active",
            Domain.Enums.EventStatus.Completed => "Completed",
            Domain.Enums.EventStatus.Cancelled => "Cancelled",
            _ => status.ToString()
        };
    }
}

