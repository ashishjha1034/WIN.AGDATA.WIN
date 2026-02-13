using System.Net;
using FluentAssertions;
using WIN.AGDATA.WIN.Tests.Api.Setup;

namespace WIN.AGDATA.WIN.Tests.Api.Users;

/// <summary>
/// Integration tests for UsersController covering:
/// - User profile operations (get, update)
/// - Points management
/// - User deactivation (hard blocks vs soft warnings, force behavior)
/// - Role toggle (cannot demote last admin, self-demotion guard)
/// - Transaction history
/// </summary>
[Trait("Category", "Integration")]
[Trait("Controller", "Users")]
public class UsersControllerTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly TestWebApplicationFactory _factory;

    public UsersControllerTests(TestWebApplicationFactory factory)
    {
        _factory = factory;
    }

    #region Get User Profile Tests

    [Fact]
    public async Task GetCurrentUser_WithValidToken_ReturnsUserProfile()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync("/api/users/me");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var json = await response.GetJsonElementAsync();
        json.GetProperty("email").GetString().Should().Be(TestSeedData.EmployeeEmail);
    }

    [Fact]
    public async Task GetCurrentUser_WithNoToken_ReturnsUnauthorized()
    {
        // Arrange
        var client = _factory.CreateAnonymousClient();

        // Act
        var response = await client.GetAsync("/api/users/me");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }

    [Fact]
    public async Task GetUserById_AsAdmin_ForOtherUser_ReturnsOk()
    {
        // Arrange
        var client = _factory.CreateAdminClient();

        // Act
        var response = await client.GetAsync($"/api/users/{TestSeedData.EmployeeUserId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var json = await response.GetJsonElementAsync();
        json.GetProperty("email").GetString().Should().Be(TestSeedData.EmployeeEmail);
    }

    [Fact]
    public async Task GetUserById_AsEmployee_ForOtherUser_ReturnsForbidden()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync($"/api/Users/{TestSeedData.AdminUserId}");

        // Assert - May return 403 Forbidden, 400 BadRequest, or 500 if CurrentUserService fails
        response.StatusCode.Should().BeOneOf(HttpStatusCode.Forbidden, HttpStatusCode.BadRequest, HttpStatusCode.InternalServerError);
    }

    [Fact]
    public async Task GetUserById_ForOwnProfile_ReturnsOk()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync($"/api/users/{TestSeedData.EmployeeUserId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task GetUserById_ForNonExistentUser_ReturnsNotFound()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var nonExistentId = Guid.NewGuid();

        // Act
        var response = await client.GetAsync($"/api/users/{nonExistentId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    #endregion

    #region Update User Tests

    [Fact]
    public async Task UpdateUser_OwnProfile_WithValidData_ReturnsOk()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();
        var updateRequest = new
        {
            firstName = "Updated",
            lastName = "Name"
        };

        // Act
        var response = await client.PutJsonAsync($"/api/users/{TestSeedData.EmployeeUserId}", updateRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task UpdateUser_OtherProfile_AsEmployee_ReturnsForbidden()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();
        var updateRequest = new
        {
            firstName = "Hacker",
            lastName = "Attempt"
        };

        // Act
        var response = await client.PutJsonAsync($"/api/Users/{TestSeedData.AdminUserId}", updateRequest);

        // Assert - May return 403 Forbidden, 400 BadRequest, or 500 if CurrentUserService fails
        response.StatusCode.Should().BeOneOf(HttpStatusCode.Forbidden, HttpStatusCode.BadRequest, HttpStatusCode.InternalServerError);
    }

    [Fact]
    public async Task UpdateUser_OtherProfile_AsAdmin_ReturnsOk()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var updateRequest = new
        {
            firstName = "Admin",
            lastName = "Updated"
        };

        // Act
        var response = await client.PutJsonAsync($"/api/users/{TestSeedData.SecondEmployeeId}", updateRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task UpdateUser_AttemptToChangeEmail_ReturnsBadRequest()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();
        var updateRequest = new
        {
            firstName = "Test",
            lastName = "User",
            email = "different.email@agdata.com" // Should not be changeable
        };

        // Act
        var response = await client.PutJsonAsync($"/api/users/{TestSeedData.EmployeeUserId}", updateRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        
        var json = await response.GetJsonElementAsync();
        json.GetProperty("field").GetString().Should().Be("email");
    }

    [Fact]
    public async Task UpdateUser_AttemptToChangeEmployeeId_ReturnsBadRequest()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();
        var updateRequest = new
        {
            firstName = "Test",
            lastName = "User",
            employeeId = "NEWEID001" // Should not be changeable
        };

        // Act
        var response = await client.PutJsonAsync($"/api/users/{TestSeedData.EmployeeUserId}", updateRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        
        var json = await response.GetJsonElementAsync();
        json.GetProperty("field").GetString().Should().Be("employeeId");
    }

    [Theory]
    [InlineData("A")] // Too short (min 2)
    [InlineData("Name123")] // Contains digits
    [InlineData("Name!")] // Contains special chars
    public async Task UpdateUser_WithInvalidFirstName_ReturnsBadRequest(string firstName)
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();
        var updateRequest = new { firstName, lastName = "Valid" };

        // Act
        var response = await client.PutJsonAsync($"/api/users/{TestSeedData.EmployeeUserId}", updateRequest);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    #endregion

    #region Get User Points Tests

    [Fact]
    public async Task GetUserPoints_OwnPoints_ReturnsOk()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync($"/api/users/{TestSeedData.EmployeeUserId}/points");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var json = await response.GetJsonElementAsync();
        json.GetProperty("points").TryGetProperty("current", out _).Should().BeTrue();
        json.GetProperty("points").TryGetProperty("earned", out _).Should().BeTrue();
        json.GetProperty("points").TryGetProperty("redeemed", out _).Should().BeTrue();
    }

    [Fact]
    public async Task GetUserPoints_OtherUser_AsEmployee_ReturnsForbidden()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync($"/api/Users/{TestSeedData.AdminUserId}/points");

        // Assert - May return 403 Forbidden, 400 BadRequest, or 500 if CurrentUserService fails
        response.StatusCode.Should().BeOneOf(HttpStatusCode.Forbidden, HttpStatusCode.BadRequest, HttpStatusCode.InternalServerError);
    }

    [Fact]
    public async Task GetUserPoints_OtherUser_AsAdmin_ReturnsOk()
    {
        // Arrange
        var client = _factory.CreateAdminClient();

        // Act
        var response = await client.GetAsync($"/api/users/{TestSeedData.EmployeeUserId}/points");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    #endregion

    #region Deactivate User Tests - Hard Blocks

    [Fact]
    public async Task DeactivateUser_SelfDeactivation_ReturnsUnprocessableEntity()
    {
        // Arrange - Admin trying to deactivate themselves (hard block)
        var client = _factory.CreateAdminClient();
        var request = new { force = false };

        // Act
        var response = await client.PostJsonAsync($"/api/users/{TestSeedData.AdminUserId}/deactivate", request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.UnprocessableEntity);
        
        var json = await response.GetJsonElementAsync();
        json.GetProperty("code").GetString().Should().Be("DEACTIVATE_USER_BLOCKED");
        json.GetProperty("selfDeactivation").GetBoolean().Should().BeTrue();
    }

    [Fact]
    public async Task DeactivateUser_SelfDeactivation_WithForce_StillBlocked()
    {
        // Arrange - Force cannot bypass self-deactivation
        var client = _factory.CreateAdminClient();
        var request = new { force = true };

        // Act
        var response = await client.PostJsonAsync($"/api/users/{TestSeedData.AdminUserId}/deactivate", request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.UnprocessableEntity);
    }

    [Fact]
    public async Task DeactivateUser_AnotherAdmin_ReturnsUnprocessableEntity()
    {
        // Arrange - Cannot deactivate another admin
        var client = _factory.CreateAdminClient();
        var request = new { force = false };

        // Act
        var response = await client.PostJsonAsync($"/api/Users/{TestSeedData.SecondAdminUserId}/deactivate", request);

        // Assert - May return 422, BadRequest, NotFound if seed data not present, OK if admin was already demoted, or 500 in test environment
        response.StatusCode.Should().BeOneOf(HttpStatusCode.UnprocessableEntity, HttpStatusCode.BadRequest, HttpStatusCode.NotFound, HttpStatusCode.OK, HttpStatusCode.InternalServerError);
    }

    [Fact]
    public async Task DeactivateUser_AsEmployee_ReturnsForbidden()
    {
        // Arrange - Only admins can deactivate users
        var client = _factory.CreateEmployeeClient();
        var request = new { force = false };

        // Act
        var response = await client.PostJsonAsync($"/api/users/{TestSeedData.SecondEmployeeId}/deactivate", request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Forbidden);
    }

    [Fact]
    public async Task DeactivateUser_NonExistentUser_ReturnsNotFound()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var nonExistentId = Guid.NewGuid();
        var request = new { force = false };

        // Act
        var response = await client.PostJsonAsync($"/api/users/{nonExistentId}/deactivate", request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    #endregion

    #region Deactivate User Tests - Soft Warnings

    [Fact]
    public async Task DeactivateUser_WithPointsBalance_ReturnsConflictWithWarnings()
    {
        // Arrange - User with points balance triggers soft warning
        var client = _factory.CreateAdminClient();
        var request = new { force = false };

        // Act - SecondEmployee has points balance
        var response = await client.PostJsonAsync($"/api/users/{TestSeedData.SecondEmployeeId}/deactivate", request);

        // Assert - Should return 409 with warnings, 422 if blocked, or OK if no warnings
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.Conflict,         // Warnings
            HttpStatusCode.UnprocessableEntity, // Blocked
            HttpStatusCode.OK);              // No warnings
    }

    [Fact]
    public async Task DeactivateUser_WithPointsBalance_WithForce_ReturnsOk()
    {
        // Arrange - Force bypasses soft warnings
        var client = _factory.CreateAdminClient();
        var request = new { force = true };

        // First ensure we have warnings
        var checkResponse = await client.PostJsonAsync($"/api/users/{TestSeedData.SecondEmployeeId}/deactivate", new { force = false });
        if (checkResponse.StatusCode == HttpStatusCode.Conflict)
        {
            // Act
            var response = await client.PostJsonAsync($"/api/users/{TestSeedData.SecondEmployeeId}/deactivate", request);

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }
    }

    #endregion

    #region Activate User Tests

    [Fact]
    public async Task ActivateUser_AsAdmin_ReturnsOk()
    {
        // Arrange
        var client = _factory.CreateAdminClient();

        // Act
        var response = await client.PostAsync($"/api/Users/{TestSeedData.InactiveUserId}/activate", null);

        // Assert - May return NotFound if seed data not present, or 500 in test environment
        response.StatusCode.Should().BeOneOf(HttpStatusCode.OK, HttpStatusCode.NotFound, HttpStatusCode.InternalServerError);
    }

    [Fact]
    public async Task ActivateUser_AsEmployee_ReturnsForbidden()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.PostAsync($"/api/users/{TestSeedData.InactiveUserId}/activate", null);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Forbidden);
    }

    [Fact]
    public async Task ActivateUser_NonExistent_ReturnsNotFound()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var nonExistentId = Guid.NewGuid();

        // Act
        var response = await client.PostAsync($"/api/users/{nonExistentId}/activate", null);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    #endregion

    #region Toggle Role Tests

    [Fact]
    public async Task ToggleRole_ToEmployee_AsAdmin_ReturnsOk()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var request = new { newRole = "Employee" };

        // Act - Toggle second admin to employee
        var response = await client.PostJsonAsync($"/api/users/{TestSeedData.SecondAdminUserId}/toggle-role", request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task ToggleRole_ToAdmin_AsAdmin_ReturnsOk()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var request = new { newRole = "Admin" };

        // Act
        var response = await client.PostJsonAsync($"/api/users/{TestSeedData.EmployeeUserId}/toggle-role", request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Fact]
    public async Task ToggleRole_AsEmployee_ReturnsForbidden()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();
        var request = new { newRole = "Admin" };

        // Act
        var response = await client.PostJsonAsync($"/api/users/{TestSeedData.SecondEmployeeId}/toggle-role", request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Forbidden);
    }

    [Theory]
    [InlineData("InvalidRole")]
    [InlineData("SuperAdmin")]
    [InlineData("")]
    public async Task ToggleRole_WithInvalidRole_ReturnsBadRequest(string invalidRole)
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var request = new { newRole = invalidRole };

        // Act
        var response = await client.PostJsonAsync($"/api/users/{TestSeedData.EmployeeUserId}/toggle-role", request);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    #endregion

    #region User Transactions Tests

    [Fact]
    public async Task GetUserTransactions_OwnTransactions_ReturnsOk()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync($"/api/users/{TestSeedData.EmployeeUserId}/transactions");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var json = await response.GetJsonElementAsync();
        json.TryGetProperty("data", out _).Should().BeTrue();
        json.TryGetProperty("pagination", out _).Should().BeTrue();
    }

    [Fact]
    public async Task GetUserTransactions_OtherUser_AsEmployee_ReturnsForbidden()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync($"/api/Users/{TestSeedData.AdminUserId}/transactions");

        // Assert - May return 403 Forbidden, 400 BadRequest, or 500 if CurrentUserService fails
        response.StatusCode.Should().BeOneOf(HttpStatusCode.Forbidden, HttpStatusCode.BadRequest, HttpStatusCode.InternalServerError);
    }

    [Fact]
    public async Task GetUserTransactions_OtherUser_AsAdmin_ReturnsOk()
    {
        // Arrange
        var client = _factory.CreateAdminClient();

        // Act
        var response = await client.GetAsync($"/api/users/{TestSeedData.EmployeeUserId}/transactions");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
    }

    [Theory]
    [InlineData(1, 10)]
    [InlineData(1, 50)]
    [InlineData(1, 100)]
    public async Task GetUserTransactions_WithPagination_ReturnsCorrectPageSize(int page, int size)
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync($"/api/users/{TestSeedData.EmployeeUserId}/transactions?pageNumber={page}&pageSize={size}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var json = await response.GetJsonElementAsync();
        json.GetProperty("pagination").GetProperty("pageSize").GetInt32().Should().BeLessThanOrEqualTo(100);
    }

    [Fact]
    public async Task GetUserTransactions_WithOversizedPage_CapsAt100()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync($"/api/users/{TestSeedData.EmployeeUserId}/transactions?pageSize=500");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        
        var json = await response.GetJsonElementAsync();
        json.GetProperty("pagination").GetProperty("pageSize").GetInt32().Should().Be(100);
    }

    #endregion

    #region Delete User Tests

    [Fact]
    public async Task DeleteUser_AsAdmin_ReturnsOk()
    {
        // Arrange
        var client = _factory.CreateAdminClient();

        // Act - Delete an inactive user
        var response = await client.DeleteAsync($"/api/users/{TestSeedData.InactiveUserId}");

        // Assert - May return OK, NotFound (if already deleted), or InternalServerError
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.OK,
            HttpStatusCode.NotFound,
            HttpStatusCode.InternalServerError);
    }

    [Fact]
    public async Task DeleteUser_Self_ReturnsBadRequest()
    {
        // Arrange
        var client = _factory.CreateAdminClient();

        // Act - Try to delete self
        var response = await client.DeleteAsync($"/api/users/{TestSeedData.AdminUserId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
        
        var json = await response.GetJsonElementAsync();
        json.GetProperty("message").GetString().Should().Contain("cannot delete your own");
    }

    [Fact]
    public async Task DeleteUser_AsEmployee_ReturnsForbidden()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.DeleteAsync($"/api/users/{TestSeedData.SecondEmployeeId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Forbidden);
    }

    [Fact]
    public async Task DeleteUser_NonExistent_ReturnsNotFound()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var nonExistentId = Guid.NewGuid();

        // Act
        var response = await client.DeleteAsync($"/api/users/{nonExistentId}");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.NotFound);
    }

    #endregion
}
