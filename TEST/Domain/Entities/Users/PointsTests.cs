using WIN.AGDATA.WIN.Domain.Exceptions;

namespace IdentityTests.Domain.Entities.Users
{
    public class PointsTests
    {
        [Fact]
        public void Constructor_WithValidInitialBalance_ShouldCreatePoints()
        {
            // Arrange & Act
            var points = new Points(100);

            // Assert
            points.Balance.Should().Be(100);
            points.LastUpdated.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
        }

        [Fact]
        public void Constructor_WithDefaultBalance_ShouldCreatePointsWithZeroBalance()
        {
            // Arrange & Act
            var points = new Points();

            // Assert
            points.Balance.Should().Be(0);
        }

        [Fact]
        public void Constructor_WithNegativeBalance_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => new Points(-10);
            action.Should().Throw<DomainException>().WithMessage("Balance cannot be negative");
        }

        [Fact]
        public void Add_WithValidPoints_ShouldIncreaseBalance()
        {
            // Arrange
            var points = new Points(100);
            var initialTime = points.LastUpdated;

            // Act
            points.Add(50);

            // Assert
            points.Balance.Should().Be(150);
            points.LastUpdated.Should().BeAfter(initialTime);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-10)]
        public void Add_WithInvalidPoints_ShouldThrowDomainException(int pointsToAdd)
        {
            // Arrange
            var points = new Points(100);

            // Act & Assert
            var action = () => points.Add(pointsToAdd);
            action.Should().Throw<DomainException>().WithMessage("Points must be positive");
        }

        [Fact]
        public void Deduct_WithValidPoints_ShouldDecreaseBalance()
        {
            // Arrange
            var points = new Points(100);
            var initialTime = points.LastUpdated;

            // Act
            points.Deduct(30);

            // Assert
            points.Balance.Should().Be(70);
            points.LastUpdated.Should().BeAfter(initialTime);
        }

        [Fact]
        public void Deduct_WithInsufficientBalance_ShouldThrowDomainException()
        {
            // Arrange
            var points = new Points(50);

            // Act & Assert
            var action = () => points.Deduct(100);
            action.Should().Throw<DomainException>().WithMessage("Insufficient points");
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-10)]
        public void Deduct_WithInvalidPoints_ShouldThrowDomainException(int pointsToDeduct)
        {
            // Arrange
            var points = new Points(100);

            // Act & Assert
            var action = () => points.Deduct(pointsToDeduct);
            action.Should().Throw<DomainException>().WithMessage("Points must be positive");
        }
    }
}