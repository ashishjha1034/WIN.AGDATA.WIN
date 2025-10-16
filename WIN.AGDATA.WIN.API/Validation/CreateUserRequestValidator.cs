using FluentValidation;
using WIN.AGDATA.WIN.API.Controllers;

namespace WIN.AGDATA.WIN.API.Validation;

public class CreateUserRequestValidator : AbstractValidator<CreateUserRequest>
{
    public CreateUserRequestValidator()
    {
        RuleFor(x => x.EmployeeId)
            .NotEmpty().WithMessage("Employee ID is required")
            .Length(3, 20).WithMessage("Employee ID must be between 3 and 20 characters")
            .Matches("^[A-Za-z0-9]+$").WithMessage("Employee ID can only contain alphanumeric characters");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required")
            .EmailAddress().WithMessage("Invalid email format")
            .MaximumLength(255).WithMessage("Email cannot exceed 255 characters");

        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("First name is required")
            .Length(1, 50).WithMessage("First name must be between 1 and 50 characters");

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Last name is required")
            .Length(1, 50).WithMessage("Last name must be between 1 and 50 characters");
    }
}
