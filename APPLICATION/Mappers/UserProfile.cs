using AutoMapper;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.Domain.Entities.Users;

namespace WIN.AGDATA.WIN.APPLICATION.Mappers;

public class UserProfile : Profile
{
    public UserProfile()
    {
        CreateMap<User, UserDto>()
            .ForMember(d => d.Email, o => o.MapFrom(s => s.Email.Value))
            .ForMember(d => d.MustChangePassword, o => o.MapFrom(s => s.MustChangePassword))
            .ForMember(d => d.CurrentBalance, o => o.MapFrom(s => s.PointsAccount.CurrentBalance.Value))
            .ForMember(d => d.TotalEarned, o => o.MapFrom(s => s.PointsAccount.TotalEarned.Value))
            .ForMember(d => d.TotalRedeemed, o => o.MapFrom(s => s.PointsAccount.TotalRedeemed.Value))
            .ForMember(d => d.Roles, o => o.MapFrom(s => s.Roles.Select(r => r.Role.Name)));
    }
}