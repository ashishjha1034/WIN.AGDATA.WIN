using FluentValidation;
using WIN.AGDATA.WIN.Application.Commands;

namespace WIN.AGDATA.WIN.Application.Validators;

public class ApproveRedemptionCommandValidator : AbstractValidator<ApproveRedemptionCommand>
{
    public ApproveRedemptionCommandValidator()
    {
        RuleFor(x => x.RedemptionId).NotEmpty();
        RuleFor(x => x.ApprovedBy).NotEmpty();
    }
}
