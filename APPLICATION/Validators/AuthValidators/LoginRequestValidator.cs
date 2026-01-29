using FluentValidation;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

namespace WIN.AGDATA.WIN.APPLICATION.Validators.AuthValidators;

/// <summary>
/// FluentValidation validator for LoginRequest
/// Enforces: email required + @agdata.com domain with local-part >= 5 chars, password required
/// </summary>
public class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    public LoginRequestValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Please enter a valid email address.")
            .Must(SharedValidationRules.IsValidCorporateEmail).WithMessage(SharedValidationRules.GetCorporateEmailErrorMessage());

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(12).WithMessage("Password must be at least 12 characters.");
    }
}
