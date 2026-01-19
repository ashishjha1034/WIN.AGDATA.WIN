using MediatR;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Users;

public record ChangePasswordCommand(
    Guid UserId,
    string CurrentPassword,
    string NewPassword) : IRequest<bool>;
