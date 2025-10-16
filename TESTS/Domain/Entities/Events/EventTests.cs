using FluentAssertions;
using System.Reflection;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Domain.Events;

public class EventTests
{
    [Fact]
    public void CreateEvent_WithValidData_ShouldCreateSuccessfully()
    {
        var prizes = new List<EventPrizeTier>
        {
            new(1, 1000, "First Prize"),
            new(2, 500, "Second Prize")
        };

        var eventObj = new Event("EVT001", "Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizes);

        eventObj.EventId.Should().Be("EVT001");
        eventObj.Info.Name.Should().Be("Test Event");
        eventObj.Prizes.Should().HaveCount(2);
        eventObj.Status.IsActive.Should().BeTrue();
    }

    [Fact]
    public void AddPrizeTier_WithValidTier_ShouldAddSuccessfully()
    {
        var prizes = new List<EventPrizeTier> { new(1, 1000) };
        var eventObj = new Event("EVT001", "Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizes);

        eventObj.AddPrizeTier(new EventPrizeTier(2, 500));

        eventObj.Prizes.Should().HaveCount(2);
        eventObj.GetPointsForRank(2).Should().Be(500);
    }

    [Fact]
    public void AddPrizeTier_WithDuplicateRank_ShouldThrowException()
    {
        var prizes = new List<EventPrizeTier> { new(1, 1000) };
        var eventObj = new Event("EVT001", "Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizes);

        var act = () => eventObj.AddPrizeTier(new EventPrizeTier(1, 800));

        act.Should().Throw<DomainException>()
           .WithMessage("Prize tier for rank 1 already exists");
    }

    [Fact]
    public void CompleteEvent_WithValidWinners_ShouldCompleteSuccessfully()
    {
        var prizes = new List<EventPrizeTier>
        {
            new(1, 1000),
            new(2, 500)
        };
        var eventObj = new Event("EVT001", "Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizes);
        var winners = new List<EventWinner>
        {
            new("EMP001", 1),
            new("EMP002", 2)
        };

        eventObj.CompleteEvent(winners);

        eventObj.Status.IsCompleted.Should().BeTrue();
        eventObj.Status.IsActive.Should().BeFalse();
        eventObj.Status.Winners.Should().HaveCount(2);
    }

    [Fact]
    public void CompleteEvent_WithMoreWinnersThanPrizes_ShouldThrowException()
    {
        var prizes = new List<EventPrizeTier> { new(1, 1000) };
        var eventObj = new Event("EVT001", "Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizes);
        var winners = new List<EventWinner>
        {
            new("EMP001", 1),
            new("EMP002", 2)
        };

        var act = () => eventObj.CompleteEvent(winners);

        act.Should().Throw<DomainException>()
           .WithMessage("More winners than available prizes");
    }

    [Theory]
    [InlineData("")]
    [InlineData("  ")]
    [InlineData("AB")]
    public void CreateEvent_WithInvalidEventId_ShouldThrowException(string eventId)
    {
        var prizes = new List<EventPrizeTier> { new(1, 1000) };

        var act = () => new Event(eventId, "Test Event", "Test Description", DateTime.UtcNow.AddDays(30), prizes);

        act.Should().Throw<DomainException>();
    }
}
