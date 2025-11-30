using AutoMapper;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.APPLICATION.Mappers;

public class EventProfile : Profile
{
    public EventProfile()
    {
        CreateMap<Event, EventDto>()
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.ToString()))
            .ForMember(d => d.ParticipantCount, o => o.MapFrom(s => s.Participants.Count));
    }
}
