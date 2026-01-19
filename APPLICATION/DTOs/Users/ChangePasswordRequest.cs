namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

public record ChangePasswordRequest(
    string CurrentPassword,
    string NewPassword);
