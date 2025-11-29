using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
using FluentValidation;
using WIN.AGDATA.WIN.API.Controllers;
namespace WIN.AGDATA.WIN.API.Validation;

public class RejectRedemptionRequestValidator : AbstractValidator<RejectRedemptionRequest>
{
    public RejectRedemptionRequestValidator()
    {
        RuleFor(x => x.Reason)
            .NotEmpty().WithMessage("Rejection reason is required")
            .MaximumLength(500).WithMessage("Reason cannot exceed 500 characters");
    }
}
