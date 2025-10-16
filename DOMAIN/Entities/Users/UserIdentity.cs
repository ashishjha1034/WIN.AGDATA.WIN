namespace Domain.Entities.Users;

public class UserIdentity
{
    [Required]
    [StringLength(20, MinimumLength = 3)]
    public string EmployeeId { get; }

    public EmailAddress Email { get; private set; }

    [Required]
    [StringLength(50, MinimumLength = 1)]
    public string FirstName { get; private set; }

    [Required]
    [StringLength(50, MinimumLength = 1)]
    public string LastName { get; private set; }

    public string FullName => $"{FirstName} {LastName}";

    public UserIdentity(string employeeId, string email, string firstName, string lastName)
    {
        EmployeeId = ValidateAndNormalizeEmployeeId(employeeId);
        Email = new EmailAddress(email);
        FirstName = ValidateAndNormalizeName(firstName, nameof(FirstName));
        LastName = ValidateAndNormalizeName(lastName, nameof(LastName));
    }

    public void UpdateEmail(EmailAddress newEmail)
    {
        Email = newEmail ?? throw new DomainException("Email address cannot be null");
    }

    public void UpdateName(string firstName, string lastName)
    {
        FirstName = ValidateAndNormalizeName(firstName, nameof(FirstName));
        LastName = ValidateAndNormalizeName(lastName, nameof(LastName));
    }

    private static string ValidateAndNormalizeEmployeeId(string employeeId)
    {
        if (string.IsNullOrWhiteSpace(employeeId))
            throw new DomainException("Employee ID is required");

        var normalized = employeeId.Trim().ToUpperInvariant();
        if (normalized.Length < 3 || normalized.Length > 20)
            throw new DomainException("Employee ID must be between 3 and 20 characters");

        return normalized;
    }

    private static string ValidateAndNormalizeName(string name, string fieldName)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new DomainException($"{fieldName} is required");

        var normalized = name.Trim();
        if (normalized.Length < 1 || normalized.Length > 50)
            throw new DomainException($"{fieldName} must be between 1 and 50 characters");

        return normalized;
    }

    public override bool Equals(object? obj)
        => obj is UserIdentity other && EmployeeId == other.EmployeeId;

    public override int GetHashCode() => EmployeeId.GetHashCode();
}
