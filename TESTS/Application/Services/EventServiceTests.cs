using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Application.Services;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Infrastructure.Repositories;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Application.Services;

public class EventServiceTests
{
    private readonly Mock<IEventRepository> _mockEventRepository;
    private readonly Mock<IUserRepository> _mockUserRepository;
    private readonly Mock<IPointsManagementService> _mockPointsService;
    private readonly Mock<ILogger<EventService>> _mockLogger;
    private readonly EventService _eventService;

    public EventServiceTests()
    {
        _mockEventRepository = new Mock<IEventRepository>();
        _mockUserRepository = new Mock<IUserRepository>();
        _mockPointsService = new Mock<IPointsManagementService>();
        _mockLogger = new Mock<ILogger<EventService>>();

        _eventService = new EventService(
            _mockEventRepository.Object,
            _mockUserRepository.Object,
            _mockPointsService.Object,
            _mockLogger.Object);
    }

    [Fact]
    public void CreateEvent_WithValidData_ShouldCreateSuccessfully()
    {
        // Arrange
        var eventId = "EVT001";
        var name = "Test Event";
        var description = "Test Description for event";
        var eventDate = DateTime.UtcNow.AddDays(30);
        var prizes = new List<EventPrizeTier>
        {
            new EventPrizeTier(1, 1000, "First Prize"),
            new EventPrizeTier(2, 500, "Second Prize")
        };

        _mockEventRepository.Setup(r => r.ExistsById(eventId)).Returns(false);

        // Act
        var result = _eventService.CreateEvent(eventId, name, description, eventDate, prizes);

        // Assert
        result.Should().NotBeNull();
        result.EventId.Should().Be(eventId);
        result.Info.Name.Should().Be(name);
        result.Prizes.Should().HaveCount(2);
        _mockEventRepository.Verify(r => r.Add(It.IsAny<Event>()), Times.Once);
    }

    [Fact]
    public void CreateEvent_WithExistingEventId_ShouldThrowException()
    {
        // Arrange
        var eventId = "EVT001";
        var prizes = new List<EventPrizeTier> { new EventPrizeTier(1, 1000) };
        _mockEventRepository.Setup(r => r.ExistsById(eventId)).Returns(true);

        // Act & Assert
        var act = () => _eventService.CreateEvent(eventId, "Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizes);

        act.Should().Throw<DomainException>()
           .WithMessage("Event with ID 'EVT001' already exists");
    }

    [Fact]
    public void CompleteEvent_WithValidWinners_ShouldCompleteSuccessfully()
    {
        // Arrange
        var eventId = "EVT001";
        var prizes = new List<EventPrizeTier>
        {
            new EventPrizeTier(1, 1000),
            new EventPrizeTier(2, 500)
        };
        var eventObj = new Event(eventId, "Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizes);
        var winners = new List<EventWinner>
        {
            new EventWinner("EMP001", 1),
            new EventWinner("EMP002", 2)
        };

        var user1 = new User("EMP001", "emp1@company.com", "User", "One");
        var user2 = new User("EMP002", "emp2@company.com", "User", "Two");

        _mockEventRepository.Setup(r => r.GetById(eventId)).Returns(eventObj);
        _mockUserRepository.Setup(r => r.GetByEmployeeId("EMP001")).Returns(user1);
        _mockUserRepository.Setup(r => r.GetByEmployeeId("EMP002")).Returns(user2);

        // Act
        _eventService.CompleteEvent(eventId, winners);

        // Assert
        eventObj.Status.IsCompleted.Should().BeTrue();
        _mockEventRepository.Verify(r => r.Update(eventObj), Times.Once);
        _mockPointsService.Verify(p => p.AddPointsToUser("EMP001", 1000, It.IsAny<string>(), eventId), Times.Once);
        _mockPointsService.Verify(p => p.AddPointsToUser("EMP002", 500, It.IsAny<string>(), eventId), Times.Once);
    }

    [Fact]
    public void CompleteEvent_WithNonExistentEvent_ShouldThrowException()
    {
        // Arrange
        var eventId = "EVT999";
        var winners = new List<EventWinner> { new EventWinner("EMP001", 1) };
        _mockEventRepository.Setup(r => r.GetById(eventId)).Returns((Event?)null);

        // Act & Assert
        var act = () => _eventService.CompleteEvent(eventId, winners);

        act.Should().Throw<DomainException>()
           .WithMessage("Event not found: EVT999");
    }

    [Fact]
    public void CompleteEvent_WithInactiveUser_ShouldThrowException()
    {
        // Arrange
        var eventId = "EVT001";
        var prizes = new List<EventPrizeTier> { new EventPrizeTier(1, 1000) };
        var eventObj = new Event(eventId, "Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizes);
        var winners = new List<EventWinner> { new EventWinner("EMP001", 1) };

        var inactiveUser = new User("EMP001", "emp1@company.com", "User", "One");
        inactiveUser.Deactivate("ADMIN");

        _mockEventRepository.Setup(r => r.GetById(eventId)).Returns(eventObj);
        _mockUserRepository.Setup(r => r.GetByEmployeeId("EMP001")).Returns(inactiveUser);

        // Act & Assert
        var act = () => _eventService.CompleteEvent(eventId, winners);

        act.Should().Throw<DomainException>()
           .WithMessage("User EMP001 cannot participate in events");
    }

    [Fact]
    public void GetEventById_WithExistingEvent_ShouldReturnEvent()
    {
        // Arrange
        var eventId = "EVT001";
        var prizes = new List<EventPrizeTier> { new EventPrizeTier(1, 1000) };
        var expectedEvent = new Event(eventId, "Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizes);
        _mockEventRepository.Setup(r => r.GetById(eventId)).Returns(expectedEvent);

        // Act
        var result = _eventService.GetEventById(eventId);

        // Assert
        result.Should().NotBeNull();
        result!.EventId.Should().Be(eventId);
    }

    [Fact]
    public void GetEventById_WithNonExistentEvent_ShouldReturnNull()
    {
        // Arrange
        var eventId = "EVT999";
        _mockEventRepository.Setup(r => r.GetById(eventId)).Returns((Event?)null);

        // Act
        var result = _eventService.GetEventById(eventId);

        // Assert
        result.Should().BeNull();
    }

    [Fact]
    public void DeactivateEvent_WithActiveEvent_ShouldDeactivateSuccessfully()
    {
        // Arrange
        var eventId = "EVT001";
        var prizes = new List<EventPrizeTier> { new EventPrizeTier(1, 1000) };
        var eventObj = new Event(eventId, "Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizes);
        var reason = "Test deactivation";

        _mockEventRepository.Setup(r => r.GetById(eventId)).Returns(eventObj);

        // Act
        _eventService.DeactivateEvent(eventId, reason);

        // Assert
        eventObj.Status.IsActive.Should().BeFalse();
        _mockEventRepository.Verify(r => r.Update(eventObj), Times.Once);
    }

    [Fact]
    public void AddPrizeTier_ToActiveEvent_ShouldAddSuccessfully()
    {
        // Arrange
        var eventId = "EVT001";
        var prizes = new List<EventPrizeTier> { new EventPrizeTier(1, 1000) };
        var eventObj = new Event(eventId, "Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizes);
        var newPrize = new EventPrizeTier(2, 500, "Second Prize");

        _mockEventRepository.Setup(r => r.GetById(eventId)).Returns(eventObj);

        // Act
        _eventService.AddPrizeTier(eventId, newPrize);

        // Assert
        eventObj.Prizes.Should().HaveCount(2);
        eventObj.GetPointsForRank(2).Should().Be(500);
        _mockEventRepository.Verify(r => r.Update(eventObj), Times.Once);
    }

    [Fact]
    public void AddPrizeTier_ToInactiveEvent_ShouldThrowException()
    {
        // Arrange
        var eventId = "EVT001";
        var prizes = new List<EventPrizeTier> { new EventPrizeTier(1, 1000) };
        var eventObj = new Event(eventId, "Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizes);
        eventObj.Status.Deactivate("Test");
        var newPrize = new EventPrizeTier(2, 500);

        _mockEventRepository.Setup(r => r.GetById(eventId)).Returns(eventObj);

        // Act & Assert
        var act = () => _eventService.AddPrizeTier(eventId, newPrize);

        act.Should().Throw<DomainException>()
           .WithMessage("Cannot modify inactive or completed event");
    }

    [Fact]
    public void GetAllEvents_ShouldReturnAllEvents()
    {
        // Arrange
        var events = new List<Event>
        {
            new Event("EVT001", "Event 1", "Description 1", DateTime.UtcNow.AddDays(30), new List<EventPrizeTier> { new EventPrizeTier(1, 1000) }),
            new Event("EVT002", "Event 2", "Description 2", DateTime.UtcNow.AddDays(60), new List<EventPrizeTier> { new EventPrizeTier(1, 800) })
        };
        _mockEventRepository.Setup(r => r.GetAll()).Returns(events);

        // Act
        var result = _eventService.GetAllEvents();

        // Assert
        result.Should().HaveCount(2);
        result.Should().Contain(e => e.EventId == "EVT001");
        result.Should().Contain(e => e.EventId == "EVT002");
    }
}
