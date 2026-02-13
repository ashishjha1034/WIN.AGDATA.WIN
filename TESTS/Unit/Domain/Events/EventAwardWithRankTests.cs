using FluentAssertions;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Domain.Events;

/// <summary>
/// Tests for EventParticipant awarding with rank support
/// </summary>
public class EventAwardWithRankTests
{
    [Fact]
    public void AwardPoints_WithRank_SetsRankCorrectly()
    {
        // Arrange
        var participant = new EventParticipant(Guid.NewGuid(), Guid.NewGuid());
        participant.MarkCheckedIn();
        var adminId = Guid.NewGuid();

        // Act
        participant.AwardPoints(points: Points.Create(500), rank: 1, awardedBy: adminId);

        // Assert
        participant.PointsAwarded.Should().Be(Points.Create(500));
        participant.Rank.Should().Be(1);
        participant.AwardedBy.Should().Be(adminId);
        participant.AwardedAt.Should().NotBeNull();
    }

    [Fact]
    public void AwardPoints_WithoutRank_LeavesRankNull()
    {
        // Arrange
        var participant = new EventParticipant(Guid.NewGuid(), Guid.NewGuid());
        participant.MarkCheckedIn();

        // Act
        participant.AwardPoints(points: Points.Create(100), rank: null, awardedBy: Guid.NewGuid());

        // Assert
        participant.PointsAwarded.Should().Be(Points.Create(100));
        participant.Rank.Should().BeNull();
    }

    [Theory]
    [InlineData(1)]
    [InlineData(2)]
    [InlineData(3)]
    [InlineData(10)]
    [InlineData(100)]
    public void AwardPoints_VariousRanks_AllSucceed(int rank)
    {
        // Arrange
        var participant = new EventParticipant(Guid.NewGuid(), Guid.NewGuid());
        participant.MarkCheckedIn();

        // Act
        participant.AwardPoints(points: Points.Create(100), rank: rank, awardedBy: Guid.NewGuid());

        // Assert
        participant.Rank.Should().Be(rank);
    }

    [Fact]
    public void AwardPoints_Twice_ThrowsEvenWithDifferentRank()
    {
        // Arrange
        var participant = new EventParticipant(Guid.NewGuid(), Guid.NewGuid());
        participant.MarkCheckedIn();
        participant.AwardPoints(Points.Create(100), rank: 1, Guid.NewGuid());

        // Act & Assert
        var action = () => participant.AwardPoints(Points.Create(50), rank: 2, Guid.NewGuid());
        action.Should().Throw<DomainException>()
            .WithMessage("*already been awarded*");
    }

    [Fact]
    public void AwardPoints_NotCheckedIn_ThrowsRegardlessOfRank()
    {
        // Arrange
        var participant = new EventParticipant(Guid.NewGuid(), Guid.NewGuid());
        // Not checked in

        // Act & Assert
        var action = () => participant.AwardPoints(Points.Create(100), rank: 1, Guid.NewGuid());
        action.Should().Throw<DomainException>()
            .WithMessage("*must be checked-in*");
    }

    [Fact]
    public void AwardPoints_SetsAwardedAtAndBy()
    {
        // Arrange
        var participant = new EventParticipant(Guid.NewGuid(), Guid.NewGuid());
        participant.MarkCheckedIn();
        var adminId = Guid.NewGuid();
        var beforeAward = DateTime.UtcNow;

        // Act
        participant.AwardPoints(Points.Create(100), rank: 5, adminId);

        // Assert
        participant.AwardedAt.Should().NotBeNull();
        participant.AwardedAt.Should().BeOnOrAfter(beforeAward);
        participant.AwardedBy.Should().Be(adminId);
    }
}
