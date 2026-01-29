using FluentValidation;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

namespace WIN.AGDATA.WIN.APPLICATION.Validators.UserValidators;

/// <summary>
/// FluentValidation validator for AdminResetPasswordRequest
/// Enforces: strong password - min 12, upper/lower/digit/special, no spaces, no personal info
/// </summary>
public class AdminResetPasswordRequestValidator : AbstractValidator<AdminResetPasswordRequest>
{
    private const int PasswordMinLength = 12;

    public AdminResetPasswordRequestValidator()
    {
        RuleFor(x => x.NewTemporaryPassword)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(PasswordMinLength).WithMessage($"Password must be at least {PasswordMinLength} characters.")
            .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
            .Matches(@"[a-z]").WithMessage("Password must contain at least one lowercase letter.")
            .Matches(@"[0-9]").WithMessage("Password must contain at least one digit.")
            .Matches(@"[!@#$%^&*()_+\-=\[\]{};':""\\|,.<>\/?]").WithMessage("Password must contain at least one special character.")
            .Matches(@"^\S+$").WithMessage("Password cannot contain spaces.");
    }
}

/// <summary>
/// Context-aware validator for admin password reset that includes user info checks
/// </summary>
public class AdminResetPasswordContextValidator : AbstractValidator<(AdminResetPasswordRequest Request, string FirstName, string LastName, string EmployeeId)>
{
    private const int PasswordMinLength = 12;

    public AdminResetPasswordContextValidator()
    {
        RuleFor(x => x.Request.NewTemporaryPassword)
            .NotEmpty().WithMessage("Password is required.")
            .MinimumLength(PasswordMinLength).WithMessage($"Password must be at least {PasswordMinLength} characters.")
            .Matches(@"[A-Z]").WithMessage("Password must contain at least one uppercase letter.")
            .Matches(@"[a-z]").WithMessage("Password must contain at least one lowercase letter.")
            .Matches(@"[0-9]").WithMessage("Password must contain at least one digit.")
            .Matches(@"[!@#$%^&*()_+\-=\[\]{};':""\\|,.<>\/?]").WithMessage("Password must contain at least one special character.")
            .Matches(@"^\S+$").WithMessage("Password cannot contain spaces.")
            .Must((ctx, password) => !ContainsPersonalInfo(password, ctx.FirstName, ctx.LastName, ctx.EmployeeId))
            .WithMessage("Password cannot contain first name, last name, or employee ID.");
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
