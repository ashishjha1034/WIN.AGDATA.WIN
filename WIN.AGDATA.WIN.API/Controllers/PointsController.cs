using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.Application.Interfaces;

namespace WIN.AGDATA.WIN.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PointsController : ControllerBase
{
    private readonly IPointsService _pointsService;
    private readonly ILogger<PointsController> _logger;

    public PointsController(IPointsService pointsService, ILogger<PointsController> logger)
    {
        _pointsService = pointsService ?? throw new ArgumentNullException(nameof(pointsService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [HttpGet("{employeeId}/balance")]
    public IActionResult GetUserPointsBalance(string employeeId)
    {
        try
        {
            var balance = _pointsService.GetUserPointsBalance(employeeId);
            return Ok(new { balance });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting points balance");
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{employeeId}/history")]
    public IActionResult GetUserTransactionHistory(string employeeId)
    {
        try
        {
            var history = _pointsService.GetUserTransactionHistory(employeeId);
            return Ok(history);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting transaction history");
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("add")]
    public IActionResult AddPoints([FromBody] AddPointsRequest request)
    {
        try
        {
            _pointsService.AddPoints(request.EmployeeId, request.Points, request.Reason, request.EventId);
            return Ok("Points added successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding points");
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("spend")]
    public IActionResult SpendPoints([FromBody] SpendPointsRequest request)
    {
        try
        {
            _pointsService.SpendPoints(request.EmployeeId, request.Points, request.Reason, request.RedemptionId);
            return Ok("Points spent successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error spending points");
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("refund")]
    public IActionResult RefundPoints([FromBody] RefundPointsRequest request)
    {
        try
        {
            _pointsService.RefundPoints(request.EmployeeId, request.Points, request.Reason);
            return Ok("Points refunded successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error refunding points");
            return BadRequest(ex.Message);
        }
    }
}

public class AddPointsRequest
{
    public string EmployeeId { get; set; }
    public int Points { get; set; }
    public string Reason { get; set; }
    public string? EventId { get; set; }
}

public class SpendPointsRequest
{
    public string EmployeeId { get; set; }
    public int Points { get; set; }
    public string Reason { get; set; }
    public Guid? RedemptionId { get; set; }
}

public class RefundPointsRequest
{
    public string EmployeeId { get; set; }
    public int Points { get; set; }
    public string Reason { get; set; }
}
