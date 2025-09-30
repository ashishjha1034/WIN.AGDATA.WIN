using Domain.Entities.Users;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using WIN.AGDATA.WIN.Application.Interfaces;

namespace WIN.AGDATA.WIN.API.Controllers
{
    public class UsersController : ApiControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public IActionResult CreateUser([FromBody] CreateUserRequest request)
        {
            try
            {
                var user = _userService.CreateUser(
                    request.EmployeeId,
                    request.Email,
                    request.FirstName,
                    request.LastName
                );

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

        [HttpPut("{employeeId}/email")]
        public IActionResult UpdateUserEmail(string employeeId, [FromBody] UpdateEmailRequest request)
        {
            try
            {
                _userService.UpdateUserEmail(employeeId, request.NewEmail);
                return Ok(new { message = "Email updated successfully" });
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpPost("{employeeId}/deactivate")]
        public IActionResult DeactivateUser(string employeeId)
        {
            try
            {
                _userService.DeactivateUser(employeeId);
                return Ok(new { message = "User deactivated successfully" });
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpPost("{employeeId}/reactivate")]
        public IActionResult ReactivateUser(string employeeId)
        {
            try
            {
                _userService.ReactivateUser(employeeId);
                return Ok(new { message = "User reactivated successfully" });
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }

    // Request/Response DTOs
    public record CreateUserRequest(
        string EmployeeId,
        string Email,
        string FirstName,
        string LastName
    );

    public record UpdateEmailRequest(string NewEmail);

    public record UserResponse(
        string EmployeeId,
        string Email,
        string FirstName,
        string LastName,
        int PointsBalance,
        bool IsActive,
        DateTime CreatedAt
    )
    {
        public UserResponse(User user) : this(
            user.Identity.EmployeeId,
            user.Identity.Email,
            user.Identity.FirstName,
            user.Identity.LastName,
            user.Points.Balance,
            user.Status.IsActive,
            user.Status.CreatedAt
        )
        { }
    }
}