using FluentAssertions;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.ValueObjects;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Domain.Events;

/// <summary>
/// Unit tests for Event lifecycle and guards (MVP Event Lifecycle)
/// </summary>
public class EventLifecycleTests
{
    private static Event CreateTestEvent(
        DateTime? registrationEndDate = null,
        int? maxParticipants = null)
    {
        return new Event(
            name: "Test Event",
            description: "Test Description",
            eventDate: DateTime.UtcNow.AddDays(7),
            totalPointsPool: Points.Create(1000),
            location: "Test Location",
            maxParticipants: maxParticipants,
            registrationEndDate: registrationEndDate ?? DateTime.UtcNow.AddDays(5),
            bannerImageUrl: null);
    }

    #region Lifecycle Guards Tests

    [Fact]
    public void CanEdit_WhenDraft_ReturnsTrue()
    {
        var @event = CreateTestEvent();
        @event.CanEdit().Should().BeTrue();
    }

    [Theory]
    [InlineData(EventStatus.Active)]
    [InlineData(EventStatus.Completed)]
    [InlineData(EventStatus.Cancelled)]
    public void CanEdit_WhenNotDraft_ReturnsFalse(EventStatus status)
    {
        var @event = CreateTestEvent();
        var adminId = Guid.NewGuid();
        
        // Transition to desired state
        if (status == EventStatus.Active || status == EventStatus.Completed)
        {
            @event.Activate(adminId);
            if (status == EventStatus.Completed)
                @event.Complete(adminId);
        }
        else if (status == EventStatus.Cancelled)
        {
            @event.Cancel(adminId);
        }

        @event.CanEdit().Should().BeFalse();
    }

    [Fact]
    public void CanRegister_WhenDraftAndBeforeDeadline_ReturnsTrue()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(5));
        @event.CanRegister(DateTime.UtcNow).Should().BeTrue();
    }

    [Fact]
    public void CanRegister_WhenDraftAndOnDeadline_ReturnsTrue()
    {
        var deadline = DateTime.UtcNow;
        var @event = CreateTestEvent(registrationEndDate: deadline);
        @event.CanRegister(deadline).Should().BeTrue();
    }

    [Fact]
    public void CanRegister_WhenDraftAndAfterDeadline_ReturnsFalse()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(-1));
        @event.CanRegister(DateTime.UtcNow).Should().BeFalse();
    }

    [Fact]
    public void CanRegister_WhenActive_ReturnsFalse()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(5));
        @event.Activate(Guid.NewGuid());
        @event.CanRegister(DateTime.UtcNow).Should().BeFalse();
    }

    [Fact]
    public void CanActivate_WhenDraft_ReturnsTrue()
    {
        var @event = CreateTestEvent();
        @event.CanActivate().Should().BeTrue();
    }

    [Fact]
    public void CanActivate_WhenActive_ReturnsFalse()
    {
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());
        @event.CanActivate().Should().BeFalse();
    }

    [Fact]
    public void CanComplete_WhenActive_ReturnsTrue()
    {
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());
        @event.CanComplete().Should().BeTrue();
    }

    [Fact]
    public void CanComplete_WhenDraft_ReturnsFalse()
    {
        var @event = CreateTestEvent();
        @event.CanComplete().Should().BeFalse();
    }

    [Fact]
    public void CanCancel_WhenDraft_ReturnsTrue()
    {
        var @event = CreateTestEvent();
        @event.CanCancel().Should().BeTrue();
    }

    [Fact]
    public void CanCancel_WhenActive_ReturnsFalse()
    {
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());
        @event.CanCancel().Should().BeFalse();
    }

    [Fact]
    public void CanCancel_WhenCompleted_ReturnsFalse()
    {
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());
        @event.Complete(Guid.NewGuid());
        @event.CanCancel().Should().BeFalse();
    }

    [Fact]
    public void CanAward_WhenActive_ReturnsTrue()
    {
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());
        @event.CanAward().Should().BeTrue();
    }

    [Fact]
    public void CanAward_WhenDraft_ReturnsFalse()
    {
        var @event = CreateTestEvent();
        @event.CanAward().Should().BeFalse();
    }

    [Fact]
    public void CanAward_WhenCompleted_ReturnsFalse()
    {
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());
        @event.Complete(Guid.NewGuid());
        @event.CanAward().Should().BeFalse();
    }

    [Fact]
    public void CanCheckIn_WhenActive_ReturnsTrue()
    {
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());
        @event.CanCheckIn().Should().BeTrue();
    }

    [Fact]
    public void CanCheckIn_WhenDraft_ReturnsFalse()
    {
        var @event = CreateTestEvent();
        @event.CanCheckIn().Should().BeFalse();
    }

    #endregion

    #region Lifecycle Transitions Tests

    [Fact]
    public void Activate_FromDraft_SetsStatusToActive()
    {
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());
        @event.Status.Should().Be(EventStatus.Active);
    }

    [Fact]
    public void Activate_FromActive_ThrowsDomainException()
    {
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());

        var action = () => @event.Activate(Guid.NewGuid());
        action.Should().Throw<DomainException>()
            .WithMessage("*Cannot activate*");
    }

    [Fact]
    public void CompleteEvent_FromActive_SetsStatusToCompleted()
    {
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());
        @event.Complete(Guid.NewGuid());
        @event.Status.Should().Be(EventStatus.Completed);
    }

    [Fact]
    public void CompleteEvent_FromDraft_ThrowsDomainException()
    {
        var @event = CreateTestEvent();

        var action = () => @event.Complete(Guid.NewGuid());
        action.Should().Throw<DomainException>()
            .WithMessage("*Cannot complete*");
    }

    [Fact]
    public void CancelEvent_FromDraft_SetsStatusToCancelled()
    {
        var @event = CreateTestEvent();
        @event.Cancel(Guid.NewGuid());
        @event.Status.Should().Be(EventStatus.Cancelled);
    }

    [Fact]
    public void CancelEvent_FromActive_ThrowsDomainException()
    {
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());

        var action = () => @event.Cancel(Guid.NewGuid());
        action.Should().Throw<DomainException>()
            .WithMessage("*Cannot cancel*");
    }

    [Fact]
    public void CancelEvent_FromCompleted_ThrowsDomainException()
    {
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());
        @event.Complete(Guid.NewGuid());

        var action = () => @event.Cancel(Guid.NewGuid());
        action.Should().Throw<DomainException>()
            .WithMessage("*Cannot cancel*");
    }

    #endregion

    #region Registration Tests

    [Fact]
    public void Register_WhenDraftAndBeforeDeadline_Succeeds()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(5));
        var userId = Guid.NewGuid();

        @event.RegisterParticipant(userId, DateTime.UtcNow);

        @event.Participants.Should().HaveCount(1);
        @event.Participants.First().UserId.Should().Be(userId);
    }

    [Fact]
    public void Register_WhenAfterDeadline_ThrowsDomainException()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(-1));
        var userId = Guid.NewGuid();

        var action = () => @event.RegisterParticipant(userId, DateTime.UtcNow);
        action.Should().Throw<DomainException>()
            .WithMessage("*deadline*passed*");
    }

    [Fact]
    public void Register_WhenEventIsActive_ThrowsDomainException()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(5));
        @event.Activate(Guid.NewGuid());
        var userId = Guid.NewGuid();

        var action = () => @event.RegisterParticipant(userId, DateTime.UtcNow);
        action.Should().Throw<DomainException>(); // actual: "Cannot register participants when status is Active."
    }

    [Fact]
    public void Register_WhenUserAlreadyRegistered_ThrowsDomainException()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(5));
        var userId = Guid.NewGuid();

        @event.RegisterParticipant(userId, DateTime.UtcNow);

        var action = () => @event.RegisterParticipant(userId, DateTime.UtcNow);
        action.Should().Throw<DomainException>()
            .WithMessage("*already registered*");
    }

    [Fact]
    public void Register_WhenMaxParticipantsReached_ThrowsDomainException()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(5), maxParticipants: 1);
        @event.RegisterParticipant(Guid.NewGuid(), DateTime.UtcNow);

        var action = () => @event.RegisterParticipant(Guid.NewGuid(), DateTime.UtcNow);
        action.Should().Throw<DomainException>()
            .WithMessage("*maximum capacity*");
    }

    #endregion

    #region Check-in Tests

    [Fact]
    public void CheckInParticipantByUserId_WhenActive_Succeeds()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(5));
        var userId = Guid.NewGuid();
        @event.RegisterParticipant(userId, DateTime.UtcNow);
        @event.Activate(Guid.NewGuid());

        @event.CheckInParticipant(userId, Guid.NewGuid());

        @event.Participants.First().AttendanceStatus.Should().Be(AttendanceStatus.Attended);
    }

    [Fact]
    public void CheckInParticipantByUserId_WhenDraft_ThrowsDomainException()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(5));
        var userId = Guid.NewGuid();
        @event.RegisterParticipant(userId, DateTime.UtcNow);

        var action = () => @event.CheckInParticipant(userId, Guid.NewGuid());
        action.Should().Throw<DomainException>(); // actual: "Cannot check-in participants when status is Draft."
    }

    [Fact]
    public void CheckInParticipantByUserId_WhenUserNotRegistered_ThrowsDomainException()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(5));
        @event.Activate(Guid.NewGuid());

        var action = () => @event.CheckInParticipant(Guid.NewGuid(), Guid.NewGuid());
        action.Should().Throw<DomainException>()
            .WithMessage("*not registered*");
    }

    #endregion

    #region Pool Management Tests

    [Fact]
    public void RemainingPoints_Initially_EqualsPoolTotal()
    {
        var @event = CreateTestEvent();
        @event.RemainingPoints.Should().Be(Points.Create(1000));
    }

    // ReservePoints is now private and called internally
    // These tests are removed as they tested the internal implementation

    #endregion

    #region Automated Transitions Tests

    [Fact]
    public void ApplyAutomatedTransitions_WhenEventDateArrives_GoesLive()
    {
        // Arrange: Event with EventDate in the past
        var @event = new Event(
            name: "Auto Go-Live Event",
            description: "Test Description",
            eventDate: DateTime.UtcNow.AddMinutes(-5), // Event started 5 minutes ago
            totalPointsPool: Points.Create(1000),
            location: "Test Location",
            maxParticipants: 100,
            registrationEndDate: DateTime.UtcNow.AddHours(-1), // Reg ended 1 hour ago
            bannerImageUrl: null);

        // Act
        var result = @event.ApplyAutomatedTransitions(DateTime.UtcNow);

        // Assert
        result.Should().BeTrue();
        @event.Status.Should().Be(EventStatus.Active);
    }

    [Fact]
    public void ApplyAutomatedTransitions_WhenRegEndPassedAndNoParticipants_Cancels()
    {
        // Arrange: Event with registration deadline passed and 0 participants
        var @event = new Event(
            name: "Auto Cancel Event",
            description: "Test Description",
            eventDate: DateTime.UtcNow.AddDays(1), // Event in future
            totalPointsPool: Points.Create(1000),
            location: "Test Location",
            maxParticipants: 100,
            registrationEndDate: DateTime.UtcNow.AddHours(-1), // Reg ended 1 hour ago
            bannerImageUrl: null);

        // Act
        var result = @event.ApplyAutomatedTransitions(DateTime.UtcNow);

        // Assert
        result.Should().BeTrue();
        @event.Status.Should().Be(EventStatus.Cancelled);
    }

    [Fact]
    public void ApplyAutomatedTransitions_WhenRegEndPassedButHasParticipants_RemainsInDraft()
    {
        // Arrange: Event with registration deadline passed but has participants
        var @event = new Event(
            name: "Has Participants Event",
            description: "Test Description",
            eventDate: DateTime.UtcNow.AddDays(1), // Event in future
            totalPointsPool: Points.Create(1000),
            location: "Test Location",
            maxParticipants: 100,
            registrationEndDate: DateTime.UtcNow.AddHours(2), // Reg still open
            bannerImageUrl: null);
        
        // Add a participant (registration is still open)
        @event.RegisterParticipant(Guid.NewGuid(), DateTime.UtcNow);

        // Now simulate registration deadline passing
        var result = @event.ApplyAutomatedTransitions(DateTime.UtcNow.AddHours(3)); // After reg end

        // Assert: Event should stay Draft because it has participants
        result.Should().BeFalse();
        @event.Status.Should().Be(EventStatus.Draft);
    }

    [Fact]
    public void ApplyAutomatedTransitions_WhenAlreadyActive_ReturnsNoChange()
    {
        // Arrange: Already active event
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());

        // Act
        var result = @event.ApplyAutomatedTransitions(DateTime.UtcNow);

        // Assert
        result.Should().BeFalse();
        @event.Status.Should().Be(EventStatus.Active);
    }

    [Fact]
    public void ApplyAutomatedTransitions_GoLiveTakesPrecedenceOverAutoCancel()
    {
        // Arrange: Event where both conditions are true
        // EventDate has passed AND registration ended with 0 participants
        // Go-Live should take precedence
        var @event = new Event(
            name: "Precedence Test Event",
            description: "Test Description",
            eventDate: DateTime.UtcNow.AddMinutes(-10), // Event started 10 min ago
            totalPointsPool: Points.Create(1000),
            location: "Test Location",
            maxParticipants: 100,
            registrationEndDate: DateTime.UtcNow.AddMinutes(-30), // Reg ended 30 min ago
            bannerImageUrl: null);

        // Act
        var result = @event.ApplyAutomatedTransitions(DateTime.UtcNow);

        // Assert: Should go Active, not Cancelled
        result.Should().BeTrue();
        @event.Status.Should().Be(EventStatus.Active);
    }

    [Fact]
    public void ShouldAutoActivate_WhenEventDateArrived_ReturnsTrue()
    {
        var @event = new Event(
            name: "Test",
            description: "Test",
            eventDate: DateTime.UtcNow.AddMinutes(-5),
            totalPointsPool: Points.Create(1000),
            registrationEndDate: DateTime.UtcNow.AddHours(1));

        var result = @event.ApplyAutomatedTransitions(DateTime.UtcNow);
        result.Should().BeTrue();
        @event.Status.Should().Be(EventStatus.Active);
    }

    [Fact]
    public void ShouldAutoCancel_WhenRegEndPassedAndNoParticipants_ReturnsTrue()
    {
        var @event = new Event(
            name: "Test",
            description: "Test",
            eventDate: DateTime.UtcNow.AddDays(1),
            totalPointsPool: Points.Create(1000),
            registrationEndDate: DateTime.UtcNow.AddHours(-1));

        var result = @event.ApplyAutomatedTransitions(DateTime.UtcNow);
        result.Should().BeTrue();
        @event.Status.Should().Be(EventStatus.Cancelled);
    }

    #endregion
}
