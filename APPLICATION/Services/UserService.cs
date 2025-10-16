using Domain.Entities.Users;
using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.ValueObjects;

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
            var existingUser = _userRepository.GetByEmployeeId(employeeId);
            if (existingUser != null)
                throw new DomainException($"User with Employee ID '{employeeId}' already exists");

            var existingByEmail = _userRepository.GetByEmail(email);
            if (existingByEmail != null)
                throw new DomainException($"User with email '{email}' already exists");

            var user = new User(employeeId, email, firstName, lastName);
            _userRepository.Add(user);

            _logger.LogInformation("User created successfully: {EmployeeId}", employeeId);
            return user;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create user: {EmployeeId}", employeeId);
            throw;
        }
    }

    public User CreateAdmin(string employeeId, string email, string firstName, string lastName, string createdBy)
    {
        try
        {
            var user = new User(employeeId, email, firstName, lastName, UserRole.Admin, createdBy);
            _userRepository.Add(user);

            _logger.LogInformation("Admin user created successfully: {EmployeeId} by {CreatedBy}", employeeId, createdBy);
            return user;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create admin user: {EmployeeId}", employeeId);
            throw;
        }
    }

    public User? GetUserByEmail(string email)
    {
        return _userRepository.GetByEmail(email);
    }

    public User? GetUserByEmployeeId(string employeeId)
    {
        return _userRepository.GetByEmployeeId(employeeId);
    }

    public List<User> GetAllUsers()
    {
        return _userRepository.GetAll();
    }

    public List<User> GetAllAdmins()
    {
        return _userRepository.GetByRole(UserRole.Admin);
    }

    public void UpdateUserEmail(string employeeId, string newEmail, string modifiedBy)
    {
        try
        {
            var user = GetUserOrThrow(employeeId);

            var existingUser = _userRepository.GetByEmail(newEmail);
            if (existingUser != null && existingUser.Identity.EmployeeId != employeeId)
                throw new DomainException($"Email '{newEmail}' is already in use");

            var emailAddress = new EmailAddress(newEmail);
            user.UpdateEmail(emailAddress, modifiedBy);

            _userRepository.Update(user);
            _logger.LogInformation("User email updated: {EmployeeId} to {Email} by {ModifiedBy}", employeeId, newEmail, modifiedBy);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to update user email: {EmployeeId}", employeeId);
            throw;
        }
    }

    public void UpdateUserInfo(string employeeId, string firstName, string lastName, string modifiedBy)
    {
        try
        {
            var user = GetUserOrThrow(employeeId);
            user.UpdateUserInfo(firstName, lastName, modifiedBy);

            _userRepository.Update(user);
            _logger.LogInformation("User info updated: {EmployeeId} by {ModifiedBy}", employeeId, modifiedBy);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to update user info: {EmployeeId}", employeeId);
            throw;
        }
    }

    public void DeactivateUser(string employeeId, string modifiedBy = "SYSTEM")
    {
        try
        {
            var user = GetUserOrThrow(employeeId);
            user.Deactivate(modifiedBy);

            _userRepository.Update(user);
            _logger.LogInformation("User deactivated: {EmployeeId} by {ModifiedBy}", employeeId, modifiedBy);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to deactivate user: {EmployeeId}", employeeId);
            throw;
        }
    }

    public void ReactivateUser(string employeeId, string modifiedBy = "SYSTEM")
    {
        try
        {
            var user = GetUserOrThrow(employeeId);
            user.Reactivate(modifiedBy);

            _userRepository.Update(user);
            _logger.LogInformation("User reactivated: {EmployeeId} by {ModifiedBy}", employeeId, modifiedBy);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to reactivate user: {EmployeeId}", employeeId);
            throw;
        }
    }

    public void PromoteToAdmin(string employeeId, string modifiedBy)
    {
        try
        {
            var user = GetUserOrThrow(employeeId);
            user.PromoteToAdmin(modifiedBy);

            _userRepository.Update(user);
            _logger.LogInformation("User promoted to admin: {EmployeeId} by {ModifiedBy}", employeeId, modifiedBy);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to promote user to admin: {EmployeeId}", employeeId);
            throw;
        }
    }

    public void DemoteToEmployee(string employeeId, string modifiedBy)
    {
        try
        {
            var user = GetUserOrThrow(employeeId);
            user.DemoteToEmployee(modifiedBy);

            _userRepository.Update(user);
            _logger.LogInformation("User demoted to employee: {EmployeeId} by {ModifiedBy}", employeeId, modifiedBy);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to demote user to employee: {EmployeeId}", employeeId);
            throw;
        }
    }

    private User GetUserOrThrow(string employeeId)
    {
        var user = _userRepository.GetByEmployeeId(employeeId);
        if (user == null)
            throw new DomainException($"User not found: {employeeId}");

        return user;
    }
}
