using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.Application.Commands;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Application.Mappers;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Application.Handlers;

public class CreateUserHandler : IRequestHandler<CreateUserCommand, UserDto>
{
    private readonly IUserRepository _userRepo;
    private readonly IUnitOfWork _uow;
    private readonly ILogger<CreateUserHandler> _logger;

    public CreateUserHandler(IUserRepository userRepo, IUnitOfWork uow, ILogger<CreateUserHandler> logger)
    {
        _userRepo = userRepo;
        _uow = uow;
        _logger = logger;
    }

    public async Task<UserDto> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var r = request.Request;
        var existing = await _userRepo.GetByEmployeeIdAsync(r.EmployeeId);
        if (existing != null) throw new DomainException($"User with employee ID '{r.EmployeeId}' already exists");

        var user = new Domain.Entities.Users.User(r.EmployeeId, r.Email, r.FirstName, r.LastName, request.CreatedBy);
        await _userRepo.AddAsync(user);
        await _uow.SaveChangesAsync();

        var dto = UserMapper.ToDto(user);
        _logger.LogInformation("User created {EmployeeId}", r.EmployeeId);
        return dto;
    }
}