using AutoMapper;
using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.APPLICATION.Commands.Users;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Users;

public class CreateUserHandler : IRequestHandler<CreateUserCommand, UserDto>
{
    private readonly IMapper _mapper;
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateUserHandler(IMapper mapper, IUserRepository userRepository, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<UserDto> Handle(CreateUserCommand request, CancellationToken ct)
    {
        var email = EmailAddress.Create(request.Email);
        var user = new User(request.EmployeeId, email, request.FirstName, request.LastName);

        // Default role: Employee
        var employeeRole = await _userRepository.GetRoleByNameAsync("Employee")
                          ?? throw new InvalidOperationException("Role 'Employee' not found");

        user.AssignRole(employeeRole, Guid.Empty); // system created

        _userRepository.Add(user);
        await _unitOfWork.SaveChangesAsync(ct);

        return _mapper.Map<UserDto>(user);
    }
}