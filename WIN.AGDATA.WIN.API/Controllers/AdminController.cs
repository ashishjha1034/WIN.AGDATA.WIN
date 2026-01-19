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
    private readonly IEventRepository _eventRepository;
    private readonly IProductRepository _productRepository;
    private readonly ICurrentUserService _currentUserService;

    public AdminController(
        IMediator mediator,
        IUserRepository userRepository,
        ITransactionRepository transactionRepository,
        IRedemptionRepository redemptionRepository,
        IEventRepository eventRepository,
        IProductRepository productRepository,
        ICurrentUserService currentUserService)
    {
        _mediator = mediator;
        _userRepository = userRepository;
        _transactionRepository = transactionRepository;
        _redemptionRepository = redemptionRepository;
        _eventRepository = eventRepository;
        _productRepository = productRepository;
        _currentUserService = currentUserService;
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
                    points = new
                    {
                        current = u.PointsAccount.CurrentBalance,
                        earned = u.PointsAccount.TotalEarned,
                        redeemed = u.PointsAccount.TotalRedeemed
                    },
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
    /// Invite a new user (create with temporary password)
    /// </summary>
    /// <remarks>
    /// Create a new user with a temporary password that must be changed on first login.
    /// Admin only endpoint.
    /// </remarks>
    [HttpPost("users")]
    [SwaggerOperation(Summary = "Invite new user", Description = "Create user with temporary password")]
    [ProducesResponseType(typeof(UserDto), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<UserDto>> InviteUser([FromBody] InviteUserRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var command = new InviteUserCommand(
                request.EmployeeId,
                request.Email,
                request.FirstName,
                request.LastName,
                request.Roles ?? new List<string>(),
                request.GenerateTempPassword,
                request.TemporaryPassword);

            var result = await _mediator.Send(command);

            return CreatedAtAction(nameof(GetUserDetails), new { userId = result.Id }, result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "User invitation failed", error = ex.Message });
        }
    }

    /// <summary>
    /// Admin reset user password
    /// </summary>
    /// <remarks>
    /// Reset a user's password to a temporary password and force them to change it on next login.
    /// Admin only endpoint.
    /// </remarks>
    [HttpPost("users/{userId:guid}/reset-password")]
    [SwaggerOperation(Summary = "Reset user password", Description = "Admin sets temporary password for user")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> ResetUserPassword(Guid userId, [FromBody] AdminResetPasswordRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var command = new AdminResetPasswordCommand(userId, request.NewTemporaryPassword);
            await _mediator.Send(command);

            return Ok(new
            {
                message = "User password reset successfully. User must change password on next login.",
                userId = userId
            });
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

    /// <summary>
    /// Get recent events
    /// </summary>
    /// <remarks>
    /// Retrieve the most recent events for the admin dashboard.
    /// Admin only endpoint.
    /// </remarks>
    /// <param name="count">Number of recent events to retrieve (default: 5)</param>
    /// <returns>List of recent events</returns>
    /// <response code="200">Events retrieved successfully</response>
    /// <response code="403">Unauthorized - admin only</response>
    [HttpGet("events/recent")]
    [SwaggerOperation(Summary = "Get recent events", Description = "Retrieve recent events for dashboard")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> GetRecentEvents([FromQuery] int count = 5)
    {
        try
        {
            if (count <= 0 || count > 100)
                count = 5;

            var recentEvents = await _eventRepository.GetRecentEventsAsync(count);

            return Ok(new
            {
                count = recentEvents.Count,
                data = recentEvents.Select(e => new
                {
                    e.Id,
                    e.Name,
                    e.Description,
                    e.EventDate,
                    e.Status,
                    e.Location,
                    e.TotalPointsPool,
                    participantCount = e.Participants?.Count ?? 0,
                    e.CreatedAt
                }).ToList()
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve recent events", error = ex.Message });
        }
    }

    /// <summary>
    /// Get low stock products
    /// </summary>
    /// <remarks>
    /// Retrieve products with inventory below the specified threshold for inventory management.
    /// Admin only endpoint.
    /// </remarks>
    /// <param name="threshold">Stock threshold (default: 10)</param>
    /// <returns>List of low stock products</returns>
    /// <response code="200">Products retrieved successfully</response>
    /// <response code="403">Unauthorized - admin only</response>
    [HttpGet("products/low-stock")]
    [SwaggerOperation(Summary = "Get low stock products", Description = "Retrieve products with low inventory")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> GetLowStockProducts([FromQuery] int threshold = 10)
    {
        try
        {
            if (threshold <= 0)
                threshold = 10;

            var lowStockProducts = await _productRepository.GetLowStockProductsAsync(threshold);

            return Ok(new
            {
                count = lowStockProducts.Count,
                threshold = threshold,
                data = lowStockProducts.Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    category = p.Category?.Name,
                    currentStock = p.Inventory?.QuantityAvailable ?? 0,
                    reserved = p.Inventory?.QuantityReserved ?? 0,
                    price = p.CurrentPricing,
                    p.IsActive
                }).ToList()
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve low stock products", error = ex.Message });
        }
    }

    /// <summary>
    /// Get points chart data
    /// </summary>
    /// <remarks>
    /// Retrieve monthly points earned and redeemed data for dashboard charting.
    /// Admin only endpoint.
    /// </remarks>
    /// <param name="months">Number of months to retrieve (default: 6, max: 12)</param>
    /// <returns>Monthly points data</returns>
    /// <response code="200">Chart data retrieved successfully</response>
    /// <response code="403">Unauthorized - admin only</response>
    [HttpGet("stats/points-chart")]
    [SwaggerOperation(Summary = "Get points chart data", Description = "Retrieve monthly points statistics")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> GetPointsChart([FromQuery] int months = 6)
    {
        try
        {
            if (months <= 0 || months > 12)
                months = 6;

            var chartData = await _transactionRepository.GetMonthlyPointsChartAsync(months);

            return Ok(new
            {
                months = months,
                data = chartData.Select(d => new
                {
                    month = d.Month,
                    year = d.Year,
                    monthName = new DateTime(d.Year, d.Month, 1).ToString("MMMM"),
                    pointsEarned = d.PointsEarned,
                    pointsRedeemed = d.PointsRedeemed,
                    netPoints = d.PointsEarned - d.PointsRedeemed
                }).ToList()
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve points chart data", error = ex.Message });
        }
    }
}
