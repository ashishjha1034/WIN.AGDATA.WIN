namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

public record UserDto(
    Guid Id,
    string EmployeeId,
    string Email,
    string FirstName,
    string LastName,
    bool IsActive,
    int CurrentBalance,
    int TotalEarned,
    int TotalRedeemed,
    IReadOnlyList<string> Roles);