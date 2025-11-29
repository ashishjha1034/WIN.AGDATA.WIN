using MediatR;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

namespace WIN.AGDATA.WIN.Application.Commands;

public class CreateUserCommand : IRequest<UserDto>
{
    public CreateUserRequest Request { get; }
    public string CreatedBy { get; }
    public CreateUserCommand(CreateUserRequest request, string createdBy) { Request = request; CreatedBy = createdBy; }
}
