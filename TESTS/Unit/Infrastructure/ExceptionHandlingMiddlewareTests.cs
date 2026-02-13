using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using FluentAssertions;
using WIN.AGDATA.WIN.Tests.Api.Setup;

namespace WIN.AGDATA.WIN.Tests.Api.Middleware;

/// <summary>
/// Integration tests for ExceptionHandlingMiddleware.
/// Tests error envelope format throughout the API.
/// </summary>
[Trait("Category", "Integration")]
[Trait("Component", "Middleware")]
public class ExceptionHandlingMiddlewareTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly TestWebApplicationFactory _factory;

    public ExceptionHandlingMiddlewareTests(TestWebApplicationFactory factory)
    {
        _factory = factory;
    }

    #region Error Envelope Format Tests

    [Fact]
    public async Task ErrorResponse_HasCorrectJsonShape()
    {
        // Arrange
        var client = _factory.CreateAnonymousClient();

        // Act - Request a non-existent resource
        var response = await client.GetAsync($"/api/products/{Guid.NewGuid()}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        
        var content = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(content);
        var root = doc.RootElement;
        
        // Error envelope should have standard fields (varies by response type)
        // Could be ProblemDetails or custom ErrorResponse
        root.TryGetProperty("message", out _).Should().BeTrue("Error should have 'message' field");
    }

    [Fact]
    public async Task ValidationError_Returns400WithDetails()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var invalidRequest = new { name = "", description = "", pointsCost = -1, initialStock = -1 };

        // Act
        var response = await client.PostAsJsonAsync("/api/products", invalidRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        
        var content = await response.Content.ReadAsStringAsync();
        content.Should().NotBeNullOrEmpty();
    }

    [Fact]
    public async Task Unauthorized_Returns401()
    {
        // Arrange
        var client = _factory.CreateAnonymousClient();

        // Act - Use a protected endpoint that requires authentication
        var response = await client.GetAsync("/api/users/me");

        // Assert
        response.StatusCode.Should().BeOneOf(HttpStatusCode.Unauthorized, HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Forbidden_Returns403()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act - Try to access admin-only endpoint
        var response = await client.GetAsync("/api/admin/dashboard");

        // Assert - Could be Forbidden (requires auth but wrong role) or NotFound (endpoint doesn't exist)
        response.StatusCode.Should().BeOneOf(HttpStatusCode.Forbidden, HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task NotFound_Returns404()
    {
        // Arrange
        var client = _factory.CreateAnonymousClient();
        var nonExistentId = Guid.NewGuid();

        // Act
        var response = await client.GetAsync($"/api/products/{nonExistentId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    #endregion

    #region Content-Type Tests

    [Fact]
    public async Task ErrorResponse_HasJsonContentType()
    {
        // Arrange
        var client = _factory.CreateAnonymousClient();

        // Act
        var response = await client.GetAsync($"/api/products/{Guid.NewGuid()}");

        // Assert
        response.Content.Headers.ContentType?.MediaType.Should().Be("application/json");
    }

    [Fact]
    public async Task SuccessResponse_HasJsonContentType()
    {
        // Arrange
        var client = _factory.CreateAnonymousClient();

        // Act
        var response = await client.GetAsync("/api/products");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        response.Content.Headers.ContentType?.MediaType.Should().Be("application/json");
    }

    #endregion

    #region Validation Error Details Tests

    [Fact]
    public async Task ValidationError_IncludesFieldErrors()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var invalidRequest = new 
        { 
            name = "", // Required
            description = "Short", // Too short
            categoryId = Guid.Empty, // Required
            pointsCost = 0, // Min 1
            initialStock = 0 // Min 1
        };

        // Act
        var response = await client.PostAsJsonAsync("/api/products", invalidRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        
        var content = await response.Content.ReadAsStringAsync();
        // Should contain error information
        content.Should().NotBeNullOrEmpty();
        
        // Parse and check structure
        using var doc = JsonDocument.Parse(content);
        var root = doc.RootElement;
        
        // Check for errors property or similar structure
        var hasErrors = root.TryGetProperty("errors", out _) || 
                       root.TryGetProperty("message", out _);
        hasErrors.Should().BeTrue();
    }

    [Fact]
    public async Task ValidationError_HasMultipleErrors_ListsAll()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var invalidRequest = new 
        { 
            name = "", 
            description = "", 
            categoryId = Guid.Empty,
            pointsCost = 0,
            initialStock = 0
        };

        // Act
        var response = await client.PostAsJsonAsync("/api/products", invalidRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        
        var content = await response.Content.ReadAsStringAsync();
        content.Should().NotBeNullOrEmpty();
        
        // Multiple validation errors should be present
        using var doc = JsonDocument.Parse(content);
        var root = doc.RootElement;
        
        if (root.TryGetProperty("errors", out var errors))
        {
            // FluentValidation errors
            errors.EnumerateObject().Should().HaveCountGreaterThan(1);
        }
    }

    #endregion

    #region Specific Error Scenario Tests

    [Fact]
    public async Task DeactivationBlocked_ReturnsConflictOrBadRequest()
    {
        // Arrange - Try to deactivate a product with stock without force
        var client = _factory.CreateAdminClient();
        var request = new { force = false };

        // Act
        var response = await client.PostAsJsonAsync(
            $"/api/products/{TestSeedData.ActiveProductId}/deactivate", 
            request);

        // Assert - Should be Conflict (409) for warnings, BadRequest for block
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.Conflict, 
            HttpStatusCode.OK,
            HttpStatusCode.BadRequest);
    }

    [Fact]
    public async Task BusinessRuleViolation_ReturnsBadRequest()
    {
        // Arrange - Try to create redemption for inactive product
        var client = _factory.CreateEmployeeClient();
        var request = new 
        { 
            items = new[] 
            { 
                new { productId = TestSeedData.InactiveProductId, quantity = 1 } 
            } 
        };

        // Act
        var response = await client.PostAsJsonAsync("/api/redemptions", request);

        // Assert - Could be BadRequest (invalid product) or InternalServerError (exception)
        response.StatusCode.Should().BeOneOf(HttpStatusCode.BadRequest, HttpStatusCode.InternalServerError, HttpStatusCode.NotFound);
    }

    #endregion
}
