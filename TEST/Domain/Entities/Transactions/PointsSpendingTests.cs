using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;

namespace IdentityTests.Domain.Entities.Transactions
{
    public class PointsSpendingTests
    {
        [Fact]
        public void Constructor_WithValidInputs_ShouldCreatePointsSpending()
        {
            // Arrange
            var redemptionId = Guid.NewGuid();

            // Act
            var spending = new PointsSpending("EMP001", 100, redemptionId, "Product redemption");

            // Assert
            spending.EmployeeId.Should().Be("EMP001");
            spending.Points.Should().Be(-100); // Should be negative for spending
            spending.RedemptionId.Should().Be(redemptionId);
            spending.Description.Should().Be("Product redemption");
        }

        [Fact]
        public void Constructor_WithPositivePoints_ShouldCreateSpendingWithNegativePoints()
        {
            // Arrange
            var redemptionId = Guid.NewGuid();

            // Act
            var spending = new PointsSpending("EMP001", 100, redemptionId, "Redemption");

            // Assert
            spending.Points.Should().Be(-100); // Should be converted to negative
        }

        [Fact]
        public void Constructor_WithEmptyRedemptionId_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => new PointsSpending("EMP001", 100, Guid.Empty, "Redemption");
            action.Should().Throw<DomainException>().WithMessage("Redemption ID is required for points spending");
        }

        [Fact]
        public void Constructor_ShouldGenerateUniqueId()
        {
            // Arrange
            var redemptionId1 = Guid.NewGuid();
            var redemptionId2 = Guid.NewGuid();

            // Act
            var spending1 = new PointsSpending("EMP001", 100, redemptionId1, "Redemption 1");
            var spending2 = new PointsSpending("EMP002", 200, redemptionId2, "Redemption 2");

            // Assert
            spending1.Id.Should().NotBe(spending2.Id);
            spending1.Id.Should().NotBe(Guid.Empty);
            spending2.Id.Should().NotBe(Guid.Empty);
        }
    }
}