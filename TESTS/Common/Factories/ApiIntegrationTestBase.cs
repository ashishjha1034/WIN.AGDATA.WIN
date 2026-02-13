namespace WIN.AGDATA.WIN.Tests.Api.Setup;

/// <summary>
/// Base class for API integration tests that provides common infrastructure
/// Reduces duplication by centralizing client setup and factory management
/// </summary>
public abstract class ApiIntegrationTestBase : IClassFixture<TestWebApplicationFactory>
{
    protected readonly TestWebApplicationFactory Factory;
    
    /// <summary>
    /// Anonymous HTTP client (no auth)
    /// </summary>
    protected HttpClient AnonymousClient { get; }
    
    /// <summary>
    /// Employee-role authenticated HTTP client
    /// </summary>
    protected HttpClient EmployeeClient { get; }
    
    /// <summary>
    /// Admin-role authenticated HTTP client
    /// </summary>
    protected HttpClient AdminClient { get; }

    protected ApiIntegrationTestBase(TestWebApplicationFactory factory)
    {
        Factory = factory;
        AnonymousClient = factory.CreateAnonymousClient();
        EmployeeClient = factory.CreateEmployeeClient();
        AdminClient = factory.CreateAdminClient();
    }
}
