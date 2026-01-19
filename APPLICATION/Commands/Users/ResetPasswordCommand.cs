using MediatR;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Users;

public record ResetPasswordCommand(
    string Token,
    string NewPassword) : IRequest<bool>;
