using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.ValueObjects;
using WIN.AGDATA.WIN.Domain.Events;
using Xunit;

namespace WIN.AGDATA.WIN.TESTS.Domain.Aggregates;

public class EventAggregateTests
{
    [Fact]
    public void RegisterParticipant_WhenValid_ShouldAddParticipantAndRaiseEvent()
    {
        // Arrange
        var evt = CreateTestEvent();
        var userId = Guid.NewGuid();
        var now = DateTime.UtcNow;

        // Act
        evt.RegisterParticipant(userId, now);

        // Assert
        Assert.Single(evt.Participants);
        Assert.Contains(evt.Participants, p => p.UserId == userId);
        Assert.Single(evt.DomainEvents);
        Assert.IsType<ParticipantRegisteredEvent>(evt.DomainEvents.First());
    }

    [Fact]
    public void RegisterParticipant_WhenDuplicate_ShouldThrowDuplicateRegistrationException()
    {
        // Arrange
        var evt = CreateTestEvent();
        var userId = Guid.NewGuid();
        var now = DateTime.UtcNow;
        evt.RegisterParticipant(userId, now);

        // Act & Assert
        Assert.Throws<DuplicateRegistrationException>(() => evt.RegisterParticipant(userId, now));
    }

    [Fact]
    public void RegisterParticipant_WhenCapacityExceeded_ShouldThrowCapacityExceededException()
    {
        // Arrange
        var evt = new Event(
            "Test Event",
            "Description",
            DateTime.UtcNow.AddDays(7),
            totalPointsPool: Points.Create(1000),
            maxParticipants: 2,
            registrationEndDate: DateTime.UtcNow.AddDays(3));

        evt.RegisterParticipant(Guid.NewGuid(), DateTime.UtcNow);
        evt.RegisterParticipant(Guid.NewGuid(), DateTime.UtcNow);

        // Act & Assert
        Assert.Throws<CapacityExceededException>(() => evt.RegisterParticipant(Guid.NewGuid(), DateTime.UtcNow));
    }

    [Fact]
    public void RegisterParticipant_WhenDeadlinePassed_ShouldThrowRegistrationClosedException()
    {
        // Arrange
        var registrationEndDate = DateTime.UtcNow.AddDays(-1); // Past deadline
        var evt = new Event(
            "Test Event",
            "Description",
            DateTime.UtcNow.AddDays(7),
            registrationEndDate: registrationEndDate);

        // Act & Assert
        Assert.Throws<RegistrationClosedException>(() => evt.RegisterParticipant(Guid.NewGuid(), DateTime.UtcNow));
    }

    [Fact]
    public void CheckInParticipant_WhenEventNotActive_ShouldThrowInvalidStatusTransitionException()
    {
        // Arrange
        var evt = CreateTestEvent();
        var userId = Guid.NewGuid();
        evt.RegisterParticipant(userId, DateTime.UtcNow);

        // Act & Assert (Event is in Draft status)
        Assert.Throws<InvalidStatusTransitionException>(() => evt.CheckInParticipant(userId, Guid.NewGuid()));
    }

    [Fact]
    public void CheckInParticipant_WhenEventActive_ShouldCheckInAndRaiseEvent()
    {
        // Arrange
        var evt = CreateTestEvent();
        var userId = Guid.NewGuid();
        var adminId = Guid.NewGuid();
        evt.RegisterParticipant(userId, DateTime.UtcNow);
        evt.Activate(adminId);
        evt.ClearDomainEvents(); // Clear previous events

        // Act
        evt.CheckInParticipant(userId, adminId);

        // Assert
        var participant = evt.Participants.First(p => p.UserId == userId);
        Assert.True(participant.IsCheckedIn());
        Assert.Contains(evt.DomainEvents, e => e is ParticipantCheckedInEvent);
    }

    [Fact]
    public void AwardPoints_WhenValid_ShouldAwardPointsAndRaiseEvent()
    {
        // Arrange
        var evt = CreateTestEvent();
        var userId = Guid.NewGuid();
        var adminId = Guid.NewGuid();
        var points = Points.Create(100);

        evt.RegisterParticipant(userId, DateTime.UtcNow);
        evt.Activate(adminId);
        evt.CheckInParticipant(userId, adminId);
        evt.ClearDomainEvents();

        // Act
        evt.AwardPoints(userId, points, rank: 1, adminId);

        // Assert
        var participant = evt.Participants.First(p => p.UserId == userId);
        Assert.Equal(points, participant.PointsAwarded);
        Assert.Equal(1, participant.Rank);
        Assert.Contains(evt.DomainEvents, e => e is PointsAwardedEvent);
    }

    [Fact]
    public void AwardPoints_WhenNotCheckedIn_ShouldThrowNotCheckedInException()
    {
        // Arrange
        var evt = CreateTestEvent();
        var userId = Guid.NewGuid();
        var adminId = Guid.NewGuid();

        evt.RegisterParticipant(userId, DateTime.UtcNow);
        evt.Activate(adminId);
        // Don't check in

        // Act & Assert
        Assert.Throws<NotCheckedInException>(() => evt.AwardPoints(userId, Points.Create(100), null, adminId));
    }

    [Fact]
    public void AwardPoints_WhenPoolExhausted_ShouldAutoCompleteAndRaiseEvent()
    {
        // Arrange
        var poolSize = Points.Create(100);
        var evt = new Event(
            "Test Event",
            "Description",
            DateTime.UtcNow.AddDays(7),
            totalPointsPool: poolSize,
            registrationEndDate: DateTime.UtcNow.AddDays(3));

        var userId = Guid.NewGuid();
        var adminId = Guid.NewGuid();

        evt.RegisterParticipant(userId, DateTime.UtcNow);
        evt.Activate(adminId);
        evt.CheckInParticipant(userId, adminId);
        evt.ClearDomainEvents();

        // Act - Award all remaining points
        evt.AwardPoints(userId, poolSize, null, adminId);

        // Assert
        Assert.Equal(EventStatus.Completed, evt.Status);
        Assert.Contains(evt.DomainEvents, e => e is EventCompletedEvent);
        var completedEvent = evt.DomainEvents.OfType<EventCompletedEvent>().First();
        Assert.True(completedEvent.WasAutoCompleted);
    }

    [Fact]
    public void AwardPoints_WhenPoolInsufficient_ShouldThrowInsufficientPoolException()
    {
        // Arrange
        var evt = new Event(
            "Test Event",
            "Description",
            DateTime.UtcNow.AddDays(7),
            totalPointsPool: Points.Create(50),
            registrationEndDate: DateTime.UtcNow.AddDays(3));

        var userId = Guid.NewGuid();
        var adminId = Guid.NewGuid();

        evt.RegisterParticipant(userId, DateTime.UtcNow);
        evt.Activate(adminId);
        evt.CheckInParticipant(userId, adminId);

        // Act & Assert
        Assert.Throws<InsufficientPoolException>(() => evt.AwardPoints(userId, Points.Create(100), null, adminId));
    }

    [Fact]
    public void Complete_WhenValid_ShouldCompleteAndRaiseEvent()
    {
        // Arrange
        var evt = CreateTestEvent();
        var adminId = Guid.NewGuid();
        evt.Activate(adminId);
        evt.ClearDomainEvents();

        // Act
        evt.Complete(adminId);

        // Assert
        Assert.Equal(EventStatus.Completed, evt.Status);
        Assert.Contains(evt.DomainEvents, e => e is EventCompletedEvent);
    }

    [Fact]
    public void Cancel_WhenValid_ShouldCancelAndRaiseEvent()
    {
        // Arrange
        var evt = CreateTestEvent();
        var adminId = Guid.NewGuid();
        evt.ClearDomainEvents();

        // Act
        evt.Cancel(adminId, "Test cancellation");

        // Assert
        Assert.Equal(EventStatus.Cancelled, evt.Status);
        Assert.Contains(evt.DomainEvents, e => e is EventCancelledEvent);
    }

    private Event CreateTestEvent()
    {
        return new Event(
            "Test Event",
            "Test Description",
            DateTime.UtcNow.AddDays(7),
            totalPointsPool: Points.Create(1000),
            registrationEndDate: DateTime.UtcNow.AddDays(3));
    }
}
