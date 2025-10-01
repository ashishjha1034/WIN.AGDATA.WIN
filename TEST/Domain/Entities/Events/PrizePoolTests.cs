using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace IdentityTests.Domain.Entities.Events
{
    public class PrizePoolTests
    {
        [Fact]
        public void Constructor_WithValidTiers_ShouldCreatePrizePool()
        {
            // Arrange
            var tiers = new List<PrizeTier>
            {
                new PrizeTier(1, 1000, "First Place"),
                new PrizeTier(2, 500, "Second Place"),
                new PrizeTier(3, 250, "Third Place")
            };

            // Act
            var prizePool = new PrizePool(tiers);

            // Assert
            prizePool.Tiers.Should().HaveCount(3);
            prizePool.Tiers[0].Rank.Should().Be(1);
            prizePool.Tiers[1].Rank.Should().Be(2);
            prizePool.Tiers[2].Rank.Should().Be(3);
        }

        [Fact]
        public void Constructor_WithEmptyTiers_ShouldThrowDomainException()
        {
            // Arrange
            var tiers = new List<PrizeTier>();

            // Act & Assert
            var action = () => new PrizePool(tiers);
            action.Should().Throw<DomainException>().WithMessage("At least one prize tier required");
        }

        [Fact]
        public void Constructor_WithTooManyTiers_ShouldThrowDomainException()
        {
            // Arrange
            var tiers = new List<PrizeTier>
            {
                new PrizeTier(1, 1000),
                new PrizeTier(2, 800),
                new PrizeTier(3, 600),
                new PrizeTier(4, 400),
                new PrizeTier(5, 200),
                new PrizeTier(6, 100) // This exceeds the limit
            };

            // Act & Assert
            var action = () => new PrizePool(tiers);
            action.Should().Throw<DomainException>().WithMessage("Maximum 5 prize tiers allowed");
        }

        [Fact]
        public void Constructor_WithNonSequentialRanks_ShouldThrowDomainException()
        {
            // Arrange
            var tiers = new List<PrizeTier>
            {
                new PrizeTier(1, 1000),
                new PrizeTier(3, 500) // Missing rank 2
            };

            // Act & Assert
            var action = () => new PrizePool(tiers);
            action.Should().Throw<DomainException>().WithMessage("Prize ranks must be sequential starting from 1");
        }

        [Fact]
        public void AddTier_WithValidTier_ShouldAddTierAndMaintainOrder()
        {
            // Arrange
            var tiers = new List<PrizeTier>
            {
                new PrizeTier(1, 1000),
                new PrizeTier(3, 250)
            };
            var prizePool = new PrizePool(tiers);

            // Act
            prizePool.AddTier(new PrizeTier(2, 500));

            // Assert
            prizePool.Tiers.Should().HaveCount(3);
            prizePool.Tiers[0].Rank.Should().Be(1);
            prizePool.Tiers[1].Rank.Should().Be(2);
            prizePool.Tiers[2].Rank.Should().Be(3);
        }

        [Fact]
        public void AddTier_WithDuplicateRank_ShouldThrowDomainException()
        {
            // Arrange
            var tiers = new List<PrizeTier>
            {
                new PrizeTier(1, 1000),
                new PrizeTier(2, 500)
            };
            var prizePool = new PrizePool(tiers);

            // Act & Assert
            var action = () => prizePool.AddTier(new PrizeTier(1, 800));
            action.Should().Throw<DomainException>().WithMessage("Prize tier for rank 1 already exists");
        }

        [Fact]
        public void RemoveTier_WithExistingRank_ShouldRemoveTier()
        {
            // Arrange
            var tiers = new List<PrizeTier>
            {
                new PrizeTier(1, 1000),
                new PrizeTier(2, 500),
                new PrizeTier(3, 250)
            };
            var prizePool = new PrizePool(tiers);

            // Act
            prizePool.RemoveTier(2);

            // Assert
            prizePool.Tiers.Should().HaveCount(2);
            prizePool.Tiers.Should().NotContain(t => t.Rank == 2);
        }

        [Fact]
        public void GetPoints_WithExistingRank_ShouldReturnPoints()
        {
            // Arrange
            var tiers = new List<PrizeTier>
            {
                new PrizeTier(1, 1000),
                new PrizeTier(2, 500)
            };
            var prizePool = new PrizePool(tiers);

            // Act
            var points = prizePool.GetPoints(1);

            // Assert
            points.Should().Be(1000);
        }

        [Fact]
        public void GetPoints_WithNonExistingRank_ShouldReturnNull()
        {
            // Arrange
            var tiers = new List<PrizeTier>
            {
                new PrizeTier(1, 1000),
                new PrizeTier(2, 500)
            };
            var prizePool = new PrizePool(tiers);

            // Act
            var points = prizePool.GetPoints(5);

            // Assert
            points.Should().BeNull();
        }
    }
}