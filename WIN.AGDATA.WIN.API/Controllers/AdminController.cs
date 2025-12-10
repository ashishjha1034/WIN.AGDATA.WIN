using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using WIN.AGDATA.WIN.APPLICATION.Commands.Admin;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Admin;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using MediatR;

namespace WIN.AGDATA.WIN.API.Controllers;

/// <summary>
/// Admin-only endpoints for system management and user administration
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
[SwaggerTag("Admin Management")]
public class AdminController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IUserRepository _userRepository;
    private readonly ITransactionRepository _transactionRepository;
    private readonly IRedemptionRepository _redemptionRepository;

    public AdminController(
        IMediator mediator,
        IUserRepository userRepository,
        ITransactionRepository transactionRepository,
        IRedemptionRepository redemptionRepository)
    {
        _mediator = mediator;
        _userRepository = userRepository;
        _transactionRepository = transactionRepository;
        _redemptionRepository = redemptionRepository;
    }

    /// <summary>
    /// Adjust user points manually
    /// </summary>
    /// <remarks>
    /// Award or deduct points from a user account.
    /// Use positive amount to award, negative to deduct.
    /// Admin only endpoint.
    /// 
    /// Example request:
    ///
    ///     POST /api/admin/adjust-points
    ///     {
    ///       "userId": "00000000-0000-0000-0000-000000000000",
    ///       "amount": 500,
    ///       "reason": "Q4 Performance Bonus"
    ///     }
    /// </remarks>
    /// <param name="request">Points adjustment details</param>
    /// <returns>Confirmation message</returns>
    /// <response code="200">Points adjusted successfully</response>
    /// <response code="400">Invalid request or user not found</response>
    /// <response code="403">Unauthorized - admin only</response>
    /// <response code="500">Server error</response>
    [HttpPost("adjust-points")]
    [SwaggerOperation(Summary = "Adjust user points", Description = "Award or deduct points from user account")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> AdjustPoints([FromBody] AdjustPointsRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var command = new AdjustPointsCommand(request.UserId, request.Amount, request.Reason);
            await _mediator.Send(command);

            return Ok(new
            {
                message = $"Adjusted {request.Amount} points for user {request.UserId}",
                userId = request.UserId,
                amount = request.Amount,
                reason = request.Reason
            });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to adjust points", error = ex.Message });
        }
    }

    /// <summary>
    /// Get system statistics
    /// </summary>
    /// <remarks>
    /// Retrieve overall system statistics including total users, points earned/redeemed, and pending redemptions.
    /// Admin only endpoint.
    /// </remarks>
    /// <returns>System statistics</returns>
    /// <response code="200">Statistics retrieved successfully</response>
    /// <response code="403">Unauthorized - admin only</response>
    [HttpGet("stats")]
    [SwaggerOperation(Summary = "Get system statistics", Description = "Retrieve overall system metrics")]
    [ProducesResponseType(typeof(StatsDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<StatsDto>> GetStats()
    {
        try
        {
            var totalUsers = (await _userRepository.GetAllAsync()).Count;
            var totalEarned = await _transactionRepository.GetTotalEarnedAsync();
            var totalRedeemed = await _transactionRepository.GetTotalRedeemedAsync();
            var pendingRedemptions = await _redemptionRepository.GetPendingCountAsync();

            var stats = new StatsDto(
                TotalUsers: totalUsers,
                TotalPointsEarned: totalEarned,
                TotalPointsRedeemed: totalRedeemed,
                PendingRedemptions: pendingRedemptions
            );

            return Ok(stats);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve statistics", error = ex.Message });
        }
    }

    /// <summary>
    /// Get all users in system
    /// </summary>
    /// <remarks>
    /// List all users or only active users. Admin only endpoint.
    /// </remarks>
    /// <param name="activeOnly">Filter to active users only (default: true)</param>
    /// <returns>List of users with details</returns>
    /// <response code="200">Users retrieved successfully</response>
    /// <response code="403">Unauthorized - admin only</response>
    [HttpGet("users")]
    [SwaggerOperation(Summary = "Get all users", Description = "List users in the system")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> GetAllUsers([FromQuery] bool activeOnly = true)
    {
        try
        {
            var users = activeOnly
                ? await _userRepository.GetActiveUsersAsync()
                : await _userRepository.GetAllAsync();

            return Ok(new
            {
                count = users.Count,
                activeOnly = activeOnly,
                users = users.Select(u => new
                {
                    u.Id,
                    email = u.Email.Value,
                    u.FirstName,
                    u.LastName,
                    u.EmployeeId,
                    u.IsActive,
                    roles = u.Roles?.Select(r => r.Role.Name).ToList()
                }).ToList()
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve users", error = ex.Message });
        }
    }

    /// <summary>
    /// Get detailed user information
    /// </summary>
    /// <remarks>
    /// Get complete details for a specific user including points account and transaction count.
    /// Admin only endpoint.
    /// </remarks>
    /// <param name="userId">User ID</param>
    /// <returns>User details with points information</returns>
    /// <response code="200">User details retrieved</response>
    /// <response code="404">User not found</response>
    /// <response code="403">Unauthorized - admin only</response>
    [HttpGet("users/{userId:guid}")]
    [SwaggerOperation(Summary = "Get user details", Description = "Retrieve detailed information for specific user")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> GetUserDetails(Guid userId)
    {
        try
        {
            var user = await _userRepository.GetByIdWithDetailsAsync(userId);
            if (user == null)
                return NotFound(new { message = "User not found" });

            var transactions = await _transactionRepository.GetByUserIdAsync(userId);

            return Ok(new
            {
                user = new
                {
                    user.Id,
                    email = user.Email.Value,
                    user.FirstName,
                    user.LastName,
                    user.EmployeeId,
                    user.IsActive,
                    roles = user.Roles?.Select(r => r.Role.Name).ToList()
                },
                points = new
                {
                    current = user.PointsAccount.CurrentBalance,
                    earned = user.PointsAccount.TotalEarned,
                    redeemed = user.PointsAccount.TotalRedeemed
                },
                transactionCount = transactions.Count
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve user details", error = ex.Message });
        }
    }

    /// <summary>
    /// Get pending redemptions
    /// </summary>
    /// <remarks>
    /// List all redemption requests awaiting admin approval.
    /// Admin only endpoint.
    /// </remarks>
    /// <returns>List of pending redemptions</returns>
    /// <response code="200">Pending redemptions retrieved</response>
    /// <response code="403">Unauthorized - admin only</response>
    [HttpGet("redemptions/pending")]
    [SwaggerOperation(Summary = "Get pending redemptions", Description = "List redemptions awaiting approval")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> GetPendingRedemptions()
    {
        try
        {
            var pendingRedemptions = await _redemptionRepository.GetPendingAsync();

            return Ok(new
            {
                count = pendingRedemptions.Count,
                data = pendingRedemptions.Select(r => new
                {
                    r.Id,
                    r.UserId,
                    r.ProductId,
                    r.PointsSpent,
                    r.Quantity,
                    r.Status,
                    r.CreatedAt
                }).ToList()
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve pending redemptions", error = ex.Message });
        }
    }
}
