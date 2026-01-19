using MediatR;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Users;

public record ForgotPasswordCommand(
    string Email) : IRequest<bool>;
