using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Application.Services;

public class PointsService : IPointsService
{
    private readonly IUserRepository _userRepository;
    private readonly ITransactionRepository _transactionRepository;
    private readonly IUnitOfWork _uow;
    private readonly ILogger<PointsService> _logger;

    public PointsService(
        IUserRepository userRepository,
        ITransactionRepository transactionRepository,
        IUnitOfWork uow,
        ILogger<PointsService> logger)
    {
        _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        _transactionRepository = transactionRepository ?? throw new ArgumentNullException(nameof(transactionRepository));
        _uow = uow ?? throw new ArgumentNullException(nameof(uow));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<int> GetUserPointsBalanceAsync(string employeeId)
    {
        try
        {
            var user = await _userRepository.GetByEmployeeIdAsync(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            return user.Points.CurrentBalance;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting points balance for: {EmployeeId}", employeeId);
            throw;
        }
    }

    public async Task<List<PointsTransaction>> GetUserTransactionHistoryAsync(string employeeId)
    {
        try
        {
            var transactions = await _transactionRepository.GetByEmployeeIdAsync(employeeId);
            return transactions.ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting transaction history for: {EmployeeId}", employeeId);
            throw;
        }
    }

    public async Task AddPointsAsync(string employeeId, int points, string reason, string? eventId = null)
    {
        try
        {
            var user = await _userRepository.GetByEmployeeIdAsync(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            user.EarnPoints(points, "SYSTEM");
            await _userRepository.UpdateAsync(user);

            var transaction = new PointsTransaction(employeeId, points, PointsTransactionType.Earning, reason, eventId);
            await _transactionRepository.AddAsync(transaction);

            await _uow.SaveChangesAsync();
            _logger.LogInformation("Points added to {EmployeeId}: {Points}", employeeId, points);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding points to: {EmployeeId}", employeeId);
            throw;
        }
    }

    public async Task SpendPointsAsync(string employeeId, int points, string reason, Guid? redemptionId = null)
    {
        try
        {
            var user = await _userRepository.GetByEmployeeIdAsync(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            user.SpendPoints(points, "SYSTEM");
            await _userRepository.UpdateAsync(user);

            var transaction = new PointsTransaction(employeeId, points, PointsTransactionType.Spending, reason, null, redemptionId);
            await _transactionRepository.AddAsync(transaction);

            await _uow.SaveChangesAsync();
            _logger.LogInformation("Points spent by {EmployeeId}: {Points}", employeeId, points);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error spending points for: {EmployeeId}", employeeId);
            throw;
        }
    }

    public async Task RefundPointsAsync(string employeeId, int points, string reason)
    {
        try
        {
            var user = await _userRepository.GetByEmployeeIdAsync(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            user.RefundPoints(points, "SYSTEM");
            await _userRepository.UpdateAsync(user);

            var transaction = new PointsTransaction(employeeId, points, PointsTransactionType.Refund, reason);
            await _transactionRepository.AddAsync(transaction);

            await _uow.SaveChangesAsync();
            _logger.LogInformation("Points refunded to {EmployeeId}: {Points}", employeeId, points);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error refunding points for: {EmployeeId}", employeeId);
            throw;
        }
    }

    // ---- Adapter methods for IPointsManagementService (for DI compatibility) ----
    public async Task AddPointsToUserAsync(string employeeId, int points, string reason, string? eventId = null)
        => await AddPointsAsync(employeeId, points, reason, eventId);

    public async Task DeductPointsFromUserAsync(string employeeId, int points, string reason, Guid? redemptionId = null)
        => await SpendPointsAsync(employeeId, points, reason, redemptionId);

    public async Task RefundPointsToUserAsync(string employeeId, int points, string reason)
        => await RefundPointsAsync(employeeId, points, reason);
}