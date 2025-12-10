namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

public record CreateUserRequest(
    string EmployeeId,
    string Email,
    string FirstName,
    string LastName,
    string Password);