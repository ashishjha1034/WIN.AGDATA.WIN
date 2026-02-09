using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.ValueObjects;
using WIN.AGDATA.WIN.Domain.Exceptions;
using BCrypt.Net;

namespace WIN.AGDATA.WIN.Domain.Entities.Users;

public class User : AuditableEntity<Guid>, IActivatable
{
    public EmployeeId EmployeeId { get; private set; } = null!;
    public EmailAddress Email { get; private set; } = null!;
    public PersonName FirstName { get; private set; } = null!;
    public PersonName LastName { get; private set; } = null!;
    public bool IsActive { get; private set; } = true;
    public bool MustChangePassword { get; private set; } = false;
    public DateTime? LastPasswordChangedAt { get; private set; }

    // Lockout fields for security
    public int FailedLoginCount { get; private set; } = 0;
    public DateTime? LockoutEndUtc { get; private set; }

    public UserPointsAccount PointsAccount { get; private set; } = new();
    public ICollection<UserRoleAssignment> Roles { get; private set; } = new List<UserRoleAssignment>();

    private string _passwordHash = null!;

    private User() { } // EF

    public User(EmployeeId employeeId, EmailAddress email, PersonName firstName, PersonName lastName, string password)
        : base(Guid.NewGuid())
    {
        EmployeeId = employeeId ?? throw new ArgumentNullException(nameof(employeeId));
        Email = email ?? throw new ArgumentNullException(nameof(email));
        FirstName = firstName ?? throw new ArgumentNullException(nameof(firstName));
        LastName = lastName ?? throw new ArgumentNullException(nameof(lastName));
        SetPassword(password);
    }

    // Overloaded constructor for backward compatibility (string parameters)
    public User(string employeeId, string email, string firstName, string lastName, string password)
        : this(
            EmployeeId.Create(employeeId),
            EmailAddress.Create(email),
            PersonName.Create(firstName),
            PersonName.Create(lastName),
            password)
    {
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

    public void Deactivate(string reason)
    {
        Deactivate(reason, Guid.Empty);
    }

    public void Deactivate(string reason, Guid deactivatedBy)
    {
        if (!IsActive)
            return; // Already deactivated - idempotent

        IsActive = false;

        // Raise domain event
        RaiseDomainEvent(new Domain.Events.UserDeactivatedEvent(
            Id, EmployeeId.Value, reason, deactivatedBy));
    }

    public void UpdateInfo(PersonName firstName, PersonName lastName, EmailAddress email)
    {
        FirstName = firstName ?? throw new ArgumentNullException(nameof(firstName));
        LastName = lastName ?? throw new ArgumentNullException(nameof(lastName));
        Email = email ?? throw new ArgumentNullException(nameof(email));
    }

    public void UpdateProfile(string firstName, string lastName)
    {
        FirstName = PersonName.Create(firstName);
        LastName = PersonName.Create(lastName);
    }

    public void UpdateEmail(string email)
    {
        Email = EmailAddress.Create(email);
    }

    public void UpdateEmployeeId(string employeeId)
    {
        EmployeeId = EmployeeId.Create(employeeId);
    }

    public void AssignRole(Role role, Guid assignedBy)
    {
        ValidationGuards.NotNull(role, nameof(role));

        if (Roles.Any(r => r.RoleId == role.Id))
            return;

        var assignment = new UserRoleAssignment(this, role, assignedBy);
        Roles.Add(assignment);
    }

    // Lockout methods
    private const int MaxFailedAttempts = 5;
    private static readonly TimeSpan LockoutDuration = TimeSpan.FromMinutes(3);

    public bool IsLockedOut()
    {
        if (LockoutEndUtc == null) return false;
        if (DateTime.UtcNow >= LockoutEndUtc)
        {
            return false;
        }
        return true;
    }

    public void RecordFailedLogin()
    {
        FailedLoginCount++;

        if (FailedLoginCount >= MaxFailedAttempts)
        {
            LockoutEndUtc = DateTime.UtcNow.Add(LockoutDuration);
        }
    }

    public void ResetFailedLoginCount()
    {
        FailedLoginCount = 0;
        LockoutEndUtc = null;
    }

    public TimeSpan? GetRemainingLockoutTime()
    {
        if (LockoutEndUtc == null) return null;
        var remaining = LockoutEndUtc.Value - DateTime.UtcNow;
        return remaining > TimeSpan.Zero ? remaining : null;
    }
}