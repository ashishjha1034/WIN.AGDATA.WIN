using FluentValidation;
using WIN.AGDATA.WIN.Application.Commands;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

namespace WIN.AGDATA.WIN.Application.Validators;

public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
{
    public CreateProductCommandValidator()
    {
        RuleFor(x => x.Request.Name).NotEmpty().Length(3, 100);
        RuleFor(x => x.Request.Description).NotEmpty().MinimumLength(10);
        RuleFor(x => x.Request.RequiredPoints).GreaterThan(0);
        RuleFor(x => x.Request.StockQuantity).GreaterThanOrEqualTo(0);
    }
}
