using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace IdentityTests.Domain.Entities.Events
{
    public class PrizeTierTests
    {
        [Fact]
        public void Constructor_WithValidInputs_ShouldCreatePrizeTier()
        {
            // Arrange & Act
            var prizeTier = new PrizeTier(1, 1000, "First Place Gold Medal");

            // Assert
            prizeTier.Rank.Should().Be(1);
            prizeTier.Points.Should().Be(1000);
            prizeTier.Description.Should().Be("First Place Gold Medal");
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-1)]
        [InlineData(6)]  // Max is 5
        public void Constructor_WithInvalidRank_ShouldThrowDomainException(int rank)
        {
            // Act & Assert
            var action = () => new PrizeTier(rank, 1000, "Description");
            action.Should().Throw<DomainException>().WithMessage("Prize rank must be between 1 and 5");
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-100)]
        public void Constructor_WithInvalidPoints_ShouldThrowDomainException(int points)
        {
            // Act & Assert
            var action = () => new PrizeTier(1, points, "Description");
            action.Should().Throw<DomainException>().WithMessage("Prize points must be positive");
        }

        [Fact]
        public void Constructor_WithExcessivePoints_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => new PrizeTier(1, 20000, "Description");
            action.Should().Throw<DomainException>().WithMessage("Prize points cannot exceed 10,000");
        }

        [Fact]
        public void Constructor_WithEmptyDescription_ShouldUseDefaultDescription()
        {
            // Act
            var prizeTier = new PrizeTier(2, 500);

            // Assert
            prizeTier.Description.Should().Be("Rank 2 Prize");
        }

        [Fact]
        public void Constructor_WithNullDescription_ShouldUseDefaultDescription()
        {
            // Act
            var prizeTier = new PrizeTier(3, 250, null);

            // Assert
            prizeTier.Description.Should().Be("Rank 3 Prize");
        }

        [Fact]
        public void Equals_WithSameRank_ShouldReturnTrue()
        {
            // Arrange
            var tier1 = new PrizeTier(1, 1000, "First Place");
            var tier2 = new PrizeTier(1, 500, "Different Description");

            // Act & Assert
            tier1.Equals(tier2).Should().BeTrue();
        }

        [Fact]
        public void Equals_WithDifferentRank_ShouldReturnFalse()
        {
            // Arrange
            var tier1 = new PrizeTier(1, 1000, "First Place");
            var tier2 = new PrizeTier(2, 1000, "First Place");

            // Act & Assert
            tier1.Equals(tier2).Should().BeFalse();
        }

        [Fact]
        public void GetHashCode_WithSameRank_ShouldReturnSameHashCode()
        {
            // Arrange
            var tier1 = new PrizeTier(1, 1000, "First Place");
            var tier2 = new PrizeTier(1, 500, "Different Description");

            // Act & Assert
            tier1.GetHashCode().Should().Be(tier2.GetHashCode());
        }
    }
}