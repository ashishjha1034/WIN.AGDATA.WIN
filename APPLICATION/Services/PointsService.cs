using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using WIN.AGDATA.WIN.Application.Interfaces;


namespace WIN.AGDATA.WIN.Application.Services;

public class PointsService : IPointsService,IPointsManagementService
{
    private readonly IUserRepository _userRepository;
    private readonly ITransactionRepository _transactionRepository;
    private readonly ILogger<PointsService> _logger;

    public PointsService(
        IUserRepository userRepository,
        ITransactionRepository transactionRepository,
        ILogger<PointsService> logger)
    {
        _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        _transactionRepository = transactionRepository ?? throw new ArgumentNullException(nameof(transactionRepository));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
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

    public List<PointsTransaction> GetUserTransactionHistory(string employeeId)
    {
        try
        {
            return _transactionRepository.GetByEmployeeId(employeeId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error getting transaction history for: {employeeId}");
            throw;
        }
    }

    public void AddPoints(string employeeId, int points, string reason, string? eventId = null)
    {
        try
        {
            var user = _userRepository.GetByEmployeeId(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            user.EarnPoints(points, "SYSTEM");
            _userRepository.Update(user);

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

    public void SpendPoints(string employeeId, int points, string reason, Guid? redemptionId = null)
    {
        try
        {
            var user = _userRepository.GetByEmployeeId(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            user.SpendPoints(points, "SYSTEM");
            _userRepository.Update(user);

            var transaction = new PointsTransaction(employeeId, points, PointsTransactionType.Spending, reason, null, redemptionId);
            _transactionRepository.Add(transaction);

            _logger.LogInformation($"Points spent by {employeeId}: {points}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error spending points for: {employeeId}");
            throw;
        }
    }

    public void RefundPoints(string employeeId, int points, string reason)
    {
        try
        {
            var user = _userRepository.GetByEmployeeId(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            user.RefundPoints(points, "SYSTEM");
            _userRepository.Update(user);

            var transaction = new PointsTransaction(employeeId, points, PointsTransactionType.Refund, reason);
            _transactionRepository.Add(transaction);

            _logger.LogInformation($"Points refunded to {employeeId}: {points}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error refunding points for: {employeeId}");
            throw;
        }
    }
    public void AddPointsToUser(string employeeId, int points, string reason, string eventId)
    {
        _logger.LogInformation($"Added {points} points to {employeeId}: {reason}");
    }

    public void DeductPointsFromUser(string employeeId, int points, string reason)
    {
        _logger.LogInformation($"Deducted {points} points from {employeeId}: {reason}");
    }

    public void RefundPointsToUser(string employeeId, int points, string reason)
    {
        _logger.LogInformation($"Refunded {points} points to {employeeId}: {reason}");
    }


}
