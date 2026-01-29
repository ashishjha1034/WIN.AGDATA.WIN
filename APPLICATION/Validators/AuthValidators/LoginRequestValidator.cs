using FluentValidation;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

namespace WIN.AGDATA.WIN.APPLICATION.Validators.AuthValidators;

/// <summary>
/// FluentValidation validator for LoginRequest
/// Enforces: email required + @agdata.com domain, password required
/// </summary>
public class LoginRequestValidator : AbstractValidator<LoginRequest>
{
    private const string CorporateDomain = "@agdata.com";

    public LoginRequestValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Please enter a valid email address.")
            .Must(EndWithCorporateDomain).WithMessage($"Email must end with {CorporateDomain}.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.");
    }

    private bool EndWithCorporateDomain(string email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;
        return email.ToLowerInvariant().EndsWith(CorporateDomain);
    }
}
