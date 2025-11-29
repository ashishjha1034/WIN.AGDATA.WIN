
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.Domain.Entities.Users;

namespace WIN.AGDATA.WIN.Application.Mappers;

public static class UserMapper
{
    public static UserDto ToDto(User u)
    {
        if (u == null) return null!;

        return new UserDto
        {
            Id = u.Id,
            EmployeeId = u.Identity.EmployeeId,
            Email = u.Identity.Email,
            FirstName = u.Identity.FirstName,
            LastName = u.Identity.LastName,
            PointsBalance = u.Points.CurrentBalance,
            IsActive = u.Status.IsActive
        };
    }
}
