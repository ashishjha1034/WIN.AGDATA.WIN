using WIN.AGDATA.WIN.APPLICATION.DTOs.Points;
using FluentValidation;
using WIN.AGDATA.WIN.API.Controllers;

namespace WIN.AGDATA.WIN.API.Validation;

public class AddPointsRequestValidator : AbstractValidator<AddPointsRequest>
{
    public AddPointsRequestValidator()
    {
        RuleFor(x => x.EmployeeId)
            .NotEmpty().WithMessage("EmployeeId is required")
            .Length(3, 20);

        RuleFor(x => x.Points)
            .GreaterThan(0).WithMessage("Points must be greater than zero");

        RuleFor(x => x.Reason)
            .NotEmpty().WithMessage("Reason is required");
    }
}
