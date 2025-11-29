using FluentValidation;
using WIN.AGDATA.WIN.Application.Commands;

namespace WIN.AGDATA.WIN.Application.Validators;

public class RejectRedemptionCommandValidator : AbstractValidator<RejectRedemptionCommand>
{
    public RejectRedemptionCommandValidator()
    {
        RuleFor(x => x.RedemptionId).NotEmpty();
        RuleFor(x => x.Reason).NotEmpty().MaximumLength(500);
        RuleFor(x => x.RejectedBy).NotEmpty();
    }
}
