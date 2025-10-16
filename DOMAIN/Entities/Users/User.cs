using System.Security.Principal;

namespace Domain.Entities.Users;

public class User
{
    public UserIdentity Identity { get; }
    public UserStatus Status { get; }
    public UserPoints Points { get; }
    public UserRole Role { get; private set; }

    public DateTime CreatedAt { get; }
    public string CreatedBy { get; }
    public DateTime? LastModifiedAt { get; private set; }
    public string? LastModifiedBy { get; private set; }

    public User(string employeeId, string email, string firstName, string lastName,
               UserRole role = UserRole.Employee, string createdBy = "SYSTEM")
    {
        Identity = new UserIdentity(employeeId, email, firstName, lastName);
        Status = new UserStatus();
        Points = new UserPoints();
        Role = role;
        CreatedAt = DateTime.UtcNow;
        CreatedBy = createdBy ?? "SYSTEM";
    }

    public void UpdateUserInfo(string firstName, string lastName, string modifiedBy)
    {
        Identity.UpdateName(firstName, lastName);
        UpdateAuditInfo(modifiedBy);
    }

    public void UpdateEmail(EmailAddress newEmail, string modifiedBy)
    {
        Identity.UpdateEmail(newEmail);
        UpdateAuditInfo(modifiedBy);
    }

    public void PromoteToAdmin(string modifiedBy)
    {
        if (Role == UserRole.SuperAdmin)
            throw new DomainException("Super admin role cannot be changed");

        Role = UserRole.Admin;
        UpdateAuditInfo(modifiedBy);
    }

    public void DemoteToEmployee(string modifiedBy)
    {
        if (Role == UserRole.SuperAdmin)
            throw new DomainException("Super admin role cannot be changed");

        Role = UserRole.Employee;
        UpdateAuditInfo(modifiedBy);
    }

    public void Deactivate(string modifiedBy)
    {
        Status.Deactivate();
        UpdateAuditInfo(modifiedBy);
    }

    public void Reactivate(string modifiedBy)
    {
        Status.Reactivate();
        UpdateAuditInfo(modifiedBy);
    }

    public bool IsAdmin => Role == UserRole.Admin || Role == UserRole.SuperAdmin;
    public bool IsSuperAdmin => Role == UserRole.SuperAdmin;
    public bool IsActive => Status.IsActive;

    public bool CanManageEvents => IsAdmin;
    public bool CanManageUsers => IsAdmin;
    public bool CanManageProducts => IsAdmin;
    public bool CanParticipateInEvents => Status.IsActive;

    private void UpdateAuditInfo(string modifiedBy)
    {
        LastModifiedAt = DateTime.UtcNow;
        LastModifiedBy = modifiedBy ?? "SYSTEM";
    }

    public override bool Equals(object? obj)
        => obj is User other && Identity.EmployeeId == other.Identity.EmployeeId;

    public override int GetHashCode() => Identity.EmployeeId.GetHashCode();
}
