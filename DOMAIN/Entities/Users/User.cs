using System.Data;
using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.Domain.Entities.Users;

public class User : AuditableEntity<Guid>
{
    public Guid Id { get; private set; }
    public string EmployeeId { get; private set; } = null!;
    public EmailAddress Email { get; private set; } = null!;
    public string FirstName { get; private set; } = null!;
    public string LastName { get; private set; } = null!;
    public UserStatus Status { get; private set; }
    public bool IsActive { get; private set; }

    // Navigation
    public UserPointsAccount PointsAccount { get; private set; } = null!;
    public IReadOnlyCollection<UserRoleAssignment> Roles => _roles.AsReadOnly();
    private readonly List<UserRoleAssignment> _roles = new();

    private User() { } // EF

    public User(string employeeId, EmailAddress email, string firstName, string lastName)
    {
        Id = Guid.NewGuid();
        EmployeeId = employeeId;
        Email = email;
        FirstName = firstName;
        LastName = lastName;
        Status = UserStatus.Active;
        IsActive = true;
    }

    public static User Create(string employeeId, EmailAddress email, string firstName, string lastName)
    {
        var u = new User();
        u.GetType().GetProperty("EmployeeId")!.SetValue(u, employeeId);
        u.GetType().GetProperty("Email")!.SetValue(u, email);
        u.GetType().GetProperty("FirstName")!.SetValue(u, firstName);
        u.GetType().GetProperty("LastName")!.SetValue(u, lastName);
        u.GetType().GetProperty("Status")!.SetValue(u, 1); // Active
        return u;
    }

    public void Deactivate() => IsActive = false;
    public void Activate() => IsActive = true;

    public void AssignRole(Role role, Guid assignedBy)
    {
        var assignment = new UserRoleAssignment(Id, role.Id, assignedBy);
        if (!_roles.Contains(assignment))
            _roles.Add(assignment);
    }

    public void RemoveRole(Role role)
        => _roles.RemoveAll(x => x.RoleId == role.Id);
    public void UpdateInfo(string firstName, string lastName, EmailAddress email)
    {
        FirstName = firstName;
        LastName = lastName;
        Email = email;
    }
}