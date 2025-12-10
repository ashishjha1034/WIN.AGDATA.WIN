namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

public record RefreshTokenRequest(
    string Token,
    string RefreshToken
);
