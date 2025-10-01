using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace IdentityTests.Domain.Entities.Events
{
    public class WinnerTests
    {
        [Fact]
        public void Constructor_WithValidInputs_ShouldCreateWinner()
        {
            // Arrange & Act
            var winner = new Winner("john.doe@company.com", 1, "John Doe");

            // Assert
            winner.EmployeeEmail.Should().Be("john.doe@company.com");
            winner.Rank.Should().Be(1);
            winner.EmployeeName.Should().Be("John Doe");
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("   ")]
        public void Constructor_WithInvalidEmail_ShouldThrowDomainException(string email)
        {
            // Act & Assert
            var action = () => new Winner(email, 1, "John Doe");
            action.Should().Throw<DomainException>().WithMessage("Employee email is required");
        }

        [Fact]
        public void Constructor_WithInvalidEmailFormat_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => new Winner("invalid-email", 1, "John Doe");
            action.Should().Throw<DomainException>().WithMessage("Invalid email format");
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-1)]
        public void Constructor_WithInvalidRank_ShouldThrowDomainException(int rank)
        {
            // Act & Assert
            var action = () => new Winner("john.doe@company.com", rank, "John Doe");
            action.Should().Throw<DomainException>().WithMessage("Winner rank must be positive");
        }

        [Fact]
        public void Constructor_WithEmptyEmployeeName_ShouldUseDefaultName()
        {
            // Act
            var winner = new Winner("john.doe@company.com", 1, "");

            // Assert
            winner.EmployeeName.Should().Be("Unknown");
        }

        [Fact]
        public void Constructor_WithNullEmployeeName_ShouldUseDefaultName()
        {
            // Act
            var winner = new Winner("john.doe@company.com", 1, null);

            // Assert
            winner.EmployeeName.Should().Be("Unknown");
        }

        [Fact]
        public void Equals_WithSameEmailAndRank_ShouldReturnTrue()
        {
            // Arrange
            var winner1 = new Winner("john.doe@company.com", 1, "John Doe");
            var winner2 = new Winner("john.doe@company.com", 1, "Different Name");

            // Act & Assert
            winner1.Equals(winner2).Should().BeTrue();
        }

        [Fact]
        public void Equals_WithDifferentEmail_ShouldReturnFalse()
        {
            // Arrange
            var winner1 = new Winner("john.doe@company.com", 1, "John Doe");
            var winner2 = new Winner("jane.smith@company.com", 1, "John Doe");

            // Act & Assert
            winner1.Equals(winner2).Should().BeFalse();
        }

        [Fact]
        public void Equals_WithDifferentRank_ShouldReturnFalse()
        {
            // Arrange
            var winner1 = new Winner("john.doe@company.com", 1, "John Doe");
            var winner2 = new Winner("john.doe@company.com", 2, "John Doe");

            // Act & Assert
            winner1.Equals(winner2).Should().BeFalse();
        }

        [Fact]
        public void GetHashCode_WithSameEmailAndRank_ShouldReturnSameHashCode()
        {
            // Arrange
            var winner1 = new Winner("john.doe@company.com", 1, "John Doe");
            var winner2 = new Winner("john.doe@company.com", 1, "Different Name");

            // Act & Assert
            winner1.GetHashCode().Should().Be(winner2.GetHashCode());
        }
    }
}