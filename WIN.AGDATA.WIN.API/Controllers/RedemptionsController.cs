
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.APPLICATION.Commands.Redemptions;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace WIN.AGDATA.WIN.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RedemptionsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    private readonly IRedemptionRepository _redemptionRepository;

    public RedemptionsController(IMediator mediator, IMapper mapper, IRedemptionRepository redemptionRepository)
    {
        _mediator = mediator;
        _mapper = mapper;
        _redemptionRepository = redemptionRepository;
    }

    [HttpPost]
    public async Task<ActionResult<RedemptionDto>> CreateRedemption([FromBody] CreateRedemptionRequest request, [FromQuery] Guid userId)
    {
        var result = await _mediator.Send(new CreateRedemptionCommand(userId, request.ProductId, request.Quantity));
        return CreatedAtAction(nameof(GetRedemption), new { id = result.Id }, result);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<RedemptionDto>> GetRedemption(Guid id)
    {
        var redemption = await _redemptionRepository.GetByIdWithDetailsAsync(id);
        if (redemption == null) return NotFound();
        return Ok(_mapper.Map<RedemptionDto>(redemption));
    }

    [HttpGet("user/{userId:guid}")]
    public async Task<ActionResult<IReadOnlyList<RedemptionDto>>> GetUserRedemptions(Guid userId)
    {
        var redemptions = await _redemptionRepository.GetByUserIdAsync(userId);
        return Ok(_mapper.Map<IReadOnlyList<RedemptionDto>>(redemptions));
    }

    [HttpPost("{id:guid}/approve")]
    public async Task<IActionResult> ApproveRedemption(Guid id, [FromBody] ApproveRedemptionRequest request)
    {
        var redemption = await _redemptionRepository.GetByIdAsync(id);
        if (redemption == null) return NotFound();

        redemption.Approve(request.ApprovedBy);
        await _redemptionRepository.UpdateAsync(redemption);
        return NoContent();
    }

    [HttpPost("{id:guid}/deliver")]
    public async Task<IActionResult> DeliverRedemption(Guid id, [FromBody] DeliverRedemptionRequest request)
    {
        var redemption = await _redemptionRepository.GetByIdAsync(id);
        if (redemption == null) return NotFound();

        redemption.MarkDelivered(request.Notes, request.DeliveredBy);
        await _redemptionRepository.UpdateAsync(redemption);
        return NoContent();
    }
}