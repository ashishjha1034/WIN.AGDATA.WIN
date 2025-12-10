namespace WIN.AGDATA.WIN.API.Models;

/// <summary>
/// Standardized error response model
/// </summary>
public class ErrorResponse
{
    /// <summary>
    /// Error message
    /// </summary>
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Detailed error information
    /// </summary>
    public string? Details { get; set; }

    /// <summary>
    /// Validation errors by field
    /// </summary>
    public Dictionary<string, string[]>? Errors { get; set; }

    /// <summary>
    /// HTTP status code
    /// </summary>
    public int StatusCode { get; set; }

    /// <summary>
    /// Timestamp of error
    /// </summary>
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Create error response from exception
    /// </summary>
    public static ErrorResponse FromException(Exception ex, int statusCode = 500)
    {
        return new ErrorResponse
        {
            Message = ex.Message,
            Details = ex.InnerException?.Message,
            StatusCode = statusCode,
            Timestamp = DateTime.UtcNow
        };
    }

    /// <summary>
    /// Create error response from validation errors
    /// </summary>
    public static ErrorResponse FromValidationErrors(Dictionary<string, string[]> errors)
    {
        return new ErrorResponse
        {
            Message = "Validation failed",
            Errors = errors,
            StatusCode = 400,
            Timestamp = DateTime.UtcNow
        };
    }
}
