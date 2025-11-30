using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.APPLICATION.Commands.Users;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    private readonly IUserRepository _userRepository;

    public UsersController(IMediator mediator, IMapper mapper, IUserRepository userRepository)
    {
        _mediator = mediator;
        _mapper = mapper;
        _userRepository = userRepository;
    }

    [HttpPost]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<UserDto>> CreateUser([FromBody] CreateUserRequest request)
    {
        var result = await _mediator.Send(new CreateUserCommand(
            request.EmployeeId,
            request.Email,
            request.FirstName,
            request.LastName,
            request.Password));

        return CreatedAtAction(nameof(GetUser), new { id = result.Id }, result);
    }

    [HttpGet]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<IReadOnlyList<UserDto>>> GetAllUsers(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var users = await _userRepository.GetAllAsync();
        var dtos = _mapper.Map<List<UserDto>>(users);
        return Ok(dtos.Skip((page - 1) * pageSize).Take(pageSize));
    }

    [HttpGet("{id:guid}")]
    [Authorize]
    public async Task<ActionResult<UserDto>> GetUser(Guid id)
    {
        var user = await _userRepository.GetByIdWithDetailsAsync(id);
        if (user == null) return NotFound();
        return Ok(_mapper.Map<UserDto>(user));
    }

    [HttpPut("{id:guid}")]
    [Authorize]
    public async Task<IActionResult> UpdateUser(Guid id, [FromBody] UpdateUserInfoRequest request)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null) return NotFound();

        user.UpdateInfo(request.FirstName, request.LastName, EmailAddress.Create(request.Email));
        await _userRepository.UpdateAsync(user);
        return NoContent();
    }

    [HttpGet("{id:guid}/balance")]
    [Authorize]
    public async Task<ActionResult<object>> GetUserBalance(Guid id)
    {
        var user = await _userRepository.GetByIdWithPointsAsync(id);
        if (user == null) return NotFound();

        return Ok(new
        {
            user.PointsAccount.CurrentBalance,
            user.PointsAccount.TotalEarned,
            user.PointsAccount.TotalRedeemed
        });
    }
}