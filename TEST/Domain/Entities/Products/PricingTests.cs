using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace IdentityTests.Domain.Entities.Products
{
    public class PricingTests
    {
        [Fact]
        public void Constructor_WithValidPoints_ShouldCreatePricing()
        {
            // Arrange & Act
            var pricing = new Pricing(500);

            // Assert
            pricing.RequiredPoints.Should().Be(500);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-10)]
        public void Constructor_WithInvalidPoints_ShouldThrowDomainException(int points)
        {
            // Act & Assert
            var action = () => new Pricing(points);
            action.Should().Throw<DomainException>().WithMessage("Required points must be positive");
        }

        [Fact]
        public void Constructor_WithExcessivePoints_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => new Pricing(200000);
            action.Should().Throw<DomainException>().WithMessage("Required points cannot exceed 100,000");
        }

        [Fact]
        public void UpdatePoints_WithValidPoints_ShouldUpdateRequiredPoints()
        {
            // Arrange
            var pricing = new Pricing(500);

            // Act
            pricing.UpdatePoints(1000);

            // Assert
            pricing.RequiredPoints.Should().Be(1000);
        }

        [Theory]
        [InlineData(1000, 1500, true)]   // User has more points
        [InlineData(1000, 1000, true)]   // User has exact points
        [InlineData(1000, 500, false)]   // User has fewer points
        public void CanAfford_WithVariousUserPoints_ShouldReturnExpectedResult(int userPoints, int requiredPoints, bool expectedResult)
        {
            // Arrange
            var pricing = new Pricing(requiredPoints);

            // Act
            var result = pricing.CanAfford(userPoints);

            // Assert
            result.Should().Be(expectedResult);
        }
    }
}