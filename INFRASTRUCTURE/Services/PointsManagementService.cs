using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using WIN.AGDATA.WIN.Infrastructure.Repositories;

namespace WIN.AGDATA.WIN.Infrastructure.Services;

public interface IPointsManagementService
{
    void AddPointsToUser(string employeeId, int points, string reason, string? eventId = null);
    void DeductPointsFromUser(string employeeId, int points, string reason);
    void RefundPointsToUser(string employeeId, int points, string reason);
    int GetUserPointsBalance(string employeeId);
}

public class PointsManagementService : IPointsManagementService
{
    private readonly IUserRepository _userRepository;
    private readonly ITransactionRepository _transactionRepository;
    private readonly ILogger<PointsManagementService> _logger;

    public PointsManagementService(
        IUserRepository userRepository,
        ITransactionRepository transactionRepository,
        ILogger<PointsManagementService> logger)
    {
        _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        _transactionRepository = transactionRepository ?? throw new ArgumentNullException(nameof(transactionRepository));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public void AddPointsToUser(string employeeId, int points, string reason, string? eventId = null)
    {
        try
        {
            var user = _userRepository.GetByEmployeeId(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            user.EarnPoints(points, "SYSTEM");
            _userRepository.Update(user);

            // Record transaction
            var transaction = new PointsTransaction(employeeId, points, PointsTransactionType.Earning, reason, eventId);
            _transactionRepository.Add(transaction);

            _logger.LogInformation($"Points added to {employeeId}: {points}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error adding points to: {employeeId}");
            throw;
        }
    }

    public void DeductPointsFromUser(string employeeId, int points, string reason)
    {
        try
        {
            var user = _userRepository.GetByEmployeeId(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            user.SpendPoints(points, "SYSTEM");
            _userRepository.Update(user);

            // Record transaction
            var transaction = new PointsTransaction(employeeId, points, PointsTransactionType.Spending, reason);
            _transactionRepository.Add(transaction);

            _logger.LogInformation($"Points deducted from {employeeId}: {points}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error deducting points from: {employeeId}");
            throw;
        }
    }

    public void RefundPointsToUser(string employeeId, int points, string reason)
    {
        try
        {
            var user = _userRepository.GetByEmployeeId(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            user.RefundPoints(points, "SYSTEM");
            _userRepository.Update(user);

            // Record transaction
            var transaction = new PointsTransaction(employeeId, points, PointsTransactionType.Refund, reason);
            _transactionRepository.Add(transaction);

            _logger.LogInformation($"Points refunded to {employeeId}: {points}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error refunding points to: {employeeId}");
            throw;
        }
    }

    public int GetUserPointsBalance(string employeeId)
    {
        try
        {
            var user = _userRepository.GetByEmployeeId(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            return user.Points.CurrentBalance;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error getting points balance for: {employeeId}");
            throw;
        }
    }
}
