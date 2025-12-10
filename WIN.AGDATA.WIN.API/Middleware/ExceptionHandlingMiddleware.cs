using System.Net;
using System.Text.Json;
using WIN.AGDATA.WIN.API.Models;

namespace WIN.AGDATA.WIN.API.Middleware;

/// <summary>
/// Global exception handling middleware
/// </summary>
public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An unexpected error occurred: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var response = exception switch
        {
            ArgumentNullException => new ErrorResponse
            {
                Message = "Invalid argument",
                Details = exception.Message,
                StatusCode = (int)HttpStatusCode.BadRequest
            },
            InvalidOperationException => new ErrorResponse
            {
                Message = "Operation failed",
                Details = exception.Message,
                StatusCode = (int)HttpStatusCode.BadRequest
            },
            UnauthorizedAccessException => new ErrorResponse
            {
                Message = "Access denied",
                Details = exception.Message,
                StatusCode = (int)HttpStatusCode.Forbidden
            },
            _ => new ErrorResponse
            {
                Message = "An unexpected error occurred",
                Details = exception.Message,
                StatusCode = (int)HttpStatusCode.InternalServerError
            }
        };

        context.Response.StatusCode = response.StatusCode;

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        return context.Response.WriteAsJsonAsync(response, options);
    }
}
