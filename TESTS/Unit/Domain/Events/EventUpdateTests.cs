using FluentAssertions;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Domain.Events;

/// <summary>
/// Unit tests for Event update functionality
/// </summary>
public class EventUpdateTests
{
    [Fact]
    public void UpdateDetails_WhenDraft_UpdatesAllFields()
    {
        // Arrange
        var @event = new Event(
            name: "Original Name",
            description: "Original Description",
            eventDate: DateTime.UtcNow.AddDays(7),
            totalPointsPool: Points.Create(1000),
            location: "Original Location",
            maxParticipants: 50,
            registrationEndDate: DateTime.UtcNow.AddDays(5),
            bannerImageUrl: "original.jpg");

        // Act
        @event.UpdateDetails(
            name: "Updated Name",
            description: "Updated Description",
            eventDate: DateTime.UtcNow.AddDays(10),
            totalPointsPool: Points.Create(2000),
            location: "Updated Location",
            maxParticipants: 100,
            registrationEndDate: DateTime.UtcNow.AddDays(8),
            bannerImageUrl: "updated.jpg");

        // Assert
        @event.Name.Should().Be("Updated Name");
        @event.Description.Should().Be("Updated Description");
        @event.TotalPointsPool.Should().Be(Points.Create(2000));
        @event.Location.Should().Be("Updated Location");
        @event.MaxParticipants.Should().Be(100);
        @event.BannerImageUrl.Should().Be("updated.jpg");
    }

    [Fact]
    public void UpdateDetails_WhenActive_ThrowsDomainException()
    {
        // Arrange
        var @event = new Event(
            name: "Test Event",
            description: "Description",
            eventDate: DateTime.UtcNow.AddDays(7),
            registrationEndDate: DateTime.UtcNow.AddDays(5));

        @event.Activate(Guid.NewGuid());

        // Act & Assert
        var action = () => @event.UpdateDetails(name: "New Name");
        action.Should().Throw<DomainException>()
            .WithMessage("*Cannot edit*");
    }

    [Fact]
    public void UpdateDetails_WhenCompleted_ThrowsDomainException()
    {
        // Arrange
        var @event = new Event(
            name: "Test Event",
            description: "Description",
            eventDate: DateTime.UtcNow.AddDays(7),
            registrationEndDate: DateTime.UtcNow.AddDays(5));

        @event.Activate(Guid.NewGuid());
        @event.Complete(Guid.NewGuid());

        // Act & Assert
        var action = () => @event.UpdateDetails(name: "New Name");
        action.Should().Throw<DomainException>()
            .WithMessage("*Cannot edit*");
    }

    [Fact]
    public void UpdateDetails_WhenCancelled_ThrowsDomainException()
    {
        // Arrange
        var @event = new Event(
            name: "Test Event",
            description: "Description",
            eventDate: DateTime.UtcNow.AddDays(7),
            registrationEndDate: DateTime.UtcNow.AddDays(5));

        @event.Cancel(Guid.NewGuid());

        // Act & Assert
        var action = () => @event.UpdateDetails(name: "New Name");
        action.Should().Throw<DomainException>()
            .WithMessage("*Cannot edit*");
    }

    [Fact]
    public void UpdateDetails_PartialUpdate_OnlyUpdatesProvidedFields()
    {
        // Arrange
        var @event = new Event(
            name: "Original Name",
            description: "Original Description",
            eventDate: DateTime.UtcNow.AddDays(7),
            location: "Original Location",
            registrationEndDate: DateTime.UtcNow.AddDays(5));

        // Act - only update name
        @event.UpdateDetails(name: "Updated Name");

        // Assert
        @event.Name.Should().Be("Updated Name");
        @event.Description.Should().Be("Original Description"); // Unchanged
        @event.Location.Should().Be("Original Location"); // Unchanged
    }
}
