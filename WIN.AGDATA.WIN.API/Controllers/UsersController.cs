using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.API.Controllers;

/// <summary>
/// User profile and account management endpoints
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize]
[SwaggerTag("User Management")]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly ICurrentUserService _currentUserService;

    public UsersController(IUserRepository userRepository, ICurrentUserService currentUserService)
    {
        _userRepository = userRepository;
        _currentUserService = currentUserService;
    }

    /// <summary>
    /// Get current authenticated user profile
    /// </summary>
    /// <remarks>
    /// Retrieve the profile of the currently authenticated user.
    /// This endpoint requires valid JWT token.
    /// </remarks>
    /// <returns>Current user profile information</returns>
    /// <response code="200">Profile retrieved successfully</response>
    /// <response code="401">Unauthorized - token invalid or expired</response>
    [HttpGet("me")]
    [SwaggerOperation(Summary = "Get my profile", Description = "Retrieve current user information")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult> GetCurrentUser()
    {
        try
        {
            var userId = _currentUserService.GetCurrentUserId();
            var user = await _userRepository.GetByIdWithDetailsAsync(userId);

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
                new { message = "Failed to retrieve user profile", error = ex.Message });
        }
    }

    /// <summary>
    /// Get user profile by ID
    /// </summary>
    /// <remarks>
    /// Get another user's profile information.
    /// Regular users can only view their own profile.
    /// Admins can view any user's profile.
    /// </remarks>
    /// <param name="id">User ID</param>
    /// <returns>User profile information</returns>
    /// <response code="200">User profile retrieved</response>
    /// <response code="403">Forbidden - cannot view other user's data</response>
    /// <response code="404">User not found</response>
    [HttpGet("{id:guid}")]
    [SwaggerOperation(Summary = "Get user by ID", Description = "Retrieve user profile by identifier")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetUser(Guid id)
    {
        try
        {
            var currentUserId = _currentUserService.GetCurrentUserId();
            var isAdmin = _currentUserService.IsAdmin();

            if (id != currentUserId && !isAdmin)
                return Forbid("You can only view your own profile");

            var user = await _userRepository.GetByIdWithDetailsAsync(id);

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
                new { message = "Failed to retrieve user", error = ex.Message });
        }
    }

    /// <summary>
    /// Update user profile information
    /// </summary>
    /// <remarks>
    /// Update user's personal information like first name, last name, and email.
    /// Users can only update their own profile.
    /// Admins can update any user's profile.
    /// </remarks>
    /// <param name="id">User ID to update</param>
    /// <param name="request">Updated user information</param>
    /// <returns>Confirmation message</returns>
    /// <response code="200">Profile updated successfully</response>
    /// <response code="400">Invalid input</response>
    /// <response code="403">Forbidden - cannot update other user</response>
    /// <response code="404">User not found</response>
    [HttpPut("{id:guid}")]
    [SwaggerOperation(Summary = "Update user profile", Description = "Modify user information")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdateUser(Guid id, [FromBody] UpdateUserInfoRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var currentUserId = _currentUserService.GetCurrentUserId();
            var isAdmin = _currentUserService.IsAdmin();

            if (id != currentUserId && !isAdmin)
                return Forbid("You can only update your own profile");

            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            user.UpdateProfile(request.FirstName, request.LastName);
            await _userRepository.UpdateAsync(user);

            return Ok(new { message = "User profile updated successfully", userId = id });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to update user", error = ex.Message });
        }
    }

    /// <summary>
    /// Get user's points account
    /// </summary>
    /// <remarks>
    /// Retrieve points balance and earning/redemption history totals for a user.
    /// Regular users can only view their own points.
    /// Admins can view any user's points.
    /// </remarks>
    /// <param name="id">User ID</param>
    /// <returns>Points account information</returns>
    /// <response code="200">Points retrieved successfully</response>
    /// <response code="403">Forbidden - cannot view other user's data</response>
    /// <response code="404">User not found</response>
    [HttpGet("{id:guid}/points")]
    [SwaggerOperation(Summary = "Get user points", Description = "Retrieve user's points account")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetUserPoints(Guid id)
    {
        try
        {
            var currentUserId = _currentUserService.GetCurrentUserId();
            var isAdmin = _currentUserService.IsAdmin();

            if (id != currentUserId && !isAdmin)
                return Forbid("You can only view your own points");

            var user = await _userRepository.GetByIdWithPointsAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            return Ok(new
            {
                userId = id,
                points = new
                {
                    current = user.PointsAccount.CurrentBalance,
                    earned = user.PointsAccount.TotalEarned,
                    redeemed = user.PointsAccount.TotalRedeemed
                }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve points", error = ex.Message });
        }
    }

    /// <summary>
    /// Deactivate user account
    /// </summary>
    /// <remarks>
    /// Deactivate a user account. Admin only operation.
    /// Deactivated users cannot login or use the system.
    /// </remarks>
    /// <param name="id">User ID to deactivate</param>
    /// <returns>Confirmation message</returns>
    /// <response code="200">User deactivated successfully</response>
    /// <response code="403">Forbidden - admin only</response>
    /// <response code="404">User not found</response>
    [HttpPost("{id:guid}/deactivate")]
    [Authorize(Roles = "Admin")]
    [SwaggerOperation(Summary = "Deactivate user", Description = "Disable user account (admin only)")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeactivateUser(Guid id)
    {
        try
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            user.Deactivate("User deactivated by admin");
            await _userRepository.UpdateAsync(user);

            return Ok(new { message = "User deactivated successfully", userId = id });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to deactivate user", error = ex.Message });
        }
    }

    /// <summary>
    /// Activate user account
    /// </summary>
    /// <remarks>
    /// Activate a deactivated user account. Admin only operation.
    /// Reactivated users can login and use the system again.
    /// </remarks>
    /// <param name="id">User ID to activate</param>
    /// <returns>Confirmation message</returns>
    /// <response code="200">User activated successfully</response>
    /// <response code="403">Forbidden - admin only</response>
    /// <response code="404">User not found</response>
    [HttpPost("{id:guid}/activate")]
    [Authorize(Roles = "Admin")]
    [SwaggerOperation(Summary = "Activate user", Description = "Enable user account (admin only)")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> ActivateUser(Guid id)
    {
        try
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            user.Activate();
            await _userRepository.UpdateAsync(user);

            return Ok(new { message = "User activated successfully", userId = id });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to activate user", error = ex.Message });
        }
    }
}
