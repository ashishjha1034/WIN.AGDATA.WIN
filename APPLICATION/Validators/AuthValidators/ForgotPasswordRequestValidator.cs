using FluentValidation;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

namespace WIN.AGDATA.WIN.APPLICATION.Validators.AuthValidators;

/// <summary>
/// FluentValidation validator for ForgotPasswordRequest
/// Enforces: email required + @agdata.com domain
/// </summary>
public class ForgotPasswordRequestValidator : AbstractValidator<ForgotPasswordRequest>
{
    private const string CorporateDomain = "@agdata.com";

    public ForgotPasswordRequestValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Please enter a valid email address.")
            .Must(EndWithCorporateDomain).WithMessage($"Email must end with {CorporateDomain}.");
    }

    private bool EndWithCorporateDomain(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;
        return email.ToLowerInvariant().EndsWith(CorporateDomain);
    }
}
