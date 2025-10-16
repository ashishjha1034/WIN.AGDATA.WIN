using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace WIN.AGDATA.WIN.API.Controllers;

public class RedemptionsController : ApiControllerBase
{
    private readonly IRedemptionService _redemptionService;

    public RedemptionsController(IRedemptionService redemptionService)
    {
        _redemptionService = redemptionService ?? throw new ArgumentNullException(nameof(redemptionService));
    }

    [HttpPost]
    public IActionResult RequestRedemption([FromBody] RedemptionRequest request)
    {
        try
        {
            var redemption = _redemptionService.RequestRedemption(request.EmployeeId, request.ProductId);
            return CreatedAtAction(nameof(GetRedemptionById),
                new { redemptionId = redemption.Id },
                new RedemptionResponse(redemption));
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet("{redemptionId:guid}")]
    public IActionResult GetRedemptionById(Guid redemptionId)
    {
        try
        {
            var redemption = _redemptionService.GetRedemptionById(redemptionId);
            return OkOrNotFound(redemption == null ? null : new RedemptionResponse(redemption));
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet("user/{employeeId}")]
    public IActionResult GetUserRedemptions(string employeeId)
    {
        try
        {
            var redemptions = _redemptionService.GetUserRedemptions(employeeId);
            var response = redemptions.Select(r => new RedemptionResponse(r));
            return Ok(response);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet("pending")]
    public IActionResult GetPendingRedemptions()
    {
        try
        {
            var redemptions = _redemptionService.GetPendingRedemptions();
            var response = redemptions.Select(r => new RedemptionResponse(r));
            return Ok(response);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPost("{redemptionId:guid}/approve")]
    public IActionResult ApproveRedemption(Guid redemptionId)
    {
        try
        {
            _redemptionService.ApproveRedemption(redemptionId);
            return Ok(new { message = "Redemption approved successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPost("{redemptionId:guid}/reject")]
    public IActionResult RejectRedemption(Guid redemptionId, [FromBody] RejectRedemptionRequest request)
    {
        try
        {
            _redemptionService.RejectRedemption(redemptionId, request.Reason);
            return Ok(new { message = "Redemption rejected successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPost("{redemptionId:guid}/deliver")]
    public IActionResult MarkAsDelivered(Guid redemptionId)
    {
        try
        {
            _redemptionService.MarkAsDelivered(redemptionId);
            return Ok(new { message = "Redemption marked as delivered successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }
}

public record RedemptionRequest(string EmployeeId, Guid ProductId);
public record RejectRedemptionRequest(string Reason);

public record RedemptionResponse(
    Guid Id,
    string EmployeeId,
    Guid ProductId,
    int PointsCost,
    DateTime RequestedAt)
{
    public RedemptionResponse(Redemption redemption) : this(
        redemption.Id,
        redemption.EmployeeId,
        redemption.ProductId,
        redemption.PointsCost,
        redemption.RequestedAt)
    { }
}
