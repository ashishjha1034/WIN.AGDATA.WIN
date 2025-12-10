namespace WIN.AGDATA.WIN.API.Extensions;

/// <summary>
/// Extension methods for Minimal APIs
/// </summary>
public static class MinimalApiExtensions
{
    /// <summary>
    /// Add OpenAPI documentation to minimal API endpoint
    /// </summary>
    public static RouteHandlerBuilder WithOpenApi(
        this RouteHandlerBuilder builder,
        string? operationName = null)
    {
        // For ASP.NET 8 without Scalar, this is a no-op but allows compilation
        // In ASP.NET 9+, this would be handled by Swashbuckle
        return builder;
    }
}
