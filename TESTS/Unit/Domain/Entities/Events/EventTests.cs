using FluentAssertions;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.Tests.Domain.Entities.Events;

/// <summary>
/// Unit tests for Event entity.
/// Tests lifecycle transitions, registration, check-in, and points distribution.
/// </summary>
[Trait("Category", "Unit")]
[Trait("Component", "Domain")]
public class EventTests
{
    // Admin ID used for lifecycle transitions
    private static readonly Guid AdminId = Guid.NewGuid();

    #region Creation Tests

    [Fact]
    public void Create_WithValidData_CreatesEventInDraftStatus()
    {
        // Arrange & Act
        var @event = CreateEvent("Test Event");

        // Assert
        @event.Name.Should().Be("Test Event");
        @event.Status.Should().Be(EventStatus.Draft);
        @event.Participants.Should().BeEmpty();
        @event.DistributedPoints.Should().Be(Points.Zero);
    }

    [Fact]
    public void Create_WithPointsPool_SetsPoolCorrectly()
    {
        // Arrange
        var pool = Points.Create(5000);

        // Act
        var @event = new Event(
            "Pool Event",
            "Description for testing",
            DateTime.UtcNow.AddDays(10),
            pool,
            "Location",
            100,
            DateTime.UtcNow.AddDays(5),
            null);

        // Assert
        @event.TotalPointsPool.Should().Be(pool);
        @event.RemainingPoints.Should().Be(pool);
    }

    [Fact]
    public void Create_WithNullPool_HasUnlimitedPool()
    {
        // Act
        var @event = new Event(
            "Unlimited Pool Event",
            "Description for testing",
            DateTime.UtcNow.AddDays(10),
            null,
            "Location",
            100,
            DateTime.UtcNow.AddDays(5),
            null);

        // Assert
        @event.TotalPointsPool.Should().BeNull();
        @event.RemainingPoints.Should().BeNull();
    }

    #endregion

    #region Lifecycle Guard Tests

    [Fact]
    public void CanEdit_WhenDraft_ReturnsTrue()
    {
        var @event = CreateEvent("Draft Event");
        
        @event.CanEdit().Should().BeTrue();
    }

    [Fact]
    public void CanEdit_WhenActive_ReturnsFalse()
    {
        var @event = CreateEvent("Active Event");
        @event.Activate(AdminId);
        
        @event.CanEdit().Should().BeFalse();
    }

    [Fact]
    public void CanEdit_WhenCompleted_ReturnsFalse()
    {
        var @event = CreateEvent("Completed Event");
        @event.Activate(AdminId);
        @event.Complete(AdminId);
        
        @event.CanEdit().Should().BeFalse();
    }

    [Fact]
    public void CanActivate_WhenDraft_ReturnsTrue()
    {
        var @event = CreateEvent("Draft Event");
        
        @event.CanActivate().Should().BeTrue();
    }

    [Fact]
    public void CanActivate_WhenActive_ReturnsFalse()
    {
        var @event = CreateEvent("Active Event");
        @event.Activate(AdminId);
        
        @event.CanActivate().Should().BeFalse();
    }

    [Fact]
    public void CanComplete_WhenActive_ReturnsTrue()
    {
        var @event = CreateEvent("Active Event");
        @event.Activate(AdminId);
        
        @event.CanComplete().Should().BeTrue();
    }

    [Fact]
    public void CanComplete_WhenDraft_ReturnsFalse()
    {
        var @event = CreateEvent("Draft Event");
        
        @event.CanComplete().Should().BeFalse();
    }

    [Fact]
    public void CanCancel_WhenDraft_ReturnsTrue()
    {
        var @event = CreateEvent("Draft Event");
        
        @event.CanCancel().Should().BeTrue();
    }

    [Fact]
    public void CanCancel_WhenActive_ReturnsFalse()
    {
        var @event = CreateEvent("Active Event");
        @event.Activate(AdminId);
        
        @event.CanCancel().Should().BeFalse();
    }

    #endregion

    #region Lifecycle Transition Tests

    [Fact]
    public void Activate_FromDraft_TransitionsToActive()
    {
        // Arrange
        var @event = CreateEvent("Draft Event");

        // Act
        @event.Activate(AdminId);

        // Assert
        @event.Status.Should().Be(EventStatus.Active);
    }

    [Fact]
    public void Activate_FromActive_ThrowsException()
    {
        // Arrange
        var @event = CreateEvent("Active Event");
        @event.Activate(AdminId);

        // Act & Assert
        var act = () => @event.Activate(AdminId);
        act.Should().Throw<InvalidStatusTransitionException>();
    }

    [Fact]
    public void Complete_FromActive_TransitionsToCompleted()
    {
        // Arrange
        var @event = CreateEvent("Active Event");
        @event.Activate(AdminId);

        // Act
        @event.Complete(AdminId);

        // Assert
        @event.Status.Should().Be(EventStatus.Completed);
    }

    [Fact]
    public void Complete_FromDraft_ThrowsException()
    {
        // Arrange
        var @event = CreateEvent("Draft Event");

        // Act & Assert
        var act = () => @event.Complete(AdminId);
        act.Should().Throw<InvalidStatusTransitionException>();
    }

    [Fact]
    public void Cancel_FromDraft_TransitionsToCancelled()
    {
        // Arrange
        var @event = CreateEvent("Draft Event");

        // Act
        @event.Cancel(AdminId);

        // Assert
        @event.Status.Should().Be(EventStatus.Cancelled);
    }

    [Fact]
    public void Cancel_FromActive_ThrowsException()
    {
        // Arrange
        var @event = CreateEvent("Active Event");
        @event.Activate(AdminId);

        // Act & Assert
        var act = () => @event.Cancel(AdminId);
        act.Should().Throw<InvalidStatusTransitionException>();
    }

    #endregion

    #region Registration Tests

    [Fact]
    public void RegisterParticipant_WhenDraftAndBeforeDeadline_AddsParticipant()
    {
        // Arrange
        var @event = CreateEvent("Registration Event");
        var userId = Guid.NewGuid();
        var nowUtc = DateTime.UtcNow;

        // Act
        @event.RegisterParticipant(userId, nowUtc);

        // Assert
        @event.Participants.Should().HaveCount(1);
        @event.Participants.First().UserId.Should().Be(userId);
    }

    [Fact]
    public void RegisterParticipant_WhenActive_ThrowsException()
    {
        // Arrange
        var @event = CreateEvent("Active Event");
        @event.Activate(AdminId);
        var userId = Guid.NewGuid();

        // Act & Assert
        var act = () => @event.RegisterParticipant(userId, DateTime.UtcNow);
        act.Should().Throw<InvalidStatusTransitionException>();
    }

    [Fact]
    public void RegisterParticipant_AfterDeadline_ThrowsRegistrationClosedException()
    {
        // Arrange
        var @event = new Event(
            "Past Deadline Event",
            "Test description for the event",
            DateTime.UtcNow.AddDays(10),
            Points.Create(1000),
            "Location",
            100,
            DateTime.UtcNow.AddDays(-1), // Past deadline
            null);
        var userId = Guid.NewGuid();

        // Act & Assert
        var act = () => @event.RegisterParticipant(userId, DateTime.UtcNow);
        act.Should().Throw<RegistrationClosedException>();
    }

    [Fact]
    public void RegisterParticipant_DuplicateUser_ThrowsDuplicateRegistrationException()
    {
        // Arrange
        var @event = CreateEvent("Registration Event");
        var userId = Guid.NewGuid();
        @event.RegisterParticipant(userId, DateTime.UtcNow);

        // Act & Assert
        var act = () => @event.RegisterParticipant(userId, DateTime.UtcNow);
        act.Should().Throw<DuplicateRegistrationException>();
    }

    [Fact]
    public void RegisterParticipant_ExceedsCapacity_ThrowsCapacityExceededException()
    {
        // Arrange
        var @event = new Event(
            "Limited Capacity Event",
            "Test description for the event",
            DateTime.UtcNow.AddDays(10),
            Points.Create(1000),
            "Location",
            2, // Max 2 participants
            DateTime.UtcNow.AddDays(5),
            null);
        
        @event.RegisterParticipant(Guid.NewGuid(), DateTime.UtcNow);
        @event.RegisterParticipant(Guid.NewGuid(), DateTime.UtcNow);

        // Act & Assert
        var act = () => @event.RegisterParticipant(Guid.NewGuid(), DateTime.UtcNow);
        act.Should().Throw<CapacityExceededException>();
    }

    #endregion

    #region Check-In Tests

    [Fact]
    public void CheckInParticipant_WhenActiveAndRegistered_ChecksInParticipant()
    {
        // Arrange
        var @event = CreateEventWithParticipant(out var userId);
        @event.Activate(AdminId);

        // Act
        @event.CheckInParticipant(userId, Guid.NewGuid());

        // Assert
        var participant = @event.Participants.First(p => p.UserId == userId);
        participant.IsCheckedIn().Should().BeTrue();
    }

    [Fact]
    public void CheckInParticipant_WhenDraft_ThrowsException()
    {
        // Arrange
        var @event = CreateEventWithParticipant(out var userId);

        // Act & Assert
        var act = () => @event.CheckInParticipant(userId, Guid.NewGuid());
        act.Should().Throw<InvalidStatusTransitionException>();
    }

    [Fact]
    public void CheckInParticipant_NotRegistered_ThrowsDomainException()
    {
        // Arrange
        var @event = CreateEvent("Active Event");
        @event.Activate(AdminId);
        var unregisteredUserId = Guid.NewGuid();

        // Act & Assert
        var act = () => @event.CheckInParticipant(unregisteredUserId, Guid.NewGuid());
        act.Should().Throw<DomainException>();
    }

    #endregion

    #region Award Points Tests

    [Fact]
    public void AwardPoints_WhenActiveAndCheckedIn_AwardsPoints()
    {
        // Arrange
        var @event = CreateEventWithParticipant(out var userId);
        @event.Activate(AdminId);
        @event.CheckInParticipant(userId, Guid.NewGuid());
        var points = Points.Create(100);

        // Act
        @event.AwardPoints(userId, points, null, Guid.NewGuid());

        // Assert
        var participant = @event.Participants.First(p => p.UserId == userId);
        participant.PointsAwarded.Should().Be(points);
        @event.DistributedPoints.Should().Be(points);
    }

    [Fact]
    public void AwardPoints_WhenDraft_ThrowsException()
    {
        // Arrange
        var @event = CreateEventWithParticipant(out var userId);
        var points = Points.Create(100);

        // Act & Assert
        var act = () => @event.AwardPoints(userId, points, null, Guid.NewGuid());
        act.Should().Throw<InvalidStatusTransitionException>();
    }

    [Fact]
    public void AwardPoints_ExceedsPool_ThrowsInsufficientPoolException()
    {
        // Arrange
        var @event = new Event(
            "Limited Pool Event",
            "Test description for the event",
            DateTime.UtcNow.AddDays(10),
            Points.Create(100), // Only 100 points in pool
            "Location",
            100,
            DateTime.UtcNow.AddDays(5),
            null);
        var userId = Guid.NewGuid();
        @event.RegisterParticipant(userId, DateTime.UtcNow);
        @event.Activate(AdminId);
        @event.CheckInParticipant(userId, Guid.NewGuid());

        // Act & Assert
        var act = () => @event.AwardPoints(userId, Points.Create(150), null, Guid.NewGuid());
        act.Should().Throw<InsufficientPoolException>();
    }

    [Fact]
    public void AwardPoints_UnlimitedPool_DoesNotThrow()
    {
        // Arrange
        var @event = new Event(
            "Unlimited Pool Event",
            "Test description for the event",
            DateTime.UtcNow.AddDays(10),
            null, // Unlimited pool
            "Location",
            100,
            DateTime.UtcNow.AddDays(5),
            null);
        var userId = Guid.NewGuid();
        @event.RegisterParticipant(userId, DateTime.UtcNow);
        @event.Activate(AdminId);
        @event.CheckInParticipant(userId, Guid.NewGuid());

        // Act & Assert
        var act = () => @event.AwardPoints(userId, Points.Create(1_000_000), null, Guid.NewGuid());
        act.Should().NotThrow();
    }

    #endregion

    #region Pool Management Tests

    [Fact]
    public void RemainingPoints_AfterAward_DecreasesCorrectly()
    {
        // Arrange
        var pool = Points.Create(1000);
        var @event = new Event(
            "Pool Test Event",
            "Test description for the event",
            DateTime.UtcNow.AddDays(10),
            pool,
            "Location",
            100,
            DateTime.UtcNow.AddDays(5),
            null);
        var userId = Guid.NewGuid();
        @event.RegisterParticipant(userId, DateTime.UtcNow);
        @event.Activate(AdminId);
        @event.CheckInParticipant(userId, Guid.NewGuid());

        // Act
        @event.AwardPoints(userId, Points.Create(300), null, Guid.NewGuid());

        // Assert
        @event.RemainingPoints.Should().Be(Points.Create(700));
    }

    [Fact]
    public void CanDistributePoints_SufficientPool_ReturnsTrue()
    {
        // Arrange
        var @event = new Event(
            "Pool Test Event",
            "Test description for the event",
            DateTime.UtcNow.AddDays(10),
            Points.Create(1000),
            "Location",
            100,
            DateTime.UtcNow.AddDays(5),
            null);

        // Assert
        @event.CanDistributePoints(Points.Create(500)).Should().BeTrue();
    }

    [Fact]
    public void CanDistributePoints_InsufficientPool_ReturnsFalse()
    {
        // Arrange
        var @event = new Event(
            "Pool Test Event",
            "Test description for the event",
            DateTime.UtcNow.AddDays(10),
            Points.Create(100),
            "Location",
            100,
            DateTime.UtcNow.AddDays(5),
            null);

        // Assert
        @event.CanDistributePoints(Points.Create(500)).Should().BeFalse();
    }

    [Fact]
    public void CanDistributePoints_UnlimitedPool_ReturnsTrue()
    {
        // Arrange
        var @event = new Event(
            "Unlimited Pool Event",
            "Test description for the event",
            DateTime.UtcNow.AddDays(10),
            null,
            "Location",
            100,
            DateTime.UtcNow.AddDays(5),
            null);

        // Assert
        @event.CanDistributePoints(Points.Create(1_000_000)).Should().BeTrue();
    }

    #endregion

    #region Helper Methods

    private static Event CreateEvent(string name)
    {
        return new Event(
            name,
            "This is a test event description with enough characters",
            DateTime.UtcNow.AddDays(10),
            Points.Create(10000),
            "Test Location",
            100,
            DateTime.UtcNow.AddDays(5),
            null);
    }

    private static Event CreateEventWithParticipant(out Guid userId)
    {
        userId = Guid.NewGuid();
        var @event = CreateEvent("Event With Participant");
        @event.RegisterParticipant(userId, DateTime.UtcNow);
        return @event;
    }

    #endregion
}
