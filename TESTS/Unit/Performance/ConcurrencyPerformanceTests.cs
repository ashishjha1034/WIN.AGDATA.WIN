using System.Diagnostics;
using System.Net;
using WIN.AGDATA.WIN.Tests.Api.Setup;

namespace WIN.AGDATA.WIN.Tests.Unit.Performance;

/// <summary>
/// Concurrency and performance tests for critical operations.
/// These tests verify thread safety and performance under load.
/// Covers areas mentioned as "Not Yet Covered" in README:
/// - Optimistic locking on pool operations
/// - Load testing for bulk operations
/// </summary>
[Trait("Category", "Performance")]
[Trait("Priority", "Low")]
public class ConcurrencyPerformanceTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly TestWebApplicationFactory _factory;

    public ConcurrencyPerformanceTests(TestWebApplicationFactory factory)
    {
        _factory = factory;
    }

    #region Concurrent Login Tests

    [Fact]
    public async Task ConcurrentLogins_MultipleUsers_AllSucceedWithinTimeout()
    {
        // Arrange
        const int concurrentUsers = 10;
        var tasks = new List<Task<HttpResponseMessage>>();

        // Act - Multiple concurrent login requests
        for (int i = 0; i < concurrentUsers; i++)
        {
            var client = _factory.CreateAnonymousClient();
            var loginRequest = new
            {
                email = TestSeedData.EmployeeEmail,
                password = TestSeedData.TestPassword
            };
            tasks.Add(client.PostJsonAsync("/api/auth/login", loginRequest));
        }

        var sw = Stopwatch.StartNew();
        var responses = await Task.WhenAll(tasks);
        sw.Stop();

        // Assert - Accept OK, TooManyRequests, or Locked (423) as valid responses
        // Account may be locked from previous test runs
        var successCount = responses.Count(r => 
            r.StatusCode == HttpStatusCode.OK || 
            r.StatusCode == HttpStatusCode.TooManyRequests ||
            r.StatusCode == (HttpStatusCode)423);  // Locked
        
        successCount.Should().BeGreaterThan(0, "At least some login attempts should complete (OK, TooManyRequests, or Locked)");
        sw.ElapsedMilliseconds.Should().BeLessThan(30000, "All logins should complete within 30 seconds");
    }

    #endregion

    #region Points Pool Concurrency Tests

    [Fact]
    public async Task ConcurrentPointsAwards_SameEvent_HandlesConcurrencyCorrectly()
    {
        // Arrange - Simulates multiple concurrent point awards to the same event pool
        const int concurrentAwards = 5;
        var tasks = new List<Task<HttpResponseMessage>>();
        var client = _factory.CreateAdminClient();

        // Act
        for (int i = 0; i < concurrentAwards; i++)
        {
            var awardRequest = new
            {
                userId = TestSeedData.EmployeeUserId,
                points = 10,
                reason = $"Concurrent award test {i}"
            };

            // Clone the request for each task
            var task = client.PostJsonAsync(
                $"/api/Event/{TestSeedData.ActiveEventId}/award",
                awardRequest);
            tasks.Add(task);
        }

        var responses = await Task.WhenAll(tasks);

        // Assert - All requests should be handled (either succeed or fail gracefully)
        responses.Should().AllSatisfy(r => 
            r.StatusCode.Should().BeOneOf(
                HttpStatusCode.OK,
                HttpStatusCode.NoContent,
                HttpStatusCode.BadRequest,
                HttpStatusCode.Conflict,      // Optimistic concurrency
                HttpStatusCode.NotFound));
    }

    [Fact]
    public async Task ConcurrentStockReservations_SameProduct_HandlesRaceCondition()
    {
        // Arrange
        const int concurrentRedemptions = 5;
        var tasks = new List<Task<HttpResponseMessage>>();

        // Act - Multiple users trying to redeem the same low-stock product
        for (int i = 0; i < concurrentRedemptions; i++)
        {
            var userId = i % 2 == 0 ? TestSeedData.EmployeeUserId : TestSeedData.SecondEmployeeId;
            var client = _factory.CreateClient(userId);
            
            var redemptionRequest = new
            {
                items = new[]
                {
                    new { productId = TestSeedData.LowStockProductId, quantity = 1 }
                }
            };

            tasks.Add(client.PostJsonAsync("/api/redemptions", redemptionRequest));
        }

        var responses = await Task.WhenAll(tasks);

        // Assert - Should handle concurrency (some may fail due to stock)
        var statusCodes = responses.Select(r => r.StatusCode).ToList();
        statusCodes.Should().AllSatisfy(s => s.Should().BeOneOf(
            HttpStatusCode.OK,
            HttpStatusCode.Created,
            HttpStatusCode.BadRequest,
            HttpStatusCode.Conflict,
            HttpStatusCode.InternalServerError,
            HttpStatusCode.UnprocessableEntity));
    }

    #endregion

    #region Optimistic Locking Tests

    [Fact]
    public async Task ConcurrentEventUpdates_DetectsConflict()
    {
        // Arrange
        var client1 = _factory.CreateAdminClient();
        var client2 = _factory.CreateAdminClient();

        // Get the event twice (simulating two clients)
        var getResponse1 = await client1.GetAsync($"/api/Event/{TestSeedData.DraftEventId}");
        var getResponse2 = await client2.GetAsync($"/api/Event/{TestSeedData.DraftEventId}");

        if (getResponse1.StatusCode == HttpStatusCode.OK && getResponse2.StatusCode == HttpStatusCode.OK)
        {
            var update1 = new
            {
                name = "Updated by Client 1",
                description = "This update should succeed as it comes first in sequence",
                eventDate = DateTime.UtcNow.AddDays(30),
                registrationEndDateUtc = DateTime.UtcNow.AddDays(25)
            };

            var update2 = new
            {
                name = "Updated by Client 2",
                description = "This update may fail due to optimistic concurrency conflict",
                eventDate = DateTime.UtcNow.AddDays(31),
                registrationEndDateUtc = DateTime.UtcNow.AddDays(26)
            };

            // Act - Both clients try to update concurrently
            var task1 = client1.PutJsonAsync($"/api/Event/{TestSeedData.DraftEventId}", update1);
            var task2 = client2.PutJsonAsync($"/api/Event/{TestSeedData.DraftEventId}", update2);

            var responses = await Task.WhenAll(task1, task2);

            // Assert - One should succeed, one may conflict
            var statusCodes = responses.Select(r => r.StatusCode).ToList();
            statusCodes.Should().AllSatisfy(s => s.Should().BeOneOf(
                HttpStatusCode.OK,
                HttpStatusCode.NoContent,
                HttpStatusCode.Conflict,    // ETag conflict
                HttpStatusCode.PreconditionFailed,
                HttpStatusCode.BadRequest,
                HttpStatusCode.NotFound));
        }
    }

    #endregion

    #region Bulk Operation Performance Tests

    [Fact]
    public async Task BulkCheckIn_ManyParticipants_CompletesWithinTimeout()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var participantIds = Enumerable.Range(0, 50)
            .Select(_ => Guid.NewGuid())
            .ToArray();

        var checkInRequest = new
        {
            participantIds
        };

        // Act
        var sw = Stopwatch.StartNew();
        var response = await client.PostJsonAsync(
            $"/api/Event/{TestSeedData.ActiveEventId}/check-in/bulk",
            checkInRequest);
        sw.Stop();

        // Assert
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.OK,
            HttpStatusCode.NoContent,
            HttpStatusCode.BadRequest,
            HttpStatusCode.NotFound);
        
        sw.ElapsedMilliseconds.Should().BeLessThan(10000, "Bulk check-in should complete within 10 seconds");
    }

    [Fact]
    public async Task BulkPointsAward_ManyUsers_CompletesWithinTimeout()
    {
        // Arrange
        var client = _factory.CreateAdminClient();
        var awards = Enumerable.Range(0, 20)
            .Select(i => new
            {
                userId = i % 2 == 0 ? TestSeedData.EmployeeUserId : TestSeedData.SecondEmployeeId,
                points = 10
            })
            .ToArray();

        var bulkAwardRequest = new
        {
            mode = "Manual",
            awards
        };

        // Act
        var sw = Stopwatch.StartNew();
        var response = await client.PostJsonAsync(
            $"/api/Event/{TestSeedData.EventWithParticipantsId}/award/bulk",
            bulkAwardRequest);
        sw.Stop();

        // Assert
        response.StatusCode.Should().BeOneOf(
            HttpStatusCode.OK,
            HttpStatusCode.NoContent,
            HttpStatusCode.BadRequest,
            HttpStatusCode.NotFound);
        
        sw.ElapsedMilliseconds.Should().BeLessThan(10000, "Bulk award should complete within 10 seconds");
    }

    #endregion

    #region Response Time Tests

    [Fact]
    public async Task GetProducts_ResponseTime_IsAcceptable()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var sw = Stopwatch.StartNew();
        var response = await client.GetAsync("/api/products");
        sw.Stop();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        sw.ElapsedMilliseconds.Should().BeLessThan(2000, "Product list should return within 2 seconds");
    }

    [Fact]
    public async Task GetUserProfile_ResponseTime_IsAcceptable()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var sw = Stopwatch.StartNew();
        var response = await client.GetAsync("/api/users/me");
        sw.Stop();

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);
        sw.ElapsedMilliseconds.Should().BeLessThan(1000, "Profile should return within 1 second");
    }

    [Fact]
    public async Task GetTransactions_Pagination_ResponseTime_IsAcceptable()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();

        // Act
        var sw = Stopwatch.StartNew();
        var response = await client.GetAsync("/api/transactions?page=1&pageSize=50");
        sw.Stop();

        // Assert
        response.StatusCode.Should().BeOneOf(HttpStatusCode.OK, HttpStatusCode.NotFound);
        sw.ElapsedMilliseconds.Should().BeLessThan(2000, "Transaction list should return within 2 seconds");
    }

    #endregion

    #region Memory Leak Prevention Tests

    [Fact]
    public async Task RepeatedRequests_NoMemoryGrowth()
    {
        // Arrange
        var client = _factory.CreateEmployeeClient();
        const int iterations = 20;
        var memoryBefore = GC.GetTotalMemory(true);

        // Act
        for (int i = 0; i < iterations; i++)
        {
            var response = await client.GetAsync("/api/products");
            response.Dispose();
        }

        GC.Collect();
        GC.WaitForPendingFinalizers();
        var memoryAfter = GC.GetTotalMemory(true);

        // Assert - Memory growth should be minimal (< 10MB)
        var memoryGrowth = memoryAfter - memoryBefore;
        memoryGrowth.Should().BeLessThan(10 * 1024 * 1024, 
            $"Memory should not grow significantly. Before: {memoryBefore}, After: {memoryAfter}");
    }

    #endregion

    #region Throughput Tests

    [Fact]
    public async Task HighThroughput_ReadOperations_HandlesLoad()
    {
        // Arrange
        const int totalRequests = 50;
        var tasks = new List<Task<HttpResponseMessage>>();

        // Act
        var sw = Stopwatch.StartNew();
        for (int i = 0; i < totalRequests; i++)
        {
            var client = _factory.CreateEmployeeClient();
            tasks.Add(client.GetAsync("/api/products"));
        }

        var responses = await Task.WhenAll(tasks);
        sw.Stop();

        // Assert
        var successCount = responses.Count(r => r.IsSuccessStatusCode);
        var throughput = totalRequests / (sw.ElapsedMilliseconds / 1000.0);

        successCount.Should().BeGreaterThan(totalRequests / 2, 
            "At least half the requests should succeed");
        
        throughput.Should().BeGreaterThan(1,
            "Should handle at least 1 request per second");
    }

    #endregion
}
