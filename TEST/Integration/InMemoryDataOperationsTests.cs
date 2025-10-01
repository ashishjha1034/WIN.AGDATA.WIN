namespace IdentityTests.Integration
{
    public class InMemoryDataOperationsTests
    {
        private readonly UserService _userService;
        private readonly PointsService _pointsService;
        private readonly ProductService _productService;
        private readonly EventService _eventService;

        public InMemoryDataOperationsTests()
        {
            _userService = new UserService();
            _pointsService = new PointsService(_userService);
            _productService = new ProductService();
            _eventService = new EventService();
        }

        [Fact]
        public void CompleteWorkflow_CreateUserAllocatePointsRedeemProduct_ShouldWorkCorrectly()
        {
            // Arrange - Create user
            var user = _userService.CreateUser("EMP001", "john.doe@company.com", "John", "Doe");

            // Create product
            var product = _productService.CreateProduct("Gaming Mouse", "High precision gaming mouse", 500, 10);

            // Create event
            var prizeTiers = new List<PrizeTier> { new PrizeTier(1, 1000) };
            var eventObj = _eventService.CreateEvent("Sales Competition", "Monthly sales competition", DateTime.UtcNow.AddDays(30), prizeTiers);

            // Act - Allocate points to user
            _pointsService.AllocatePoints("EMP001", 600, eventObj.EventId, "Sales performance bonus");

            // Assert - Verify user has points
            var userBalance = _pointsService.GetUserPointsBalance("EMP001");
            userBalance.Should().Be(600);

            // Act - User can redeem product
            var updatedUser = _userService.GetUserByEmployeeId("EMP001");
            var canRedeem = product.CanBeRedeemedBy(updatedUser);
            canRedeem.Should().BeTrue();

            // Act - Simulate spending points for redemption
            var redemptionId = Guid.NewGuid();
            _pointsService.SpendPoints("EMP001", 500, redemptionId, "Gaming Mouse redemption");

            // Assert - Verify points were deducted
            var finalBalance = _pointsService.GetUserPointsBalance("EMP001");
            finalBalance.Should().Be(100);

            // Assert - Verify transaction history
            var transactions = _pointsService.GetUserTransactionHistory("EMP001");
            transactions.Should().HaveCount(2);
            transactions.Should().Contain(t => t.Points > 0); // Earning
            transactions.Should().Contain(t => t.Points < 0); // Spending
        }

        [Fact]
        public void DataConsistency_MultipleOperations_ShouldMaintainDataIntegrity()
        {
            // Arrange - Create multiple users
            var user1 = _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");
            var user2 = _userService.CreateUser("EMP002", "jane@company.com", "Jane", "Smith");
            var user3 = _userService.CreateUser("EMP003", "bob@company.com", "Bob", "Johnson");

            // Create multiple products
            var product1 = _productService.CreateProduct("Mouse", "Gaming mouse", 300, 5);
            var product2 = _productService.CreateProduct("Keyboard", "Mechanical keyboard", 500, 3);
            var product3 = _productService.CreateProduct("Headset", "Gaming headset", 700, 2);

            // Create event
            var prizeTiers = new List<PrizeTier>
            {
                new PrizeTier(1, 1000),
                new PrizeTier(2, 600),
                new PrizeTier(3, 300)
            };
            var eventObj = _eventService.CreateEvent("Quarterly Competition", "Q4 performance contest", DateTime.UtcNow.AddDays(30), prizeTiers);

            // Act - Allocate different points to users
            _pointsService.AllocatePoints("EMP001", 1000, eventObj.EventId, "Winner - Rank 1");
            _pointsService.AllocatePoints("EMP002", 600, eventObj.EventId, "Winner - Rank 2");
            _pointsService.AllocatePoints("EMP003", 300, eventObj.EventId, "Winner - Rank 3");

            // Act - Users make redemptions
            _pointsService.SpendPoints("EMP001", 300, Guid.NewGuid(), "Mouse redemption");
            _pointsService.SpendPoints("EMP002", 500, Guid.NewGuid(), "Keyboard redemption");
            _pointsService.SpendPoints("EMP003", 300, Guid.NewGuid(), "Headset redemption");

            // Assert - Verify all balances are correct
            _pointsService.GetUserPointsBalance("EMP001").Should().Be(700); // 1000 - 300
            _pointsService.GetUserPointsBalance("EMP002").Should().Be(100); // 600 - 500
            _pointsService.GetUserPointsBalance("EMP003").Should().Be(0);   // 300 - 300

            // Assert - Verify all users exist
            var allUsers = _userService.GetAllUsers();
            allUsers.Should().HaveCount(3);

            // Assert - Verify all products exist
            var allProducts = _productService.GetAllProducts();
            allProducts.Should().HaveCount(3);

            // Assert - Verify all events exist
            var allEvents = _eventService.GetAllEvents();
            allEvents.Should().HaveCount(1);
        }

        [Fact]
        public void ValidationRules_InvalidOperations_ShouldEnforceBusinessRules()
        {
            // Arrange
            var user = _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");
            var product = _productService.CreateProduct("Expensive Item", "Very expensive product", 10000, 1);

            // Act & Assert - User cannot redeem product with insufficient points
            var canRedeem = product.CanBeRedeemedBy(user);
            canRedeem.Should().BeFalse();

            // Act & Assert - Cannot spend more points than available
            var action = () => _pointsService.SpendPoints("EMP001", 100, Guid.NewGuid(), "Invalid redemption");
            action.Should().Throw<DomainException>().WithMessage("Insufficient points");

            // Act & Assert - Cannot create duplicate users
            var duplicateUserAction = () => _userService.CreateUser("EMP001", "different@company.com", "Different", "User");
            duplicateUserAction.Should().Throw<DomainException>().WithMessage("User with Employee ID EMP001 already exists");

            // Act & Assert - Cannot create user with duplicate email
            var duplicateEmailAction = () => _userService.CreateUser("EMP002", "john@company.com", "Another", "User");
            duplicateEmailAction.Should().Throw<DomainException>().WithMessage("User with email john@company.com already exists");
        }

        [Fact]
        public void ConcurrentOperations_ThreadSafety_ShouldHandleMultipleThreads()
        {
            // Arrange
            var user = _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");
            var eventId = "TEST001";
            var tasks = new List<Task>();

            // Act - Simulate concurrent point allocations
            for (int i = 0; i < 10; i++)
            {
                var taskId = i;
                tasks.Add(Task.Run(() =>
                {
                    _pointsService.AllocatePoints("EMP001", 10, eventId, $"Concurrent allocation {taskId}");
                }));
            }

            Task.WaitAll(tasks.ToArray());

            // Assert - All allocations should be processed
            var finalBalance = _pointsService.GetUserPointsBalance("EMP001");
            finalBalance.Should().Be(100); // 10 tasks * 10 points each

            var transactions = _pointsService.GetUserTransactionHistory("EMP001");
            transactions.Should().HaveCount(10); // All transactions should be recorded
        }

        [Fact]
        public void EventCompletion_WithWinners_ShouldUpdateEventStatus()
        {
            // Arrange
            var prizeTiers = new List<PrizeTier>
            {
                new PrizeTier(1, 1000),
                new PrizeTier(2, 500)
            };
            var eventObj = _eventService.CreateEvent("Test Competition", "Test competition description", DateTime.UtcNow.AddDays(30), prizeTiers);

            var winners = new List<Winner>
            {
                new Winner("winner1@company.com", 1, "Winner One"),
                new Winner("winner2@company.com", 2, "Winner Two")
            };

            // Act
            _eventService.CompleteEvent(eventObj.EventId, winners);

            // Assert
            var completedEvent = _eventService.GetEvent(eventObj.EventId);
            completedEvent.Status.IsCompleted.Should().BeTrue();
            completedEvent.Status.Winners.Should().HaveCount(2);
            completedEvent.Status.CompletedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(5));
        }
    }
}