using Domain.Entities.Users;
using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Enums;

namespace WIN.AGDATA.WIN.API.Controllers;

public class UsersController : ApiControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService ?? throw new ArgumentNullException(nameof(userService));
    }

    [HttpPost]
    public IActionResult CreateUser([FromBody] CreateUserRequest request)
    {
        try
        {
            var user = _userService.CreateUser(request.EmployeeId, request.Email, request.FirstName, request.LastName);
            return CreatedAtAction(nameof(GetUserByEmployeeId),
                new { employeeId = user.Identity.EmployeeId },
                new UserResponse(user));
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPost("admin")]
    public IActionResult CreateAdmin([FromBody] CreateAdminRequest request)
    {
        try
        {
            var user = _userService.CreateAdmin(request.EmployeeId, request.Email, request.FirstName, request.LastName, request.CreatedBy);
            return CreatedAtAction(nameof(GetUserByEmployeeId),
                new { employeeId = user.Identity.EmployeeId },
                new UserResponse(user));
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet("{employeeId}")]
    public IActionResult GetUserByEmployeeId(string employeeId)
    {
        try
        {
            var user = _userService.GetUserByEmployeeId(employeeId);
            return OkOrNotFound(user == null ? null : new UserResponse(user));
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet("email/{email}")]
    public IActionResult GetUserByEmail(string email)
    {
        try
        {
            var user = _userService.GetUserByEmail(email);
            return OkOrNotFound(user == null ? null : new UserResponse(user));
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet]
    public IActionResult GetAllUsers()
    {
        try
        {
            var users = _userService.GetAllUsers();
            var response = users.Select(u => new UserResponse(u));
            return Ok(response);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet("admins")]
    public IActionResult GetAllAdmins()
    {
        try
        {
            var admins = _userService.GetAllAdmins();
            var response = admins.Select(u => new UserResponse(u));
            return Ok(response);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPut("{employeeId}/email")]
    public IActionResult UpdateUserEmail(string employeeId, [FromBody] UpdateEmailRequest request)
    {
        try
        {
            _userService.UpdateUserEmail(employeeId, request.NewEmail, request.ModifiedBy);
            return Ok(new { message = "Email updated successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPut("{employeeId}/info")]
    public IActionResult UpdateUserInfo(string employeeId, [FromBody] UpdateUserInfoRequest request)
    {
        try
        {
            _userService.UpdateUserInfo(employeeId, request.FirstName, request.LastName, request.ModifiedBy);
            return Ok(new { message = "User information updated successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPost("{employeeId}/deactivate")]
    public IActionResult DeactivateUser(string employeeId, [FromBody] ModificationRequest? request = null)
    {
        try
        {
            _userService.DeactivateUser(employeeId, request?.ModifiedBy ?? "SYSTEM");
            return Ok(new { message = "User deactivated successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPost("{employeeId}/reactivate")]
    public IActionResult ReactivateUser(string employeeId, [FromBody] ModificationRequest? request = null)
    {
        try
        {
            _userService.ReactivateUser(employeeId, request?.ModifiedBy ?? "SYSTEM");
            return Ok(new { message = "User reactivated successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPost("{employeeId}/promote")]
    public IActionResult PromoteToAdmin(string employeeId, [FromBody] ModificationRequest request)
    {
        try
        {
            _userService.PromoteToAdmin(employeeId, request.ModifiedBy);
            return Ok(new { message = "User promoted to admin successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPost("{employeeId}/demote")]
    public IActionResult DemoteToEmployee(string employeeId, [FromBody] ModificationRequest request)
    {
        try
        {
            _userService.DemoteToEmployee(employeeId, request.ModifiedBy);
            return Ok(new { message = "User demoted to employee successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }
}

public record CreateUserRequest(string EmployeeId, string Email, string FirstName, string LastName);
public record CreateAdminRequest(string EmployeeId, string Email, string FirstName, string LastName, string CreatedBy);
public record UpdateEmailRequest(string NewEmail, string ModifiedBy);
public record UpdateUserInfoRequest(string FirstName, string LastName, string ModifiedBy);
public record ModificationRequest(string ModifiedBy);

public record UserResponse(
    string EmployeeId,
    string Email,
    string FirstName,
    string LastName,
    string FullName,
    UserRole Role,
    bool IsAdmin,
    int PointsBalance,
    bool IsActive,
    DateTime CreatedAt,
    string CreatedBy,
    DateTime? LastModifiedAt,
    string? LastModifiedBy)
{
    public UserResponse(User user) : this(
        user.Identity.EmployeeId,
        user.Identity.Email.Value,
        user.Identity.FirstName,
        user.Identity.LastName,
        user.Identity.FullName,
        user.Role,
        user.IsAdmin,
        user.Points.Balance,
        user.Status.IsActive,
        user.CreatedAt,
        user.CreatedBy,
        user.LastModifiedAt,
        user.LastModifiedBy)
    { }
}
