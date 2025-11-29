using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using FluentValidation;
using WIN.AGDATA.WIN.API.Controllers;
namespace WIN.AGDATA.WIN.API.Validation;

public class UpdateProductDetailsRequestValidator : AbstractValidator<UpdateProductDetailsRequest>
{
    public UpdateProductDetailsRequestValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Product name is required")
            .Length(3, 100);

        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required")
            .MinimumLength(10);
    }
}
