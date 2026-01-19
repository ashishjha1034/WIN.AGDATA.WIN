using MediatR;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Users;

public record InviteUserCommand(
    string EmployeeId,
    string Email,
    string FirstName,
    string LastName,
    List<string>? Roles = null,
    bool GenerateTempPassword = true,
    string? TemporaryPassword = null) : IRequest<UserDto>;
