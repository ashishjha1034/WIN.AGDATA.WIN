using AutoMapper;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Domain.Enums;

namespace WIN.AGDATA.WIN.APPLICATION.Mappers;

public class RedemptionProfile : Profile
{
    public RedemptionProfile()
    {
        CreateMap<Redemption, RedemptionDto>()
            .ForMember(d => d.ProductName, o => o.MapFrom(s => s.Product.Name))
            .ForMember(d => d.Status, o => o.MapFrom(s => s.Status.ToString()));
    }
}