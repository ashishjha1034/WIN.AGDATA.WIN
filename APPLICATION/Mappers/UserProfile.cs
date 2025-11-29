// APPLICATION/Mapping/UserProfile.cs
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using AutoMapper;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WIN.AGDATA.WIN.Application.Mapping
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<CreateUserRequest, User>()
                .ConstructUsing((src, ctx) => new User(src.EmployeeId, src.Email, src.FirstName, src.LastName, "SYSTEM"));

            CreateMap<User, UserDto>()
                .ForMember(dest => dest.EmployeeId, opt => opt.MapFrom(src => src.Identity.EmployeeId))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Identity.Email))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.Identity.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.Identity.LastName))
                .ForMember(dest => dest.PointsBalance, opt => opt.MapFrom(src => src.Points.CurrentBalance))
                .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => src.Status.IsActive));
        }
    }
}
