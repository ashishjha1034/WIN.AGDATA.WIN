using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Swashbuckle.AspNetCore.Annotations;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Transactions;
using WIN.AGDATA.WIN.APPLICATION.Commands.Users;
using AutoMapper;

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
    private readonly IUnitOfWork _unitOfWork;
    private readonly ITransactionRepository _transactionRepository;
    private readonly IMapper _mapper;
    private readonly IMediator _mediator;

    public UsersController(
        IUserRepository userRepository,
        ICurrentUserService currentUserService,
        IUnitOfWork unitOfWork,
        ITransactionRepository transactionRepository,
        IMapper mapper,
        IMediator mediator)
    {
        _userRepository = userRepository;
        _currentUserService = currentUserService;
        _unitOfWork = unitOfWork;
        _transactionRepository = transactionRepository;
        _mapper = mapper;
        _mediator = mediator;
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
                firstName = user.FirstName.Value,
                lastName = user.LastName.Value,
                employeeId = user.EmployeeId.Value,
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
    /// Get another user's profile information
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
                firstName = user.FirstName.Value,
                lastName = user.LastName.Value,
                employeeId = user.EmployeeId.Value,
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
    /// Update user's personal information (first name and last name only).
    /// Email and Employee ID cannot be modified after account creation.
    /// Users can only update their own profile.
    /// Admins can update any user's profile (name only).
    /// </remarks>
    /// <param name="id">User ID to update</param>
    /// <param name="request">Updated user information</param>
    /// <returns>Confirmation message</returns>
    /// <response code="200">Profile updated successfully</response>
    /// <response code="400">Invalid input or attempt to modify email/employeeId</response>
    /// <response code="403">Forbidden - cannot update other user</response>
    /// <response code="404">User not found</response>
    [HttpPut("{id:guid}")]
    [SwaggerOperation(Summary = "Update user profile", Description = "Modify user information (name only - email and employee ID cannot be changed)")]
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

            // Check if client attempted to modify email or employeeId - reject with clear message
            if (!string.IsNullOrWhiteSpace(request.Email) && 
                !string.Equals(request.Email.Trim(), user.Email.Value, StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest(new { 
                    message = "Email cannot be modified after account creation. Contact support if a change is needed.",
                    field = "email"
                });
            }

            if (!string.IsNullOrWhiteSpace(request.EmployeeId) && 
                !string.Equals(request.EmployeeId.Trim(), user.EmployeeId, StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest(new { 
                    message = "Employee ID cannot be modified after account creation. Contact support if a change is needed.",
                    field = "employeeId"
                });
            }

            // Update only allowed fields: FirstName and LastName
            user.UpdateProfile(request.FirstName, request.LastName);

            await _userRepository.UpdateAsync(user);
            await _unitOfWork.SaveChangesAsync();

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
                    current = user.PointsAccount.CurrentBalance.Value,
                    earned = user.PointsAccount.TotalEarned.Value,
                    redeemed = user.PointsAccount.TotalRedeemed.Value
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
    /// Deactivate a user account with comprehensive business rule validation. Admin only operation.
    /// 
    /// **Hard blocks (cannot be bypassed):**
    /// - Self-deactivation is not allowed
    /// - Cannot deactivate another admin
    /// - User has pending or approved redemptions
    /// - User is registered in active (Draft/Active) events
    /// 
    /// **Soft warnings (can be bypassed with force=true):**
    /// - User has points balance > 0
    /// - User has completed events
    /// - User has completed redemptions
    /// - User has recent activity (within 30 days)
    /// 
    /// **Sample request body:**
    /// { "force": false }
    /// </remarks>
    /// <param name="id">User ID to deactivate</param>
    /// <param name="request">Deactivation request with optional force flag</param>
    /// <returns>Confirmation message or warning/error details</returns>
    /// <response code="200">User deactivated successfully</response>
    /// <response code="403">Forbidden - admin only</response>
    /// <response code="404">User not found</response>
    /// <response code="409">Deactivation has warnings, requires confirmation with force=true</response>
    /// <response code="422">Deactivation blocked due to hard constraints</response>
    [HttpPost("{id:guid}/deactivate")]
    [Authorize(Policy = "PasswordChanged", Roles = "Admin")]
    [SwaggerOperation(Summary = "Deactivate user", Description = "Disable user account (admin only). Enforces business rules.")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(DeactivateUserWarnings), StatusCodes.Status409Conflict)]
    [ProducesResponseType(typeof(DeactivateUserBlocked), StatusCodes.Status422UnprocessableEntity)]
    public async Task<ActionResult> DeactivateUser(Guid id, [FromBody] DeactivateUserRequest? request = null)
    {
        try
        {
            var actingAdminId = _currentUserService.GetCurrentUserId();
            var command = new DeactivateUserCommand(id, actingAdminId, request?.Force ?? false);
            var result = await _mediator.Send(command);

            if (result.Success)
            {
                return Ok(new { message = "User deactivated successfully", userId = id });
            }

            if (result.IsBlocked)
            {
                return UnprocessableEntity(result.Blocked);
            }

            if (result.HasWarnings)
            {
                return Conflict(result.Warnings);
            }

            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Unexpected deactivation result" });
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(new { message = ex.Message });
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
            await _unitOfWork.SaveChangesAsync();

            return Ok(new { message = "User activated successfully", userId = id });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to activate user", error = ex.Message });
        }
    }

    /// <summary>
    /// Toggle user role between Admin and Employee
    /// </summary>
    /// <remarks>
    /// Switch a user's role. Admin only operation.
    /// 
    /// **Guards:**
    /// - Cannot demote the last Admin in the system
    /// - Only allows 'Admin' or 'Employee' as valid roles
    /// 
    /// **Sample request body:**
    /// { "newRole": "Employee" }
    /// </remarks>
    /// <param name="id">User ID to update</param>
    /// <param name="request">Role toggle request with newRole</param>
    /// <returns>Updated user information</returns>
    /// <response code="200">Role changed successfully</response>
    /// <response code="400">Invalid role or operation blocked</response>
    /// <response code="403">Forbidden - admin only</response>
    /// <response code="404">User not found</response>
    [HttpPost("{id:guid}/toggle-role")]
    [Authorize(Policy = "PasswordChanged", Roles = "Admin")]
    [SwaggerOperation(Summary = "Toggle user role", Description = "Switch user between Admin and Employee roles (admin only)")]
    [ProducesResponseType(typeof(UserDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> ToggleUserRole(Guid id, [FromBody] ToggleRoleRequest request)
    {
        try
        {
            var actingAdminId = _currentUserService.GetCurrentUserId();
            var command = new ToggleUserRoleCommand(id, request.NewRole, actingAdminId);
            var result = await _mediator.Send(command);
            
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to toggle user role", error = ex.Message });
        }
    }

    /// <summary>
    /// Get user transaction history
    /// </summary>
    /// <remarks>
    /// Retrieve paginated transaction history for a specific user.
    /// Regular users can only view their own transactions.
    /// Admins can view any user's transactions.
    /// </remarks>
    /// <param name="id">User ID</param>
    /// <param name="pageNumber">Page number (default: 1)</param>
    /// <param name="pageSize">Page size (default: 50, max: 100)</param>
    /// <returns>Paginated transaction list</returns>
    /// <response code="200">Transactions retrieved successfully</response>
    /// <response code="403">Forbidden - cannot view other user's data</response>
    /// <response code="404">User not found</response>
    [HttpGet("{id:guid}/transactions")]
    [SwaggerOperation(Summary = "Get user transactions", Description = "Retrieve user's transaction history")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetUserTransactions(
        Guid id,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 50)
    {
        try
        {
            var currentUserId = _currentUserService.GetCurrentUserId();
            var isAdmin = _currentUserService.IsAdmin();

            if (id != currentUserId && !isAdmin)
                return Forbid("You can only view your own transactions");

            // Validate pagination
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 50;
            if (pageSize > 100) pageSize = 100;

            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            var (transactions, totalCount) = await _transactionRepository
                .GetPagedByUserIdAsync(id, pageNumber, pageSize);

            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var transactionDtos = _mapper.Map<List<TransactionDto>>(transactions);

            return Ok(new
            {
                data = transactionDtos,
                pagination = new
                {
                    currentPage = pageNumber,
                    pageSize = pageSize,
                    totalCount = totalCount,
                    totalPages = totalPages,
                    hasNextPage = pageNumber < totalPages,
                    hasPreviousPage = pageNumber > 1
                }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve transactions", error = ex.Message });
        }
    }

    /// <summary>
    /// Delete user account
    /// </summary>
    /// <remarks>
    /// Permanently delete a user account. Admin only operation.
    /// WARNING: This action is irreversible and will delete all user data.
    /// </remarks>
    /// <param name="id">User ID to delete</param>
    /// <returns>Confirmation message</returns>
    /// <response code="200">User deleted successfully</response>
    /// <response code="403">Forbidden - admin only</response>
    /// <response code="404">User not found</response>
    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "Admin")]
    [SwaggerOperation(Summary = "Delete user", Description = "Permanently remove user account (admin only)")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteUser(Guid id)
    {
        try
        {
            var user = await _userRepository.GetByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "User not found" });

            // Prevent deleting yourself
            var currentUserId = _currentUserService.GetCurrentUserId();
            if (id == currentUserId)
                return BadRequest(new { message = "You cannot delete your own account" });

            await _userRepository.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();

            return Ok(new { message = "User deleted successfully", userId = id });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to delete user", error = ex.Message });
        }
    }
}
