using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Exceptions;
using Microsoft.Extensions.Logging;

namespace WIN.AGDATA.WIN.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWork _uow;
        private readonly ILogger<UserService> _logger;

        public UserService(IUserRepository userRepository, IUnitOfWork uow, ILogger<UserService> logger)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _uow = uow ?? throw new ArgumentNullException(nameof(uow));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<User> CreateUserAsync(string employeeId, string email, string firstName, string lastName)
        {
            try
            {
                var existingUser = await _userRepository.GetByEmployeeIdAsync(employeeId);
                if (existingUser != null) throw new DomainException($"User with employee ID '{employeeId}' already exists");
                var user = new User(employeeId, email, firstName, lastName, "SYSTEM");
                await _userRepository.AddAsync(user);
                await _uow.SaveChangesAsync();
                _logger.LogInformation($"User created: {employeeId}");
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error creating user: {employeeId}");
                throw;
            }
        }

        public async Task<User?> GetUserByIdAsync(Guid userId)
        {
            try
            {
                return await _userRepository.GetByIdAsync(userId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving user: {userId}");
                throw;
            }
        }

        public async Task<User?> GetUserByEmployeeIdAsync(string employeeId)
        {
            try
            {
                return await _userRepository.GetByEmployeeIdAsync(employeeId);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving user by employee ID: {employeeId}");
                throw;
            }
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            try
            {
                var users = await _userRepository.GetAllAsync();
                return users.ToList();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all users");
                throw;
            }
        }

        public async Task UpdateUserInfoAsync(string employeeId, string firstName, string lastName, string email)
        {
            try
            {
                var user = await _userRepository.GetByEmployeeIdAsync(employeeId);
                if (user == null) throw new DomainException($"User not found: {employeeId}");
                user.UpdateUserInfo(firstName, lastName, email, "SYSTEM");
                await _userRepository.UpdateAsync(user);
                await _uow.SaveChangesAsync();
                _logger.LogInformation($"User info updated: {employeeId}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating user info: {employeeId}");
                throw;
            }
        }

        public async Task PromoteToAdminAsync(string employeeId)
        {
            try
            {
                var user = await _userRepository.GetByEmployeeIdAsync(employeeId);
                if (user == null) throw new DomainException($"User not found: {employeeId}");
                user.PromoteToAdmin("SYSTEM");
                await _userRepository.UpdateAsync(user);
                await _uow.SaveChangesAsync();
                _logger.LogInformation($"User promoted to admin: {employeeId}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error promoting user: {employeeId}");
                throw;
            }
        }

        public async Task DemoteToEmployeeAsync(string employeeId)
        {
            try
            {
                var user = await _userRepository.GetByEmployeeIdAsync(employeeId);
                if (user == null) throw new DomainException($"User not found: {employeeId}");
                user.DemoteToEmployee("SYSTEM");
                await _userRepository.UpdateAsync(user);
                await _uow.SaveChangesAsync();
                _logger.LogInformation($"User demoted to employee: {employeeId}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error demoting user: {employeeId}");
                throw;
            }
        }

        public async Task DeactivateUserAsync(string employeeId, string reason)
        {
            try
            {
                var user = await _userRepository.GetByEmployeeIdAsync(employeeId);
                if (user == null) throw new DomainException($"User not found: {employeeId}");
                user.Deactivate(reason, "SYSTEM");
                await _userRepository.UpdateAsync(user);
                await _uow.SaveChangesAsync();
                _logger.LogInformation($"User deactivated: {employeeId}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deactivating user: {employeeId}");
                throw;
            }
        }

        public async Task ActivateUserAsync(string employeeId)
        {
            try
            {
                var user = await _userRepository.GetByEmployeeIdAsync(employeeId);
                if (user == null) throw new DomainException($"User not found: {employeeId}");
                user.Activate("SYSTEM");
                await _userRepository.UpdateAsync(user);
                await _uow.SaveChangesAsync();
                _logger.LogInformation($"User activated: {employeeId}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error activating user: {employeeId}");
                throw;
            }
        }
    }
}
