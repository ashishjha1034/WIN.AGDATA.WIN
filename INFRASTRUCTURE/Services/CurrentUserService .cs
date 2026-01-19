using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.Infrastructure.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor ??
            throw new ArgumentNullException(nameof(httpContextAccessor));
    }

    public Guid GetCurrentUserId()
    {
        try
        {
            var httpContext = _httpContextAccessor.HttpContext;
            
            if (httpContext?.User == null)
                throw new InvalidOperationException("User context not available. Ensure authentication middleware is configured correctly.");

            var userIdClaim = httpContext.User
                .FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrWhiteSpace(userIdClaim))
            {
                // Fallback: check if there's a 'sub' claim (common in some JWT implementations)
                userIdClaim = httpContext.User.FindFirst("sub")?.Value;
                if (string.IsNullOrWhiteSpace(userIdClaim))
                {
                    var availableClaims = httpContext.User.Claims.Select(c => c.Type).Distinct();
                    throw new InvalidOperationException($"User ID claim (NameIdentifier or sub) not found in token. Available claims: {string.Join(", ", availableClaims)}");
                }
            }

            if (!Guid.TryParse(userIdClaim, out var userId))
                throw new InvalidOperationException($"Invalid user ID format in token: '{userIdClaim}'. Expected a valid GUID.");

            return userId;
        }
        catch (InvalidOperationException)
        {
            throw;
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Failed to extract user ID from token: {ex.Message}", ex);
        }
    }

    public string GetCurrentUserEmail()
    {
        var email = _httpContextAccessor.HttpContext?.User
            .FindFirst(ClaimTypes.Email)?.Value;

        return email ?? throw new InvalidOperationException("Email claim not found in token");
    }

    public bool IsInRole(string roleName)
    {
        return _httpContextAccessor.HttpContext?.User.IsInRole(roleName) ?? false;
    }

    public bool IsAdmin()
    {
        return IsInRole("Admin");
    }

    public string GetCurrentUserName()
    {
        return _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.GivenName)?.Value
            ?? "Unknown";
    }
}
