// APPLICATION/Mapping/EventProfile.cs
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using AutoMapper;
using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.Application.Mapping
{
    public class EventProfile : Profile
    {
        public EventProfile()
        {
            CreateMap<Event, EventDto>()
                .ForMember(d => d.EventId, o => o.MapFrom(s => s.EventId))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Info.Name))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Info.Description))
                .ForMember(d => d.EventDate, o => o.MapFrom(s => s.Info.EventDate))
                .ForMember(d => d.IsActive, o => o.MapFrom(s => s.Status.IsActive))
                .ForMember(d => d.IsCompleted, o => o.MapFrom(s => s.Status.IsCompleted))
                .ForMember(d => d.CreatedAt, o => o.MapFrom(s => s.CreatedAt));
        }
    }
}
