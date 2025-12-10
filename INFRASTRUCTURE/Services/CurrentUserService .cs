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
        var userIdClaim = _httpContextAccessor.HttpContext?.User
            .FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrWhiteSpace(userIdClaim))
            throw new InvalidOperationException("User ID claim not found in token");

        if (!Guid.TryParse(userIdClaim, out var userId))
            throw new InvalidOperationException("Invalid user ID format in token");

        return userId;
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
