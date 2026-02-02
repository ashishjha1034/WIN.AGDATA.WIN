using AutoMapper;
using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Users;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Users;

public class InviteUserHandler : IRequestHandler<InviteUserCommand, UserDto>
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public InviteUserHandler(
        IUserRepository userRepository,
        IUnitOfWork unitOfWork,
        IMapper mapper)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<UserDto> Handle(InviteUserCommand request, CancellationToken cancellationToken)
    {
        // Check for existing email
        var existingUser = await _userRepository.GetByEmailAsync(request.Email);
        if (existingUser != null)
            throw new InvalidOperationException($"User with email {request.Email} already exists");

        // Check for existing employee ID
        var existingEmployeeId = await _userRepository.GetByEmployeeIdAsync(request.EmployeeId);
        if (existingEmployeeId != null)
            throw new InvalidOperationException($"User with employee ID {request.EmployeeId} already exists");

        var email = EmailAddress.Create(request.Email);
        var temporaryPassword = request.TemporaryPassword ?? GenerateTemporaryPassword();

        var user = new User(
            employeeId: request.EmployeeId,
            email: email,
            firstName: request.FirstName,
            lastName: request.LastName,
            password: temporaryPassword);

        user.RequirePasswordChange();
        user.Activate();

        // Assign roles - default to Employee if none provided
        var rolesToAssign = request.Roles != null && request.Roles.Any() 
            ? request.Roles 
            : new List<string> { "Employee" };

        foreach (var roleName in rolesToAssign)
        {
            var role = await _userRepository.GetRoleByNameAsync(roleName)
                ?? throw new InvalidOperationException($"Role '{roleName}' not found");

            user.AssignRole(role, Guid.Empty);
        }

        _userRepository.Add(user);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return _mapper.Map<UserDto>(user);
    }

    private static string GenerateTemporaryPassword()
    {
        var random = new Random();
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        return new string(Enumerable.Range(0, 12)
            .Select(_ => chars[random.Next(chars.Length)])
            .ToArray());
    }
}
