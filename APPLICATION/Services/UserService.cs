using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using WIN.AGDATA.WIN.Application.Interfaces;

namespace WIN.AGDATA.WIN.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly ILogger<UserService> _logger;

    public UserService(IUserRepository userRepository, ILogger<UserService> logger)
    {
        _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public User CreateUser(string employeeId, string email, string firstName, string lastName)
    {
        try
        {
            // Check if employee already exists
            var existingUser = _userRepository.GetByEmployeeId(employeeId);
            if (existingUser != null)
                throw new DomainException($"User with employee ID '{employeeId}' already exists");

            var user = new User(employeeId, email, firstName, lastName, "SYSTEM");
            _userRepository.Add(user);

            _logger.LogInformation($"User created: {employeeId}");
            return user;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error creating user: {employeeId}");
            throw;
        }
    }

    public User? GetUserById(Guid userId)
    {
        try
        {
            return _userRepository.GetById(userId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error retrieving user: {userId}");
            throw;
        }
    }

    public User? GetUserByEmployeeId(string employeeId)
    {
        try
        {
            return _userRepository.GetByEmployeeId(employeeId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error retrieving user by employee ID: {employeeId}");
            throw;
        }
    }

    public List<User> GetAllUsers()
    {
        try
        {
            return _userRepository.GetAll();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving all users");
            throw;
        }
    }

    public void UpdateUserInfo(string employeeId, string firstName, string lastName, string email)
    {
        try
        {
            var user = _userRepository.GetByEmployeeId(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            // Use the new atomic update method
            user.UpdateUserInfo(firstName, lastName, email, "SYSTEM");
            _userRepository.Update(user);

            _logger.LogInformation($"User info updated: {employeeId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error updating user info: {employeeId}");
            throw;
        }
    }

    public void PromoteToAdmin(string employeeId)
    {
        try
        {
            var user = _userRepository.GetByEmployeeId(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            user.PromoteToAdmin("SYSTEM");
            _userRepository.Update(user);

            _logger.LogInformation($"User promoted to admin: {employeeId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error promoting user: {employeeId}");
            throw;
        }
    }

    public void DemoteToEmployee(string employeeId)
    {
        try
        {
            var user = _userRepository.GetByEmployeeId(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            user.DemoteToEmployee("SYSTEM");
            _userRepository.Update(user);

            _logger.LogInformation($"User demoted to employee: {employeeId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error demoting user: {employeeId}");
            throw;
        }
    }

    public void DeactivateUser(string employeeId, string reason)
    {
        try
        {
            var user = _userRepository.GetByEmployeeId(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            user.Deactivate(reason, "SYSTEM");
            _userRepository.Update(user);

            _logger.LogInformation($"User deactivated: {employeeId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error deactivating user: {employeeId}");
            throw;
        }
    }

    public void ActivateUser(string employeeId)
    {
        try
        {
            var user = _userRepository.GetByEmployeeId(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            user.Activate("SYSTEM");
            _userRepository.Update(user);

            _logger.LogInformation($"User activated: {employeeId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error activating user: {employeeId}");
            throw;
        }
    }
}
    