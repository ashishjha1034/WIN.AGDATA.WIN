using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Transactions;
using AutoMapper;
using System.Security.Claims;

namespace WIN.AGDATA.WIN.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Policy = "PasswordChanged")]
public class TransactionController : ControllerBase
{
    private readonly ITransactionRepository _transactionRepository;
    private readonly IUserRepository _userRepository;
    private readonly IEventRepository _eventRepository;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public TransactionController(
        ITransactionRepository transactionRepository,
        IUserRepository userRepository,
        IEventRepository eventRepository,
        IMapper mapper,
        ICurrentUserService currentUserService)
    {
        _transactionRepository = transactionRepository;
        _userRepository = userRepository;
        _eventRepository = eventRepository;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }

    /// <summary>
    /// Get paginated transaction history for a user
    /// </summary>
    [HttpGet("user/{userId:guid}")]
    public async Task<ActionResult> GetUserTransactions(
        Guid userId,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        try
        {
            // Authorization check
            var currentUserId = _currentUserService.GetCurrentUserId();
            var isAdmin = _currentUserService.IsAdmin();

            if (userId != currentUserId && !isAdmin)
                return Forbid("You can only view your own transactions");

            // Validate pagination
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;
            if (pageSize > 100) pageSize = 100; // Max 100 per page

            // Get user exists
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return NotFound(new { message = "User not found" });

            // Get paginated transactions
            var (transactions, totalCount) = await _transactionRepository
                .GetPagedByUserIdAsync(userId, pageNumber, pageSize);

            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var transactionDtos = _mapper.Map<List<TransactionDto>>(transactions);

            return Ok(new
            {
                data = transactionDtos,
                pagination = new
                {
                    currentPage = pageNumber,
                    pageSize = pageSize,
                    totalCount = totalCount,
                    totalPages = totalPages,
                    hasNextPage = pageNumber < totalPages,
                    hasPreviousPage = pageNumber > 1
                }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve transactions", error = ex.Message });
        }
    }

    /// <summary>
    /// Get current user's transaction history
    /// </summary>
    [HttpGet("my-history")]
    public async Task<ActionResult> GetMyTransactions(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        try
        {
            var currentUserId = _currentUserService.GetCurrentUserId();

            // Validate pagination
            if (pageNumber < 1) pageNumber = 1;
            if (pageSize < 1) pageSize = 10;
            if (pageSize > 100) pageSize = 100;

            var (transactions, totalCount) = await _transactionRepository
                .GetPagedByUserIdAsync(currentUserId, pageNumber, pageSize);

            var totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var transactionDtos = _mapper.Map<List<TransactionDto>>(transactions);

            return Ok(new
            {
                data = transactionDtos,
                pagination = new
                {
                    currentPage = pageNumber,
                    pageSize = pageSize,
                    totalCount = totalCount,
                    totalPages = totalPages,
                    hasNextPage = pageNumber < totalPages,
                    hasPreviousPage = pageNumber > 1
                }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve transactions", error = ex.Message });
        }
    }

    /// <summary>
    /// Get transaction statistics
    /// </summary>
    [HttpGet("statistics")]
    public async Task<ActionResult> GetStatistics()
    {
        try
        {
            var currentUserId = _currentUserService.GetCurrentUserId();
            var user = await _userRepository.GetByIdWithPointsAsync(currentUserId);

            if (user == null)
                return NotFound(new { message = "User not found" });

            var userTransactionCount = await _transactionRepository
                .GetUserTransactionCountAsync(currentUserId);
            
            // Get user's event participation count (total events registered)
            var (activeEvents, completedEvents) = await _eventRepository
                .GetUserEventRegistrationStatsAsync(currentUserId);
            var totalEventParticipations = activeEvents + completedEvents;

            return Ok(new
            {
                user = new
                {
                    userId = currentUserId,
                    currentBalance = user.PointsAccount.CurrentBalance,
                    totalEarned = user.PointsAccount.TotalEarned,
                    totalRedeemed = user.PointsAccount.TotalRedeemed
                },
                userStats = new
                {
                    transactionCount = userTransactionCount,
                    eventParticipationCount = totalEventParticipations
                }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve statistics", error = ex.Message });
        }
    }
}
