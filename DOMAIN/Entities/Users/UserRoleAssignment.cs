using System.Data;

namespace WIN.AGDATA.WIN.Domain.Entities.Users;

public class UserRoleAssignment
{
    public Guid UserId { get; private set; }
    public Guid RoleId { get; private set; }
    public DateTime AssignedAt { get; private set; }
    public Guid? AssignedBy { get; private set; }

    // Navigation
    public User User { get; private set; } = null!;
    public Role Role { get; private set; } = null!;

    private UserRoleAssignment() { }

    public UserRoleAssignment(Guid userId, Guid roleId, Guid assignedBy)
    {
        UserId = userId;
        RoleId = roleId;
        AssignedAt = DateTime.UtcNow;
        AssignedBy = assignedBy;
    }
}