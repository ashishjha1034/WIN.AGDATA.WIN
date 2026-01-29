using FluentValidation;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

namespace WIN.AGDATA.WIN.APPLICATION.Validators.AuthValidators;

/// <summary>
/// FluentValidation validator for ForgotPasswordRequest
/// Enforces: email required + @agdata.com domain with local-part >= 5 chars
/// </summary>
public class ForgotPasswordRequestValidator : AbstractValidator<ForgotPasswordRequest>
{
    public ForgotPasswordRequestValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Please enter a valid email address.")
            .Must(SharedValidationRules.IsValidCorporateEmail).WithMessage(SharedValidationRules.GetCorporateEmailErrorMessage());
    }
}
