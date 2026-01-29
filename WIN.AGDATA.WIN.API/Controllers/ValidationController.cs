using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.API.Controllers;

/// <summary>
/// Controller for validation endpoints - supports debounced uniqueness checks from frontend
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ValidationController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IProductRepository _productRepository;

    public ValidationController(
        IUserRepository userRepository,
        IProductRepository productRepository)
    {
        _userRepository = userRepository;
        _productRepository = productRepository;
    }

    /// <summary>
    /// Check if an email is available (not already in use)
    /// </summary>
    /// <param name="email">Email to check</param>
    /// <param name="excludeUserId">Optional user ID to exclude (for edit scenarios)</param>
    [HttpGet("check-email")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<ValidationResult>> CheckEmail(
        [FromQuery] string email,
        [FromQuery] Guid? excludeUserId = null)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            return Ok(new ValidationResult { IsValid = false, Message = "Email is required" });
        }

        // Check corporate domain
        if (!email.ToLowerInvariant().EndsWith("@agdata.com"))
        {
            return Ok(new ValidationResult { IsValid = false, Message = "Email must end with @agdata.com" });
        }

        var existingUser = await _userRepository.GetByEmailAsync(email.ToLowerInvariant());
        
        if (existingUser == null)
        {
            return Ok(new ValidationResult { IsValid = true, Message = "Available" });
        }

        // If excluding a user (edit scenario), check if the found user is the same
        if (excludeUserId.HasValue && existingUser.Id == excludeUserId.Value)
        {
            return Ok(new ValidationResult { IsValid = true, Message = "Available" });
        }

        return Ok(new ValidationResult { IsValid = false, Message = "This email is already in use" });
    }

    /// <summary>
    /// Check if an employee ID is available (not already in use)
    /// </summary>
    /// <param name="employeeId">Employee ID to check</param>
    /// <param name="excludeUserId">Optional user ID to exclude (for edit scenarios)</param>
    [HttpGet("check-employee-id")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<ValidationResult>> CheckEmployeeId(
        [FromQuery] string employeeId,
        [FromQuery] Guid? excludeUserId = null)
    {
        if (string.IsNullOrWhiteSpace(employeeId))
        {
            return Ok(new ValidationResult { IsValid = false, Message = "Employee ID is required" });
        }

        // Check format (exactly 9 alphanumeric characters)
        if (employeeId.Length != 9 || !System.Text.RegularExpressions.Regex.IsMatch(employeeId, @"^[a-zA-Z0-9]+$"))
        {
            return Ok(new ValidationResult { IsValid = false, Message = "Employee ID must be exactly 9 alphanumeric characters" });
        }

        var existingUser = await _userRepository.GetByEmployeeIdAsync(employeeId);
        
        if (existingUser == null)
        {
            return Ok(new ValidationResult { IsValid = true, Message = "Available" });
        }

        // If excluding a user (edit scenario), check if the found user is the same
        if (excludeUserId.HasValue && existingUser.Id == excludeUserId.Value)
        {
            return Ok(new ValidationResult { IsValid = true, Message = "Available" });
        }

        return Ok(new ValidationResult { IsValid = false, Message = "This Employee ID is already in use" });
    }

    /// <summary>
    /// Check if a category name is available (not already in use, case-insensitive)
    /// </summary>
    /// <param name="name">Category name to check</param>
    [HttpGet("check-category-name")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<ValidationResult>> CheckCategoryName([FromQuery] string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return Ok(new ValidationResult { IsValid = false, Message = "Category name is required" });
        }

        var categories = await _productRepository.GetCategoriesAsync();
        var exists = categories.Any(c => c.Name.Equals(name.Trim(), StringComparison.OrdinalIgnoreCase));
        
        if (!exists)
        {
            return Ok(new ValidationResult { IsValid = true, Message = "Available" });
        }

        return Ok(new ValidationResult { IsValid = false, Message = "This category name is already in use" });
    }
}

/// <summary>
/// Result of a validation check
/// </summary>
public class ValidationResult
{
    public bool IsValid { get; set; }
    public string Message { get; set; } = string.Empty;
}
