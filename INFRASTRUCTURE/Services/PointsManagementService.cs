using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Infrastructure.Repositories;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;

namespace WIN.AGDATA.WIN.Infrastructure.Services;

public interface IPointsManagementService
{
    Task AddPointsToUserAsync(string employeeId, int points, string reason, string? eventId = null);
    Task DeductPointsFromUserAsync(string employeeId, int points, string reason);
    Task RefundPointsToUserAsync(string employeeId, int points, string reason);
    Task<int> GetUserPointsBalanceAsync(string employeeId);
}

public class PointsManagementService : IPointsManagementService
{
    private readonly IUserRepository _userRepository;
    private readonly ITransactionRepository _transactionRepository;
    private readonly IUnitOfWork _uow;
    private readonly ILogger<PointsManagementService> _logger;

    public PointsManagementService(
        IUserRepository userRepository,
        ITransactionRepository transactionRepository,
        IUnitOfWork uow,
        ILogger<PointsManagementService> logger)
    {
        _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        _transactionRepository = transactionRepository ?? throw new ArgumentNullException(nameof(transactionRepository));
        _uow = uow ?? throw new ArgumentNullException(nameof(uow));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task AddPointsToUserAsync(string employeeId, int points, string reason, string? eventId = null)
    {
        try
        {
            var user = await _userRepository.GetByEmployeeIdAsync(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            user.EarnPoints(points, "SYSTEM");
            await _userRepository.UpdateAsync(user);

            // Record transaction
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

    public async Task DeductPointsFromUserAsync(string employeeId, int points, string reason)
    {
        try
        {
            var user = await _userRepository.GetByEmployeeIdAsync(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            user.SpendPoints(points, "SYSTEM");
            await _userRepository.UpdateAsync(user);

            // Record transaction
            var transaction = new PointsTransaction(employeeId, points, PointsTransactionType.Spending, reason);
            await _transactionRepository.AddAsync(transaction);

            await _uow.SaveChangesAsync();
            _logger.LogInformation("Points deducted from {EmployeeId}: {Points}", employeeId, points);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deducting points from: {EmployeeId}", employeeId);
            throw;
        }
    }

    public async Task RefundPointsToUserAsync(string employeeId, int points, string reason)
    {
        try
        {
            var user = await _userRepository.GetByEmployeeIdAsync(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            user.RefundPoints(points, "SYSTEM");
            await _userRepository.UpdateAsync(user);

            // Record transaction
            var transaction = new PointsTransaction(employeeId, points, PointsTransactionType.Refund, reason);
            await _transactionRepository.AddAsync(transaction);

            await _uow.SaveChangesAsync();
            _logger.LogInformation("Points refunded to {EmployeeId}: {Points}", employeeId, points);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error refunding points to: {EmployeeId}", employeeId);
            throw;
        }
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
}