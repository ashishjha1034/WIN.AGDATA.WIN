using FluentValidation;
using WIN.AGDATA.WIN.Application.Commands;

namespace WIN.AGDATA.WIN.Application.Validators;

public class MarkRedemptionDeliveredCommandValidator : AbstractValidator<MarkRedemptionDeliveredCommand>
{
    public MarkRedemptionDeliveredCommandValidator()
    {
        RuleFor(x => x.RedemptionId).NotEmpty();
        RuleFor(x => x.DeliveredBy).NotEmpty();
    }
}
