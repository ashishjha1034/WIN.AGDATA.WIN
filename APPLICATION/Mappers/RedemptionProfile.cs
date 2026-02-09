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
            .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name))
            .ForMember(dest => dest.PointsSpent, opt => opt.MapFrom(src => src.PointsSpent.Value));

        CreateMap<Redemption, RedemptionDetailDto>()
            // User snapshot
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
            .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => $"{src.User.FirstName} {src.User.LastName}"))
            .ForMember(dest => dest.UserEmail, opt => opt.MapFrom(src => src.User.Email.Value))
            .ForMember(dest => dest.UserAvatarUrl, opt => opt.MapFrom(src => "")) // No avatar field in User entity
            .ForMember(dest => dest.UserCurrentBalance, opt => opt.MapFrom(src => src.User.PointsAccount.CurrentBalance.Value))
            .ForMember(dest => dest.UserTotalEarned, opt => opt.MapFrom(src => src.User.PointsAccount.TotalEarned.Value))
            .ForMember(dest => dest.UserTotalRedeemed, opt => opt.MapFrom(src => src.User.PointsAccount.TotalRedeemed.Value))
            .ForMember(dest => dest.PointsSpent, opt => opt.MapFrom(src => src.PointsSpent.Value))
            // Product snapshot
            .ForMember(dest => dest.ProductId, opt => opt.MapFrom(src => src.ProductId))
            .ForMember(dest => dest.ProductName, opt => opt.MapFrom(src => src.Product.Name))
            .ForMember(dest => dest.ProductDescription, opt => opt.MapFrom(src => src.Product.Description))
            .ForMember(dest => dest.ProductCategory, opt => opt.MapFrom(src => src.Product.Category.Name))
            .ForMember(dest => dest.ProductImageUrl, opt => opt.MapFrom(src => src.Product.ImageUrl ?? ""))
            .ForMember(dest => dest.ProductPointsPerUnit, opt => opt.MapFrom(src => src.Product.CurrentPricing.Value))
            .ForMember(dest => dest.ProductTotalPoints, opt => opt.MapFrom(src => src.PointsSpent.Value));
    }
}
