using FluentValidation;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.APPLICATION.Validators.UserValidators;

/// <summary>
/// FluentValidation validator for UpdateUserInfoRequest
/// Enforces: name rules only - Email and EmployeeId cannot be changed after creation
/// Uses SharedValidationRules for consistency with frontend validation.
/// </summary>
public class UpdateUserInfoRequestValidator : AbstractValidator<UpdateUserInfoRequest>
{
    public UpdateUserInfoRequestValidator()
    {
        // First Name: 2-50 chars, alphabets only, no spaces/digits/symbols
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("First name is required.")
            .MinimumLength(SharedValidationRules.NameMinLength)
                .WithMessage($"First name must be at least {SharedValidationRules.NameMinLength} characters.")
            .MaximumLength(SharedValidationRules.NameMaxLength)
                .WithMessage($"First name cannot exceed {SharedValidationRules.NameMaxLength} characters.")
            .Must(SharedValidationRules.IsAlphaOnly)
                .WithMessage("First name must contain only letters (no spaces, digits, or symbols).");

        // Last Name: same rules as First Name
        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Last name is required.")
            .MinimumLength(SharedValidationRules.NameMinLength)
                .WithMessage($"Last name must be at least {SharedValidationRules.NameMinLength} characters.")
            .MaximumLength(SharedValidationRules.NameMaxLength)
                .WithMessage($"Last name cannot exceed {SharedValidationRules.NameMaxLength} characters.")
            .Must(SharedValidationRules.IsAlphaOnly)
                .WithMessage("Last name must contain only letters (no spaces, digits, or symbols).");

        // Email and EmployeeId are NOT validated here because they cannot be changed
        // If the request includes them, they will be ignored by the controller
    }
}

/// <summary>
/// Context-aware validator that validates name changes only.
/// Email and EmployeeId modifications are not allowed - the controller will reject such attempts.
/// </summary>
public class UpdateUserInfoRequestContextValidator : AbstractValidator<(UpdateUserInfoRequest Request, Guid UserId)>
{
    public UpdateUserInfoRequestContextValidator()
    {
        // First Name: use shared validation rules
        RuleFor(x => x.Request.FirstName)
            .NotEmpty().WithMessage("First name is required.")
            .MinimumLength(SharedValidationRules.NameMinLength)
                .WithMessage($"First name must be at least {SharedValidationRules.NameMinLength} characters.")
            .MaximumLength(SharedValidationRules.NameMaxLength)
                .WithMessage($"First name cannot exceed {SharedValidationRules.NameMaxLength} characters.")
            .Must(SharedValidationRules.IsAlphaOnly)
                .WithMessage("First name must contain only letters (no spaces, digits, or symbols).");

        // Last Name: use shared validation rules
        RuleFor(x => x.Request.LastName)
            .NotEmpty().WithMessage("Last name is required.")
            .MinimumLength(SharedValidationRules.NameMinLength)
                .WithMessage($"Last name must be at least {SharedValidationRules.NameMinLength} characters.")
            .MaximumLength(SharedValidationRules.NameMaxLength)
                .WithMessage($"Last name cannot exceed {SharedValidationRules.NameMaxLength} characters.")
            .Must(SharedValidationRules.IsAlphaOnly)
                .WithMessage("Last name must contain only letters (no spaces, digits, or symbols).");

        // Note: Email and EmployeeId validation removed - these fields cannot be modified
        // The controller will reject any attempts to change them
    }
}
