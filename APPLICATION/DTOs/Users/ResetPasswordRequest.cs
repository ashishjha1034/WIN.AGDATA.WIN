namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

public record ResetPasswordRequest(
    string Token,
    string NewPassword);
