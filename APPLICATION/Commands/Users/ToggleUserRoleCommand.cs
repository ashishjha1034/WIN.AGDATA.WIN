using MediatR;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Users;

/// <summary>
/// Command to toggle a user's role between Admin and Employee
/// </summary>
public record ToggleUserRoleCommand(
    Guid UserId,
    string NewRole,
    Guid ActingAdminId
) : IRequest<UserDto>;
