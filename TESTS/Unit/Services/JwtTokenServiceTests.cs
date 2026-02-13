using Microsoft.Extensions.Configuration;
using Moq;
using WIN.AGDATA.WIN.Infrastructure.Services;

namespace WIN.AGDATA.WIN.Tests.Unit.Services;

/// <summary>
/// Unit tests for JwtTokenService covering token generation,
/// validation, and edge cases.
/// </summary>
[Trait("Category", "Unit")]
[Trait("Component", "Services")]
public class JwtTokenServiceTests
{
    private readonly Mock<IConfiguration> _configuration;
    private readonly JwtTokenService _service;

    public JwtTokenServiceTests()
    {
        _configuration = new Mock<IConfiguration>();
        _configuration.Setup(c => c["Jwt:SecretKey"]).Returns("96925b2910b2d1aefc08aa673253d64f");
        _configuration.Setup(c => c["Jwt:Issuer"]).Returns("TestIssuer");
        _configuration.Setup(c => c["Jwt:Audience"]).Returns("TestAudience");
        _configuration.Setup(c => c["Jwt:ExpiryMinutes"]).Returns("60");

        _service = new JwtTokenService(_configuration.Object);
    }

    #region Token Generation Tests

    [Fact]
    public void GenerateToken_WithValidUser_ReturnsJwtToken()
    {
        // Arrange
        var user = CreateTestUser();

        // Act
        var token = _service.GenerateToken(user);

        // Assert
        token.Should().NotBeNullOrWhiteSpace();
        token.Should().Contain(".");
        token.Split('.').Should().HaveCount(3); // JWT has 3 parts
    }

    [Fact]
    public void GenerateToken_NullUser_ThrowsArgumentNullException()
    {
        // Act & Assert
        var act = () => _service.GenerateToken(null!);
        act.Should().Throw<ArgumentNullException>();
    }

    [Fact]
    public void GenerateToken_IncludesRequiredClaims()
    {
        // Arrange
        var user = CreateTestUser();

        // Act
        var token = _service.GenerateToken(user);
        var principal = _service.ValidateToken(token);

        // Assert
        principal.Should().NotBeNull();
        var claims = principal!.Claims.ToList();
        
        claims.Should().Contain(c => c.Type.Contains("nameidentifier"));
        claims.Should().Contain(c => c.Type.Contains("email"));
    }

    [Fact]
    public void GenerateRefreshToken_ReturnsUniqueTokens()
    {
        // Act
        var token1 = _service.GenerateRefreshToken();
        var token2 = _service.GenerateRefreshToken();

        // Assert
        token1.Should().NotBeNullOrWhiteSpace();
        token2.Should().NotBeNullOrWhiteSpace();
        token1.Should().NotBe(token2);
    }

    #endregion

    #region Token Validation Tests

    [Fact]
    public void ValidateToken_WithValidToken_ReturnsPrincipal()
    {
        // Arrange
        var user = CreateTestUser();
        var token = _service.GenerateToken(user);

        // Act
        var principal = _service.ValidateToken(token);

        // Assert
        principal.Should().NotBeNull();
        principal!.Identity.Should().NotBeNull();
        principal.Identity!.IsAuthenticated.Should().BeTrue();
    }

    [Fact]
    public void ValidateToken_WithExpiredToken_ReturnsNull()
    {
        // Arrange - Create service with expired tokens
        var expiredConfig = new Mock<IConfiguration>();
        expiredConfig.Setup(c => c["Jwt:SecretKey"]).Returns("96925b2910b2d1aefc08aa673253d64f");
        expiredConfig.Setup(c => c["Jwt:Issuer"]).Returns("TestIssuer");
        expiredConfig.Setup(c => c["Jwt:Audience"]).Returns("TestAudience");
        expiredConfig.Setup(c => c["Jwt:ExpiryMinutes"]).Returns("-1"); // Expired

        var expiredService = new JwtTokenService(expiredConfig.Object);
        var user = CreateTestUser();
        var token = expiredService.GenerateToken(user);

        // Act
        var principal = _service.ValidateToken(token);

        // Assert - Token is already expired
        principal.Should().BeNull();
    }

    [Fact]
    public void ValidateToken_WithNullToken_ReturnsNull()
    {
        // Act
        var principal = _service.ValidateToken(null!);

        // Assert
        principal.Should().BeNull();
    }

    [Fact]
    public void ValidateToken_WithEmptyToken_ReturnsNull()
    {
        // Act
        var principal = _service.ValidateToken("");

        // Assert
        principal.Should().BeNull();
    }

    [Fact]
    public void ValidateToken_WithMalformedToken_ReturnsNull()
    {
        // Arrange
        var malformedToken = "this.is.not.a.valid.jwt.token";

        // Act
        var principal = _service.ValidateToken(malformedToken);

        // Assert
        principal.Should().BeNull();
    }

    [Fact]
    public void ValidateToken_WithBearerPrefix_StripsPrefixAndValidates()
    {
        // Arrange
        var user = CreateTestUser();
        var token = _service.GenerateToken(user);
        var tokenWithBearer = $"Bearer {token}";

        // Act
        var principal = _service.ValidateToken(tokenWithBearer);

        // Assert
        principal.Should().NotBeNull();
    }

    [Fact]
    public void ValidateToken_WithWrongSigningKey_ReturnsNull()
    {
        // Arrange - Create token with different key
        var otherConfig = new Mock<IConfiguration>();
        otherConfig.Setup(c => c["Jwt:SecretKey"]).Returns("different_secret_key_32characters!");
        otherConfig.Setup(c => c["Jwt:Issuer"]).Returns("TestIssuer");
        otherConfig.Setup(c => c["Jwt:Audience"]).Returns("TestAudience");
        otherConfig.Setup(c => c["Jwt:ExpiryMinutes"]).Returns("60");

        var otherService = new JwtTokenService(otherConfig.Object);
        var user = CreateTestUser();
        var token = otherService.GenerateToken(user);

        // Act - Validate with different service
        var principal = _service.ValidateToken(token);

        // Assert
        principal.Should().BeNull();
    }

    #endregion

    #region GetPrincipalFromExpiredToken Tests

    [Fact]
    public void GetPrincipalFromExpiredToken_WithValidToken_ReturnsPrincipal()
    {
        // Arrange
        var user = CreateTestUser();
        var token = _service.GenerateToken(user);

        // Act
        var principal = _service.GetPrincipalFromExpiredToken(token);

        // Assert
        principal.Should().NotBeNull();
    }

    [Fact]
    public void GetPrincipalFromExpiredToken_WithMalformedToken_ReturnsNull()
    {
        // Act
        var principal = _service.GetPrincipalFromExpiredToken("not.a.valid.token");

        // Assert
        principal.Should().BeNull();
    }

    #endregion

    #region Configuration Tests

    [Fact]
    public void Constructor_WithMissingSecretKey_ThrowsException()
    {
        // Arrange
        var invalidConfig = new Mock<IConfiguration>();
        invalidConfig.Setup(c => c["Jwt:SecretKey"]).Returns((string?)null);
        invalidConfig.Setup(c => c["Jwt:Issuer"]).Returns("TestIssuer");
        invalidConfig.Setup(c => c["Jwt:Audience"]).Returns("TestAudience");

        // Act & Assert
        var act = () => new JwtTokenService(invalidConfig.Object);
        act.Should().Throw<InvalidOperationException>()
            .WithMessage("*SecretKey*");
    }

    [Fact]
    public void Constructor_WithMissingIssuer_ThrowsException()
    {
        // Arrange
        var invalidConfig = new Mock<IConfiguration>();
        invalidConfig.Setup(c => c["Jwt:SecretKey"]).Returns("96925b2910b2d1aefc08aa673253d64f");
        invalidConfig.Setup(c => c["Jwt:Issuer"]).Returns((string?)null);
        invalidConfig.Setup(c => c["Jwt:Audience"]).Returns("TestAudience");

        // Act & Assert
        var act = () => new JwtTokenService(invalidConfig.Object);
        act.Should().Throw<InvalidOperationException>()
            .WithMessage("*Issuer*");
    }

    #endregion

    private static User CreateTestUser()
    {
        var user = new User(
            "TESTUSR01",
            "test.user@agdata.com",
            "Test",
            "User",
            "HashedPassword");
        return user;
    }
}
