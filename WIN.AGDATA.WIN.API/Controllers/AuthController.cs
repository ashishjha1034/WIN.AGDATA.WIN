using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using WIN.AGDATA.WIN.APPLICATION.Commands.Users;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IUserRepository _userRepository;
    private readonly IPasswordResetTokenRepository _passwordResetTokenRepository;
    private readonly IUnitOfWork _unitOfWork;

    public AuthController(
        IMediator mediator,
        IJwtTokenService jwtTokenService,
        IUserRepository userRepository,
        IPasswordResetTokenRepository passwordResetTokenRepository,
        IUnitOfWork unitOfWork)
    {
        _mediator = mediator;
        _jwtTokenService = jwtTokenService;
        _userRepository = userRepository;
        _passwordResetTokenRepository = passwordResetTokenRepository;
        _unitOfWork = unitOfWork;
    }

    /// <summary>
    /// Register a new user (employee)
    /// </summary>
    [HttpPost("register")]
    [AllowAnonymous]
    public async Task<ActionResult<UserDto>> Register([FromBody] CreateUserRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var command = new CreateUserCommand(
                request.EmployeeId,
                request.Email,
                request.FirstName,
                request.LastName,
                request.Password);

            var result = await _mediator.Send(command);

            return CreatedAtAction(nameof(GetProfile), new { id = result.Id }, result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "User registration failed", error = ex.Message });
        }
    }

    /// <summary>
    /// Login with email and password
    /// </summary>
    [HttpPost("login")]
    [AllowAnonymous]
    [EnableRateLimiting("LoginRateLimit")]
    public async Task<ActionResult> Login([FromBody] LoginRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);

            // Generic error message to prevent user enumeration
            const string genericError = "Invalid email or password";

            if (user == null)
                return Unauthorized(new { message = genericError });

            // Check if account is locked out
            if (user.IsLockedOut())
            {
                var remaining = user.GetRemainingLockoutTime();
                // Return 423 Locked status with structured response for frontend countdown
                // Include lockedOut flag and retryAfterSeconds for UX
                var retryAfterSeconds = remaining.HasValue ? (int)Math.Ceiling(remaining.Value.TotalSeconds) : 180;
                return StatusCode(StatusCodes.Status423Locked, new 
                { 
                    message = "Account temporarily locked due to too many failed attempts.", 
                    lockedOut = true,
                    retryAfterSeconds = retryAfterSeconds
                });
            }

            var passwordValid = user.VerifyPassword(request.Password);

            if (!passwordValid)
            {
                // Record failed attempt and potentially lock account
                user.RecordFailedLogin();
                await _userRepository.UpdateAsync(user);
                await _unitOfWork.SaveChangesAsync();
                
                // Check if this attempt caused a lockout
                if (user.IsLockedOut())
                {
                    var remaining = user.GetRemainingLockoutTime();
                    var retryAfterSeconds = remaining.HasValue ? (int)Math.Ceiling(remaining.Value.TotalSeconds) : 180;
                    return StatusCode(StatusCodes.Status423Locked, new 
                    { 
                        message = "Account temporarily locked due to too many failed attempts.", 
                        lockedOut = true,
                        retryAfterSeconds = retryAfterSeconds
                    });
                }
                
                return Unauthorized(new { message = genericError });
            }

            // Reset failed login count on successful login
            user.ResetFailedLoginCount();
            await _userRepository.UpdateAsync(user);
            await _unitOfWork.SaveChangesAsync();

            if (!user.IsActive)
                return Unauthorized(new { message = "User account is inactive" });

            var token = _jwtTokenService.GenerateToken(user);
            var refreshToken = _jwtTokenService.GenerateRefreshToken();

            return Ok(new
            {
                token,
                refreshToken,
                expiresIn = 15 * 60, // 15 minutes in seconds
                mustChangePassword = user.MustChangePassword,
                user = new
                {
                    user.Id,
                    email = user.Email.Value,
                    user.FirstName,
                    user.LastName,
                    user.EmployeeId,
                    roles = user.Roles?.Select(r => r.Role.Name).ToList()
                }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Login failed", error = ex.Message });
        }

    }

    /// <summary>
    /// Get current user profile (protected)
    /// </summary>
    [HttpGet("profile")]
    [Authorize]
    public async Task<ActionResult<UserDto>> GetProfile()
    {
        try
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrWhiteSpace(userIdClaim) || !Guid.TryParse(userIdClaim, out var currentUserId))
                return Unauthorized(new { message = "User ID not found in token" });

            var user = await _userRepository.GetByIdWithDetailsAsync(currentUserId);

            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(new
            {
                user.Id,
                email = user.Email.Value,
                user.FirstName,
                user.LastName,
                user.EmployeeId,
                user.IsActive,
                roles = user.Roles?.Select(r => r.Role.Name).ToList()
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve profile", error = ex.Message });
        }
    }

    /// <summary>
    /// Validate token
    /// </summary>
    [HttpPost("validate")]
    [Authorize]
    public ActionResult ValidateToken()
    {
        return Ok(new { message = "Token is valid", userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value });
    }

    /// <summary>
    /// Refresh expired access token
    /// </summary>
    [HttpPost("refresh-token")]
    [AllowAnonymous]
    public async Task<ActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.RefreshToken))
            return BadRequest(new { message = "Refresh token is required" });

        if (string.IsNullOrWhiteSpace(request.Token))
            return BadRequest(new { message = "Access token is required" });

        try
        {
            var principal = _jwtTokenService.GetPrincipalFromExpiredToken(request.Token);

            if (principal == null)
                return Unauthorized(new { message = "Invalid token or refresh token" });

            var userIdClaim = principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrWhiteSpace(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                return Unauthorized(new { message = "Invalid user ID in token" });

            var user = await _userRepository.GetByIdWithDetailsAsync(userId);

            if (user == null || !user.IsActive)
                return Unauthorized(new { message = "User not found or inactive" });

            var newToken = _jwtTokenService.GenerateToken(user);
            var newRefreshToken = _jwtTokenService.GenerateRefreshToken();

            return Ok(new
            {
                token = newToken,
                refreshToken = newRefreshToken,
                expiresIn = 15 * 60 // 15 minutes in seconds
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Token refresh failed", error = ex.Message });
        }
    }

    /// <summary>
    /// Logout user (invalidate refresh token)
    /// </summary>
    [HttpPost("logout")]
    [Authorize]
    public ActionResult Logout()
    {
        try
        {
            // In a real scenario, you would invalidate the refresh token in a blacklist/database
            // For now, just return success
            return Ok(new { message = "Logout successful" });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Logout failed", error = ex.Message });
        }
    }

    /// <summary>
    /// Change password (available even if MustChangePassword is true)
    /// </summary>
    [HttpPost("change-password")]
    [Authorize]
    public async Task<ActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrWhiteSpace(userIdClaim) || !Guid.TryParse(userIdClaim, out var currentUserId))
                return Unauthorized(new { message = "User ID not found in token" });

            var command = new ChangePasswordCommand(currentUserId, request.CurrentPassword, request.NewPassword);
            await _mediator.Send(command);

            return Ok(new { message = "Password changed successfully" });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Password change failed", error = ex.Message });
        }
    }

    /// <summary>
    /// Request password reset
    /// </summary>
    [HttpPost("forgot-password")]
    [AllowAnonymous]
    [EnableRateLimiting("ForgotPasswordRateLimit")]
    public async Task<ActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var command = new ForgotPasswordCommand(request.Email);
            await _mediator.Send(command);

            // Always return generic success message to prevent email enumeration
            return Ok(new { message = "If the account exists, a reset link has been sent to the email address." });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "An error occurred processing your request", error = ex.Message });
        }
    }

    /// <summary>
    /// Reset password with token
    /// </summary>
    [HttpPost("reset-password")]
    [AllowAnonymous]
    public async Task<ActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var command = new ResetPasswordCommand(request.Token, request.NewPassword);
            await _mediator.Send(command);

            return Ok(new { message = "Password reset successful. You can now login with your new password." });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Password reset failed", error = ex.Message });
        }
    }

}
