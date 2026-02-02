using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.APPLICATION.Validators;

namespace WIN.AGDATA.WIN.API.Controllers;

/// <summary>
/// Controller for validation endpoints - supports debounced uniqueness checks from frontend
/// All endpoints are Admin-only and rate-limited to prevent enumeration attacks
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize(Policy = "AdminOnly")]
[EnableRateLimiting("ValidationRateLimit")]
public class ValidationController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IProductRepository _productRepository;
    private readonly IEventRepository _eventRepository;

    /// <summary>
    /// Initializes a new instance of the ValidationController
    /// </summary>
    /// <param name="userRepository">User repository for email and employee ID checks</param>
    /// <param name="productRepository">Product repository for product and category name checks</param>
    /// <param name="eventRepository">Event repository for event name checks</param>
    public ValidationController(
        IUserRepository userRepository,
        IProductRepository productRepository,
        IEventRepository eventRepository)
    {
        _userRepository = userRepository;
        _productRepository = productRepository;
        _eventRepository = eventRepository;
    }

    /// <summary>
    /// Check if an email is available (not already in use)
    /// </summary>
    /// <param name="email">Email to check</param>
    /// <param name="excludeUserId">Optional user ID to exclude (for edit scenarios)</param>
    [HttpGet("check-email")]
    public async Task<ActionResult<ValidationResult>> CheckEmail(
        [FromQuery] string email,
        [FromQuery] Guid? excludeUserId = null)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            return Ok(new ValidationResult { IsValid = false, Message = "Email is required" });
        }

        // Validate corporate email format (domain + local-part length)
        if (!SharedValidationRules.IsValidCorporateEmail(email))
        {
            return Ok(new ValidationResult { IsValid = false, Message = SharedValidationRules.GetCorporateEmailErrorMessage() });
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
    public async Task<ActionResult<ValidationResult>> CheckEmployeeId(
        [FromQuery] string employeeId,
        [FromQuery] Guid? excludeUserId = null)
    {
        if (string.IsNullOrWhiteSpace(employeeId))
        {
            return Ok(new ValidationResult { IsValid = false, Message = "Employee ID is required" });
        }

        // Check format using shared rules
        if (!SharedValidationRules.IsValidEmployeeId(employeeId))
        {
            return Ok(new ValidationResult { IsValid = false, Message = $"Employee ID must be exactly {SharedValidationRules.EmployeeIdLength} alphanumeric characters" });
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

    /// <summary>
    /// Check if a product name is available (not already in use, case-insensitive)
    /// </summary>
    /// <param name="name">Product name to check</param>
    /// <param name="excludeProductId">Optional product ID to exclude (for edit scenarios)</param>
    [HttpGet("check-product-name")]
    public async Task<ActionResult<ValidationResult>> CheckProductName(
        [FromQuery] string name,
        [FromQuery] Guid? excludeProductId = null)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return Ok(new ValidationResult { IsValid = false, Message = "Product name is required" });
        }

        // Check format using shared rules
        if (!SharedValidationRules.IsValidProductName(name))
        {
            return Ok(new ValidationResult { IsValid = false, Message = $"Product name must contain 1-{SharedValidationRules.ProductNameMaxWords} words, each word alphanumeric only" });
        }

        var products = await _productRepository.GetAllWithDetailsAsync();
        var existingProduct = products.FirstOrDefault(p => p.Name.Equals(name.Trim(), StringComparison.OrdinalIgnoreCase));
        
        if (existingProduct == null)
        {
            return Ok(new ValidationResult { IsValid = true, Message = "Available" });
        }

        // If excluding a product (edit scenario), check if the found product is the same
        if (excludeProductId.HasValue && existingProduct.Id == excludeProductId.Value)
        {
            return Ok(new ValidationResult { IsValid = true, Message = "Available" });
        }

        return Ok(new ValidationResult { IsValid = false, Message = "This product name is already in use" });
    }

    /// <summary>
    /// Check if an event name is available (not already in use, case-insensitive)
    /// Also validates event name format (alphanumeric words, single spaces, word limits)
    /// </summary>
    /// <param name="name">Event name to check</param>
    /// <param name="excludeEventId">Optional event ID to exclude (for edit scenarios)</param>
    [HttpGet("check-event-name")]
    public async Task<ActionResult<ValidationResult>> CheckEventName(
        [FromQuery] string name,
        [FromQuery] Guid? excludeEventId = null)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return Ok(new ValidationResult { IsValid = false, Message = "Event name is required" });
        }

        // Validate format using shared rules
        var (isValidFormat, formatError) = SharedValidationRules.ValidateEventName(name);
        if (!isValidFormat)
        {
            return Ok(new ValidationResult { IsValid = false, Message = formatError! });
        }

        // Check uniqueness
        var exists = await _eventRepository.ExistsByNameAsync(name, excludeEventId);
        
        if (!exists)
        {
            return Ok(new ValidationResult { IsValid = true, Message = "Available" });
        }

        return Ok(new ValidationResult { IsValid = false, Message = "This event name is already in use" });
    }
}

/// <summary>
/// Result of a validation check
/// </summary>
public class ValidationResult
{
    /// <summary>Whether the validation passed</summary>
    public bool IsValid { get; set; }
    /// <summary>Message describing the result</summary>
    public string Message { get; set; } = string.Empty;
}
