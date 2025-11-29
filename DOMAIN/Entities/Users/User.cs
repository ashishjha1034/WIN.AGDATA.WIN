
using System;
using System.ComponentModel.DataAnnotations;
using WIN.AGDATA.WIN.Domain.Common;

namespace WIN.AGDATA.WIN.Domain.Entities.Users;

public class User
{
    [Key]
    [Required]
    public Guid Id { get; private set; }

    [Required]
    public UserIdentity Identity { get; private set; }

    [Required]
    public UserStatus Status { get; private set; }

    [Required]
    public UserPoints Points { get; private set; }

    [Required]
    [EnumDataType(typeof(UserRole))]
    public UserRole Role { get; private set; }

    [Required]
    public DateTime CreatedAt { get; private set; }

    [Required]
    [StringLength(50)]
    public string CreatedBy { get; private set; }

    public DateTime? LastModifiedAt { get; private set; }

    [StringLength(50)]
    public string? LastModifiedBy { get; private set; }

    public bool IsAdmin => Role == UserRole.Admin || Role == UserRole.SuperAdmin;

    private User() { }

    public User(string employeeId, string email, string firstName, string lastName, string createdBy = "SYSTEM")
    {
        Id = Guid.NewGuid();
        Identity = new UserIdentity(employeeId, email, firstName, lastName);
        Status = new UserStatus();
        Points = new UserPoints();
        Role = UserRole.Employee;
        CreatedAt = DateTime.UtcNow;
        CreatedBy = createdBy;
    }

    public void UpdateUserInfo(string firstName, string lastName, string email, string modifiedBy = "SYSTEM")
    {
        Identity.UpdateName(firstName, lastName);
        Identity.UpdateEmail(email);
        UpdateModificationInfo(modifiedBy);
    }

    public void PromoteToAdmin(string modifiedBy = "SYSTEM")
    {
        if (Role == UserRole.SuperAdmin)
            throw new DomainException("Super admin role cannot be changed");

        Role = UserRole.Admin;
        UpdateModificationInfo(modifiedBy);
    }

    public void DemoteToEmployee(string modifiedBy = "SYSTEM")
    {
        if (Role == UserRole.SuperAdmin)
            throw new DomainException("Super admin cannot be demoted");

        Role = UserRole.Employee;
        UpdateModificationInfo(modifiedBy);
    }

    public void EarnPoints(int points, string modifiedBy = "SYSTEM")
    {
        Points.AddPoints(points);
        UpdateModificationInfo(modifiedBy);
    }

    public void SpendPoints(int points, string modifiedBy = "SYSTEM")
    {
        Points.SpendPoints(points);
        UpdateModificationInfo(modifiedBy);
    }

    public void RefundPoints(int points, string modifiedBy = "SYSTEM")
    {
        Points.RefundPoints(points);
        UpdateModificationInfo(modifiedBy);
    }

    public bool CanParticipateInEvents() => Status.CanParticipateInEvents();

    public bool CanRedeemProducts() => Status.CanParticipateInEvents();

    public void Deactivate(string reason, string modifiedBy = "SYSTEM")
    {
        Status.Deactivate(reason);
        UpdateModificationInfo(modifiedBy);
    }

    public void Activate(string modifiedBy = "SYSTEM")
    {
        Status.Activate();
        UpdateModificationInfo(modifiedBy);
    }

    private void UpdateModificationInfo(string modifiedBy)
    {
        LastModifiedAt = DateTime.UtcNow;
        LastModifiedBy = modifiedBy;
    }

    public override string? ToString() => $"{Identity.FullName} ({Identity.EmployeeId}) - Points: {Points.CurrentBalance}";
}
