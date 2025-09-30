using Domain.Entities.Users;
using System.Xml.Linq;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Application.Services
{
    public class UserService : IUserService
    {
        private readonly List<User> _users = new();
        private readonly object _lock = new object();

        public User CreateUser(string employeeId, string email, string firstName, string lastName)
        {
            lock (_lock)
            {
                ValidateUserDoesNotExist(employeeId, email);

                var user = new User(employeeId, email, firstName, lastName);
                _users.Add(user);
                return user;
            }
        }

        public User? GetUserByEmail(string email)
        {
            lock (_lock)
                return _users.FirstOrDefault(u =>
                    string.Equals(u.Identity.Email, email, StringComparison.OrdinalIgnoreCase));
        }

        public User? GetUserByEmployeeId(string employeeId)
        {
            lock (_lock)
                return _users.FirstOrDefault(u =>
                    string.Equals(u.Identity.EmployeeId, employeeId, StringComparison.OrdinalIgnoreCase));
        }

        public List<User> GetAllUsers()
        {
            lock (_lock)
                return _users.ToList();
        }

        public void UpdateUserEmail(string employeeId, string newEmail)
        {
            lock (_lock)
            {
                var user = GetUserByEmployeeId(employeeId)
                    ?? throw new DomainException($"User with Employee ID {employeeId} not found");

                if (_users.Any(u => u != user &&
                    string.Equals(u.Identity.Email, newEmail, StringComparison.OrdinalIgnoreCase)))
                    throw new DomainException($"Email {newEmail} is already in use");

                user.UpdateEmail(newEmail);
            }
        }

        public void DeactivateUser(string employeeId)
        {
            lock (_lock)
            {
                var user = GetUserByEmployeeId(employeeId)
                    ?? throw new DomainException($"User with Employee ID {employeeId} not found");
                user.Deactivate();
            }
        }

        public void ReactivateUser(string employeeId)
        {
            lock (_lock)
            {
                var user = GetUserByEmployeeId(employeeId)
                    ?? throw new DomainException($"User with Employee ID {employeeId} not found");
                user.Reactivate();
            }
        }

        private void ValidateUserDoesNotExist(string employeeId, string email)
        {
            if (_users.Any(u =>
                string.Equals(u.Identity.EmployeeId, employeeId, StringComparison.OrdinalIgnoreCase)))
                throw new DomainException($"User with Employee ID {employeeId} already exists");

            if (_users.Any(u =>
                string.Equals(u.Identity.Email, email, StringComparison.OrdinalIgnoreCase)))
                throw new DomainException($"User with email {email} already exists");
        }
    }
}