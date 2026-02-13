using WIN.AGDATA.WIN.APPLICATION.DTOs.Admin;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using CreateProductRequest = WIN.AGDATA.WIN.APPLICATION.DTOs.Products.CreateProductRequest;
using CreateEventRequest = WIN.AGDATA.WIN.APPLICATION.DTOs.Events.CreateEventRequest;

namespace WIN.AGDATA.WIN.Tests.Builders;

/// <summary>
/// Test data builders using fluent builder pattern
/// Reduces hardcoded magic values and makes test data construction explicit
/// </summary>
public static class TestDataBuilders
{
    public class CreateUserRequestBuilder
    {
        private string _employeeId = $"EMP{Guid.NewGuid():N}";
        private string? _email;
        private string? _firstName = "Test";
        private string? _lastName = "User";
        private string _password = "Test@123456";

        public CreateUserRequestBuilder WithEmployeeId(string employeeId)
        {
            _employeeId = employeeId;
            return this;
        }

        public CreateUserRequestBuilder WithEmail(string email)
        {
            _email = email;
            return this;
        }

        public CreateUserRequestBuilder WithFirstName(string firstName)
        {
            _firstName = firstName;
            return this;
        }

        public CreateUserRequestBuilder WithLastName(string lastName)
        {
            _lastName = lastName;
            return this;
        }

        public CreateUserRequestBuilder WithPassword(string password)
        {
            _password = password;
            return this;
        }

        public CreateUserRequest Build()
        {
            return new CreateUserRequest(
                _employeeId,
                _email ?? $"test.{Guid.NewGuid():N}@example.com",
                _firstName ?? "Test",
                _lastName ?? "User",
                _password
            );
        }
    }

    public class CreateProductRequestBuilder
    {
        private string _name = "Test Product";
        private string? _description = "Test Description";
        private Guid _categoryId = Guid.NewGuid();
        private int _pointsCost = 100;
        private string? _imageUrl;
        private int? _initialStock = 10;

        public CreateProductRequestBuilder WithName(string name)
        {
            _name = name;
            return this;
        }

        public CreateProductRequestBuilder WithDescription(string description)
        {
            _description = description;
            return this;
        }

        public CreateProductRequestBuilder WithCategoryId(Guid categoryId)
        {
            _categoryId = categoryId;
            return this;
        }

        public CreateProductRequestBuilder WithPointsCost(int points)
        {
            _pointsCost = points;
            return this;
        }

        public CreateProductRequestBuilder WithImageUrl(string imageUrl)
        {
            _imageUrl = imageUrl;
            return this;
        }

        public CreateProductRequestBuilder WithInitialStock(int stock)
        {
            _initialStock = stock;
            return this;
        }

        public CreateProductRequest Build()
        {
            return new CreateProductRequest
            {
                Name = _name,
                Description = _description,
                CategoryId = _categoryId,
                PointsCost = _pointsCost,
                ImageUrl = _imageUrl,
                InitialStock = _initialStock
            };
        }
    }

    public class CreateEventRequestBuilder
    {
        private string _name = "Test Event";
        private DateTime _eventDate = DateTime.UtcNow.AddDays(1);
        private string _description = "Test Event Description";
        private DateTime _registrationEndDateUtc = DateTime.UtcNow.AddDays(1);
        private int? _totalPointsPool;
        private string? _location;
        private int? _maxParticipants;
        private string? _bannerImageUrl;

        public CreateEventRequestBuilder WithName(string name)
        {
            _name = name;
            return this;
        }

        public CreateEventRequestBuilder WithEventDate(DateTime date)
        {
            _eventDate = date;
            return this;
        }

        public CreateEventRequestBuilder WithDescription(string description)
        {
            _description = description;
            return this;
        }

        public CreateEventRequestBuilder WithRegistrationEndDate(DateTime date)
        {
            _registrationEndDateUtc = date;
            return this;
        }

        public CreateEventRequestBuilder WithTotalPointsPool(int points)
        {
            _totalPointsPool = points;
            return this;
        }

        public CreateEventRequestBuilder WithLocation(string location)
        {
            _location = location;
            return this;
        }

        public CreateEventRequestBuilder WithMaxParticipants(int max)
        {
            _maxParticipants = max;
            return this;
        }

        public CreateEventRequestBuilder WithBannerImageUrl(string url)
        {
            _bannerImageUrl = url;
            return this;
        }

        public CreateEventRequest Build()
        {
            return new CreateEventRequest
            {
                Name = _name,
                EventDate = _eventDate,
                Description = _description,
                RegistrationEndDateUtc = _registrationEndDateUtc,
                TotalPointsPool = _totalPointsPool,
                Location = _location,
                MaxParticipants = _maxParticipants,
                BannerImageUrl = _bannerImageUrl
            };
        }
    }

    /// <summary>
    /// Factory methods for common test data
    /// </summary>
    public static CreateUserRequestBuilder CreateValidUser() => new();

    public static CreateProductRequestBuilder CreateValidProduct() => new();

    public static CreateEventRequestBuilder CreateValidEvent() => new();

    public static CreateRedemptionRequest CreateValidRedemptionRequest(Guid productId, int quantity = 1)
    {
        return new CreateRedemptionRequest(productId, quantity);
    }

    public static LoginRequest CreateValidLoginRequest(string email, string password = "Test@123456")
    {
        return new LoginRequest(email, password);
    }

    public static AdjustPointsRequest CreateAdjustPointsRequest(Guid userId, int amount, string reason = "Test adjustment")
    {
        return new AdjustPointsRequest(userId, amount, reason);
    }
}
