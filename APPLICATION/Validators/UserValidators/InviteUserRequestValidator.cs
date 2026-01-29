using FluentValidation;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.APPLICATION.Validators.UserValidators;

/// <summary>
/// FluentValidation validator for InviteUserRequest
/// Enforces: name rules, employee ID format, email domain, temp password strength, uniqueness, roles
/// </summary>
public class InviteUserRequestValidator : AbstractValidator<InviteUserRequest>
{
    private readonly IUserRepository _userRepository;

    // Validation constants
    private const int NameMinLength = 2;
    private const int NameMaxLength = 50;
    private const int EmployeeIdLength = 9;
    private const int PasswordMinLength = 12;
    private const string CorporateDomain = "@agdata.com";

    // Allowed roles
    private static readonly string[] AllowedRoles = { "Admin", "Employee", "Manager" };

    public InviteUserRequestValidator(IUserRepository userRepository)
    {
        _userRepository = userRepository;

        // First Name: 2-50 chars, alphabets only, no spaces/digits/symbols
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("First name is required.")
            .MinimumLength(NameMinLength).WithMessage($"First name must be at least {NameMinLength} characters.")
            .MaximumLength(NameMaxLength).WithMessage($"First name cannot exceed {NameMaxLength} characters.")
            .Matches(@"^[a-zA-Z]+$").WithMessage("First name must contain only letters (no spaces, digits, or symbols).");

        // Last Name: same rules as First Name
        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Last name is required.")
            .MinimumLength(NameMinLength).WithMessage($"Last name must be at least {NameMinLength} characters.")
            .MaximumLength(NameMaxLength).WithMessage($"Last name cannot exceed {NameMaxLength} characters.")
            .Matches(@"^[a-zA-Z]+$").WithMessage("Last name must contain only letters (no spaces, digits, or symbols).");

        // Employee ID: exactly 9 alphanumeric characters
        RuleFor(x => x.EmployeeId)
            .NotEmpty().WithMessage("Employee ID is required.")
            .Length(EmployeeIdLength).WithMessage($"Employee ID must be exactly {EmployeeIdLength} characters.")
            .Matches(@"^[a-zA-Z0-9]+$").WithMessage("Employee ID must contain only letters and numbers.")
            .MustAsync(BeUniqueEmployeeId).WithMessage("This Employee ID is already in use.");

        // Email: valid format + @agdata.com domain + unique
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Please enter a valid email address.")
            .Must(EndWithCorporateDomain).WithMessage($"Email must end with {CorporateDomain}.")
            .MustAsync(BeUniqueEmail).WithMessage("This email is already in use.");

        // Roles: if provided, must be valid role names
        RuleFor(x => x.Roles)
            .Must(BeValidRoles).WithMessage($"Invalid role(s) provided. Allowed roles: {string.Join(", ", AllowedRoles)}.")
            .When(x => x.Roles != null && x.Roles.Any());

        // Temporary Password: required when GenerateTempPassword is false
        RuleFor(x => x.TemporaryPassword)
            .NotEmpty().WithMessage("Temporary password is required when not generating automatically.")
            .When(x => !x.GenerateTempPassword);

        // Strong password validation when temp password is provided
        RuleFor(x => x.TemporaryPassword)
            .MinimumLength(PasswordMinLength).WithMessage($"Password must be at least {PasswordMinLength} characters.")
            .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
            .Matches(@"[a-z]").WithMessage("Password must contain at least one lowercase letter.")
            .Matches(@"[0-9]").WithMessage("Password must contain at least one digit.")
            .Matches(@"[!@#$%^&*()_+\-=\[\]{};':""\\|,.<>\/?]").WithMessage("Password must contain at least one special character.")
            .Matches(@"^\S+$").WithMessage("Password cannot contain spaces.")
            .Must((request, password) => !ContainsPersonalInfo(password, request.FirstName, request.LastName, request.EmployeeId))
            .WithMessage("Password cannot contain your first name, last name, or employee ID.")
            .When(x => !string.IsNullOrWhiteSpace(x.TemporaryPassword));
    }

    private bool EndWithCorporateDomain(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;
        return email.ToLowerInvariant().EndsWith(CorporateDomain);
    }

    private async Task<bool> BeUniqueEmployeeId(string employeeId, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(employeeId)) return true;
        var existing = await _userRepository.GetByEmployeeIdAsync(employeeId);
        return existing == null;
    }

    private async Task<bool> BeUniqueEmail(string email, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(email)) return true;
        var existing = await _userRepository.GetByEmailAsync(email.ToLowerInvariant());
        return existing == null;
    }

    private bool BeValidRoles(List<string>? roles)
    {
        if (roles == null || !roles.Any()) return true;
        return roles.All(r => AllowedRoles.Contains(r, StringComparer.OrdinalIgnoreCase));
    }

    private bool ContainsPersonalInfo(string? password, string firstName, string lastName, string employeeId)
    {
        if (string.IsNullOrWhiteSpace(password)) return false;

        var passwordLower = password.ToLowerInvariant();

        if (!string.IsNullOrWhiteSpace(firstName) && passwordLower.Contains(firstName.ToLowerInvariant()))
            return true;

        if (!string.IsNullOrWhiteSpace(lastName) && passwordLower.Contains(lastName.ToLowerInvariant()))
            return true;

        if (!string.IsNullOrWhiteSpace(employeeId) && passwordLower.Contains(employeeId.ToLowerInvariant()))
            return true;

        return false;
    }
}
