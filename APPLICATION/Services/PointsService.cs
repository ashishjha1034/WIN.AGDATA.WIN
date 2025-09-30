using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN_AGDATA_WIN.Application.Interfaces;

namespace WIN.AGDATA.WIN.Application.Services
{
    public class PointsService : IPointsService
    {
        private readonly List<PointsTransaction> _transactions = new();
        private readonly IUserService _userService;
        private readonly object _lock = new object();

        public PointsService(IUserService userService)
        {
            _userService = userService;
        }

        public void AllocatePoints(string employeeId, int points, string eventId, string description) // Changed Guid to string
        {
            lock (_lock)
            {
                var user = _userService.GetUserByEmployeeId(employeeId)
                    ?? throw new DomainException($"User with Employee ID {employeeId} not found");

                if (!user.Status.IsActive)
                    throw new DomainException($"Cannot allocate points to inactive user: {employeeId}");

                var transaction = new PointsEarning(employeeId, points, eventId, description); // This also needs update
                _transactions.Add(transaction);

                user.Points.Add(points);
            }
        }

        public void SpendPoints(string employeeId, int points, Guid redemptionId, string description)
        {
            lock (_lock)
            {
                var user = _userService.GetUserByEmployeeId(employeeId)
                    ?? throw new DomainException($"User with Employee ID {employeeId} not found");

                if (!user.Status.IsActive)
                    throw new DomainException($"Cannot spend points for inactive user: {employeeId}");

                var transaction = new PointsSpending(employeeId, points, redemptionId, description);
                _transactions.Add(transaction);

                user.Points.Deduct(points);
            }
        }

        public List<PointsTransaction> GetUserTransactionHistory(string employeeId)
        {
            lock (_lock)
                return _transactions
                    .Where(t => string.Equals(t.EmployeeId, employeeId, StringComparison.OrdinalIgnoreCase))
                    .OrderByDescending(t => t.TransactionDate)
                    .ToList();
        }

        public int GetUserPointsBalance(string employeeId)
        {
            var user = _userService.GetUserByEmployeeId(employeeId)
                ?? throw new DomainException($"User with Employee ID {employeeId} not found");

            return user.Points.Balance;
        }
    }
}