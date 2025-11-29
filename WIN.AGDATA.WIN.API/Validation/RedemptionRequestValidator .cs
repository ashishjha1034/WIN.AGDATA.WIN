// WIN.AGDATA.WIN.API/Validation/RedemptionRequestValidator.cs
using FluentValidation;
using System;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;

namespace WIN.AGDATA.WIN.API.Validation
{
    public class RedemptionRequestValidator : AbstractValidator<CreateRedemptionRequest>
    {
        public RedemptionRequestValidator()
        {
            RuleFor(x => x.UserId)
                .NotEmpty().WithMessage("UserId is required")
                .Must(id => id != Guid.Empty).WithMessage("UserId must be a valid GUID");

            RuleFor(x => x.ProductId)
                .NotEmpty().WithMessage("ProductId is required")
                .Must(id => id != Guid.Empty).WithMessage("ProductId must be a valid GUID");
        }
    }
}
