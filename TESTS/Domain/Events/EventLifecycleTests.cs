using FluentAssertions;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;
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
            totalPointsPool: 1000,
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
                @event.CompleteEvent(adminId);
        }
        else if (status == EventStatus.Cancelled)
        {
            @event.CancelEvent(adminId);
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
    public void CanCancel_WhenActive_ReturnsTrue()
    {
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());
        @event.CanCancel().Should().BeTrue();
    }

    [Fact]
    public void CanCancel_WhenCompleted_ReturnsFalse()
    {
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());
        @event.CompleteEvent(Guid.NewGuid());
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
        @event.CompleteEvent(Guid.NewGuid());
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
        @event.CompleteEvent(Guid.NewGuid());
        @event.Status.Should().Be(EventStatus.Completed);
    }

    [Fact]
    public void CompleteEvent_FromDraft_ThrowsDomainException()
    {
        var @event = CreateTestEvent();

        var action = () => @event.CompleteEvent(Guid.NewGuid());
        action.Should().Throw<DomainException>()
            .WithMessage("*Cannot complete*");
    }

    [Fact]
    public void CancelEvent_FromDraft_SetsStatusToCancelled()
    {
        var @event = CreateTestEvent();
        @event.CancelEvent(Guid.NewGuid());
        @event.Status.Should().Be(EventStatus.Cancelled);
    }

    [Fact]
    public void CancelEvent_FromActive_SetsStatusToCancelled()
    {
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());
        @event.CancelEvent(Guid.NewGuid());
        @event.Status.Should().Be(EventStatus.Cancelled);
    }

    [Fact]
    public void CancelEvent_FromCompleted_ThrowsDomainException()
    {
        var @event = CreateTestEvent();
        @event.Activate(Guid.NewGuid());
        @event.CompleteEvent(Guid.NewGuid());

        var action = () => @event.CancelEvent(Guid.NewGuid());
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

        @event.Register(userId, DateTime.UtcNow);

        @event.Participants.Should().HaveCount(1);
        @event.Participants.First().UserId.Should().Be(userId);
    }

    [Fact]
    public void Register_WhenAfterDeadline_ThrowsDomainException()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(-1));
        var userId = Guid.NewGuid();

        var action = () => @event.Register(userId, DateTime.UtcNow);
        action.Should().Throw<DomainException>()
            .WithMessage("*deadline*passed*");
    }

    [Fact]
    public void Register_WhenEventIsActive_ThrowsDomainException()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(5));
        @event.Activate(Guid.NewGuid());
        var userId = Guid.NewGuid();

        var action = () => @event.Register(userId, DateTime.UtcNow);
        action.Should().Throw<DomainException>()
            .WithMessage("*Registration is closed*");
    }

    [Fact]
    public void Register_WhenUserAlreadyRegistered_ThrowsDomainException()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(5));
        var userId = Guid.NewGuid();

        @event.Register(userId, DateTime.UtcNow);

        var action = () => @event.Register(userId, DateTime.UtcNow);
        action.Should().Throw<DomainException>()
            .WithMessage("*already registered*");
    }

    [Fact]
    public void Register_WhenMaxParticipantsReached_ThrowsDomainException()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(5), maxParticipants: 1);
        @event.Register(Guid.NewGuid(), DateTime.UtcNow);

        var action = () => @event.Register(Guid.NewGuid(), DateTime.UtcNow);
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
        @event.Register(userId, DateTime.UtcNow);
        @event.Activate(Guid.NewGuid());

        @event.CheckInParticipantByUserId(userId, Guid.NewGuid());

        @event.Participants.First().AttendanceStatus.Should().Be(AttendanceStatus.Attended);
    }

    [Fact]
    public void CheckInParticipantByUserId_WhenDraft_ThrowsDomainException()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(5));
        var userId = Guid.NewGuid();
        @event.Register(userId, DateTime.UtcNow);

        var action = () => @event.CheckInParticipantByUserId(userId, Guid.NewGuid());
        action.Should().Throw<DomainException>()
            .WithMessage("*Cannot check in*");
    }

    [Fact]
    public void CheckInParticipantByUserId_WhenUserNotRegistered_ThrowsDomainException()
    {
        var @event = CreateTestEvent(registrationEndDate: DateTime.UtcNow.AddDays(5));
        @event.Activate(Guid.NewGuid());

        var action = () => @event.CheckInParticipantByUserId(Guid.NewGuid(), Guid.NewGuid());
        action.Should().Throw<DomainException>()
            .WithMessage("*not registered*");
    }

    #endregion
}
