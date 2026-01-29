using FluentValidation;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.APPLICATION.Validators.UserValidators;

/// <summary>
/// FluentValidation validator for CreateUserRequest
/// Enforces: name rules, employee ID format, email domain with local-part length, password strength, uniqueness
/// </summary>
public class CreateUserRequestValidator : AbstractValidator<CreateUserRequest>
{
    private readonly IUserRepository _userRepository;

    public CreateUserRequestValidator(IUserRepository userRepository)
    {
        _userRepository = userRepository;

        // First Name: 2-50 chars, alphabets only, no spaces/digits/symbols
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("First name is required.")
            .MinimumLength(SharedValidationRules.NameMinLength).WithMessage($"First name must be at least {SharedValidationRules.NameMinLength} characters.")
            .MaximumLength(SharedValidationRules.NameMaxLength).WithMessage($"First name cannot exceed {SharedValidationRules.NameMaxLength} characters.")
            .Matches(@"^[a-zA-Z]+$").WithMessage("First name must contain only letters (no spaces, digits, or symbols).");

        // Last Name: same rules as First Name
        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Last name is required.")
            .MinimumLength(SharedValidationRules.NameMinLength).WithMessage($"Last name must be at least {SharedValidationRules.NameMinLength} characters.")
            .MaximumLength(SharedValidationRules.NameMaxLength).WithMessage($"Last name cannot exceed {SharedValidationRules.NameMaxLength} characters.")
            .Matches(@"^[a-zA-Z]+$").WithMessage("Last name must contain only letters (no spaces, digits, or symbols).");

        // Employee ID: exactly 9 alphanumeric characters
        RuleFor(x => x.EmployeeId)
            .NotEmpty().WithMessage("Employee ID is required.")
            .Length(SharedValidationRules.EmployeeIdLength).WithMessage($"Employee ID must be exactly {SharedValidationRules.EmployeeIdLength} characters.")
            .Matches(@"^[a-zA-Z0-9]+$").WithMessage("Employee ID must contain only letters and numbers.")
            .MustAsync(BeUniqueEmployeeId).WithMessage("This Employee ID is already in use.");

        // Email: valid format + @agdata.com domain with local-part >= 5 chars + unique
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Please enter a valid email address.")
            .Must(SharedValidationRules.IsValidCorporateEmail).WithMessage(SharedValidationRules.GetCorporateEmailErrorMessage())
            .MustAsync(BeUniqueEmail).WithMessage("This email is already in use.");

        // Password: strong password requirements
        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(SharedValidationRules.PasswordMinLength).WithMessage($"Password must be at least {SharedValidationRules.PasswordMinLength} characters.")
            .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
            .Matches(@"[a-z]").WithMessage("Password must contain at least one lowercase letter.")
            .Matches(@"[0-9]").WithMessage("Password must contain at least one digit.")
            .Matches(@"[!@#$%^&*()_+\-=\[\]{};':""\\|,.<>\/?]").WithMessage("Password must contain at least one special character.")
            .Matches(@"^\S+$").WithMessage("Password cannot contain spaces.")
            .Must((request, password) => !ContainsPersonalInfo(password, request.FirstName, request.LastName, request.EmployeeId))
            .WithMessage("Password cannot contain your first name, last name, or employee ID.");
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

    private bool ContainsPersonalInfo(string password, string firstName, string lastName, string employeeId)
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
