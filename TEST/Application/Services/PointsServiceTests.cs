using WIN.AGDATA.WIN.Application.Services;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace IdentityTests.Application.Services
{
    public class PointsServiceTests
    {
        private readonly UserService _userService;
        private readonly PointsService _pointsService;

        public PointsServiceTests()
        {
            _userService = new UserService();
            _pointsService = new PointsService(_userService);
        }

        [Fact]
        public void AllocatePoints_WithValidInputs_ShouldAllocatePointsAndCreateTransaction()
        {
            // Arrange
            var user = _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");

            // Act
            _pointsService.AllocatePoints("EMP001", 100, "EVT001", "Monthly bonus");

            // Assert
            var updatedUser = _userService.GetUserByEmployeeId("EMP001");
            updatedUser.Points.Balance.Should().Be(100);

            var transactions = _pointsService.GetUserTransactionHistory("EMP001");
            transactions.Should().HaveCount(1);
            transactions[0].Points.Should().Be(100);
            transactions[0].Description.Should().Contain("Monthly bonus");
        }

        [Fact]
        public void AllocatePoints_WithNonExistentUser_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => _pointsService.AllocatePoints("NONEXISTENT", 100, "EVT001", "Bonus");
            action.Should().Throw<DomainException>().WithMessage("User with Employee ID NONEXISTENT not found");
        }

        [Fact]
        public void AllocatePoints_WithInactiveUser_ShouldThrowDomainException()
        {
            // Arrange
            _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");
            _userService.DeactivateUser("EMP001");

            // Act & Assert
            var action = () => _pointsService.AllocatePoints("EMP001", 100, "EVT001", "Bonus");
            action.Should().Throw<DomainException>().WithMessage("Cannot allocate points to inactive user: EMP001");
        }

        [Fact]
        public void SpendPoints_WithValidInputs_ShouldSpendPointsAndCreateTransaction()
        {
            // Arrange
            var user = _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");
            _pointsService.AllocatePoints("EMP001", 200, "EVT001", "Initial bonus");
            var redemptionId = Guid.NewGuid();

            // Act
            _pointsService.SpendPoints("EMP001", 100, redemptionId, "Product redemption");

            // Assert
            var updatedUser = _userService.GetUserByEmployeeId("EMP001");
            updatedUser.Points.Balance.Should().Be(100);

            var transactions = _pointsService.GetUserTransactionHistory("EMP001");
            transactions.Should().HaveCount(2);
            transactions.Should().Contain(t => t.Points < 0); // Should have spending transaction
        }

        [Fact]
        public void SpendPoints_WithNonExistentUser_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => _pointsService.SpendPoints("NONEXISTENT", 100, Guid.NewGuid(), "Redemption");
            action.Should().Throw<DomainException>().WithMessage("User with Employee ID NONEXISTENT not found");
        }

        [Fact]
        public void SpendPoints_WithInactiveUser_ShouldThrowDomainException()
        {
            // Arrange
            var user = _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");
            _pointsService.AllocatePoints("EMP001", 200, "EVT001", "Initial bonus");
            _userService.DeactivateUser("EMP001");

            // Act & Assert
            var action = () => _pointsService.SpendPoints("EMP001", 100, Guid.NewGuid(), "Redemption");
            action.Should().Throw<DomainException>().WithMessage("Cannot spend points for inactive user: EMP001");
        }

        [Fact]
        public void GetUserTransactionHistory_WithExistingUser_ShouldReturnTransactionHistory()
        {
            // Arrange
            _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");
            _pointsService.AllocatePoints("EMP001", 100, "EVT001", "Bonus 1");
            _pointsService.AllocatePoints("EMP001", 50, "EVT002", "Bonus 2");
            _pointsService.SpendPoints("EMP001", 30, Guid.NewGuid(), "Redemption");

            // Act
            var transactions = _pointsService.GetUserTransactionHistory("EMP001");

            // Assert
            transactions.Should().HaveCount(3);
            transactions.Should().BeInDescendingOrder(t => t.TransactionDate);
        }

        [Fact]
        public void GetUserTransactionHistory_WithNonExistentUser_ShouldReturnEmptyList()
        {
            // Act
            var transactions = _pointsService.GetUserTransactionHistory("NONEXISTENT");

            // Assert
            transactions.Should().BeEmpty();
        }

        [Fact]
        public void GetUserPointsBalance_WithExistingUser_ShouldReturnCurrentBalance()
        {
            // Arrange
            _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");
            _pointsService.AllocatePoints("EMP001", 200, "EVT001", "Initial bonus");
            _pointsService.SpendPoints("EMP001", 50, Guid.NewGuid(), "Redemption");

            // Act
            var balance = _pointsService.GetUserPointsBalance("EMP001");

            // Assert
            balance.Should().Be(150);
        }

        [Fact]
        public void GetUserPointsBalance_WithNonExistentUser_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => _pointsService.GetUserPointsBalance("NONEXISTENT");
            action.Should().Throw<DomainException>().WithMessage("User with Employee ID NONEXISTENT not found");
        }
    }
}