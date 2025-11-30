using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.ValueObjects;
using System.Security.Claims;

namespace WIN.AGDATA.WIN.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IMapper _mapper;

    public AuthController(IUserRepository userRepository, IJwtTokenService jwtTokenService, IMapper mapper)
    {
        _userRepository = userRepository;
        _jwtTokenService = jwtTokenService;
        _mapper = mapper;
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginRequest request)
    {
        var user = await _userRepository.GetByEmailAsync(request.Email);
        if (user == null || !user.VerifyPassword(request.Password))
        {
            return Unauthorized("Invalid credentials");
        }

        var token = _jwtTokenService.GenerateToken(user);
        return Ok(token);
    }

    [HttpGet("me")]
    [Authorize]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                          ?? User.FindFirst("sub")?.Value
                          ?? throw new UnauthorizedAccessException();

        var userId = Guid.Parse(userIdClaim);
        var user = await _userRepository.GetByIdWithDetailsAsync(userId);
        if (user == null) return NotFound();
        return Ok(_mapper.Map<UserDto>(user));
    }
}

public record LoginRequest(string Email, string Password);