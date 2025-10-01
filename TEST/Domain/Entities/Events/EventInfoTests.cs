using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace IdentityTests.Domain.Entities.Events
{
    public class EventInfoTests
    {
        [Fact]
        public void Constructor_WithValidInputs_ShouldCreateEventInfo()
        {
            // Arrange
            var name = "Q4 Sales Competition";
            var description = "Quarterly sales performance competition with prizes";
            var eventDate = DateTime.UtcNow.AddDays(30);

            // Act
            var eventInfo = new EventInfo(name, description, eventDate);

            // Assert
            eventInfo.Name.Should().Be("Q4 Sales Competition");
            eventInfo.Description.Should().Be("Quarterly sales performance competition with prizes");
            eventInfo.EventDate.Should().Be(eventDate);
            eventInfo.CreatedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("   ")]
        [InlineData("AB")] // Too short
        public void Constructor_WithInvalidName_ShouldThrowDomainException(string name)
        {
            // Act & Assert
            var action = () => new EventInfo(name, "Valid description here", DateTime.UtcNow.AddDays(30));
            action.Should().Throw<DomainException>();
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("   ")]
        [InlineData("Short")] // Too short
        public void Constructor_WithInvalidDescription_ShouldThrowDomainException(string description)
        {
            // Act & Assert
            var action = () => new EventInfo("Event Name", description, DateTime.UtcNow.AddDays(30));
            action.Should().Throw<DomainException>();
        }

        [Fact]
        public void Constructor_WithEventDateTooFarInFuture_ShouldThrowDomainException()
        {
            // Arrange
            var eventDate = DateTime.UtcNow.AddYears(2);

            // Act & Assert
            var action = () => new EventInfo("Event Name", "Valid description here", eventDate);
            action.Should().Throw<DomainException>().WithMessage("Event date cannot be more than 1 year in future");
        }

        [Fact]
        public void UpdateDetails_WithValidInputs_ShouldUpdateEventInfo()
        {
            // Arrange
            var eventInfo = new EventInfo("Old Name", "Old description here", DateTime.UtcNow.AddDays(30));
            var newEventDate = DateTime.UtcNow.AddDays(60);

            // Act
            eventInfo.UpdateDetails("New Event Name", "New description with more details", newEventDate);

            // Assert
            eventInfo.Name.Should().Be("New Event Name");
            eventInfo.Description.Should().Be("New description with more details");
            eventInfo.EventDate.Should().Be(newEventDate);
        }

        [Theory]
        [InlineData(-10)]  // 10 days ago - within recent range
        [InlineData(-29)]  // 29 days ago - within recent range
        [InlineData(-31)]  // 31 days ago - outside recent range
        [InlineData(-60)]  // 60 days ago - outside recent range
        public void IsRecent_WithVariousDates_ShouldReturnExpectedResult(int daysOffset)
        {
            // Arrange
            var eventDate = DateTime.UtcNow.AddDays(daysOffset);
            var eventInfo = new EventInfo("Event Name", "Description here", eventDate);
            var expectedIsRecent = daysOffset >= -30;

            // Act
            var result = eventInfo.IsRecent();

            // Assert
            result.Should().Be(expectedIsRecent);
        }
    }
}
