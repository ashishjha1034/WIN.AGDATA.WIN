
namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

public record class UserDto
{
	public Guid Id { get; init; }
	public string EmployeeId { get; init; } = string.Empty;
	public string Email { get; init; } = string.Empty;
	public string FirstName { get; init; } = string.Empty;
	public string LastName { get; init; } = string.Empty;
	public bool IsActive { get; init; }
	public bool MustChangePassword { get; init; }
	public int CurrentBalance { get; init; }
	public int TotalEarned { get; init; }
	public int TotalRedeemed { get; init; }
	public IReadOnlyList<string> Roles { get; init; } = Array.Empty<string>();
}
