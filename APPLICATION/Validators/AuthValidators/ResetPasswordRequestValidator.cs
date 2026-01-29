using FluentValidation;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

namespace WIN.AGDATA.WIN.APPLICATION.Validators.AuthValidators;

/// <summary>
/// FluentValidation validator for ResetPasswordRequest
/// Enforces: strong password - min 12, upper/lower/digit/special, no spaces
/// </summary>
public class ResetPasswordRequestValidator : AbstractValidator<ResetPasswordRequest>
{
    private const int PasswordMinLength = 12;

    public ResetPasswordRequestValidator()
    {
        RuleFor(x => x.Token)
            .NotEmpty().WithMessage("Reset token is required.");

        RuleFor(x => x.NewPassword)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(PasswordMinLength).WithMessage($"Password must be at least {PasswordMinLength} characters.")
            .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
            .Matches(@"[a-z]").WithMessage("Password must contain at least one lowercase letter.")
            .Matches(@"[0-9]").WithMessage("Password must contain at least one digit.")
            .Matches(@"[!@#$%^&*()_+\-=\[\]{};':""\\|,.<>\/?]").WithMessage("Password must contain at least one special character.")
            .Matches(@"^\S+$").WithMessage("Password cannot contain spaces.");
    }
}
