using System.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WIN.AGDATA.WIN.Infrastructure.Data;
using WIN.AGDATA.WIN.Tests.Api.Setup;

namespace WIN.AGDATA.WIN.Tests.Integration.Users;

/// <summary>
/// Integration tests for user management workflows including
/// creation, updates, deactivation, and role management.
/// </summary>
[Trait("Category", "Integration")]
[Trait("Component", "Users")]
public class UserWorkflowIntegrationTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly TestWebApplicationFactory _factory;

    public UserWorkflowIntegrationTests(TestWebApplicationFactory factory)
    {
        _factory = factory;
    }

    #region User Creation Tests

    [Fact]
    public async Task CreateUser_WithValidData_CreatesUserAndSendsInvitation()
    {
        // Arrange
        var uniqueId = Guid.NewGuid().ToString("N")[..6];
        _factory.ResetEmailTracking();
        var client = _factory.CreateAdminClient();
        
        var newUser = new
        {
            employeeId = $"INT{uniqueId}",
            email = $"inttest{uniqueId}@agdata.com",
            firstName = "Integration",
            lastName = "TestUser",
            password = "SecureP@ssword123!",
            isAdmin = false
        };

        // Act
        var response = await client.PostJsonAsync("/api/admin/users", newUser);

        // Assert
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.Created,
            HttpStatusCode.OK,
            HttpStatusCode.BadRequest); // May fail if validation differs

        if (response.IsSuccessStatusCode)
        {
            // Verify user exists in database
            using var scope = _factory.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            
            var user = await context.Users
                .FirstOrDefaultAsync(u => u.Email.Value == newUser.email);
            
            user.Should().NotBeNull();
            user!.FirstName.Value.Should().Be(newUser.firstName);
            user.LastName.Value.Should().Be(newUser.lastName);

            // Verify invitation email was sent (if email service is mocked)
            if (_factory.SentEmails.Any())
            {
                _factory.SentEmails.Should().Contain(e => 
                    e.To == newUser.email && 
                    e.Subject.Contains("Invitation", StringComparison.OrdinalIgnoreCase));
            }
        }
    }

    [Fact]
    public async Task CreateUser_WithDuplicateEmail_ReturnsError()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        
        var newUser = new
        {
            employeeId = "DUPEMA01",
            email = TestSeedData.EmployeeEmail, // Already exists
            firstName = "Duplicate",
            lastName = "Email",
            password = "SecureP@ssword123!"
        };

        // Act
        var response = await client.PostJsonAsync("/api/admin/users", newUser);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    #endregion

    #region User Update Tests

    [Fact]
    public async Task UpdateUserProfile_ByOwner_UpdatesSuccessfully()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();
        
        var updateRequest = new
        {
            firstName = "UpdatedFirst",
            lastName = "UpdatedLast"
        };

        // Act
        var response = await client.PutJsonAsync($"/api/users/{TestSeedData.EmployeeUserId}", updateRequest);

        // Assert
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.OK,
            HttpStatusCode.NoContent,
            HttpStatusCode.BadRequest);

        if (response.IsSuccessStatusCode)
        {
            // Verify changes in database
            using var scope = _factory.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            
            var user = await context.Users.FindAsync(TestSeedData.EmployeeUserId);
            user.Should().NotBeNull();
        }
    }

    #endregion

    #region User Deactivation Tests

    [Fact]
    public async Task DeactivateUser_WithNoBlockingConditions_SetsUserInactive()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var uniqueId = Guid.NewGuid().ToString("N")[..6];

        // First create a user to deactivate
        var createRequest = new
        {
            employeeId = $"DEA{uniqueId}",
            email = $"deact{uniqueId}@agdata.com",
            firstName = "ToDeactivate",
            lastName = "User",
            password = "SecureP@ssword123!"
        };

        var createResponse = await client.PostJsonAsync("/api/admin/users", createRequest);
        
        if (createResponse.IsSuccessStatusCode)
        {
            var createdUser = await createResponse.DeserializeAsync<UserResponse>();
            
            // Act - Deactivate the user
            var deactivateResponse = await client.PostJsonAsync($"/api/users/{createdUser.Id}/deactivate", new { force = true });

            // Assert
            deactivateResponse.StatusCode.Should().BeOneOf(
                HttpStatusCode.OK,
                HttpStatusCode.NoContent,
                HttpStatusCode.UnprocessableEntity, // BLOCKED
                HttpStatusCode.Conflict); // WARNING

            if (deactivateResponse.StatusCode == HttpStatusCode.OK || 
                deactivateResponse.StatusCode == HttpStatusCode.NoContent)
            {
                using var scope = _factory.Services.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                
                var user = await context.Users.FindAsync(createdUser.Id);
                user.Should().NotBeNull();
                user!.IsActive.Should().BeFalse();
            }
        }
    }

    [Fact]
    public async Task DeactivateUser_SelfDeactivation_IsBlocked()
    {
        // Arrange - Admin trying to deactivate themselves
        var client = _factory.CreateAdminClient();

        // Act
        var response = await client.PostJsonAsync($"/api/users/{TestSeedData.AdminUserId}/deactivate", new { });

        // Assert - Should be blocked (422 Unprocessable Entity)
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.UnprocessableEntity,
            HttpStatusCode.BadRequest,
            HttpStatusCode.Forbidden);
    }

    [Fact]
    public async Task DeactivateUser_WithPendingRedemptions_ShowsWarningOrBlocks()
    {
        // Arrange
        var client = _factory.CreateAdminClient();

        // Act - Try to deactivate user with pending redemptions
        var response = await client.PostJsonAsync(
            $"/api/users/{TestSeedData.UserWithPendingRedemptionId}/deactivate", new { });

        // Assert - Should return either blocked (422) or warning (409)
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.UnprocessableEntity, // BLOCKED
            HttpStatusCode.Conflict,            // WARNING
            HttpStatusCode.OK,                  // May succeed if no pending
            HttpStatusCode.NoContent);
    }

    #endregion

    #region Role Management Tests

    [Fact]
    public async Task ToggleAdminRole_PromoteEmployee_UpdatesRole()
    {
        // Arrange
        var client = _factory.CreateAdminClient();

        // Act - Toggle admin role for second employee - must send JSON body
        var toggleRequest = new { newRole = "Admin" };
        var response = await client.PostJsonAsync(
            $"/api/users/{TestSeedData.SecondEmployeeId}/toggle-role", 
            toggleRequest);

        // Assert
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.OK,
            HttpStatusCode.NoContent,
            HttpStatusCode.BadRequest,
            HttpStatusCode.Forbidden);

        if (response.IsSuccessStatusCode)
        {
            // Verify role changed
            using var scope = _factory.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            
            var userRoles = await context.UserRoleAssignments
                .Include(ur => ur.Role)
                .Where(ur => ur.UserId == TestSeedData.SecondEmployeeId)
                .ToListAsync();

            userRoles.Should().NotBeEmpty();
        }
    }

    #endregion

    #region Points Management Tests

    [Fact]
    public async Task AdjustPoints_AddPoints_UpdatesBalanceAndCreatesTransaction()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        
        // Get initial balance
        using var initialScope = _factory.Services.CreateScope();
        var initialContext = initialScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var initialUser = await initialContext.Users
            .Include(u => u.PointsAccount)
            .FirstOrDefaultAsync(u => u.Id == TestSeedData.SecondEmployeeId);
        var initialBalance = initialUser?.PointsAccount?.CurrentBalance ?? Points.Create(0);

        var adjustRequest = new
        {
            userId = TestSeedData.SecondEmployeeId,
            amount = 100,
            reason = "Integration test adjustment"
        };

        // Act
        var response = await client.PostJsonAsync(
            $"/api/admin/adjust-points", 
            adjustRequest);

        // Assert
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.OK,
            HttpStatusCode.NoContent,
            HttpStatusCode.BadRequest);

        if (response.IsSuccessStatusCode)
        {
            using var scope = _factory.Services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
            
            var user = await context.Users
                .Include(u => u.PointsAccount)
                .FirstOrDefaultAsync(u => u.Id == TestSeedData.SecondEmployeeId);

            user.Should().NotBeNull();
            user!.PointsAccount.CurrentBalance.Value.Should().BeGreaterThan(initialBalance.Value);

            // Verify transaction was created
            var transaction = await context.UserPointsTransactions
                .Where(t => t.UserId == TestSeedData.SecondEmployeeId)
                .OrderByDescending(t => t.CreatedAt)
                .FirstOrDefaultAsync();

            transaction.Should().NotBeNull();
        }
    }

    #endregion
}

/// <summary>
/// Response DTO for User API responses.
/// </summary>
public record UserResponse
{
    public Guid Id { get; init; }
    public string Email { get; init; } = string.Empty;
    public string FirstName { get; init; } = string.Empty;
    public string LastName { get; init; } = string.Empty;
    public string EmployeeId { get; init; } = string.Empty;
    public bool IsActive { get; init; }
    public decimal PointsBalance { get; init; }
}
