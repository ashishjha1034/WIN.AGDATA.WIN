using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using WIN.AGDATA.WIN.API.Validation;

namespace WIN.AGDATA.WIN.API.Filters;

public class ModelValidationActionFilter : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.ModelState.IsValid)
        {
            var errors = context.ModelState
                .Where(ms => ms.Value?.Errors.Count > 0)
                .ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value!.Errors.Select(e => e.ErrorMessage).ToArray()
                );

            var response = new ValidationErrorResponse
            {
                Message = "Model validation failed",
                Code = "VALIDATION_ERROR",
                Errors = errors
            };

            context.Result = new BadRequestObjectResult(response);
        }
    }
}
