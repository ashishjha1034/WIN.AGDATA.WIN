using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using FluentValidation;
using WIN.AGDATA.WIN.API.Controllers;
namespace WIN.AGDATA.WIN.API.Validation;

public class DeactivateUserRequestValidator : AbstractValidator<DeactivateUserRequest>
{
    public DeactivateUserRequestValidator()
    {
        RuleFor(x => x.Reason)
            .NotEmpty().WithMessage("Deactivation reason is required")
            .MaximumLength(500);
    }
}
