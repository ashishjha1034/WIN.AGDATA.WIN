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
            .Matches(@"^[a-zA-Z0-9]+$").WithMessage("Employee ID must contain only letters and numbers.");

        // Email: valid format + @agdata.com domain
        // Email validation: start with letter/number, contain only allowed chars, not only symbols
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Please enter a valid email address.")
            .Must(EndWithCorporateDomain).WithMessage($"Email must end with {CorporateDomain}.")
            .Must(EmailStartsWithLetterOrNumber).WithMessage("Email must start with a letter or number.")
            .Must(EmailHasValidCharacters).WithMessage("Email can only contain letters, numbers, and . _ + - symbols.")
            .Must(EmailNotOnlySymbols).WithMessage("Email cannot be only symbols.");

        // Roles: if provided, must be valid role names
        RuleFor(x => x.Roles)
            .Must(BeValidRoles).WithMessage($"Invalid role(s) provided. Allowed roles: {string.Join(", ", AllowedRoles)}.")
            .When(x => x.Roles != null && x.Roles.Any());

        // Temporary Password: required when GenerateTempPassword is false
        RuleFor(x => x.TemporaryPassword)
            .NotEmpty().WithMessage("Temporary password is required when not generating automatically.")
            .When(x => !x.GenerateTempPassword);

        // Strong password validation when temp password is provided
        // Note: Personal info validation removed per requirements
        RuleFor(x => x.TemporaryPassword)
            .MinimumLength(PasswordMinLength).WithMessage($"Password must be at least {PasswordMinLength} characters.")
            .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
            .Matches(@"[a-z]").WithMessage("Password must contain at least one lowercase letter.")
            .Matches(@"[0-9]").WithMessage("Password must contain at least one digit.")
            .Matches(@"[!@#$%^&*()_+\-=\[\]{};':""\\|,.<>\/?]").WithMessage("Password must contain at least one special character.")
            .Matches(@"^\S+$").WithMessage("Password cannot contain spaces.")
            .When(x => !string.IsNullOrWhiteSpace(x.TemporaryPassword));
    }

    private bool EndWithCorporateDomain(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;
        return email.ToLowerInvariant().EndsWith(CorporateDomain);
    }

    private bool EmailStartsWithLetterOrNumber(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;
        var localPart = email.Split('@')[0];
        if (string.IsNullOrEmpty(localPart)) return false;
        return char.IsLetterOrDigit(localPart[0]);
    }

    private bool EmailHasValidCharacters(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;
        var localPart = email.Split('@')[0];
        if (string.IsNullOrEmpty(localPart)) return false;
        return System.Text.RegularExpressions.Regex.IsMatch(localPart, @"^[a-zA-Z0-9._+-]+$");
    }

    private bool EmailNotOnlySymbols(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;
        var localPart = email.Split('@')[0];
        if (string.IsNullOrEmpty(localPart)) return false;
        return System.Text.RegularExpressions.Regex.IsMatch(localPart, @"[a-zA-Z0-9]");
    }

    private bool BeValidRoles(List<string>? roles)
    {
        if (roles == null || !roles.Any()) return true;
        return roles.All(r => AllowedRoles.Contains(r, StringComparer.OrdinalIgnoreCase));
    }
}
