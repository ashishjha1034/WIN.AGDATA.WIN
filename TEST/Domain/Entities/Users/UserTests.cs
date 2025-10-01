using WIN.AGDATA.WIN.Domain.Exceptions;

namespace IdentityTests.Domain.Entities.Users
{
    public class UserTests
    {
        [Fact]
        public void Constructor_WithValidInputs_ShouldCreateUser()
        {
            // Arrange
            var employeeId = "EMP001";
            var email = "test@company.com";
            var firstName = "John";
            var lastName = "Doe";

            // Act
            var user = new User(employeeId, email, firstName, lastName);

            // Assert
            user.Identity.EmployeeId.Should().Be("EMP001");
            user.Identity.Email.Should().Be("test@company.com");
            user.Identity.FirstName.Should().Be("John");
            user.Identity.LastName.Should().Be("Doe");
            user.Status.IsActive.Should().BeTrue();
            user.Points.Balance.Should().Be(0);
        }

        [Fact]
        public void AddPoints_WithValidPointsAndReason_ShouldIncreaseBalance()
        {
            // Arrange
            var user = new User("EMP001", "test@company.com", "John", "Doe");

            // Act
            user.AddPoints(100, "Monthly bonus");

            // Assert
            user.Points.Balance.Should().Be(100);
        }

        [Fact]
        public void DeductPoints_WithValidPointsAndReason_ShouldDecreaseBalance()
        {
            // Arrange
            var user = new User("EMP001", "test@company.com", "John", "Doe");
            user.AddPoints(100, "Initial bonus");

            // Act
            user.DeductPoints(30, "Product redemption");

            // Assert
            user.Points.Balance.Should().Be(70);
        }

        [Fact]
        public void UpdateEmail_WithValidEmail_ShouldUpdateUserEmail()
        {
            // Arrange
            var user = new User("EMP001", "old@company.com", "John", "Doe");

            // Act
            user.UpdateEmail("new@company.com");

            // Assert
            user.Identity.Email.Should().Be("new@company.com");
        }

        [Fact]
        public void Deactivate_ShouldDeactivateUser()
        {
            // Arrange
            var user = new User("EMP001", "test@company.com", "John", "Doe");

            // Act
            user.Deactivate();

            // Assert
            user.Status.IsActive.Should().BeFalse();
        }

        [Fact]
        public void Reactivate_ShouldReactivateUser()
        {
            // Arrange
            var user = new User("EMP001", "test@company.com", "John", "Doe");
            user.Deactivate();

            // Act
            user.Reactivate();

            // Assert
            user.Status.IsActive.Should().BeTrue();
        }

        [Theory]
        [InlineData(100, 50, true)]  // Has enough points and is active
        [InlineData(100, 150, false)] // Insufficient points
        [InlineData(0, 50, false)]   // No points
        public void CanRedeem_WithVariousConditions_ShouldReturnExpectedResult(int userPoints, int requiredPoints, bool expectedResult)
        {
            // Arrange
            var user = new User("EMP001", "test@company.com", "John", "Doe");
            if (userPoints > 0)
                user.AddPoints(userPoints, "Test points");

            // Act
            var result = user.CanRedeem(requiredPoints);

            // Assert
            result.Should().Be(expectedResult);
        }

        [Fact]
        public void CanRedeem_WhenInactive_ShouldReturnFalse()
        {
            // Arrange
            var user = new User("EMP001", "test@company.com", "John", "Doe");
            user.AddPoints(100, "Test points");
            user.Deactivate();

            // Act
            var result = user.CanRedeem(50);

            // Assert
            result.Should().BeFalse();
        }
    }
}