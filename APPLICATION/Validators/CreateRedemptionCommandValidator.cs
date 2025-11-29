// APPLICATION/Validators/CreateRedemptionCommandValidator.cs
using FluentValidation;
using WIN.AGDATA.WIN.Application.Commands;

namespace WIN.AGDATA.WIN.APPLICATION.Validators
{
    public class CreateRedemptionCommandValidator : AbstractValidator<CreateRedemptionCommand>
    {
        public CreateRedemptionCommandValidator()
        {
            RuleFor(x => x.UserId).NotEmpty().WithMessage("UserId is required.");
            RuleFor(x => x.ProductId).NotEmpty().WithMessage("ProductId is required.");
        }
    }
}
