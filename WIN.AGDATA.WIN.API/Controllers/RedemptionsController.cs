using Microsoft.AspNetCore.Mvc;
using System.Linq;
using WIN.AGDATA.WIN.API.Controllers;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN_AGDATA_WIN.Application.Interfaces;

namespace WIN_AGDATA_WIN.API.Controllers
{
    public class RedemptionsController : ApiControllerBase
    {
        private readonly IRedemptionService _redemptionService;
        private readonly IPointsService _pointsService;

        public RedemptionsController(IRedemptionService redemptionService, IPointsService pointsService)
        {
            _redemptionService = redemptionService;
            _pointsService = pointsService;
        }

        [HttpPost]
        public IActionResult RequestRedemption([FromBody] RequestRedemptionRequest request)
        {
            try
            {
                var redemption = _redemptionService.RequestRedemption(
                    request.EmployeeId,
                    request.ProductId
                );

                // Deduct points immediately
                _pointsService.SpendPoints(
                    request.EmployeeId,
                    redemption.PointsCost,
                    redemption.Id,
                    $"Redemption: {redemption.PointsCost} points"
                );

                return Ok(new RedemptionResponse(redemption));
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

        [HttpPost("{redemptionId}/approve")]
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

        [HttpPost("{redemptionId}/reject")]
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

        [HttpPost("{redemptionId}/deliver")]
        public IActionResult MarkRedemptionDelivered(Guid redemptionId)
        {
            try
            {
                _redemptionService.MarkRedemptionDelivered(redemptionId);
                return Ok(new { message = "Redemption marked as delivered" });
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }

    // Request/Response DTOs
    public record RequestRedemptionRequest(string EmployeeId, Guid ProductId);

    public record RejectRedemptionRequest(string Reason);

    public record RedemptionResponse(
        Guid Id,
        string EmployeeId,
        Guid ProductId,
        int PointsCost,
        DateTime RequestedAt
    )
    {
        public RedemptionResponse(Redemption redemption) : this(
            redemption.Id,
            redemption.EmployeeId,
            redemption.ProductId,
            redemption.PointsCost,
            redemption.RequestedAt
        )
        { }
    }
}