using FluentAssertions;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Domain.Events;

/// <summary>
/// Tests for bulk award scenarios verifying pool enforcement and all-or-nothing semantics
/// </summary>
public class BulkAwardTests
{
    private static Event CreateActiveEventWithParticipants(int? poolSize, int participantCount)
    {
        var @event = new Event(
            name: "Bulk Award Test Event",
            description: "Test Description",
            eventDate: DateTime.UtcNow.AddDays(1),
            totalPointsPool: poolSize,
            location: "Test",
            maxParticipants: 100,
            registrationEndDate: DateTime.UtcNow.AddHours(-1));

        // Register participants
        for (int i = 0; i < participantCount; i++)
        {
            @event.Register(Guid.NewGuid(), DateTime.UtcNow.AddHours(-2));
        }

        // Activate event (so check-in and awards can happen)
        @event.Activate(Guid.NewGuid());

        return @event;
    }

    #region Pool Validation for Bulk Awards

    [Fact]
    public void BulkAward_TotalWithinPool_Succeeds()
    {
        // Arrange
        var @event = CreateActiveEventWithParticipants(poolSize: 500, participantCount: 3);
        var adminId = Guid.NewGuid();
        
        // Check in all participants
        foreach (var p in @event.Participants)
        {
            @event.CheckInParticipant(p.Id, adminId);
        }

        // Calculate total requested (100 + 100 + 100 = 300 <= 500)
        var totalRequested = 300;

        // Act - validate pool BEFORE any awards (atomic check)
        @event.CanDistributePoints(totalRequested).Should().BeTrue();
        
        // Reserve all at once (simulating bulk operation)
        @event.ReservePoints(totalRequested);

        // Assert
        @event.DistributedPoints.Should().Be(300);
        @event.RemainingPoints.Should().Be(200);
    }

    [Fact]
    public void BulkAward_ExactlyPool_Succeeds()
    {
        // Arrange
        var @event = CreateActiveEventWithParticipants(poolSize: 300, participantCount: 3);
        var adminId = Guid.NewGuid();
        
        foreach (var p in @event.Participants)
        {
            @event.CheckInParticipant(p.Id, adminId);
        }

        var totalRequested = 300; // Exactly the pool

        // Act
        @event.CanDistributePoints(totalRequested).Should().BeTrue();
        @event.ReservePoints(totalRequested);

        // Assert
        @event.RemainingPoints.Should().Be(0);
    }

    [Fact]
    public void BulkAward_ExceedsPool_FailsFast()
    {
        // Arrange
        var @event = CreateActiveEventWithParticipants(poolSize: 200, participantCount: 3);
        var adminId = Guid.NewGuid();
        
        foreach (var p in @event.Participants)
        {
            @event.CheckInParticipant(p.Id, adminId);
        }

        var totalRequested = 300; // Exceeds pool of 200

        // Act & Assert - should fail BEFORE any awards happen
        @event.CanDistributePoints(totalRequested).Should().BeFalse();
        
        var action = () => @event.ReservePoints(totalRequested);
        action.Should().Throw<DomainException>()
            .WithMessage("*Insufficient*Requested: 300*Remaining: 200*");

        // Verify no points were distributed
        @event.DistributedPoints.Should().Be(0);
    }

    [Fact]
    public void BulkAward_UnlimitedPool_AlwaysSucceeds()
    {
        // Arrange
        var @event = CreateActiveEventWithParticipants(poolSize: null, participantCount: 5);
        var adminId = Guid.NewGuid();
        
        foreach (var p in @event.Participants)
        {
            @event.CheckInParticipant(p.Id, adminId);
        }

        var largeTotal = 1000000;

        // Act
        @event.CanDistributePoints(largeTotal).Should().BeTrue();
        @event.ReservePoints(largeTotal);

        // Assert
        @event.DistributedPoints.Should().Be(largeTotal);
        @event.RemainingPoints.Should().BeNull();
    }

    #endregion

    #region All-or-Nothing Semantics (Validation Pass)

    [Fact]
    public void BulkValidation_AllCheckedIn_PassesValidation()
    {
        // Arrange
        var @event = CreateActiveEventWithParticipants(poolSize: 1000, participantCount: 3);
        var adminId = Guid.NewGuid();
        
        // Check in all
        foreach (var p in @event.Participants)
        {
            @event.CheckInParticipant(p.Id, adminId);
        }

        // Act - simulate validation pass
        var ineligible = @event.Participants
            .Where(p => p.AttendanceStatus != AttendanceStatus.Attended || p.PointsAwarded > 0)
            .ToList();

        // Assert
        ineligible.Should().BeEmpty("all participants should be eligible");
    }

    [Fact]
    public void BulkValidation_OneNotCheckedIn_FailsAll()
    {
        // Arrange
        var @event = CreateActiveEventWithParticipants(poolSize: 1000, participantCount: 3);
        var adminId = Guid.NewGuid();
        
        // Check in only 2 of 3
        var participants = @event.Participants.ToList();
        @event.CheckInParticipant(participants[0].Id, adminId);
        @event.CheckInParticipant(participants[1].Id, adminId);
        // participants[2] remains Registered

        // Act - simulate validation pass
        var ineligible = @event.Participants
            .Where(p => p.AttendanceStatus != AttendanceStatus.Attended)
            .ToList();

        // Assert
        ineligible.Should().HaveCount(1);
        ineligible[0].AttendanceStatus.Should().Be(AttendanceStatus.Registered);
    }

    [Fact]
    public void BulkValidation_OneAlreadyAwarded_FailsAll()
    {
        // Arrange
        var @event = CreateActiveEventWithParticipants(poolSize: 1000, participantCount: 3);
        var adminId = Guid.NewGuid();
        
        // Check in all
        foreach (var p in @event.Participants)
        {
            @event.CheckInParticipant(p.Id, adminId);
        }

        // Award to first participant
        var firstParticipant = @event.Participants.First();
        firstParticipant.AwardPoints(100, null, adminId);
        @event.ReservePoints(100);

        // Act - simulate validation pass for remaining
        var alreadyAwarded = @event.Participants
            .Where(p => p.PointsAwarded > 0)
            .ToList();

        // Assert
        alreadyAwarded.Should().HaveCount(1);
    }

    #endregion

    #region Sequential vs Atomic Reserve

    [Fact]
    public void SequentialReserves_TrackCorrectTotal()
    {
        // Arrange
        var @event = CreateActiveEventWithParticipants(poolSize: 1000, participantCount: 5);

        // Act - sequential reserves (simulating individual awards)
        @event.ReservePoints(100);
        @event.ReservePoints(150);
        @event.ReservePoints(200);
        @event.ReservePoints(250);
        @event.ReservePoints(300);

        // Assert
        @event.DistributedPoints.Should().Be(1000);
        @event.RemainingPoints.Should().Be(0);
    }

    [Fact]
    public void SingleAtomicReserve_EquivalentToSum()
    {
        // Arrange
        var @event = CreateActiveEventWithParticipants(poolSize: 1000, participantCount: 5);
        var totalBulk = 100 + 150 + 200 + 250 + 300;

        // Act - single atomic reserve (simulating bulk operation)
        @event.ReservePoints(totalBulk);

        // Assert
        @event.DistributedPoints.Should().Be(1000);
        @event.RemainingPoints.Should().Be(0);
    }

    #endregion
}
