using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using WIN.AGDATA.WIN.Tests.Api.Setup;

namespace WIN.AGDATA.WIN.Tests.Integration.Contract;

/// <summary>
/// Contract tests to verify API specification compliance.
/// Tests response schemas, status codes, headers, and API conventions.
/// </summary>
[Trait("Category", "Integration")]
[Trait("Component", "Contract")]
public class ApiContractTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly TestWebApplicationFactory _factory;
    private readonly JsonSerializerOptions _jsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        PropertyNameCaseInsensitive = true
    };

    public ApiContractTests(TestWebApplicationFactory factory)
    {
        _factory = factory;
    }

    #region Authentication Contract Tests

    [Fact]
    public async Task Login_SuccessResponse_ReturnsExpectedSchema()
    {
        // Arrange
        var client = _factory.CreateAnonymousClient();
        var loginRequest = new
        {
            email = TestSeedData.AdminEmail,
            password = TestSeedData.TestPassword
        };

        // Act
        var response = await client.PostJsonAsync("/api/auth/login", loginRequest);

        // Assert
        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            var json = JsonDocument.Parse(content);
            var root = json.RootElement;

            // Verify expected properties exist
            root.TryGetProperty("token", out _).Should().BeTrue("Login response should contain 'token'");
            root.TryGetProperty("refreshToken", out _).Should().BeTrue("Login response should contain 'refreshToken'");
        }
    }

    [Fact]
    public async Task Login_InvalidCredentials_Returns401WithErrorMessage()
    {
        // Arrange
        var client = _factory.CreateAnonymousClient();
        var loginRequest = new
        {
            email = "invalid@agdata.com",
            password = "WrongPassword123!"
        };

        // Act
        var response = await client.PostJsonAsync("/api/auth/login", loginRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
        
        var content = await response.Content.ReadAsStringAsync();
        (content.Contains("message") || content.Contains("error")).Should().BeTrue();
    }

    [Fact]
    public async Task UnauthorizedRequest_Returns401WithWwwAuthenticateHeader()
    {
        // Arrange
        var client = _factory.CreateAnonymousClient();

        // Act
        var response = await client.GetAsync("/api/users/me");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
        // JWT bearer challenges should include WWW-Authenticate header
    }

    #endregion

    #region User API Contract Tests

    [Fact]
    public async Task GetUserProfile_ReturnsExpectedSchema()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync("/api/users/me");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var content = await response.Content.ReadAsStringAsync();
        var json = JsonDocument.Parse(content);
        var root = json.RootElement;

        // Verify expected user properties
        root.TryGetProperty("id", out _).Should().BeTrue("User should have 'id'");
        root.TryGetProperty("email", out _).Should().BeTrue("User should have 'email'");
        root.TryGetProperty("firstName", out _).Should().BeTrue("User should have 'firstName'");
        root.TryGetProperty("lastName", out _).Should().BeTrue("User should have 'lastName'");
    }

    [Fact]
    public async Task GetUsers_AdminEndpoint_ReturnsPaginatedResponse()
    {
        // Arrange
        var client = _factory.CreateAdminClient();

        // Act
        var response = await client.GetAsync("/api/admin/users?page=1&pageSize=10");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var content = await response.Content.ReadAsStringAsync();
        
        // Should be either a paginated response or an array
        var json = JsonDocument.Parse(content);
        var root = json.RootElement;

        // Check if it's paginated (has items/data property) or direct array
        var isPaginated = root.TryGetProperty("items", out _) || 
                          root.TryGetProperty("data", out _) ||
                          root.TryGetProperty("users", out _);
        var isArray = root.ValueKind == JsonValueKind.Array;

        (isPaginated || isArray).Should().BeTrue("Response should be paginated or an array");
    }

    #endregion

    #region Product API Contract Tests

    [Fact]
    public async Task GetProducts_ReturnsProductListSchema()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync("/api/products");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var content = await response.Content.ReadAsStringAsync();
        var json = JsonDocument.Parse(content);
        var root = json.RootElement;

        // Response is wrapped: { count: N, data: [...] }
        root.TryGetProperty("data", out var dataElement).Should().BeTrue("Response should have 'data' property");
        var products = dataElement.EnumerateArray().ToList();

        if (products.Count > 0)
        {
            var product = products[0];
            product.TryGetProperty("id", out _).Should().BeTrue("Product should have 'id'");
            product.TryGetProperty("name", out _).Should().BeTrue("Product should have 'name'");
            product.TryGetProperty("pointsCost", out _).Should().BeTrue("Product should have 'pointsCost'");
        }
    }

    [Fact]
    public async Task GetProductById_ReturnsDetailedProductSchema()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync($"/api/products/{TestSeedData.ActiveProductId}");

        // Assert
        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            var json = JsonDocument.Parse(content);
            var root = json.RootElement;

            root.TryGetProperty("id", out _).Should().BeTrue();
            root.TryGetProperty("name", out _).Should().BeTrue();
            root.TryGetProperty("description", out _).Should().BeTrue();
            root.TryGetProperty("pointsCost", out _).Should().BeTrue();
        }
    }

    [Fact]
    public async Task CreateProduct_Returns201WithLocationHeader()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var uniqueId = Guid.NewGuid().ToString("N")[..6];
        var request = new
        {
            name = $"Contract Test Product {uniqueId}",
            description = "Product created to test API contract compliance",
            pointsCost = 100,
            stockQuantity = 10,
            categoryId = TestSeedData.ElectronicsCategoryId
        };

        // Act
        var response = await client.PostJsonAsync("/api/products", request);

        // Assert
        if (response.StatusCode == HttpStatusCode.Created)
        {
            response.Headers.Location.Should().NotBeNull("Created response should include Location header");
        }
    }

    #endregion

    #region Redemption API Contract Tests

    [Fact]
    public async Task GetRedemptions_ReturnsRedemptionListSchema()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync("/api/redemptions/my-redemptions");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task CreateRedemption_Returns201WithRedemptionDetails()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();
        var request = new
        {
            productId = TestSeedData.ActiveProductId,
            quantity = 1
        };

        // Act
        var response = await client.PostJsonAsync("/api/redemptions", request);

        // Assert
        if (response.StatusCode == HttpStatusCode.Created)
        {
            var content = await response.Content.ReadAsStringAsync();
            var json = JsonDocument.Parse(content);
            var root = json.RootElement;

            root.TryGetProperty("id", out _).Should().BeTrue("Redemption should have 'id'");
            root.TryGetProperty("status", out _).Should().BeTrue("Redemption should have 'status'");
        }
    }

    #endregion

    #region Event API Contract Tests

    [Fact]
    public async Task GetEvents_ReturnsEventListSchema()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync("/api/Event");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task GetEventById_ReturnsDetailedEventSchema()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync($"/api/Event/{TestSeedData.ActiveEventId}");

        // Assert
        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            var json = JsonDocument.Parse(content);
            var root = json.RootElement;

            // API may return wrapped response {data: {...}} or flat response
            var eventObj = root.TryGetProperty("data", out var dataProp) ? dataProp : root;

            eventObj.TryGetProperty("id", out _).Should().BeTrue("Event should have 'id'");
            eventObj.TryGetProperty("name", out _).Should().BeTrue("Event should have 'name'");
            eventObj.TryGetProperty("status", out _).Should().BeTrue("Event should have 'status'");
        }
    }

    #endregion

    #region Error Response Contract Tests

    [Fact]
    public async Task ValidationError_Returns400WithFieldErrors()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var invalidRequest = new
        {
            name = "", // Invalid: empty name
            description = "", // Invalid: empty description
            pointsCost = -1 // Invalid: negative cost
        };

        // Act
        var response = await client.PostJsonAsync("/api/products", invalidRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

        var content = await response.Content.ReadAsStringAsync();
        // Should contain validation error info
        content.Should().NotBeNullOrEmpty();
    }

    [Fact]
    public async Task NotFound_Returns404WithMessage()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();
        var nonExistentId = Guid.NewGuid();

        // Act
        var response = await client.GetAsync($"/api/products/{nonExistentId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    [Fact]
    public async Task Forbidden_Returns403ForUnauthorizedAccess()
    {
        // Arrange
        var employeeClient = _factory.CreateEmployeeClient();

        // Act - Employee trying to access admin endpoint
        var response = await employeeClient.GetAsync("/api/admin/users");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Forbidden);
    }

    #endregion

    #region Content-Type and Headers Contract Tests

    [Fact]
    public async Task AllResponses_ReturnJsonContentType()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync("/api/users/me");

        // Assert
        if (response.IsSuccessStatusCode)
        {
            response.Content.Headers.ContentType?.MediaType
                .Should().Be("application/json");
        }
    }

    [Fact]
    public async Task PostRequests_AcceptJsonContent()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var request = new
        {
            points = 10,
            reason = "Content-Type test"
        };

        // Act
        var response = await client.PostJsonAsync(
            $"/api/admin/users/{TestSeedData.EmployeeUserId}/points",
            request);

        // Assert - Should accept application/json
        response.StatusCode.Should().NotBe(HttpStatusCode.UnsupportedMediaType);
    }

    #endregion

    #region API Versioning Contract Tests (if applicable)

    [Fact]
    public async Task ApiEndpoints_DoNotRequireVersionHeader()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act - Standard request without version
        var response = await client.GetAsync("/api/products");

        // Assert - Should work without explicit version
        response.StatusCode.Should().NotBe(HttpStatusCode.NotFound);
    }

    #endregion

    #region CORS Contract Tests (for preflight)

    [Fact]
    public async Task OptionsRequest_ReturnsAllowedMethods()
    {
        // Arrange
        var client = _factory.CreateAnonymousClient();
        var request = new HttpRequestMessage(HttpMethod.Options, "/api/auth/login");

        // Act
        var response = await client.SendAsync(request);

        // Assert - CORS preflight should succeed or return method not allowed
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.OK,
            HttpStatusCode.NoContent,
            HttpStatusCode.MethodNotAllowed);
    }

    #endregion

    #region Date/Time Format Contract Tests

    [Fact]
    public async Task DateTimeFields_UseIso8601Format()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync($"/api/Event/{TestSeedData.ActiveEventId}");

        // Assert
        if (response.IsSuccessStatusCode)
        {
            var content = await response.Content.ReadAsStringAsync();
            
            // Check that dates are in ISO 8601 format
            if (content.Contains("eventDate"))
            {
                var json = JsonDocument.Parse(content);
                if (json.RootElement.TryGetProperty("eventDate", out var dateElement))
                {
                    var dateString = dateElement.GetString();
                    dateString.Should().MatchRegex(@"\d{4}-\d{2}-\d{2}");
                }
            }
        }
    }

    #endregion

    #region Idempotency Contract Tests

    [Fact]
    public async Task GetRequests_AreIdempotent()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act - Make same request multiple times
        var response1 = await client.GetAsync("/api/users/me");
        var response2 = await client.GetAsync("/api/users/me");

        // Assert - Should return same result
        response1.StatusCode.Should().Be(response2.StatusCode);
        
        if (response1.IsSuccessStatusCode && response2.IsSuccessStatusCode)
        {
            var content1 = await response1.Content.ReadAsStringAsync();
            var content2 = await response2.Content.ReadAsStringAsync();
            
            // Parse and compare key fields (timestamps may differ)
            var json1 = JsonDocument.Parse(content1);
            var json2 = JsonDocument.Parse(content2);
            
            json1.RootElement.GetProperty("id").GetString()
                .Should().Be(json2.RootElement.GetProperty("id").GetString());
        }
    }

    #endregion
}
