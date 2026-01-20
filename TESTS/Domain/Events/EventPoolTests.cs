using FluentAssertions;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Exceptions;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Domain.Events;

/// <summary>
/// Unit tests for Event pool management and point distribution
/// </summary>
public class EventPoolTests
{
    private static Event CreateTestEvent(int? totalPointsPool = 1000)
    {
        return new Event(
            name: "Test Event",
            description: "Test Description",
            eventDate: DateTime.UtcNow.AddDays(7),
            totalPointsPool: totalPointsPool,
            location: "Test Location",
            maxParticipants: 100,
            registrationEndDate: DateTime.UtcNow.AddDays(5),
            bannerImageUrl: null);
    }

    #region Remaining Points Tests

    [Fact]
    public void RemainingPoints_WhenNoPointsDistributed_EqualsPool()
    {
        // Arrange
        var @event = CreateTestEvent(totalPointsPool: 1000);

        // Assert
        @event.RemainingPoints.Should().Be(1000);
        @event.DistributedPoints.Should().Be(0);
    }

    [Fact]
    public void RemainingPoints_WhenUnlimitedPool_ReturnsNull()
    {
        // Arrange
        var @event = CreateTestEvent(totalPointsPool: null);

        // Assert
        @event.RemainingPoints.Should().BeNull();
        @event.TotalPointsPool.Should().BeNull();
    }

    #endregion

    #region CanDistributePoints Tests

    [Theory]
    [InlineData(100, true)]
    [InlineData(1000, true)]
    [InlineData(1001, false)]
    public void CanDistributePoints_WithLimitedPool_EnforcesLimit(int requested, bool expected)
    {
        // Arrange
        var @event = CreateTestEvent(totalPointsPool: 1000);

        // Act & Assert
        @event.CanDistributePoints(requested).Should().Be(expected);
    }

    [Theory]
    [InlineData(1)]
    [InlineData(100)]
    [InlineData(1000000)]
    public void CanDistributePoints_WithUnlimitedPool_AlwaysAllows(int requested)
    {
        // Arrange
        var @event = CreateTestEvent(totalPointsPool: null);

        // Act & Assert
        @event.CanDistributePoints(requested).Should().BeTrue();
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    [InlineData(-100)]
    public void CanDistributePoints_WithNonPositivePoints_ReturnsFalse(int requested)
    {
        // Arrange
        var @event = CreateTestEvent(totalPointsPool: 1000);

        // Act & Assert
        @event.CanDistributePoints(requested).Should().BeFalse();
    }

    [Fact]
    public void CanDistributePoints_AfterPartialDistribution_EnforcesRemaining()
    {
        // Arrange
        var @event = CreateTestEvent(totalPointsPool: 1000);
        @event.ReservePoints(600); // 400 remaining

        // Act & Assert
        @event.CanDistributePoints(400).Should().BeTrue();
        @event.CanDistributePoints(401).Should().BeFalse();
    }

    #endregion

    #region ReservePoints Tests

    [Fact]
    public void ReservePoints_WithSufficientPool_UpdatesDistributed()
    {
        // Arrange
        var @event = CreateTestEvent(totalPointsPool: 1000);

        // Act
        @event.ReservePoints(100);
        @event.ReservePoints(200);

        // Assert
        @event.DistributedPoints.Should().Be(300);
        @event.RemainingPoints.Should().Be(700);
    }

    [Fact]
    public void ReservePoints_ExactlyRemainingPool_Succeeds()
    {
        // Arrange
        var @event = CreateTestEvent(totalPointsPool: 500);
        @event.ReservePoints(300);

        // Act
        @event.ReservePoints(200); // Exactly remaining

        // Assert
        @event.DistributedPoints.Should().Be(500);
        @event.RemainingPoints.Should().Be(0);
    }

    [Fact]
    public void ReservePoints_ExceedsRemaining_ThrowsDomainException()
    {
        // Arrange
        var @event = CreateTestEvent(totalPointsPool: 1000);
        @event.ReservePoints(800); // 200 remaining

        // Act & Assert
        var action = () => @event.ReservePoints(201);
        action.Should().Throw<DomainException>()
            .WithMessage("*Insufficient points*Requested: 201*Remaining: 200*");
    }

    [Fact]
    public void ReservePoints_WithUnlimitedPool_AlwaysSucceeds()
    {
        // Arrange
        var @event = CreateTestEvent(totalPointsPool: null);

        // Act
        @event.ReservePoints(1000000);

        // Assert
        @event.DistributedPoints.Should().Be(1000000);
        @event.RemainingPoints.Should().BeNull();
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public void ReservePoints_WithNonPositiveAmount_ThrowsDomainException(int amount)
    {
        // Arrange
        var @event = CreateTestEvent(totalPointsPool: 1000);

        // Act & Assert
        var action = () => @event.ReservePoints(amount);
        action.Should().Throw<DomainException>()
            .WithMessage("*positive*");
    }

    #endregion

    #region Integration with Award Flow

    [Fact]
    public void PoolEnforcement_MultipleAwards_TracksTotalCorrectly()
    {
        // Arrange
        var @event = CreateTestEvent(totalPointsPool: 500);

        // Act - simulate multiple awards
        @event.ReservePoints(100); // Award 1
        @event.ReservePoints(150); // Award 2
        @event.ReservePoints(200); // Award 3

        // Assert
        @event.DistributedPoints.Should().Be(450);
        @event.RemainingPoints.Should().Be(50);
        @event.CanDistributePoints(50).Should().BeTrue();
        @event.CanDistributePoints(51).Should().BeFalse();
    }

    [Fact]
    public void PoolEnforcement_DrainedPool_BlocksFurtherAwards()
    {
        // Arrange
        var @event = CreateTestEvent(totalPointsPool: 100);

        // Act
        @event.ReservePoints(100); // Drain pool

        // Assert
        @event.RemainingPoints.Should().Be(0);
        @event.CanDistributePoints(1).Should().BeFalse();
        
        var action = () => @event.ReservePoints(1);
        action.Should().Throw<DomainException>();
    }

    #endregion
}
