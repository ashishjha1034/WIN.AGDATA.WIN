using System.Security.Claims;
using WIN.AGDATA.WIN.Domain.Entities.Users;

namespace WIN.AGDATA.WIN.APPLICATION.Interfaces;

public interface IJwtTokenService
{
    string GenerateToken(User user);
    string GenerateRefreshToken();
    ClaimsPrincipal? ValidateToken(string token);
    ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);
}
