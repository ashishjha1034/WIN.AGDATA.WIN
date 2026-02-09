using AutoMapper;
using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Users;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Users;

public class CreateUserHandler : IRequestHandler<CreateUserCommand, UserDto>
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public CreateUserHandler(IUserRepository userRepository, IMapper mapper, IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<UserDto> Handle(CreateUserCommand request, CancellationToken ct)
    {
        var existing = await _userRepository.GetByEmailAsync(request.Email);
        if (existing != null)
            throw new DomainException("Email already in use");

        var email = EmailAddress.Create(request.Email);
        var user = new User(
            EmployeeId.Create(request.EmployeeId),
            email,
            PersonName.Create(request.FirstName),
            PersonName.Create(request.LastName),
            request.Password);

        var employeeRole = await _userRepository.GetRoleByNameAsync("Employee")
            ?? throw new DomainException("Default role 'Employee' not found");

        user.AssignRole(employeeRole, Guid.Empty); // system

        _userRepository.Add(user);
        await _unitOfWork.SaveChangesAsync(ct);

        return _mapper.Map<UserDto>(user);
    }
}