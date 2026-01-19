using MediatR;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Users;

public record AdminResetPasswordCommand(
    Guid UserId,
    string NewTemporaryPassword) : IRequest<bool>;
