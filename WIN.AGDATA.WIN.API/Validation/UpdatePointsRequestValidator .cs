using FluentValidation;
using WIN.AGDATA.WIN.API.Controllers;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Points;   // for product DTOs
namespace WIN.AGDATA.WIN.API.Validation;

public class UpdatePointsRequestValidator : AbstractValidator<UpdatePointsRequest>
{
    public UpdatePointsRequestValidator()
    {
        RuleFor(x => x.NewPoints)
            .GreaterThan(0).WithMessage("Points must be greater than zero");
    }
}
