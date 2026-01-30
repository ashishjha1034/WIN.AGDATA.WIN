using AutoMapper;
using Microsoft.Extensions.Logging;
using Moq;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using WIN.AGDATA.WIN.APPLICATION.Handlers.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Exceptions;
using Xunit;

namespace WIN.AGDATA.WIN.TESTS.Handlers;

/// <summary>
/// Unit tests for CreateEventHandler validation logic.
/// Focus: Registration end must be strictly earlier than event start.
/// </summary>
public class CreateEventHandlerTests
{
    private readonly Mock<IMapper> _mockMapper;
    private readonly Mock<IEventRepository> _mockEventRepo;
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    private readonly Mock<ILogger<CreateEventHandler>> _mockLogger;
    private readonly CreateEventHandler _handler;

    public CreateEventHandlerTests()
    {
        _mockMapper = new Mock<IMapper>();
        _mockEventRepo = new Mock<IEventRepository>();
        _mockUnitOfWork = new Mock<IUnitOfWork>();
        _mockLogger = new Mock<ILogger<CreateEventHandler>>();

        _mockMapper.Setup(m => m.Map<EventDto>(It.IsAny<Event>()))
            .Returns((Event e) => new EventDto
            {
                Id = e.Id,
                Name = e.Name,
                Description = e.Description,
                EventDate = e.EventDate,
                Status = e.Status.ToString()
            });

        _handler = new CreateEventHandler(
            _mockMapper.Object,
            _mockEventRepo.Object,
            _mockUnitOfWork.Object,
            _mockLogger.Object);
    }

    #region Validation Tests

    [Fact]
    public async Task Handle_WhenRegistrationEndDateUtcIsNull_ThrowsValidationException()
    {
        // Arrange
        var command = new CreateEventCommand(
            Name: "Test Event",
            EventDate: DateTime.UtcNow.AddDays(7),
            Description: "Test Description",
            TotalPointsPool: 1000,
            Location: "Test Location",
            MaxParticipants: 100,
            RegistrationEndDateUtc: null, // Missing registration deadline
            BannerImageUrl: null);

        // Act & Assert
        var exception = await Assert.ThrowsAsync<ValidationException>(
            () => _handler.Handle(command, CancellationToken.None));

        Assert.Equal("RegistrationEndDateUtc", exception.FieldName);
        Assert.Contains("Registration deadline is required", exception.Message);
    }

    [Fact]
    public async Task Handle_WhenRegistrationEndAfterEventStart_ThrowsValidationException()
    {
        // Arrange
        var eventDate = DateTime.UtcNow.AddDays(7);
        var registrationEnd = eventDate.AddDays(1); // After event start

        var command = new CreateEventCommand(
            Name: "Test Event",
            EventDate: eventDate,
            Description: "Test Description",
            TotalPointsPool: 1000,
            Location: "Test Location",
            MaxParticipants: 100,
            RegistrationEndDateUtc: registrationEnd,
            BannerImageUrl: null);

        // Act & Assert
        var exception = await Assert.ThrowsAsync<ValidationException>(
            () => _handler.Handle(command, CancellationToken.None));

        Assert.Equal("RegistrationEndDateUtc", exception.FieldName);
        Assert.Contains("must be strictly earlier than event start", exception.Message);
    }

    [Fact]
    public async Task Handle_WhenRegistrationEndEqualsEventStart_ThrowsValidationException()
    {
        // Arrange: Same date and time
        var eventDate = DateTime.UtcNow.AddDays(7);
        var registrationEnd = eventDate; // Exactly the same

        var command = new CreateEventCommand(
            Name: "Test Event",
            EventDate: eventDate,
            Description: "Test Description",
            TotalPointsPool: 1000,
            Location: "Test Location",
            MaxParticipants: 100,
            RegistrationEndDateUtc: registrationEnd,
            BannerImageUrl: null);

        // Act & Assert
        var exception = await Assert.ThrowsAsync<ValidationException>(
            () => _handler.Handle(command, CancellationToken.None));

        Assert.Equal("RegistrationEndDateUtc", exception.FieldName);
        Assert.Contains("must be strictly earlier than event start", exception.Message);
    }

    [Fact]
    public async Task Handle_WhenSameDayButEarlierTime_CreatesEvent()
    {
        // Arrange: Same day, but registration ends earlier
        var eventDate = new DateTime(2026, 3, 15, 14, 0, 0, DateTimeKind.Utc);
        var registrationEnd = new DateTime(2026, 3, 15, 10, 0, 0, DateTimeKind.Utc); // Same day, 4 hours earlier

        var command = new CreateEventCommand(
            Name: "Same Day Event",
            EventDate: eventDate,
            Description: "Test Description",
            TotalPointsPool: 1000,
            Location: "Test Location",
            MaxParticipants: 100,
            RegistrationEndDateUtc: registrationEnd,
            BannerImageUrl: null);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Same Day Event", result.Name);
        _mockEventRepo.Verify(r => r.Add(It.IsAny<Event>()), Times.Once);
        _mockUnitOfWork.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    [Fact]
    public async Task Handle_WhenRegistrationEndBeforeEventStart_CreatesEvent()
    {
        // Arrange: Registration ends day before event
        var eventDate = DateTime.UtcNow.AddDays(7);
        var registrationEnd = DateTime.UtcNow.AddDays(6); // Day before

        var command = new CreateEventCommand(
            Name: "Valid Event",
            EventDate: eventDate,
            Description: "Test Description",
            TotalPointsPool: 1000,
            Location: "Test Location",
            MaxParticipants: 100,
            RegistrationEndDateUtc: registrationEnd,
            BannerImageUrl: null);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        _mockEventRepo.Verify(r => r.Add(It.IsAny<Event>()), Times.Once);
        _mockUnitOfWork.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
    }

    #endregion

    #region Past Date Warnings

    [Fact]
    public async Task Handle_WhenRegistrationEndInPast_StillCreatesEventWithWarning()
    {
        // Arrange: Past registration end (for testing purposes)
        var eventDate = DateTime.UtcNow.AddDays(7);
        var registrationEnd = DateTime.UtcNow.AddMinutes(-30); // In the past

        var command = new CreateEventCommand(
            Name: "Past Reg Event",
            EventDate: eventDate,
            Description: "Test Description",
            TotalPointsPool: 1000,
            Location: "Test Location",
            MaxParticipants: 100,
            RegistrationEndDateUtc: registrationEnd,
            BannerImageUrl: null);

        // Act - Should succeed (warns but allows for testing)
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        _mockEventRepo.Verify(r => r.Add(It.IsAny<Event>()), Times.Once);
    }

    #endregion
}
