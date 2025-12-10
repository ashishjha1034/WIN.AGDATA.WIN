using AutoMapper;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace WIN.AGDATA.WIN.APPLICATION.Mappers;

public class RedemptionProfile : Profile
{
    public RedemptionProfile()
    {
        CreateMap<Redemption, RedemptionDto>()
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => $"{src.User.FirstName} {src.User.LastName}"))
            .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name));
    }
}