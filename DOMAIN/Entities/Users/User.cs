using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.ValueObjects;
using BCrypt.Net;

namespace WIN.AGDATA.WIN.Domain.Entities.Users;

public class User : AuditableEntity<Guid>, IActivatable
{
    public Guid Id { get; private set; } = Guid.NewGuid();
    public string EmployeeId { get; private set; } = null!;
    public EmailAddress Email { get; private set; } = null!;
    public string FirstName { get; private set; } = null!;
    public string LastName { get; private set; } = null!;
    public bool IsActive { get; private set; } = true;
    public bool MustChangePassword { get; private set; } = false;
    public DateTime? LastPasswordChangedAt { get; private set; }

    public UserPointsAccount PointsAccount { get; private set; } = new();
    public ICollection<UserRoleAssignment> Roles { get; private set; } = new List<UserRoleAssignment>();

    private string _passwordHash = null!;

    private User() { } // EF

    public User(string employeeId, EmailAddress email, string firstName, string lastName, string password)
    {
        ValidationGuards.NotNullOrWhiteSpace(employeeId, nameof(employeeId));
        ValidationGuards.NotNull(email, nameof(email));
        ValidationGuards.NotNullOrWhiteSpace(firstName, nameof(firstName));
        ValidationGuards.NotNullOrWhiteSpace(lastName, nameof(lastName));

        EmployeeId = employeeId;
        Email = email;
        FirstName = firstName;
        LastName = lastName;
        SetPassword(password);
    }

    public void SetPassword(string password)
    {
        ValidationGuards.NotNullOrWhiteSpace(password, nameof(password));
        _passwordHash = BCrypt.Net.BCrypt.HashPassword(password);
        LastPasswordChangedAt = DateTime.UtcNow;
        MustChangePassword = false;
    }

    public bool VerifyPassword(string password)
        => BCrypt.Net.BCrypt.Verify(password, _passwordHash);

    public void RequirePasswordChange()
    {
        MustChangePassword = true;
    }

    public void ChangePassword(string currentPassword, string newPassword)
    {
        ValidationGuards.NotNullOrWhiteSpace(currentPassword, nameof(currentPassword));
        ValidationGuards.NotNullOrWhiteSpace(newPassword, nameof(newPassword));

        if (!VerifyPassword(currentPassword))
            throw new InvalidOperationException("Current password is incorrect");

        SetPassword(newPassword);
    }

    public void ForceSetTemporaryPassword(string temporaryPassword, bool byAdmin = false)
    {
        ValidationGuards.NotNullOrWhiteSpace(temporaryPassword, nameof(temporaryPassword));
        _passwordHash = BCrypt.Net.BCrypt.HashPassword(temporaryPassword);
        MustChangePassword = true;
        LastPasswordChangedAt = DateTime.UtcNow;
    }

    public void Activate() => IsActive = true;
    public void Deactivate(string reason) => IsActive = false;

    public void UpdateInfo(string firstName, string lastName, EmailAddress email)
    {
        ValidationGuards.NotNullOrWhiteSpace(firstName, nameof(firstName));
        ValidationGuards.NotNullOrWhiteSpace(lastName, nameof(lastName));
        ValidationGuards.NotNull(email, nameof(email));

        FirstName = firstName;
        LastName = lastName;
        Email = email;
    }

    public void AssignRole(Role role, Guid assignedBy)
    {
        ValidationGuards.NotNull(role, nameof(role));

        if (Roles.Any(r => r.RoleId == role.Id))
            return;

        var assignment = new UserRoleAssignment(this, role, assignedBy);
        Roles.Add(assignment);
    }
    public void UpdateProfile(string firstName, string lastName)
    {
        if (string.IsNullOrWhiteSpace(firstName))
            throw new InvalidOperationException("First name cannot be empty");

        if (string.IsNullOrWhiteSpace(lastName))
            throw new InvalidOperationException("Last name cannot be empty");

        FirstName = firstName;
        LastName = lastName;
    }

    public void UpdateEmail(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            throw new InvalidOperationException("Email cannot be empty");

        Email = EmailAddress.Create(email);
    }

    public void UpdateEmployeeId(string employeeId)
    {
        if (string.IsNullOrWhiteSpace(employeeId))
            throw new InvalidOperationException("Employee ID cannot be empty");

        EmployeeId = employeeId;
    }

}