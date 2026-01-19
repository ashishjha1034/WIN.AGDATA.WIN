using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.API.Controllers;

/// <summary>
/// Admin endpoints for redemption management and approvals
/// </summary>
[ApiController]
[Route("api/admin/redemptions")]
[Authorize(Roles = "Admin")]
[SwaggerTag("Admin Redemption Management")]
public class AdminRedemptionsController : ControllerBase
{
    private readonly IRedemptionRepository _redemptionRepository;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;
    private readonly IUnitOfWork _unitOfWork;

    public AdminRedemptionsController(
        IRedemptionRepository redemptionRepository,
        IMapper mapper,
        ICurrentUserService currentUserService,
        IUnitOfWork unitOfWork)
    {
        _redemptionRepository = redemptionRepository;
        _mapper = mapper;
        _currentUserService = currentUserService;
        _unitOfWork = unitOfWork;
    }

    /// <summary>
    /// List all redemptions with optional status filter
    /// </summary>
    /// <remarks>
    /// Returns all redemptions with user and product information.
    /// Optionally filter by status (Pending, Approved, Delivered, Rejected, Cancelled).
    /// Response includes status counts across all redemptions.
    /// </remarks>
    /// <param name="status">Optional status filter</param>
    /// <returns>List of redemptions with status counts</returns>
    /// <response code="200">Redemptions retrieved successfully</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpGet]
    [SwaggerOperation(Summary = "List all redemptions", Description = "Get all redemptions with optional status filter")]
    [ProducesResponseType(typeof(RedemptionListResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<RedemptionListResponseDto>> GetAllRedemptions([FromQuery] RedemptionStatus? status = null)
    {
        try
        {
            // Get all redemptions with details
            var allRedemptions = await _redemptionRepository.GetAllWithDetailsAsync();

            // Filter by status if provided
            var filteredRedemptions = status.HasValue
                ? allRedemptions.Where(r => r.Status == status.Value).ToList()
                : allRedemptions.ToList();

            // Map to DTOs
            var redemptionDtos = _mapper.Map<List<RedemptionDto>>(filteredRedemptions);

            // Calculate status counts from all redemptions (not filtered)
            var counts = new RedemptionStatusCounts
            {
                Pending = allRedemptions.Count(r => r.Status == RedemptionStatus.Pending),
                Approved = allRedemptions.Count(r => r.Status == RedemptionStatus.Approved),
                Delivered = allRedemptions.Count(r => r.Status == RedemptionStatus.Delivered),
                Rejected = allRedemptions.Count(r => r.Status == RedemptionStatus.Rejected),
                Cancelled = allRedemptions.Count(r => r.Status == RedemptionStatus.Cancelled)
            };

            var response = new RedemptionListResponseDto
            {
                Items = redemptionDtos,
                Counts = counts
            };

            return Ok(response);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve redemptions", error = ex.Message });
        }
    }

    /// <summary>
    /// Get detailed redemption information
    /// </summary>
    /// <remarks>
    /// Retrieve full redemption details including:
    /// - Redemption core fields
    /// - User snapshot (name, balance, total earned/redeemed)
    /// - Product snapshot (name, category, points)
    /// - Audit fields (created, approved, delivered timestamps)
    /// </remarks>
    /// <param name="id">Redemption ID</param>
    /// <returns>Detailed redemption information</returns>
    /// <response code="200">Redemption details retrieved successfully</response>
    /// <response code="404">Redemption not found</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpGet("{id:guid}")]
    [SwaggerOperation(Summary = "Get redemption details", Description = "Retrieve full redemption details for admin decision-making")]
    [ProducesResponseType(typeof(RedemptionDetailDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<RedemptionDetailDto>> GetRedemptionDetails(Guid id)
    {
        try
        {
            var redemption = await _redemptionRepository.GetByIdWithDetailsAsync(id);

            if (redemption == null)
                return NotFound(new { message = "Redemption not found" });

            var detailDto = _mapper.Map<RedemptionDetailDto>(redemption);
            return Ok(detailDto);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve redemption details", error = ex.Message });
        }
    }

    /// <summary>
    /// Approve a pending redemption
    /// </summary>
    /// <remarks>
    /// Approve a redemption request.
    /// Only allowed if status is Pending.
    /// Sets ApprovedBy and ApprovedAt timestamps.
    /// Optional admin notes can be provided.
    /// 
    /// Example:
    /// 
    ///     POST /api/admin/redemptions/{id}/approve
    ///     {
    ///       "notes": "Approved - stock available"
    ///     }
    /// </remarks>
    /// <param name="id">Redemption ID</param>
    /// <param name="request">Approval request with optional notes</param>
    /// <returns>Success result</returns>
    /// <response code="200">Redemption approved successfully</response>
    /// <response code="400">Bad request - invalid state (not pending)</response>
    /// <response code="404">Redemption not found</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpPost("{id:guid}/approve")]
    [SwaggerOperation(Summary = "Approve redemption", Description = "Approve a pending redemption request")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> ApproveRedemption(Guid id, [FromBody] ApproveRedemptionRequest? request = null)
    {
        try
        {
            var redemption = await _redemptionRepository.GetByIdAsync(id);

            if (redemption == null)
                return NotFound(new { message = "Redemption not found" });

            var currentAdminId = _currentUserService.GetCurrentUserId();

            // Call domain method - it will validate the state
            redemption.Approve(currentAdminId, request?.Notes);

            await _redemptionRepository.UpdateAsync(redemption);
            await _unitOfWork.SaveChangesAsync();

            return Ok(new
            {
                message = "Redemption approved successfully",
                redemptionId = id,
                approvedBy = currentAdminId,
                approvedAt = redemption.ApprovedAt
            });
        }
        catch (DomainException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to approve redemption", error = ex.Message });
        }
    }

    /// <summary>
    /// Reject a pending redemption
    /// </summary>
    /// <remarks>
    /// Reject a redemption request.
    /// Only allowed if status is Pending.
    /// Rejection reason is mandatory.
    /// 
    /// Example:
    /// 
    ///     POST /api/admin/redemptions/{id}/reject
    ///     {
    ///       "reason": "Out of stock"
    ///     }
    /// </remarks>
    /// <param name="id">Redemption ID</param>
    /// <param name="request">Rejection request with mandatory reason</param>
    /// <returns>Success result</returns>
    /// <response code="200">Redemption rejected successfully</response>
    /// <response code="400">Bad request - invalid state or missing reason</response>
    /// <response code="404">Redemption not found</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpPost("{id:guid}/reject")]
    [SwaggerOperation(Summary = "Reject redemption", Description = "Reject a pending redemption request")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> RejectRedemption(Guid id, [FromBody] RejectRedemptionRequest request)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(request.Reason))
                return BadRequest(new { message = "Rejection reason is required" });

            var redemption = await _redemptionRepository.GetByIdAsync(id);

            if (redemption == null)
                return NotFound(new { message = "Redemption not found" });

            var currentAdminId = _currentUserService.GetCurrentUserId();

            // Call domain method - it will validate the state
            redemption.Reject(currentAdminId, request.Reason);

            await _redemptionRepository.UpdateAsync(redemption);
            await _unitOfWork.SaveChangesAsync();

            return Ok(new
            {
                message = "Redemption rejected successfully",
                redemptionId = id,
                rejectedBy = currentAdminId,
                reason = request.Reason
            });
        }
        catch (DomainException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to reject redemption", error = ex.Message });
        }
    }

    /// <summary>
    /// Mark redemption as delivered
    /// </summary>
    /// <remarks>
    /// Mark an approved redemption as delivered.
    /// Only allowed if status is Approved.
    /// Sets DeliveredBy and DeliveredAt timestamps.
    /// Optional delivery notes can be provided.
    /// 
    /// Example:
    /// 
    ///     POST /api/admin/redemptions/{id}/deliver
    ///     {
    ///       "notes": "Delivered to employee desk"
    ///     }
    /// </remarks>
    /// <param name="id">Redemption ID</param>
    /// <param name="request">Delivery request with optional notes</param>
    /// <returns>Success result</returns>
    /// <response code="200">Redemption marked as delivered successfully</response>
    /// <response code="400">Bad request - invalid state (not approved)</response>
    /// <response code="404">Redemption not found</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpPost("{id:guid}/deliver")]
    [SwaggerOperation(Summary = "Mark as delivered", Description = "Mark an approved redemption as delivered")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> MarkAsDelivered(Guid id, [FromBody] DeliverRedemptionRequest? request = null)
    {
        try
        {
            var redemption = await _redemptionRepository.GetByIdAsync(id);

            if (redemption == null)
                return NotFound(new { message = "Redemption not found" });

            var currentAdminId = _currentUserService.GetCurrentUserId();

            // Call domain method - it will validate the state
            redemption.MarkDelivered(currentAdminId, request?.Notes);

            await _redemptionRepository.UpdateAsync(redemption);
            await _unitOfWork.SaveChangesAsync();

            return Ok(new
            {
                message = "Redemption marked as delivered successfully",
                redemptionId = id,
                deliveredBy = currentAdminId,
                deliveredAt = redemption.DeliveredAt
            });
        }
        catch (DomainException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to mark redemption as delivered", error = ex.Message });
        }
    }
}
