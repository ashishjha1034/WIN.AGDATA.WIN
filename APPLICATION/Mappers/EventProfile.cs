using AutoMapper;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.APPLICATION.Mappers;

public class EventProfile : Profile
{
    public EventProfile()
    {
        CreateMap<Event, EventDto>()
            .ForMember(d => d.Status, o => o.MapFrom(s => MapStatusToLabel(s.Status)))
                .ForMember(d => d.ParticipantCount, o => o.MapFrom(s => s.Participants.Count))
                .ForMember(d => d.AwardedPercent, o => o.MapFrom(s => CalculateAwardedPercent(s)));
        }

        /// <summary>
        /// Maps EventStatus enum to user-friendly labels.
        /// Draft is displayed as "Upcoming" per changelog spec.
        /// Active is displayed as "Live".
        /// </summary>
        private static string MapStatusToLabel(Domain.Enums.EventStatus status)
        {
            return status switch
            {
                Domain.Enums.EventStatus.Draft => "Upcoming",
                Domain.Enums.EventStatus.Active => "Live",
                Domain.Enums.EventStatus.Completed => "Completed",
                Domain.Enums.EventStatus.Cancelled => "Cancelled",
                _ => status.ToString()
            };
        }

        /// <summary>
        /// Calculates the percentage of points awarded from the total pool.
        /// Returns 0% if pool is unlimited (TotalPointsPool is null) or pool is 0.
        /// Otherwise calculates: (DistributedPoints / TotalPointsPool) * 100, rounded to 2 decimals.
        /// </summary>
        private static decimal CalculateAwardedPercent(Event @event)
        {
            if (!@event.TotalPointsPool.HasValue || @event.TotalPointsPool.Value == 0)
                return 0m;

            var percent = ((decimal)@event.DistributedPoints / @event.TotalPointsPool.Value) * 100m;
            return Math.Round(percent, 2);        }
    }