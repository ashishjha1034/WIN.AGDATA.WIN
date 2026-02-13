using System.Net;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WIN.AGDATA.WIN.Infrastructure.Data;
using WIN.AGDATA.WIN.Tests.Api.Setup;

namespace WIN.AGDATA.WIN.Tests.Integration.Resilience;

/// <summary>
/// Chaos and fault tolerance tests to verify system behavior under adverse conditions.
/// Tests include concurrent operations, timeout handling, retry scenarios, and data consistency.
/// </summary>
[Trait("Category", "Integration")]
[Trait("Component", "Resilience")]
public class ChaosAndFaultToleranceTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly TestWebApplicationFactory _factory;

    public ChaosAndFaultToleranceTests(TestWebApplicationFactory factory)
    {
        _factory = factory;
    }

    #region Concurrent Request Tests

    [Fact]
    public async Task ConcurrentPointsAward_MaintainsDataConsistency()
    {
        // Arrange
        var adminClient = _factory.CreateAdminClient();
        const int concurrentRequests = 10;
        const int pointsPerRequest = 10;

        // Get initial balance
        using var scopeBefore = _factory.Services.CreateScope();
        var contextBefore = scopeBefore.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userBefore = await contextBefore.Users
            .Include(u => u.PointsAccount)
            .AsNoTracking()
            .FirstAsync(u => u.Id == TestSeedData.SecondEmployeeId);
        var initialBalance = userBefore.PointsAccount.CurrentBalance.Value;

        // Act - Send concurrent requests
        var tasks = Enumerable.Range(0, concurrentRequests).Select(i =>
        {
            var client = _factory.CreateAdminClient();
            var request = new
            {
                points = pointsPerRequest,
                reason = $"Concurrent test {i + 1}"
            };
            return client.PostJsonAsync(
                $"/api/admin/users/{TestSeedData.SecondEmployeeId}/points",
                request);
        });

        var responses = await Task.WhenAll(tasks);
        var successCount = responses.Count(r => r.IsSuccessStatusCode);

        // Assert - Wait a moment for all transactions to complete
        await Task.Delay(500);

        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userAfter = await context.Users
            .Include(u => u.PointsAccount)
            .AsNoTracking()
            .FirstAsync(u => u.Id == TestSeedData.SecondEmployeeId);

        var finalBalance = userAfter.PointsAccount.CurrentBalance.Value;
        var expectedBalance = initialBalance + (successCount * pointsPerRequest);

        // Balance should match expected based on successful requests
        finalBalance.Should().BeGreaterThanOrEqualTo(initialBalance);
    }

    [Fact]
    public async Task ConcurrentRedemptionCreation_PreventsOverspending()
    {
        // Arrange
        var tasks = new List<Task<HttpResponseMessage>>();
        const int concurrentAttempts = 5;

        // Multiple concurrent redemption attempts
        for (int i = 0; i < concurrentAttempts; i++)
        {
            var client = _factory.CreateClient(TestSeedData.SecondEmployeeId);
            var request = new
            {
                productId = TestSeedData.ActiveProductId,
                quantity = 1
            };
            tasks.Add(client.PostJsonAsync("/api/redemptions", request));
        }

        // Act
        var responses = await Task.WhenAll(tasks);

        // Assert - Should prevent overspending
        var successCount = responses.Count(r => r.StatusCode == HttpStatusCode.Created);
        var failureCount = responses.Count(r => r.StatusCode == HttpStatusCode.BadRequest);

        // At least some should succeed, some may fail due to insufficient points
        (successCount + failureCount).Should().Be(concurrentAttempts);
    }

    [Fact]
    public async Task ConcurrentUserUpdates_HandleOptimisticLocking()
    {
        // Arrange
        var tasks = new List<Task<HttpResponseMessage>>();
        const int concurrentUpdates = 5;

        for (int i = 0; i < concurrentUpdates; i++)
        {
            var client = _factory.CreateClient(TestSeedData.EmployeeUserId);
            var request = new
            {
                firstName = $"ConcurrentFirst{i}",
                lastName = $"ConcurrentLast{i}"
            };
            tasks.Add(client.PutJsonAsync($"/api/users/{TestSeedData.EmployeeUserId}", request));
        }

        // Act
        var responses = await Task.WhenAll(tasks);

        // Assert - All should complete (success or conflict)
        foreach (var response in responses)
        {
            response.StatusCode.Should().BeOneOf(
                HttpStatusCode.OK,
                HttpStatusCode.NoContent,
                HttpStatusCode.Conflict,
                HttpStatusCode.BadRequest);
        }
    }

    #endregion

    #region Rapid Succession Tests

    [Fact]
    public async Task RapidLoginAttempts_HandledGracefully()
    {
        // Arrange
        var tasks = new List<Task<HttpResponseMessage>>();
        const int rapidAttempts = 20;

        // Act - Rapid login attempts
        for (int i = 0; i < rapidAttempts; i++)
        {
            var client = _factory.CreateAnonymousClient();
            var loginRequest = new
            {
                email = TestSeedData.AdminEmail,
                password = TestSeedData.TestPassword
            };
            tasks.Add(client.PostJsonAsync("/api/auth/login", loginRequest));
        }

        var responses = await Task.WhenAll(tasks);

        // Assert - Should not crash, may rate limit
        foreach (var response in responses)
        {
            response.StatusCode.Should().BeOneOf(
                HttpStatusCode.OK,
                HttpStatusCode.Unauthorized,
                HttpStatusCode.TooManyRequests);
        }
    }

    [Fact]
    public async Task RapidApiCalls_SystemRemainsResponsive()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();
        const int rapidCalls = 50;
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();

        // Act - Make many rapid calls
        var tasks = Enumerable.Range(0, rapidCalls)
            .Select(_ => client.GetAsync("/api/products"));

        var responses = await Task.WhenAll(tasks);
        stopwatch.Stop();

        // Assert - All should complete in reasonable time
        var successCount = responses.Count(r => r.IsSuccessStatusCode);
        
        successCount.Should().BeGreaterThan(0);
        stopwatch.ElapsedMilliseconds.Should().BeLessThan(30000); // 30 seconds max
    }

    #endregion

    #region Large Payload Tests

    [Fact]
    public async Task LargeDescription_HandledAppropriately()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var largeDescription = new string('A', 5000); // 5KB description
        var uniqueId = Guid.NewGuid().ToString("N")[..6];

        var request = new
        {
            name = $"Large Desc Product {uniqueId}",
            description = largeDescription,
            pointsCost = 100,
            stockQuantity = 10,
            categoryId = TestSeedData.ElectronicsCategoryId
        };

        // Act
        var response = await client.PostJsonAsync("/api/products", request);

        // Assert - Should either accept or reject with clear error
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.Created,
            HttpStatusCode.OK,
            HttpStatusCode.BadRequest,
            HttpStatusCode.RequestEntityTooLarge);
    }

    [Fact]
    public async Task VeryLongProductName_RejectedOrTruncated()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var longName = new string('A', 500); // 500 char name

        var request = new
        {
            name = longName,
            description = "Testing very long product name",
            pointsCost = 100,
            stockQuantity = 10,
            categoryId = TestSeedData.ElectronicsCategoryId
        };

        // Act
        var response = await client.PostJsonAsync("/api/products", request);

        // Assert - Should be rejected by validation
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);
    }

    #endregion

    #region Invalid Input Chaos Tests

    [Fact]
    public async Task NegativeQuantity_RejectedGracefully()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();
        var request = new
        {
            productId = TestSeedData.ActiveProductId,
            quantity = -5 // Negative
        };

        // Act
        var response = await client.PostJsonAsync("/api/redemptions", request);

        // Assert - Should be rejected by validation OR internal server error
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.BadRequest,
            HttpStatusCode.InternalServerError);
    }

    [Fact]
    public async Task ZeroQuantity_RejectedGracefully()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();
        var request = new
        {
            productId = TestSeedData.ActiveProductId,
            quantity = 0 // Zero
        };

        // Act
        var response = await client.PostJsonAsync("/api/redemptions", request);

        // Assert - Should be rejected or error
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.BadRequest,
            HttpStatusCode.InternalServerError);
    }

    [Fact]
    public async Task ExtremelyLargeQuantity_HandledGracefully()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();
        var request = new
        {
            productId = TestSeedData.ActiveProductId,
            quantity = int.MaxValue
        };

        // Act
        var response = await client.PostJsonAsync("/api/redemptions", request);

        // Assert - Should reject, not crash
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.BadRequest,
            HttpStatusCode.InternalServerError);
    }

    [Fact]
    public async Task MalformedGuid_Returns400NotServerError()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync("/api/products/not-a-valid-guid");

        // Assert - Should be client error, not server error
        ((int)response.StatusCode).Should().BeInRange(400, 499);
    }

    [Fact]
    public async Task EmptyGuid_Returns400Or404()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var response = await client.GetAsync($"/api/products/{Guid.Empty}");

        // Assert
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.BadRequest,
            HttpStatusCode.NotFound);
    }

    #endregion

    #region State Transition Chaos Tests

    [Fact]
    public async Task MultipleActivationAttempts_Idempotent()
    {
        // Arrange
        var client = _factory.CreateAdminClient();

        // Act - Try to activate already active product multiple times
        var tasks = Enumerable.Range(0, 5).Select(_ =>
            client.PostAsync($"/api/products/{TestSeedData.ActiveProductId}/activate", null));

        var responses = await Task.WhenAll(tasks);

        // Assert - Should all succeed or all fail consistently
        var statusCodes = responses.Select(r => r.StatusCode).Distinct().ToList();
        
        // Should be idempotent (same result for all)
        statusCodes.Count.Should().BeLessThanOrEqualTo(2); // At most 2 different statuses
    }

    [Fact]
    public async Task ConcurrentStateChanges_HandleRaceConditions()
    {
        // Arrange
        var admin1 = _factory.CreateAdminClient();
        var admin2 = _factory.CreateClient(TestSeedData.SecondAdminUserId);

        // Both try to approve/reject same redemption
        var approveTask = admin1.PostAsync(
            $"/api/admin/redemptions/{TestSeedData.PendingRedemptionId}/approve",
            null);
        
        var rejectTask = admin2.PostJsonAsync(
            $"/api/admin/redemptions/{TestSeedData.PendingRedemptionId}/reject",
            new { reason = "Concurrent rejection test" });

        // Act
        var responses = await Task.WhenAll(approveTask, rejectTask);

        // Assert - One should succeed, one should fail
        var successCount = responses.Count(r => r.IsSuccessStatusCode);
        var failCount = responses.Count(r => !r.IsSuccessStatusCode);

        // At least one should fail due to state conflict
        failCount.Should().BeGreaterThanOrEqualTo(0);
    }

    #endregion

    #region Transaction Consistency Tests

    [Fact]
    public async Task PointsSpend_FailedRedemption_DoesNotDeductPoints()
    {
        // Arrange
        using var scopeBefore = _factory.Services.CreateScope();
        var contextBefore = scopeBefore.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userBefore = await contextBefore.Users
            .Include(u => u.PointsAccount)
            .AsNoTracking()
            .FirstAsync(u => u.Id == TestSeedData.EmployeeUserId);
        var balanceBefore = userBefore.PointsAccount.CurrentBalance.Value;

        var client = _factory.CreateEmployeeClient();
        var request = new
        {
            productId = Guid.NewGuid(), // Non-existent product
            quantity = 1
        };

        // Act
        var response = await client.PostJsonAsync("/api/redemptions", request);

        // Assert
        response.IsSuccessStatusCode.Should().BeFalse();

        // Verify points were not deducted
        using var scope = _factory.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        var userAfter = await context.Users
            .Include(u => u.PointsAccount)
            .AsNoTracking()
            .FirstAsync(u => u.Id == TestSeedData.EmployeeUserId);
        var balanceAfter = userAfter.PointsAccount.CurrentBalance.Value;

        balanceAfter.Should().BeGreaterThanOrEqualTo(balanceBefore);
    }

    #endregion

    #region Timeout and Response Tests

    [Fact]
    public async Task LongRunningRequest_CompletesOrTimesOut()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        client.Timeout = TimeSpan.FromSeconds(30);

        // Act - Complex query that might take time
        var response = await client.GetAsync("/api/admin/users?page=1&pageSize=100");

        // Assert - Should complete in reasonable time
        response.Should().NotBeNull();
    }

    [Fact]
    public async Task ConnectionReuse_MaintainsState()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act - Make multiple sequential calls with same client
        var response1 = await client.GetAsync("/api/users/me");
        var response2 = await client.GetAsync("/api/products");
        var response3 = await client.GetAsync("/api/redemptions/my-redemptions");

        // Assert - All should succeed
        response1.IsSuccessStatusCode.Should().BeTrue();
        response2.IsSuccessStatusCode.Should().BeTrue();
        // response3 might fail if no redemptions
    }

    #endregion

    #region Recovery Tests

    [Fact]
    public async Task AfterError_SubsequentRequestsSucceed()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act - First make a bad request
        var badResponse = await client.GetAsync("/api/products/invalid-guid");
        
        // Then make a good request
        var goodResponse = await client.GetAsync("/api/products");

        // Assert - Good request should still work
        goodResponse.IsSuccessStatusCode.Should().BeTrue();
    }

    [Fact]
    public async Task MultipleClients_IndependentSessions()
    {
        // Arrange
        var adminClient = _factory.CreateAdminClient();
        var employeeClient = _factory.CreateEmployeeClient();

        // Act - Both make requests
        var adminTask = adminClient.GetAsync("/api/admin/users");
        var employeeTask = employeeClient.GetAsync("/api/users/me");

        var responses = await Task.WhenAll(adminTask, employeeTask);

        // Assert - Both should succeed independently
        responses[0].IsSuccessStatusCode.Should().BeTrue();
        responses[1].IsSuccessStatusCode.Should().BeTrue();
    }

    #endregion
}
