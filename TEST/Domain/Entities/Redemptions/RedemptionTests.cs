using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace IdentityTests.Domain.Entities.Redemptions
{
    public class RedemptionTests
    {
        [Fact]
        public void Constructor_WithValidInputs_ShouldCreateRedemption()
        {
            // Arrange
            var productId = Guid.NewGuid();

            // Act
            var redemption = new Redemption("EMP001", productId, 500);

            // Assert
            redemption.Id.Should().NotBe(Guid.Empty);
            redemption.EmployeeId.Should().Be("EMP001");
            redemption.ProductId.Should().Be(productId);
            redemption.PointsCost.Should().Be(500);
            redemption.RequestedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("   ")]
        public void Constructor_WithInvalidEmployeeId_ShouldThrowDomainException(string employeeId)
        {
            // Arrange
            var productId = Guid.NewGuid();

            // Act & Assert
            var action = () => new Redemption(employeeId, productId, 500);
            action.Should().Throw<DomainException>().WithMessage("Employee ID is required");
        }

        [Fact]
        public void Constructor_WithEmptyProductId_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => new Redemption("EMP001", Guid.Empty, 500);
            action.Should().Throw<DomainException>().WithMessage("Product ID is required");
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-100)]
        public void Constructor_WithInvalidPointsCost_ShouldThrowDomainException(int pointsCost)
        {
            // Arrange
            var productId = Guid.NewGuid();

            // Act & Assert
            var action = () => new Redemption("EMP001", productId, pointsCost);
            action.Should().Throw<DomainException>().WithMessage("Points cost must be positive");
        }

        [Fact]
        public void Constructor_ShouldTrimAndUpperCaseEmployeeId()
        {
            // Arrange
            var productId = Guid.NewGuid();

            // Act
            var redemption = new Redemption("  emp001  ", productId, 500);

            // Assert
            redemption.EmployeeId.Should().Be("EMP001");
        }

        [Fact]
        public void Constructor_ShouldGenerateUniqueId()
        {
            // Arrange
            var productId1 = Guid.NewGuid();
            var productId2 = Guid.NewGuid();

            // Act
            var redemption1 = new Redemption("EMP001", productId1, 500);
            var redemption2 = new Redemption("EMP002", productId2, 300);

            // Assert
            redemption1.Id.Should().NotBe(redemption2.Id);
            redemption1.Id.Should().NotBe(Guid.Empty);
            redemption2.Id.Should().NotBe(Guid.Empty);
        }
    }
}