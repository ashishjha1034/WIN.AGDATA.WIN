using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Users;

namespace WIN.AGDATA.WIN.Infrastructure.Services;

public class JwtTokenService : IJwtTokenService
{
	private readonly string _secretKey;
	private readonly string _issuer;
	private readonly string _audience;
	private readonly int _expiryMinutes;
	private readonly JsonWebTokenHandler _tokenHandler;

	public JwtTokenService(IConfiguration configuration)
	{
		_secretKey = configuration["Jwt:SecretKey"]
			?? throw new InvalidOperationException("Jwt:SecretKey not configured");

		_issuer = configuration["Jwt:Issuer"]
			?? throw new InvalidOperationException("Jwt:Issuer not configured");

		_audience = configuration["Jwt:Audience"]
			?? throw new InvalidOperationException("Jwt:Audience not configured");

		if (!int.TryParse(configuration["Jwt:ExpiryMinutes"], out _expiryMinutes))
			_expiryMinutes = 15;

		_tokenHandler = new JsonWebTokenHandler();
	}

	public string GenerateToken(User user)
	{
		ArgumentNullException.ThrowIfNull(user);

		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
		var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

		var claims = new List<Claim>
		{
			new(ClaimTypes.NameIdentifier, user.Id.ToString()),
			new(ClaimTypes.Email, user.Email.Value),
			new(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),
			new("EmployeeId", user.EmployeeId),
			new("pwdChanged", user.MustChangePassword ? "false" : "true")
		};

		if (user.Roles != null)
		{
			foreach (var role in user.Roles)
			{
				claims.Add(new Claim(ClaimTypes.Role, role.Role.Name));
			}
		}

		var tokenDescriptor = new SecurityTokenDescriptor
		{
			Subject = new ClaimsIdentity(claims),
			Issuer = _issuer,
			Audience = _audience,
			Expires = DateTime.UtcNow.AddMinutes(_expiryMinutes),
			SigningCredentials = creds
		};

		var token = _tokenHandler.CreateToken(tokenDescriptor);

		if (string.IsNullOrWhiteSpace(token) || !token.Contains('.'))
			throw new InvalidOperationException("JWT generation failed");

		return token;
	}

	public ClaimsPrincipal? ValidateToken(string token)
	{
		if (string.IsNullOrWhiteSpace(token))
			return null;

		token = token.Trim();
		if (token.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
			token = token["Bearer ".Length..].Trim();

		var validationParams = new TokenValidationParameters
		{
			ValidateIssuerSigningKey = true,
			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey)),
			ValidateIssuer = true,
			ValidIssuer = _issuer,
			ValidateAudience = true,
			ValidAudience = _audience,
			ValidateLifetime = true,
			ClockSkew = TimeSpan.Zero
		};

		var result = _tokenHandler.ValidateToken(token, validationParams);

		return result.IsValid ? result.ClaimsIdentity is not null
			? new ClaimsPrincipal(result.ClaimsIdentity)
			: null
			: null;
	}

	public ClaimsPrincipal? GetPrincipalFromExpiredToken(string token)
	{
		if (string.IsNullOrWhiteSpace(token))
			return null;

		token = token.Trim();
		if (token.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
			token = token["Bearer ".Length..].Trim();

		var validationParams = new TokenValidationParameters
		{
			ValidateIssuerSigningKey = true,
			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey)),
			ValidateIssuer = true,
			ValidIssuer = _issuer,
			ValidateAudience = true,
			ValidAudience = _audience,
			ValidateLifetime = false,
			ClockSkew = TimeSpan.Zero
		};
		
		var result = _tokenHandler.ValidateToken(token, validationParams);

		return result.IsValid && result.ClaimsIdentity != null
			? new ClaimsPrincipal(result.ClaimsIdentity)
			: null;
	}

	public string GenerateRefreshToken()
	{
		var bytes = RandomNumberGenerator.GetBytes(64);
		return Convert.ToBase64String(bytes);
	}
}
