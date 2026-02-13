using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Moq;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Tests.Api.Setup;

/// <summary>
/// Custom WebApplicationFactory for integration tests.
/// Uses SQL Server Testcontainer for database operations.
/// </summary>
public class TestWebApplicationFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    private readonly Mock<IEmailService> _emailServiceMock = new();
    private readonly List<(string To, string Subject, string Body)> _sentEmails = new();
    private readonly string _databaseName = $"TestDb_{Guid.NewGuid()}";

    /// <summary>
    /// Get all emails sent during test execution (for verification).
    /// </summary>
    public IReadOnlyList<(string To, string Subject, string Body)> SentEmails => _sentEmails.AsReadOnly();

    /// <summary>
    /// Reset the email tracking for a new test.
    /// </summary>
    public void ResetEmailTracking() => _sentEmails.Clear();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
        
        // Override configuration BEFORE services are configured
        builder.ConfigureAppConfiguration((context, config) =>
        {
            // Add in-memory configuration to override JWT settings for tests
            config.AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Jwt:SecretKey"] = TestAuthHelpers.TestJwtKey,
                ["Jwt:Issuer"] = TestAuthHelpers.TestIssuer,
                ["Jwt:Audience"] = TestAuthHelpers.TestAudience,
            });
        });
        
        builder.ConfigureTestServices(services =>
        {
            // Remove background services that interfere with testing
            var backgroundServicesToRemove = services
                .Where(d => d.ServiceType == typeof(IHostedService) || 
                           d.ServiceType.IsAssignableTo(typeof(BackgroundService)) ||
                           d.ImplementationType?.Name.Contains("BackgroundService") == true ||
                           d.ImplementationType?.Name.Contains("LifecycleService") == true)
                .ToList();
            foreach (var descriptor in backgroundServicesToRemove)
                services.Remove(descriptor);

            // Remove existing DbContext registration
            var dbContextDescriptor = services.SingleOrDefault(
                d => d.ServiceType == typeof(DbContextOptions<ApplicationDbContext>));
            if (dbContextDescriptor != null)
                services.Remove(dbContextDescriptor);

            var dbContextPoolDescriptor = services.SingleOrDefault(
                d => d.ServiceType == typeof(ApplicationDbContext));
            if (dbContextPoolDescriptor != null)
                services.Remove(dbContextPoolDescriptor);

            // Configure SQL Server database
            ConfigureSqlServerTestcontainer(services);

            // Replace email service with mock
            services.RemoveAll<IEmailService>();
            SetupEmailServiceMock();
            services.AddSingleton(_emailServiceMock.Object);

            // Disable rate limiting for tests by removing all rate limiter policies
            services.Configure<Microsoft.AspNetCore.RateLimiting.RateLimiterOptions>(options =>
            {
                options.GlobalLimiter = null;
            });

            // Configure test authentication pipeline
            ConfigureTestAuthentication(services);
        });
    }

    private void ConfigureSqlServerTestcontainer(IServiceCollection services)
    {
        // SQL Server connection string - REQUIRED for testing
        // Defaults to LocalDB if TEST_SQLSERVER_CONNECTION environment variable is not set
        var connectionString = Environment.GetEnvironmentVariable("TEST_SQLSERVER_CONNECTION")
            ?? "Server=(localdb)\\MSSQLLocalDB;Database=AGDATA_REWARD_TEST;Trusted_Connection=true;Encrypt=false;";
        
        // Use real SQL Server (local dev instance or Testcontainer)
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlServer(connectionString);
            options.EnableSensitiveDataLogging();
            options.EnableDetailedErrors();
        });
    }

    private void SetupEmailServiceMock()
    {
        _emailServiceMock
            .Setup(e => e.SendPasswordResetEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .Callback<string, string, string, CancellationToken>((email, name, resetLink, _) =>
            {
                _sentEmails.Add((email, "Password Reset", $"Reset link for {name}: {resetLink}"));
            })
            .ReturnsAsync(true);

        _emailServiceMock
            .Setup(e => e.SendUserInvitationEmailAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<CancellationToken>()))
            .Callback<string, string, string, CancellationToken>((email, name, tempPassword, _) =>
            {
                _sentEmails.Add((email, "User Invitation", $"Welcome {name}! Temp password: {tempPassword}"));
            })
            .ReturnsAsync(true);
    }

    private static void ConfigureTestAuthentication(IServiceCollection services)
    {
        // JWT settings are now overridden via ConfigureAppConfiguration
        // No additional auth configuration needed here
    }

    public async Task InitializeAsync()
    {
        // Create and seed the database
        using var scope = Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        
        await context.Database.EnsureCreatedAsync();
        await TestSeedData.SeedAsync(context);
    }

    Task IAsyncLifetime.DisposeAsync()
    {
        return Task.CompletedTask;
    }

    /// <summary>
    /// Creates an HttpClient with a specific user's authentication token.
    /// </summary>
    public HttpClient CreateClientForUser(Guid userId, string email, string role)
    {
        var client = CreateClient();
        var token = TestAuthHelpers.GenerateJwtToken(userId, email, role);
        client.DefaultRequestHeaders.Authorization = 
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        return client;
    }

    /// <summary>
    /// Creates an HttpClient for admin user.
    /// </summary>
    public HttpClient CreateAdminClient()
    {
        return CreateClientForUser(TestSeedData.AdminUserId, TestSeedData.AdminEmail, "Admin");
    }

    /// <summary>
    /// Creates an HttpClient for employee user.
    /// </summary>
    public HttpClient CreateEmployeeClient()
    {
        return CreateClientForUser(TestSeedData.EmployeeUserId, TestSeedData.EmployeeEmail, "Employee");
    }

    /// <summary>
    /// Creates an HttpClient for a specific user (by ID).
    /// For testing specific user scenarios.
    /// </summary>
    public HttpClient CreateClient(Guid userId)
    {
        // Determine role and email based on known user IDs
        if (userId == TestSeedData.AdminUserId)
            return CreateClientForUser(userId, TestSeedData.AdminEmail, "Admin");
        if (userId == TestSeedData.SecondAdminUserId)
            return CreateClientForUser(userId, TestSeedData.SecondAdminEmail, "Admin");
        if (userId == TestSeedData.EmployeeUserId)
            return CreateClientForUser(userId, TestSeedData.EmployeeEmail, "Employee");
        if (userId == TestSeedData.SecondEmployeeId)
            return CreateClientForUser(userId, TestSeedData.SecondEmployeeEmail, "Employee");
        if (userId == TestSeedData.InactiveUserId)
            return CreateClientForUser(userId, "inactive.user@agdata.com", "Employee");
        if (userId == TestSeedData.UserWithPendingRedemptionId)
            return CreateClientForUser(userId, "pending.user@agdata.com", "Employee");
        
        // Default to Employee role for unknown users
        return CreateClientForUser(userId, $"user_{userId}@agdata.com", "Employee");
    }

    /// <summary>
    /// Creates an unauthenticated HttpClient.
    /// </summary>
    public HttpClient CreateAnonymousClient()
    {
        return CreateClient();
    }

    /// <summary>
    /// Gets a fresh database context for direct verification.
    /// </summary>
    public ApplicationDbContext GetDbContext()
    {
        var scope = Services.CreateScope();
        return scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    }
}
