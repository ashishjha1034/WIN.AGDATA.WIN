using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Application;

namespace WIN.AGDATA.WIN.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public abstract class ApiControllerBase : ControllerBase
{
    protected IActionResult HandleException(Exception ex)
    {
        return ex switch
        {
            DomainException domainEx => BadRequest(new ErrorResponse(domainEx.Message, "DOMAIN_ERROR")),
            ArgumentNullException argEx => BadRequest(new ErrorResponse("Invalid input parameter", "VALIDATION_ERROR")),
            UnauthorizedAccessException => Unauthorized(new ErrorResponse("Access denied", "UNAUTHORIZED")),
            _ => StatusCode(500, new ErrorResponse("An unexpected error occurred", "INTERNAL_ERROR"))
        };
    }

    protected IActionResult OkOrNotFound<T>(T? result) where T : class
    {
        return result == null ? NotFound(new ErrorResponse("Resource not found", "NOT_FOUND")) : Ok(result);
    }

    protected IActionResult CreatedResult<T>(string actionName, object routeValues, T result)
    {
        return CreatedAtAction(actionName, routeValues, result);
    }
}

public record ErrorResponse(string Message, string Code, string? Details = null);
