using WIN.AGDATA.WIN.Domain.Exceptions;

namespace IdentityTests.Domain.Entities.Transactions
{
    public class PointsEarningTests
    {
        [Fact]
        public void Constructor_WithValidInputs_ShouldCreatePointsEarning()
        {
            // Arrange & Act
            var earning = new PointsEarning("EMP001", 100, "EVT001", "Monthly performance bonus");

            // Assert
            earning.EmployeeId.Should().Be("EMP001");
            earning.Points.Should().Be(100);
            earning.EventId.Should().Be("EVT001");
            earning.Description.Should().Be("Monthly performance bonus");
        }

        [Fact]
        public void Constructor_WithNegativePoints_ShouldCreateEarningWithPositivePoints()
        {
            // Arrange & Act
            var earning = new PointsEarning("EMP001", -100, "EVT001", "Bonus");

            // Assert
            earning.Points.Should().Be(100); // Should be converted to positive
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("   ")]
        public void Constructor_WithInvalidEventId_ShouldThrowDomainException(string eventId)
        {
            // Act & Assert
            var action = () => new PointsEarning("EMP001", 100, eventId, "Bonus");
            action.Should().Throw<DomainException>().WithMessage("Event ID is required for points earning");
        }

        [Fact]
        public void Constructor_ShouldGenerateUniqueId()
        {
            // Arrange & Act
            var earning1 = new PointsEarning("EMP001", 100, "EVT001", "Bonus 1");
            var earning2 = new PointsEarning("EMP002", 200, "EVT002", "Bonus 2");

            // Assert
            earning1.Id.Should().NotBe(earning2.Id);
            earning1.Id.Should().NotBe(Guid.Empty);
            earning2.Id.Should().NotBe(Guid.Empty);
        }
    }
}