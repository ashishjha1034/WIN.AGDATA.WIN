using FluentValidation;
using WIN.AGDATA.WIN.Application.Commands;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

namespace APPLICATION.Validators;

public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserCommandValidator()
    {
        RuleFor(x => x.Request.EmployeeId).NotEmpty().Length(1, 50);
        RuleFor(x => x.Request.Email).NotEmpty().EmailAddress().MaximumLength(255);
        RuleFor(x => x.Request.FirstName).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Request.LastName).NotEmpty().MaximumLength(100);
    }
}
