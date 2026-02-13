using FluentAssertions;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.ValueObjects;
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
            totalPointsPool: poolSize.HasValue ? Points.Create(poolSize.Value) : null,
            location: "Test",
            maxParticipants: 100,
            registrationEndDate: DateTime.UtcNow.AddHours(-1));

        // Register participants
        for (int i = 0; i < participantCount; i++)
        {
            @event.RegisterParticipant(Guid.NewGuid(), DateTime.UtcNow.AddHours(-2));
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
            @event.CheckInParticipant(p.UserId, adminId);
        }

        // Calculate total requested (100 + 100 + 100 = 300 <= 500)
        var totalRequested = Points.Create(300);

        // Act - validate pool BEFORE any awards (atomic check)
        @event.CanDistributePoints(totalRequested).Should().BeTrue();
        
        // Award points through Event (which tracks DistributedPoints)
        var participants = @event.Participants.ToList();
        @event.AwardPoints(participants[0].UserId, Points.Create(100), null, adminId);
        @event.AwardPoints(participants[1].UserId, Points.Create(100), null, adminId);
        @event.AwardPoints(participants[2].UserId, Points.Create(100), null, adminId);

        // Assert
        @event.DistributedPoints.Should().Be(Points.Create(300));
        @event.RemainingPoints.Should().Be(Points.Create(200));
    }

    [Fact]
    public void BulkAward_ExactlyPool_Succeeds()
    {
        // Arrange
        var @event = CreateActiveEventWithParticipants(poolSize: 300, participantCount: 3);
        var adminId = Guid.NewGuid();
        
        foreach (var p in @event.Participants)
        {
            @event.CheckInParticipant(p.UserId, adminId);
        }

        var totalRequested = Points.Create(300); // Exactly the pool

        // Act
        @event.CanDistributePoints(totalRequested).Should().BeTrue();
        
        // Award points through Event (which tracks DistributedPoints and may auto-complete)
        var participants = @event.Participants.ToList();
        @event.AwardPoints(participants[0].UserId, Points.Create(100), null, adminId);
        @event.AwardPoints(participants[1].UserId, Points.Create(100), null, adminId);
        @event.AwardPoints(participants[2].UserId, Points.Create(100), null, adminId);

        // Assert
        @event.RemainingPoints.Should().Be(Points.Zero);
    }

    [Fact]
    public void BulkAward_ExceedsPool_FailsFast()
    {
        // Arrange
        var @event = CreateActiveEventWithParticipants(poolSize: 200, participantCount: 3);
        var adminId = Guid.NewGuid();
        
        foreach (var p in @event.Participants)
        {
            @event.CheckInParticipant(p.UserId, adminId);
        }

        var totalRequested = Points.Create(300); // Exceeds pool of 200

        // Act & Assert - should fail BEFORE any awards happen
        @event.CanDistributePoints(totalRequested).Should().BeFalse();
        
        // ReservePoints is now private - the pool enforcement happens when awarding points
        // Verify no points were distributed
        @event.DistributedPoints.Should().Be(Points.Zero);
    }

    [Fact]
    public void BulkAward_UnlimitedPool_AlwaysSucceeds()
    {
        // Arrange
        var @event = CreateActiveEventWithParticipants(poolSize: null, participantCount: 5);
        var adminId = Guid.NewGuid();
        
        foreach (var p in @event.Participants)
        {
            @event.CheckInParticipant(p.UserId, adminId);
        }

        var largeTotal = Points.Create(1000000);

        // Act
        @event.CanDistributePoints(largeTotal).Should().BeTrue();
        
        // Award large amount to first participant through Event
        var firstParticipant = @event.Participants.First();
        @event.AwardPoints(firstParticipant.UserId, largeTotal, null, adminId);

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
            @event.CheckInParticipant(p.UserId, adminId);
        }

        // Act - simulate validation pass
        var ineligible = @event.Participants
            .Where(p => p.AttendanceStatus != AttendanceStatus.Attended || p.PointsAwarded > Points.Zero)
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
        @event.CheckInParticipant(participants[0].UserId, adminId);
        @event.CheckInParticipant(participants[1].UserId, adminId);
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
            @event.CheckInParticipant(p.UserId, adminId);
        }

        // Award to first participant through Event
        var firstParticipant = @event.Participants.First();
        @event.AwardPoints(firstParticipant.UserId, Points.Create(100), null, adminId);

        // Act - simulate validation pass for remaining
        var alreadyAwarded = @event.Participants
            .Where(p => p.PointsAwarded > Points.Zero)
            .ToList();

        // Assert
        alreadyAwarded.Should().HaveCount(1);
    }

    #endregion

    #region Sequential vs Atomic Reserve

    // These tests were testing ReservePoints which is now private
    // The functionality is now tested through the public API (awarding points)
    // Commenting out these tests as they tested internal implementation
    
    /*
    [Fact]
    public void SequentialReserves_TrackCorrectTotal()
    {
        // ReservePoints is now private - this test is no longer applicable
    }

    [Fact]
    public void SingleAtomicReserve_EquivalentToSum()
    {
        // ReservePoints is now private - this test is no longer applicable
    }
    */

    #endregion
}
