using Domain.Entities.Users;
using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Infrastructure.Repositories;

namespace WIN.AGDATA.WIN.Infrastructure.Services;

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

    public void AddPointsToUser(string employeeId, int points, string reason, string eventId)
    {
        try
        {
            var user = GetUserOrThrow(employeeId);

            if (!user.CanParticipateInEvents)
                throw new DomainException($"User {employeeId} cannot participate in events");

            user.Points.Add(points);
            _userRepository.Update(user);

            var transaction = new PointsEarning(employeeId, points, eventId, reason);
            _transactionRepository.Add(transaction);

            _logger.LogInformation("Points added to user {EmployeeId}: {Points} for {Reason}", employeeId, points, reason);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to add points to user {EmployeeId}", employeeId);
            throw;
        }
    }

    public void DeductPointsFromUser(string employeeId, int points, string reason, Guid redemptionId)
    {
        try
        {
            var user = GetUserOrThrow(employeeId);

            if (!user.IsActive)
                throw new DomainException($"User {employeeId} is not active");

            user.Points.Deduct(points);
            _userRepository.Update(user);

            var transaction = new PointsSpending(employeeId, points, redemptionId, reason);
            _transactionRepository.Add(transaction);

            _logger.LogInformation("Points deducted from user {EmployeeId}: {Points} for {Reason}", employeeId, points, reason);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to deduct points from user {EmployeeId}", employeeId);
            throw;
        }
    }

    public bool CanUserRedeem(string employeeId, int requiredPoints)
    {
        var user = _userRepository.GetByEmployeeId(employeeId);
        return user != null && user.IsActive && user.Points.Balance >= requiredPoints;
    }

    public int GetUserPointsBalance(string employeeId)
    {
        var user = _userRepository.GetByEmployeeId(employeeId);
        return user?.Points.Balance ?? 0;
    }

    public List<PointsTransaction> GetUserPointsHistory(string employeeId)
    {
        return _transactionRepository.GetByEmployeeId(employeeId);
    }

    private User GetUserOrThrow(string employeeId)
    {
        var user = _userRepository.GetByEmployeeId(employeeId);
        if (user == null)
            throw new DomainException($"User not found: {employeeId}");

        return user;
    }
}
