using System;
using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.Domain.Entities.Users;


public class UserIdentity
{
    [Required]
    [StringLength(20, MinimumLength = 3)]
    public string EmployeeId { get; private set; }

    [Required]
    [StringLength(255)]
    [EmailAddress]
    public string Email { get; private set; }

    [Required]
    [StringLength(50)]
    public string FirstName { get; private set; }

    [Required]
    [StringLength(50)]
    public string LastName { get; private set; }

    public string FullName => $"{FirstName} {LastName}";

    private UserIdentity() { }

    public UserIdentity(string employeeId, string email, string firstName, string lastName)
    {
        // Use ValidationGuards for consistent validation
        EmployeeId = ValidationGuards.ValidateAndNormalizeId(employeeId, "Employee ID");
        Email = ValidationGuards.ValidateAndNormalizeEmail(email);
        FirstName = ValidationGuards.ValidateAndNormalizeName(firstName, "First name", 1, 50);
        LastName = ValidationGuards.ValidateAndNormalizeName(lastName, "Last name", 1, 50);
    }

    public void UpdateName(string firstName, string lastName)
    {
        FirstName = ValidationGuards.ValidateAndNormalizeName(firstName, "First name", 1, 50);
        LastName = ValidationGuards.ValidateAndNormalizeName(lastName, "Last name", 1, 50);
    }

    public void UpdateEmail(string email)
    {
        Email = ValidationGuards.ValidateAndNormalizeEmail(email);
    }

    public override bool Equals(object? obj)
    {
        if (obj is not UserIdentity other)
            return false;

        return EmployeeId == other.EmployeeId;
    }

    public override int GetHashCode() => EmployeeId.GetHashCode();

    public override string? ToString() => $"{EmployeeId} - {FullName} ({Email})";
}
