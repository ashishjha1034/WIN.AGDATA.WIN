using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;

namespace WIN.AGDATA.WIN.API.Controllers;

public class PointsController : ApiControllerBase
{
    private readonly IPointsManagementService _pointsService;

    public PointsController(IPointsManagementService pointsService)
    {
        _pointsService = pointsService ?? throw new ArgumentNullException(nameof(pointsService));
    }

    [HttpGet("{employeeId}/balance")]
    public IActionResult GetUserPointsBalance(string employeeId)
    {
        try
        {
            var balance = _pointsService.GetUserPointsBalance(employeeId);
            return Ok(new { employeeId, balance });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet("{employeeId}/history")]
    public IActionResult GetUserPointsHistory(string employeeId)
    {
        try
        {
            var history = _pointsService.GetUserPointsHistory(employeeId);
            var response = history.Select(t => new TransactionResponse(t));
            return Ok(response);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPost("{employeeId}/add")]
    public IActionResult AddPointsToUser(string employeeId, [FromBody] AddPointsRequest request)
    {
        try
        {
            _pointsService.AddPointsToUser(employeeId, request.Points, request.Reason, request.EventId);
            return Ok(new { message = "Points added successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet("{employeeId}/can-redeem/{requiredPoints:int}")]
    public IActionResult CanUserRedeem(string employeeId, int requiredPoints)
    {
        try
        {
            var canRedeem = _pointsService.CanUserRedeem(employeeId, requiredPoints);
            return Ok(new { employeeId, requiredPoints, canRedeem });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }
}

public record AddPointsRequest(int Points, string Reason, string EventId);

public record TransactionResponse(
    Guid Id,
    string EmployeeId,
    int Points,
    string Description,
    DateTime TransactionDate,
    string Type)
{
    public TransactionResponse(PointsTransaction transaction) : this(
        transaction.Id,
        transaction.EmployeeId,
        transaction.Points,
        transaction.Description,
        transaction.TransactionDate,
        transaction.GetType().Name)
    { }
}
