using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN_AGDATA_WIN.Application.Services;
using Xunit;

namespace IdentityTests.Application.Services
{
    public class EventServiceTests
    {
        private readonly EventService _eventService;

        public EventServiceTests()
        {
            _eventService = new EventService();
        }

        [Fact]
        public void CreateEvent_WithValidInputs_ShouldCreateAndReturnEvent()
        {
            // Arrange
            var name = "Q4 Sales Competition";
            var description = "Quarterly sales performance competition with amazing prizes";
            var eventDate = DateTime.UtcNow.AddDays(30);
            var prizeTiers = new List<PrizeTier>
            {
                new PrizeTier(1, 1000, "First Place Gold"),
                new PrizeTier(2, 500, "Second Place Silver"),
                new PrizeTier(3, 250, "Third Place Bronze")
            };

            // Act
            var eventObj = _eventService.CreateEvent(name, description, eventDate, prizeTiers);

            // Assert
            eventObj.Should().NotBeNull();
            eventObj.EventId.Should().StartWith("EVT");
            eventObj.Info.Name.Should().Be("Q4 Sales Competition");
            eventObj.Info.Description.Should().Be("Quarterly sales performance competition with amazing prizes");
            eventObj.Status.IsActive.Should().BeTrue();
            eventObj.Prizes.Tiers.Should().HaveCount(3);
        }

        [Fact]
        public void CreateEvent_ShouldGenerateSequentialEventIds()
        {
            // Arrange
            var prizeTiers = new List<PrizeTier> { new PrizeTier(1, 1000) };

            // Act
            var event1 = _eventService.CreateEvent("Event 1", "Description 1", DateTime.UtcNow.AddDays(30), prizeTiers);
            var event2 = _eventService.CreateEvent("Event 2", "Description 2", DateTime.UtcNow.AddDays(60), prizeTiers);
            var event3 = _eventService.CreateEvent("Event 3", "Description 3", DateTime.UtcNow.AddDays(90), prizeTiers);

            // Assert
            event1.EventId.Should().Be("EVT001");
            event2.EventId.Should().Be("EVT002");
            event3.EventId.Should().Be("EVT003");
        }

        [Fact]
        public void GetEvent_WithExistingEventId_ShouldReturnEvent()
        {
            // Arrange
            var prizeTiers = new List<PrizeTier> { new PrizeTier(1, 1000) };
            var createdEvent = _eventService.CreateEvent("Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizeTiers);

            // Act
            var foundEvent = _eventService.GetEvent(createdEvent.EventId);

            // Assert
            foundEvent.Should().NotBeNull();
            foundEvent.EventId.Should().Be(createdEvent.EventId);
            foundEvent.Info.Name.Should().Be("Test Event");
        }

        [Fact]
        public void GetEvent_WithNonExistingEventId_ShouldReturnNull()
        {
            // Act
            var foundEvent = _eventService.GetEvent("NONEXISTENT");

            // Assert
            foundEvent.Should().BeNull();
        }

        [Fact]
        public void GetEvent_ShouldBeCaseInsensitive()
        {
            // Arrange
            var prizeTiers = new List<PrizeTier> { new PrizeTier(1, 1000) };
            var createdEvent = _eventService.CreateEvent("Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizeTiers);

            // Act
            var foundEventLower = _eventService.GetEvent(createdEvent.EventId.ToLower());
            var foundEventUpper = _eventService.GetEvent(createdEvent.EventId.ToUpper());

            // Assert
            foundEventLower.Should().NotBeNull();
            foundEventUpper.Should().NotBeNull();
            foundEventLower.EventId.Should().Be(createdEvent.EventId);
            foundEventUpper.EventId.Should().Be(createdEvent.EventId);
        }

        [Fact]
        public void GetAllEvents_WithMultipleEvents_ShouldReturnAllEvents()
        {
            // Arrange
            var prizeTiers = new List<PrizeTier> { new PrizeTier(1, 1000) };
            _eventService.CreateEvent("Event 1", "Description 1", DateTime.UtcNow.AddDays(30), prizeTiers);
            _eventService.CreateEvent("Event 2", "Description 2", DateTime.UtcNow.AddDays(60), prizeTiers);
            _eventService.CreateEvent("Event 3", "Description 3", DateTime.UtcNow.AddDays(90), prizeTiers);

            // Act
            var allEvents = _eventService.GetAllEvents();

            // Assert
            allEvents.Should().HaveCount(3);
            allEvents.Should().Contain(e => e.Info.Name == "Event 1");
            allEvents.Should().Contain(e => e.Info.Name == "Event 2");
            allEvents.Should().Contain(e => e.Info.Name == "Event 3");
        }

        [Fact]
        public void AddPrizeTier_WithValidInputs_ShouldAddTierToEvent()
        {
            // Arrange
            var prizeTiers = new List<PrizeTier>
            {
                new PrizeTier(1, 1000),
                new PrizeTier(2, 500)
            };
            var eventObj = _eventService.CreateEvent("Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizeTiers);
            var newTier = new PrizeTier(3, 250, "Third Place");

            // Act
            _eventService.AddPrizeTier(eventObj.EventId, newTier);

            // Assert
            var updatedEvent = _eventService.GetEvent(eventObj.EventId);
            updatedEvent.Prizes.Tiers.Should().HaveCount(3);
            updatedEvent.Prizes.GetPoints(3).Should().Be(250);
        }

        [Fact]
        public void AddPrizeTier_WithNonExistentEvent_ShouldThrowDomainException()
        {
            // Arrange
            var prizeTier = new PrizeTier(1, 1000);

            // Act & Assert
            var action = () => _eventService.AddPrizeTier("NONEXISTENT", prizeTier);
            action.Should().Throw<DomainException>().WithMessage("Event with ID NONEXISTENT not found");
        }

        [Fact]
        public void CompleteEvent_WithValidInputs_ShouldCompleteEvent()
        {
            // Arrange
            var prizeTiers = new List<PrizeTier>
            {
                new PrizeTier(1, 1000),
                new PrizeTier(2, 500)
            };
            var eventObj = _eventService.CreateEvent("Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizeTiers);
            var winners = new List<Winner>
            {
                new Winner("john.doe@company.com", 1, "John Doe"),
                new Winner("jane.smith@company.com", 2, "Jane Smith")
            };

            // Act
            _eventService.CompleteEvent(eventObj.EventId, winners);

            // Assert
            var completedEvent = _eventService.GetEvent(eventObj.EventId);
            completedEvent.Status.IsCompleted.Should().BeTrue();
            completedEvent.Status.Winners.Should().HaveCount(2);
            completedEvent.Status.Winners.Should().Contain(w => w.EmployeeEmail == "john.doe@company.com");
            completedEvent.Status.Winners.Should().Contain(w => w.EmployeeEmail == "jane.smith@company.com");
        }

        [Fact]
        public void CompleteEvent_WithNonExistentEvent_ShouldThrowDomainException()
        {
            // Arrange
            var winners = new List<Winner> { new Winner("john@company.com", 1, "John") };

            // Act & Assert
            var action = () => _eventService.CompleteEvent("NONEXISTENT", winners);
            action.Should().Throw<DomainException>().WithMessage("Event with ID NONEXISTENT not found");
        }
    }
}