using MediatR;
using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.APPLICATION.Commands.Admin;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Admin;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.API.Controllers;

[ApiController]
[Route("api/[controller]")]
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

    [HttpGet("stats")]
    public async Task<ActionResult<StatsDto>> GetStats()
    {
        var totalUsers = (await _userRepository.GetActiveUsersAsync()).Count;
        var totalEarned = await _transactionRepository.GetTotalEarnedAsync();
        var totalRedeemed = await _transactionRepository.GetTotalRedeemedAsync();
        var pendingRedemptions = await _redemptionRepository.GetPendingCountAsync();

        return Ok(new StatsDto(totalUsers, totalEarned, totalRedeemed, pendingRedemptions));
    }

    [HttpPost("adjust-points")]
    public async Task<IActionResult> AdjustPoints([FromBody] AdjustPointsRequest request)
    {
        await _mediator.Send(new AdjustPointsCommand(request.UserId, request.Amount, request.Reason));
        return NoContent();
    }
}
