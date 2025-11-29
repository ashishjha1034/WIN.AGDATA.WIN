using MediatR;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Users;

public record CreateUserCommand(
    string EmployeeId,
    string Email,
    string FirstName,
    string LastName) : IRequest<UserDto>;