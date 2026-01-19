namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

public record InviteUserRequest(
    string EmployeeId,
    string Email,
    string FirstName,
    string LastName,
    List<string>? Roles = null,
    bool GenerateTempPassword = true,
    string? TemporaryPassword = null);
