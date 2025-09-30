using Microsoft.AspNetCore.Mvc;
using WIN_AGDATA_WIN.Application.Interfaces;

namespace WIN.AGDATA.WIN.API.Controllers
{
    public class PointsController : ApiControllerBase
    {
        private readonly IPointsService _pointsService;

        public PointsController(IPointsService pointsService)
        {
            _pointsService = pointsService;
        }

        [HttpGet("user/{employeeId}/balance")]
        public IActionResult GetUserBalance(string employeeId)
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

        [HttpGet("user/{employeeId}/history")]
        public IActionResult GetUserTransactionHistory(string employeeId)
        {
            try
            {
                var transactions = _pointsService.GetUserTransactionHistory(employeeId);
                var response = transactions.Select(t => new TransactionResponse(t));
                return Ok(response);
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }

    // Response DTO
    public record TransactionResponse(
        Guid Id,
        string EmployeeId,
        int Points,
        string Type,
        string Description,
        DateTime TransactionDate
    )
    {
        public TransactionResponse(Domain.Entities.Transactions.PointsTransaction transaction) : this(
            transaction.Id,
            transaction.EmployeeId,
            transaction.Points,
            transaction is PointsEarning ? "Earned" : "Spent",
            transaction.Description,
            transaction.TransactionDate
        )
        { }
    }
}