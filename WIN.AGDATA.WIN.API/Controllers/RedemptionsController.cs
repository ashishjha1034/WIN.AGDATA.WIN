using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using WIN.AGDATA.WIN.APPLICATION.Commands.Redemptions;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.API.Controllers;

/// <summary>
/// Redemption management endpoints for product redemptions and approvals
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize]
[SwaggerTag("Redemptions")]
public class RedemptionsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IRedemptionRepository _redemptionRepository;
    private readonly ICurrentUserService _currentUserService;
    private readonly IMapper _mapper;

    public RedemptionsController(
        IMediator mediator,
        IRedemptionRepository redemptionRepository,
        ICurrentUserService currentUserService,
        IMapper mapper)
    {
        _mediator = mediator;
        _redemptionRepository = redemptionRepository;
        _currentUserService = currentUserService;
        _mapper = mapper;
    }

    /// <summary>
    /// Create new redemption request
    /// </summary>
    /// <remarks>
    /// Request to redeem a product using earned points.
    /// User must have sufficient points balance.
    /// 
    /// Example:
    ///
    ///     POST /api/redemptions
    ///     {
    ///       "productId": "00000000-0000-0000-0000-000000000000",
    ///       "quantity": 1
    ///     }
    /// </remarks>
    /// <param name="request">Redemption request details</param>
    /// <returns>Created redemption</returns>
    /// <response code="201">Redemption created successfully</response>
    /// <response code="400">Invalid request or insufficient points</response>
    /// <response code="401">Unauthorized</response>
    [HttpPost]
    [SwaggerOperation(Summary = "Create redemption", Description = "Request to redeem a product")]
    [ProducesResponseType(typeof(RedemptionDto), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<RedemptionDto>> CreateRedemption([FromBody] CreateRedemptionRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var userId = _currentUserService.GetCurrentUserId();
            var command = new CreateRedemptionCommand(userId, request.ProductId, request.Quantity);
            var result = await _mediator.Send(command);

            return CreatedAtAction(nameof(GetRedemption), new { id = result.Id }, result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to create redemption", error = ex.Message });
        }
    }

    /// <summary>
    /// Get redemption by ID
    /// </summary>
    /// <remarks>
    /// Retrieve details of a specific redemption request.
    /// Users can only view their own redemptions. Admins can view any.
    /// </remarks>
    /// <param name="id">Redemption ID</param>
    /// <returns>Redemption details</returns>
    /// <response code="200">Redemption found</response>
    /// <response code="403">Access denied</response>
    /// <response code="404">Redemption not found</response>
    [HttpGet("{id:guid}")]
    [SwaggerOperation(Summary = "Get redemption", Description = "Retrieve redemption details")]
    [ProducesResponseType(typeof(RedemptionDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetRedemption(Guid id)
    {
        try
        {
            var redemption = await _redemptionRepository.GetByIdWithDetailsAsync(id);

            if (redemption == null)
                return NotFound(new { message = "Redemption not found" });

            var userId = _currentUserService.GetCurrentUserId();
            var isAdmin = _currentUserService.IsAdmin();

            if (redemption.UserId != userId && !isAdmin)
                return Forbid("You can only view your own redemptions");

            return Ok(_mapper.Map<RedemptionDto>(redemption));
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve redemption", error = ex.Message });
        }
    }

    /// <summary>
    /// Get user's redemptions
    /// </summary>
    /// <remarks>
    /// List all redemption requests for the current user.
    /// </remarks>
    /// <returns>List of redemptions</returns>
    /// <response code="200">Redemptions retrieved</response>
    [HttpGet("my-redemptions")]
    [SwaggerOperation(Summary = "Get my redemptions", Description = "List your redemption requests")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    public async Task<ActionResult> GetMyRedemptions()
    {
        try
        {
            var userId = _currentUserService.GetCurrentUserId();
            var redemptions = await _redemptionRepository.GetByUserIdAsync(userId);

            return Ok(new
            {
                count = redemptions.Count,
                data = _mapper.Map<List<RedemptionDto>>(redemptions)
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve redemptions", error = ex.Message });
        }
    }

    /// <summary>
    /// Get redemption by user ID
    /// </summary>
    /// <remarks>
    /// List all redemptions for a specific user.
    /// Admins only - users can only view their own.
    /// </remarks>
    /// <param name="userId">User ID</param>
    /// <returns>User's redemptions</returns>
    /// <response code="200">Redemptions retrieved</response>
    /// <response code="403">Access denied</response>
    [HttpGet("user/{userId:guid}")]
    [SwaggerOperation(Summary = "Get user redemptions", Description = "List redemptions for specific user")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> GetRedemptionsByUser(Guid userId)
    {
        try
        {
            var currentUserId = _currentUserService.GetCurrentUserId();
            var isAdmin = _currentUserService.IsAdmin();

            if (userId != currentUserId && !isAdmin)
                return Forbid("You can only view your own redemptions");

            var redemptions = await _redemptionRepository.GetByUserIdAsync(userId);

            return Ok(new
            {
                count = redemptions.Count,
                userId = userId,
                data = _mapper.Map<List<RedemptionDto>>(redemptions)
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve redemptions", error = ex.Message });
        }
    }
}
