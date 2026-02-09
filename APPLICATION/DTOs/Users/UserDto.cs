
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
	public decimal CurrentBalance { get; init; }
	public decimal TotalEarned { get; init; }
	public decimal TotalRedeemed { get; init; }
	public IReadOnlyList<string> Roles { get; init; } = Array.Empty<string>();
}
