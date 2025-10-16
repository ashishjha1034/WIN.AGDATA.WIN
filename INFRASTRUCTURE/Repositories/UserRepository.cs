using Domain.Entities.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<UserRepository> _logger;

    public UserRepository(ApplicationDbContext context, ILogger<UserRepository> logger)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public void Add(User user)
    {
        try
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            _logger.LogInformation("User added successfully: {EmployeeId}", user.Identity.EmployeeId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to add user: {EmployeeId}", user.Identity.EmployeeId);
            throw;
        }
    }

    public void Update(User user)
    {
        try
        {
            _context.Users.Update(user);
            _context.SaveChanges();
            _logger.LogInformation("User updated successfully: {EmployeeId}", user.Identity.EmployeeId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to update user: {EmployeeId}", user.Identity.EmployeeId);
            throw;
        }
    }

    public void Delete(string employeeId)
    {
        try
        {
            var user = GetByEmployeeId(employeeId);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
                _logger.LogInformation("User deleted successfully: {EmployeeId}", employeeId);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to delete user: {EmployeeId}", employeeId);
            throw;
        }
    }

    public User? GetByEmployeeId(string employeeId)
    {
        return _context.Users
            .FirstOrDefault(u => u.Identity.EmployeeId == employeeId.Trim().ToUpper());
    }

    public User? GetByEmail(string email)
    {
        return _context.Users
            .FirstOrDefault(u => u.Identity.Email.Value == email.Trim().ToLower());
    }

    public List<User> GetAll()
    {
        return _context.Users.ToList();
    }

    public List<User> GetByRole(UserRole role)
    {
        return _context.Users
            .Where(u => u.Role == role)
            .ToList();
    }

    public List<User> GetActiveUsers()
    {
        return _context.Users
            .Where(u => u.Status.IsActive)
            .ToList();
    }

    public List<User> GetInactiveUsers()
    {
        return _context.Users
            .Where(u => !u.Status.IsActive)
            .ToList();
    }

    public bool ExistsByEmployeeId(string employeeId)
    {
        return _context.Users
            .Any(u => u.Identity.EmployeeId == employeeId.Trim().ToUpper());
    }

    public bool ExistsByEmail(string email)
    {
        return _context.Users
            .Any(u => u.Identity.Email.Value == email.Trim().ToLower());
    }
}
