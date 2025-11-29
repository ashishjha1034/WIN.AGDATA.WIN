// APPLICATION/Mapping/RedemptionProfile.cs
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
using AutoMapper;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace WIN.AGDATA.WIN.Application.Mapping
{
    public class RedemptionProfile : Profile
    {
        public RedemptionProfile()
        {
            CreateMap<Redemption, RedemptionDto>()
                .ForMember(d => d.EmployeeId, o => o.MapFrom(s => s.EmployeeId))
                .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.Value.ToString()))
                .ForMember(d => d.RequestedAt, o => o.MapFrom(s => s.RequestedAt));
        }
    }
}
