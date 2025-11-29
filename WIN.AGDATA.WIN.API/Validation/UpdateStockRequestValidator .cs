using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using FluentValidation;
using WIN.AGDATA.WIN.API.Controllers;
namespace WIN.AGDATA.WIN.API.Validation;

public class UpdateStockRequestValidator : AbstractValidator<UpdateStockRequest>
{
    public UpdateStockRequestValidator()
    {
        RuleFor(x => x.NewQuantity)
            .GreaterThanOrEqualTo(0).WithMessage("Stock quantity must be zero or greater");
    }
}
