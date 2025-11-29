using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Application.Commands;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Application.Mappers;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace WIN.AGDATA.WIN.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RedemptionsController : ControllerBase
    {
        private readonly IRedemptionRepository _redemptionRepo;
        private readonly IProductRepository _productRepo;
        private readonly IUserRepository _userRepo;
        private readonly IMediator _mediator;
        private readonly ILogger<RedemptionsController> _logger;

        public RedemptionsController(
            IRedemptionRepository redemptionRepo,
            IProductRepository productRepo,
            IUserRepository userRepo,
            IMediator mediator,
            ILogger<RedemptionsController> logger)
        {
            _redemptionRepo = redemptionRepo ?? throw new ArgumentNullException(nameof(redemptionRepo));
            _productRepo = productRepo ?? throw new ArgumentNullException(nameof(productRepo));
            _userRepo = userRepo ?? throw new ArgumentNullException(nameof(userRepo));
            _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RedemptionDto>>> GetAll()
        {
            var list = await _redemptionRepo.GetAllAsync() ?? new List<Redemption>();
            var dtos = list.Select(RedemptionMapper.ToDto);
            return Ok(dtos);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<RedemptionDto>> GetById(Guid id)
        {
            var r = await _redemptionRepo.GetByIdAsync(id);
            if (r == null) return NotFound();
            return Ok(RedemptionMapper.ToDto(r));
        }

        [HttpPost]
        public async Task<ActionResult<RedemptionDto>> Create([FromBody] CreateRedemptionRequest dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var createdBy = User?.Identity?.Name ?? "SYSTEM";
            var command = new CreateRedemptionCommand(dto.UserId, dto.ProductId, createdBy);
            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPost("{id:guid}/approve")]
        public async Task<IActionResult> Approve(Guid id)
        {
            var user = User?.Identity?.Name ?? "SYSTEM";
            var result = await _mediator.Send(new ApproveRedemptionCommand(id, user));
            return Ok(result);
        }

        [HttpPost("{id:guid}/reject")]
        public async Task<IActionResult> Reject(Guid id, [FromBody] RejectRedemptionRequest dto)
        {
            var user = User?.Identity?.Name ?? "SYSTEM";
            var result = await _mediator.Send(new RejectRedemptionCommand(id, dto.Reason, user));
            return Ok(result);
        }

        [HttpPost("{id:guid}/delivered")]
        public async Task<IActionResult> Delivered(Guid id)
        {
            var user = User?.Identity?.Name ?? "SYSTEM";
            var result = await _mediator.Send(new MarkRedemptionDeliveredCommand(id, user));
            return Ok(result);
        }
    }
}