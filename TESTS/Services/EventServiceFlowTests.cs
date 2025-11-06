using FluentAssertions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using System;
using System.Collections.Generic;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Application.Services;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Infrastructure.Repositories;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Services;

public class EventServiceFlowTests
{
    private readonly Mock<IEventRepository> _eventRepo = new();
    private readonly Mock<IUserRepository> _userRepo = new();
    private readonly Mock<IPointsService> _pointsMgmt = new();
    private readonly Mock<ILogger<EventService>> _logger = new();
    private readonly EventService _service;

    public EventServiceFlowTests()
    {
        _service = new EventService(
            _eventRepo.Object,
            _userRepo.Object,
            _pointsMgmt.Object,
            new NullLogger<EventService>());
    }

    [Fact]
    public void CompleteEvent_WinnersAllValid_AwardsPointsAndMarksCompleted()
    {
        // Arrange
        var prizes = new List<PrizeTier> { new PrizeTier(1, 100), new PrizeTier(2, 50) };
        var ev = new Event("E001", "Hackathon", "Awesome hack", DateTime.UtcNow.AddDays(-1), prizes, "SYSTEM");

        _eventRepo.Setup(r => r.GetById("E001")).Returns(ev);

        // winners: employee ids must exist and be active
        var winner1 = new Winner("EMP_A", 1);
        var winner2 = new Winner("EMP_B", 2);

        var userA = new User("EMP_A", "a@x.com", "A", "Alpha");
        var userB = new User("EMP_B", "b@x.com", "B", "Beta");

        _userRepo.Setup(r => r.GetByEmployeeId("EMP_A")).Returns(userA);
        _userRepo.Setup(r => r.GetByEmployeeId("EMP_B")).Returns(userB);

        // Capture update
        Event? updatedEvent = null;
        _eventRepo.Setup(r => r.Update(It.IsAny<Event>())).Callback<Event>(e => updatedEvent = e);

        // Act
        _service.CompleteEvent("E001", new List<Winner> { winner1, winner2 });

        // Assert
        updatedEvent.Should().NotBeNull();
        updatedEvent!.Status.IsCompleted.Should().BeTrue();
        // Verify points awarded according to prize tiers
        _pointsMgmt.Verify(p => p.AddPointsToUser("EMP_A", 100, It.Is<string>(s => s.Contains("Won event")), "E001"), Times.Once);
        _pointsMgmt.Verify(p => p.AddPointsToUser("EMP_B", 50, It.Is<string>(s => s.Contains("Won event")), "E001"), Times.Once);
    }

    [Fact]
    public void CompleteEvent_UserCannotParticipate_ThrowsDomainException()
    {
        // Arrange
        var prizes = new List<PrizeTier> { new PrizeTier(1, 100) };
        var ev = new Event("E002", "Contest", "desc", DateTime.UtcNow.AddDays(-2), prizes, "SYSTEM");
        _eventRepo.Setup(r => r.GetById("E002")).Returns(ev);

        var winner = new Winner("EMP_X", 1);
        var userX = new User("EMP_X", "x@x.com", "X", "Nope");
        // make user inactive (deactivate)
        userX.Deactivate("bad", "SYSTEM");
        _userRepo.Setup(r => r.GetByEmployeeId("EMP_X")).Returns(userX);

        // Act
        Action act = () => _service.CompleteEvent("E002", new List<Winner> { winner });

        // Assert
        act.Should().Throw<DomainException>().WithMessage("*cannot participate*");
    }
}
