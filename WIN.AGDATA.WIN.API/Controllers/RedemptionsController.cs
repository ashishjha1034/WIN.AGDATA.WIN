using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.APPLICATION.Commands.Redemptions;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Enums;

namespace WIN.AGDATA.WIN.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RedemptionsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IRedemptionRepository _repo;
    private readonly IMapper _mapper;

    public RedemptionsController(IMediator mediator, IRedemptionRepository repo, IMapper mapper)
    {
        _mediator = mediator;
        _repo = repo;
        _mapper = mapper;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<RedemptionDto>> Create([FromBody] CreateRedemptionRequest request)
    {
        var userId = Guid.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);
        var result = await _mediator.Send(new CreateRedemptionCommand(userId, request.ProductId, request.Quantity));
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpGet("{id:guid}")]
    [Authorize]
    public async Task<ActionResult<RedemptionDto>> GetById(Guid id)
    {
        var redemption = await _repo.GetByIdWithDetailsAsync(id);
        if (redemption == null) return NotFound();
        return Ok(_mapper.Map<RedemptionDto>(redemption));
    }

    [HttpGet("user/{userId:guid}")]
    [Authorize]
    public async Task<ActionResult<IReadOnlyList<RedemptionDto>>> GetUserRedemptions(Guid userId)
    {
        var redemptions = await _repo.GetByUserIdAsync(userId);
        return Ok(_mapper.Map<List<RedemptionDto>>(redemptions));
    }

    [HttpGet("pending")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<IReadOnlyList<RedemptionDto>>> GetPending()
    {
        var pending = await _repo.GetPendingAsync();
        return Ok(_mapper.Map<List<RedemptionDto>>(pending));
    }

    [HttpPost("{id:guid}/approve")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Approve(Guid id, [FromBody] ApproveRedemptionRequest request)
    {
        var redemption = await _repo.GetByIdAsync(id);
        if (redemption == null) return NotFound();

        redemption.Approve(request.ApprovedBy, request.Notes);
        await _repo.UpdateAsync(redemption);
        return NoContent();
    }

    [HttpPost("{id:guid}/reject")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Reject(Guid id, [FromBody] RejectRedemptionRequest request)
    {
        var redemption = await _repo.GetByIdAsync(id);
        if (redemption == null) return NotFound();

        redemption.Reject(request.RejectedBy, request.Reason);
        await _repo.UpdateAsync(redemption);
        return NoContent();
    }

    [HttpPost("{id:guid}/deliver")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> Deliver(Guid id, [FromBody] DeliverRedemptionRequest request)
    {
        var redemption = await _repo.GetByIdAsync(id);
        if (redemption == null) return NotFound();

        redemption.MarkDelivered(request.DeliveredBy, request.Notes);
        await _repo.UpdateAsync(redemption);
        return NoContent();
    }

    [HttpPost("{id:guid}/cancel")]
    [Authorize]
    public async Task<IActionResult> Cancel(Guid id)
    {
        var userId = Guid.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);
        var redemption = await _repo.GetByIdAsync(id);
        if (redemption == null || (redemption.UserId != userId && !User.IsInRole("Admin")))
            return Forbid();

        redemption.Cancel(userId, "User cancelled");
        await _repo.UpdateAsync(redemption);
        return NoContent();
    }
}

public record ApproveRedemptionRequest(Guid ApprovedBy, string? Notes);
public record RejectRedemptionRequest(Guid RejectedBy, string Reason);
public record DeliverRedemptionRequest(Guid DeliveredBy, string? Notes);