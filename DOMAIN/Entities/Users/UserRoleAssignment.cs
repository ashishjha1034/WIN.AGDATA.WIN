using WIN.AGDATA.WIN.Domain.Common;

namespace WIN.AGDATA.WIN.Domain.Entities.Users;

public class UserRoleAssignment : Entity<Guid>
{
    public Guid UserId { get; private set; }
    public Guid RoleId { get; private set; }
    public Guid AssignedBy { get; private set; }
    public DateTime AssignedAt { get; private set; } = DateTime.UtcNow;

    public User User { get; private set; } = null!;
    public Role Role { get; private set; } = null!;

    // EF requires parameterless constructor
    private UserRoleAssignment() { Id = Guid.NewGuid(); }

    public UserRoleAssignment(User user, Role role, Guid assignedBy)
    {
        Id = Guid.NewGuid();
        User = user;
        Role = role;
        UserId = user.Id;
        RoleId = role.Id;
        AssignedBy = assignedBy;
    }
}