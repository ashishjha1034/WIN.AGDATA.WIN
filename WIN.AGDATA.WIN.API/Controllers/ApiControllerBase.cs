using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class ApiControllerBase : ControllerBase
    {
        protected IActionResult OkOrNotFound<T>(T? result)
        {
            return result == null ? NotFound() : Ok(result);
        }

        protected IActionResult HandleException(Exception ex)
        {
            return ex is DomainException domainEx
                ? BadRequest(new { error = domainEx.Message })
                : StatusCode(500, new { error = "An internal server error occurred" });
        }
    }
}