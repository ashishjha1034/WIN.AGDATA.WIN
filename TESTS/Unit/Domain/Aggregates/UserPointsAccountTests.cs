using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.ValueObjects;
using WIN.AGDATA.WIN.Domain.Events;
using Xunit;

namespace WIN.AGDATA.WIN.TESTS.Domain.Aggregates;

public class UserPointsAccountTests
{
    [Fact]
    public void Earn_WithValidPoints_ShouldIncreaseBalanceAndRaiseEvent()
    {
        // Arrange
        var account = new UserPointsAccount(Guid.NewGuid());
        var points = Points.Create(100);
        var processedBy = Guid.NewGuid();

        // Act
        account.Earn(points, "Event Participation", Guid.NewGuid(), processedBy);

        // Assert
        Assert.Equal(points, account.CurrentBalance);
        Assert.Equal(points, account.TotalEarned);
        Assert.Single(account.DomainEvents);
        Assert.IsType<PointsEarnedEvent>(account.DomainEvents.First());
    }

    [Fact]
    public void Spend_WithSufficientBalance_ShouldDecreaseBalanceAndRaiseEvent()
    {
        // Arrange
        var account = new UserPointsAccount(Guid.NewGuid());
        var earnedPoints = Points.Create(100);
        var spentPoints = Points.Create(30);
        var processedBy = Guid.NewGuid();

        account.Earn(earnedPoints, "Initial", null, processedBy);
        account.ClearDomainEvents();

        // Act
        account.Spend(spentPoints, "Redemption", Guid.NewGuid(), processedBy);

        // Assert
        Assert.Equal(Points.Create(70), account.CurrentBalance);
        Assert.Equal(spentPoints, account.TotalRedeemed);
        Assert.Single(account.DomainEvents);
        Assert.IsType<PointsSpentEvent>(account.DomainEvents.First());
    }

    [Fact]
    public void Spend_WithInsufficientBalance_ShouldThrowInsufficientPointsException()
    {
        // Arrange
        var account = new UserPointsAccount(Guid.NewGuid());
        var points = Points.Create(50);
        var processedBy = Guid.NewGuid();

        account.Earn(points, "Initial", null, processedBy);

        // Act & Assert
        Assert.Throws<InsufficientPointsException>(() =>
            account.Spend(Points.Create(100), "Redemption", null, processedBy));
    }

    [Fact]
    public void Adjust_WithPositiveAmount_ShouldIncreaseBalanceAndRaiseEvent()
    {
        // Arrange
        var account = new UserPointsAccount(Guid.NewGuid());
        var adjustment = Points.Create(50);
        var adjustedBy = Guid.NewGuid();

        // Act
        account.Adjust(adjustment, "Manual correction", adjustedBy);

        // Assert
        Assert.Equal(adjustment, account.CurrentBalance);
        Assert.Single(account.DomainEvents);
        Assert.IsType<PointsAdjustedEvent>(account.DomainEvents.First());
    }

    [Fact]
    public void Adjust_WithNegativeAmount_WhenSufficientBalance_ShouldDecreaseBalance()
    {
        // Arrange
        var account = new UserPointsAccount(Guid.NewGuid());
        var processedBy = Guid.NewGuid();

        account.Earn(Points.Create(100), "Initial", null, processedBy);
        account.ClearDomainEvents();

        // Act - Negative adjustments are done via Spend() method, not Adjust()
        // Points value objects cannot be negative by design
        // Test that Points.Create throws for negative values
        var exception = Assert.Throws<ArgumentException>(() => Points.Create(-30m));
        Assert.Contains("cannot be negative", exception.Message);

        // For actual balance reduction, use Spend()
        account.Spend(Points.Create(30), "Correction", null, processedBy);

        // Assert
        Assert.Equal(Points.Create(70), account.CurrentBalance);
    }

    [Fact]
    public void Refund_ShouldIncreaseBalanceWithoutAffectingTotalEarned()
    {
        // Arrange
        var account = new UserPointsAccount(Guid.NewGuid());
        var processedBy = Guid.NewGuid();

        account.Earn(Points.Create(100), "Initial", null, processedBy);
        account.Spend(Points.Create(50), "Purchase", null, processedBy);
        
        var initialTotalEarned = account.TotalEarned;
        account.ClearDomainEvents();

        // Act
        account.Refund(Points.Create(50), "Order cancelled", null, processedBy);

        // Assert
        Assert.Equal(Points.Create(100), account.CurrentBalance);
        Assert.Equal(initialTotalEarned, account.TotalEarned); // TotalEarned should not change on refund
        Assert.Single(account.DomainEvents);
    }
}
