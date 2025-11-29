// APPLICATION/DTOs/UserDto.cs
namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

public class UserDto
{
    public Guid Id { get; set; }
    public string EmployeeId { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public int PointsBalance { get; set; }
    public bool IsActive { get; set; }
}
