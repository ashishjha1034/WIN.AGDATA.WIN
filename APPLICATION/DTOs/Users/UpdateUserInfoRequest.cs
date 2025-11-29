namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

public record UpdateUserInfoRequest(
    string FirstName,
    string LastName,
    string Email);