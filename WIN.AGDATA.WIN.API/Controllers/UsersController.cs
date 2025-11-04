using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.Application.Interfaces;

namespace WIN.AGDATA.WIN.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILogger<UsersController> _logger;

    public UsersController(IUserService userService, ILogger<UsersController> logger)
    {
        _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [HttpPost]
    public IActionResult CreateUser([FromBody] CreateUserRequest request)
    {
        try
        {
            var user = _userService.CreateUser(request.EmployeeId, request.Email, request.FirstName, request.LastName);
            return Created($"api/users/{user.Id}", user);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating user");
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public IActionResult GetUserById(Guid id)
    {
        try
        {
            var user = _userService.GetUserById(id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user");
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("employee/{employeeId}")]
    public IActionResult GetUserByEmployeeId(string employeeId)
    {
        try
        {
            var user = _userService.GetUserByEmployeeId(employeeId);
            if (user == null)
                return NotFound();
            return Ok(user);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user");
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public IActionResult GetAllUsers()
    {
        try
        {
            var users = _userService.GetAllUsers();
            return Ok(users);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting users");
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{employeeId}/info")]
    public IActionResult UpdateUserInfo(string employeeId, [FromBody] UpdateUserInfoRequest request)
    {
        try
        {
            _userService.UpdateUserInfo(employeeId, request.FirstName, request.LastName, request.Email);
            return Ok("User info updated");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating user info");
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{employeeId}/promote")]
    public IActionResult PromoteToAdmin(string employeeId)
    {
        try
        {
            _userService.PromoteToAdmin(employeeId);
            return Ok("User promoted to admin");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error promoting user");
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{employeeId}/demote")]
    public IActionResult DemoteToEmployee(string employeeId)
    {
        try
        {
            _userService.DemoteToEmployee(employeeId);
            return Ok("User demoted to employee");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error demoting user");
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{employeeId}/deactivate")]
    public IActionResult DeactivateUser(string employeeId, [FromBody] DeactivateUserRequest request)
    {
        try
        {
            _userService.DeactivateUser(employeeId, request.Reason);
            return Ok("User deactivated");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deactivating user");
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{employeeId}/activate")]
    public IActionResult ActivateUser(string employeeId)
    {
        try
        {
            _userService.ActivateUser(employeeId);
            return Ok("User activated");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error activating user");
            return BadRequest(ex.Message);
        }
    }
}

public class CreateUserRequest
{
    public string EmployeeId { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
}

public class UpdateUserInfoRequest
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
}

public class DeactivateUserRequest
{
    public string Reason { get; set; }
}
