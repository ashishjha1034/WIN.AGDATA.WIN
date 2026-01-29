using FluentValidation;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.APPLICATION.Validators.UserValidators;

/// <summary>
/// FluentValidation validator for UpdateUserInfoRequest
/// Enforces: name rules, email domain - skips uniqueness if value unchanged
/// </summary>
public class UpdateUserInfoRequestValidator : AbstractValidator<UpdateUserInfoRequest>
{
    private readonly IUserRepository _userRepository;
    private Guid? _currentUserId;

    // Validation constants
    private const int NameMinLength = 2;
    private const int NameMaxLength = 50;
    private const int EmployeeIdLength = 9;
    private const string CorporateDomain = "@agdata.com";

    public UpdateUserInfoRequestValidator(IUserRepository userRepository)
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

        // Email: valid format + @agdata.com domain + unique (if changed)
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Please enter a valid email address.")
            .Must(EndWithCorporateDomain).WithMessage($"Email must end with {CorporateDomain}.");

        // Employee ID (optional): if provided, exactly 9 alphanumeric characters
        RuleFor(x => x.EmployeeId)
            .Length(EmployeeIdLength).WithMessage($"Employee ID must be exactly {EmployeeIdLength} characters.")
            .Matches(@"^[a-zA-Z0-9]+$").WithMessage("Employee ID must contain only letters and numbers.")
            .When(x => !string.IsNullOrWhiteSpace(x.EmployeeId));
    }

    /// <summary>
    /// Sets the current user ID for uniqueness checks that should skip unchanged values
    /// </summary>
    public void SetCurrentUserId(Guid userId)
    {
        _currentUserId = userId;
    }

    private bool EndWithCorporateDomain(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;
        return email.ToLowerInvariant().EndsWith(CorporateDomain);
    }
}

/// <summary>
/// Context-aware validator that can check uniqueness while excluding the current user
/// </summary>
public class UpdateUserInfoRequestContextValidator : AbstractValidator<(UpdateUserInfoRequest Request, Guid UserId)>
{
    private readonly IUserRepository _userRepository;

    private const int NameMinLength = 2;
    private const int NameMaxLength = 50;
    private const int EmployeeIdLength = 9;
    private const string CorporateDomain = "@agdata.com";

    public UpdateUserInfoRequestContextValidator(IUserRepository userRepository)
    {
        _userRepository = userRepository;

        // First Name
        RuleFor(x => x.Request.FirstName)
            .NotEmpty().WithMessage("First name is required.")
            .MinimumLength(NameMinLength).WithMessage($"First name must be at least {NameMinLength} characters.")
            .MaximumLength(NameMaxLength).WithMessage($"First name cannot exceed {NameMaxLength} characters.")
            .Matches(@"^[a-zA-Z]+$").WithMessage("First name must contain only letters (no spaces, digits, or symbols).");

        // Last Name
        RuleFor(x => x.Request.LastName)
            .NotEmpty().WithMessage("Last name is required.")
            .MinimumLength(NameMinLength).WithMessage($"Last name must be at least {NameMinLength} characters.")
            .MaximumLength(NameMaxLength).WithMessage($"Last name cannot exceed {NameMaxLength} characters.")
            .Matches(@"^[a-zA-Z]+$").WithMessage("Last name must contain only letters (no spaces, digits, or symbols).");

        // Email: unique check excludes current user
        RuleFor(x => x.Request.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Please enter a valid email address.")
            .Must(email => EndWithCorporateDomain(email)).WithMessage($"Email must end with {CorporateDomain}.")
            .MustAsync(BeUniqueEmailExcludingCurrent).WithMessage("This email is already in use.");

        // Employee ID: unique check excludes current user (if provided)
        RuleFor(x => x.Request.EmployeeId)
            .Length(EmployeeIdLength).WithMessage($"Employee ID must be exactly {EmployeeIdLength} characters.")
            .Matches(@"^[a-zA-Z0-9]+$").WithMessage("Employee ID must contain only letters and numbers.")
            .MustAsync(BeUniqueEmployeeIdExcludingCurrent).WithMessage("This Employee ID is already in use.")
            .When(x => !string.IsNullOrWhiteSpace(x.Request.EmployeeId));
    }

    private bool EndWithCorporateDomain(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;
        return email.ToLowerInvariant().EndsWith(CorporateDomain);
    }

    private async Task<bool> BeUniqueEmailExcludingCurrent((UpdateUserInfoRequest Request, Guid UserId) context, string email, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(email)) return true;
        var existing = await _userRepository.GetByEmailAsync(email.ToLowerInvariant());
        // Valid if no existing user, or if the existing user is the current user
        return existing == null || existing.Id == context.UserId;
    }

    private async Task<bool> BeUniqueEmployeeIdExcludingCurrent((UpdateUserInfoRequest Request, Guid UserId) context, string? employeeId, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(employeeId)) return true;
        var existing = await _userRepository.GetByEmployeeIdAsync(employeeId);
        // Valid if no existing user, or if the existing user is the current user
        return existing == null || existing.Id == context.UserId;
    }
}
