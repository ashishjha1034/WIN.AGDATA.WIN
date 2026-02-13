namespace WIN.AGDATA.WIN.Tests.Api.Setup;

/// <summary>
/// Central management of xUnit test traits for consistent categorization
/// </summary>
public static class TestTraits
{
    public const string Category = "Category";
    public const string Integration = "Integration";
    public const string Unit = "Unit";
    public const string Flow = "Flow";
    
    public static class Controllers
    {
        public const string Auth = "Auth";
        public const string Users = "Users";
        public const string Products = "Products";
        public const string Redemptions = "Redemptions";
        public const string Transactions = "Transaction";
        public const string Events = "Events";
        public const string Validation = "Validation";
        public const string AdminRedemptions = "AdminRedemptions";
        public const string Admin = "Admin";
    }
    
    public static class Services
    {
        public const string UserService = "UserService";
        public const string RedemptionService = "RedemptionService";
        public const string ProductService = "ProductService";
        public const string EventService = "EventService";
        public const string PointsService = "PointsService";
    }
    
    public static class Domain
    {
        public const string Aggregates = "Aggregates";
        public const string Entities = "Entities";
        public const string ValueObjects = "ValueObjects";
        public const string Events = "DomainEvents";
    }
}
