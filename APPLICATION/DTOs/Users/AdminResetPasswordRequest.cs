namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

public record AdminResetPasswordRequest(
    Guid UserId,
    string NewTemporaryPassword);
