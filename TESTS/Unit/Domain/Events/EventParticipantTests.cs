using FluentAssertions;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Domain.Events;

/// <summary>
/// Unit tests for EventParticipant entity, especially award rules
/// </summary>
public class EventParticipantTests
{
    [Fact]
    public void AwardPoints_WhenCheckedInAndNoPointsAwarded_Succeeds()
    {
        // Arrange
        var participant = new EventParticipant(Guid.NewGuid(), Guid.NewGuid());
        participant.MarkCheckedIn();
        var adminId = Guid.NewGuid();

        // Act
        participant.AwardPoints(Points.Create(100), rank: 1, adminId);

        // Assert
        participant.PointsAwarded.Should().Be(Points.Create(100));
        participant.Rank.Should().Be(1);
        participant.AwardedBy.Should().Be(adminId);
        participant.AwardedAt.Should().NotBeNull();
    }

    [Fact]
    public void AwardPoints_WhenNotCheckedIn_ThrowsDomainException()
    {
        // Arrange
        var participant = new EventParticipant(Guid.NewGuid(), Guid.NewGuid());
        // Not checked in - status is still Registered

        // Act & Assert
        var action = () => participant.AwardPoints(Points.Create(100), rank: null, Guid.NewGuid());
        action.Should().Throw<DomainException>()
            .WithMessage("*must be checked-in*");
    }

    [Fact]
    public void AwardPoints_WhenAlreadyAwarded_ThrowsDomainException()
    {
        // Arrange
        var participant = new EventParticipant(Guid.NewGuid(), Guid.NewGuid());
        participant.MarkCheckedIn();
        participant.AwardPoints(Points.Create(100), rank: null, Guid.NewGuid());

        // Act & Assert - try to award again
        var action = () => participant.AwardPoints(Points.Create(50), rank: null, Guid.NewGuid());
        action.Should().Throw<DomainException>()
            .WithMessage("*already been awarded*");
    }

    [Fact]
    public void MarkCheckedIn_SetsAttendedStatusAndCheckedInTime()
    {
        // Arrange
        var participant = new EventParticipant(Guid.NewGuid(), Guid.NewGuid());

        // Act
        participant.MarkCheckedIn();

        // Assert
        participant.AttendanceStatus.Should().Be(AttendanceStatus.Attended);
        participant.CheckedInAt.Should().NotBeNull();
    }

    [Fact]
    public void Constructor_SetsDefaultValues()
    {
        // Act
        var eventId = Guid.NewGuid();
        var userId = Guid.NewGuid();
        var participant = new EventParticipant(eventId, userId);

        // Assert
        participant.EventId.Should().Be(eventId);
        participant.UserId.Should().Be(userId);
        participant.PointsAwarded.Should().Be(Points.Zero);
        participant.AttendanceStatus.Should().Be(AttendanceStatus.Registered);
        participant.RegisteredAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(5));
    }
}
