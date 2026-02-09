using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.ValueObjects;
using WIN.AGDATA.WIN.Domain.Events;
using Xunit;

namespace WIN.AGDATA.WIN.TESTS.Domain.Aggregates;

public class RedemptionAggregateTests
{
    [Fact]
    public void Approve_WhenPending_ShouldApproveAndRaiseEvent()
    {
        // Arrange
        var redemption = CreateTestRedemption();
        var approvedBy = Guid.NewGuid();

        // Act
        redemption.Approve(approvedBy, "Approved for processing");

        // Assert
        Assert.Equal(RedemptionStatus.Approved, redemption.Status);
        Assert.Equal(approvedBy, redemption.ApprovedBy);
        Assert.NotNull(redemption.ApprovedAt);
        Assert.Single(redemption.DomainEvents);
        Assert.IsType<RedemptionApprovedEvent>(redemption.DomainEvents.First());
    }

    [Fact]
    public void Approve_WhenNotPending_ShouldThrowInvalidStatusTransitionException()
    {
        // Arrange
        var redemption = CreateTestRedemption();
        var approvedBy = Guid.NewGuid();
        redemption.Approve(approvedBy);

        // Act & Assert
        Assert.Throws<InvalidStatusTransitionException>(() => redemption.Approve(approvedBy));
    }

    [Fact]
    public void Reject_WhenPending_ShouldRejectAndRaiseEvent()
    {
        // Arrange
        var redemption = CreateTestRedemption();
        var rejectedBy = Guid.NewGuid();

        // Act
        redemption.Reject(rejectedBy, "Out of stock");

        // Assert
        Assert.Equal(RedemptionStatus.Rejected, redemption.Status);
        Assert.Single(redemption.DomainEvents);
        Assert.IsType<RedemptionRejectedEvent>(redemption.DomainEvents.First());
    }

    [Fact]
    public void MarkDelivered_WhenApproved_ShouldMarkDeliveredAndRaiseEvent()
    {
        // Arrange
        var redemption = CreateTestRedemption();
        var approvedBy = Guid.NewGuid();
        var deliveredBy = Guid.NewGuid();
        
        redemption.Approve(approvedBy);
        redemption.ClearDomainEvents();

        // Act
        redemption.MarkDelivered(deliveredBy, "Handed over to user");

        // Assert
        Assert.Equal(RedemptionStatus.Delivered, redemption.Status);
        Assert.Equal(deliveredBy, redemption.DeliveredBy);
        Assert.NotNull(redemption.DeliveredAt);
        Assert.Single(redemption.DomainEvents);
        Assert.IsType<RedemptionDeliveredEvent>(redemption.DomainEvents.First());
    }

    [Fact]
    public void MarkDelivered_WhenNotApproved_ShouldThrowInvalidStatusTransitionException()
    {
        // Arrange
        var redemption = CreateTestRedemption();
        var deliveredBy = Guid.NewGuid();

        // Act & Assert
        Assert.Throws<InvalidStatusTransitionException>(() => redemption.MarkDelivered(deliveredBy));
    }

    [Fact]
    public void Cancel_WhenPending_ShouldCancelAndRaiseEvent()
    {
        // Arrange
        var redemption = CreateTestRedemption();
        var cancelledBy = Guid.NewGuid();

        // Act
        redemption.Cancel(cancelledBy, "User requested cancellation");

        // Assert
        Assert.Equal(RedemptionStatus.Cancelled, redemption.Status);
        Assert.Single(redemption.DomainEvents);
        Assert.IsType<RedemptionCancelledEvent>(redemption.DomainEvents.First());
    }

    [Fact]
    public void Cancel_WhenDelivered_ShouldThrowInvalidStatusTransitionException()
    {
        // Arrange
        var redemption = CreateTestRedemption();
        redemption.Approve(Guid.NewGuid());
        redemption.MarkDelivered(Guid.NewGuid());

        // Act & Assert
        Assert.Throws<InvalidStatusTransitionException>(() => redemption.Cancel(Guid.NewGuid()));
    }

    [Theory]
    [InlineData(RedemptionStatus.Pending, true)]
    [InlineData(RedemptionStatus.Approved, true)]
    public void IsActive_ShouldReturnTrueForActiveStatuses(RedemptionStatus status, bool expectedActive)
    {
        // Arrange
        var redemption = CreateTestRedemption();
        
        if (status == RedemptionStatus.Approved)
            redemption.Approve(Guid.NewGuid());

        // Act
        var isActive = redemption.IsActive();

        // Assert
        Assert.Equal(expectedActive, isActive);
    }

    [Theory]
    [InlineData(RedemptionStatus.Cancelled)]
    [InlineData(RedemptionStatus.Rejected)]
    public void ShouldRefundPoints_ShouldReturnTrueForRefundableStatuses(RedemptionStatus status)
    {
        // Arrange
        var redemption = CreateTestRedemption();
        
        if (status == RedemptionStatus.Cancelled)
            redemption.Cancel(Guid.NewGuid());
        else if (status == RedemptionStatus.Rejected)
            redemption.Reject(Guid.NewGuid(), "Test");

        // Act
        var shouldRefund = redemption.ShouldRefundPoints();

        // Assert
        Assert.True(shouldRefund);
    }

    private Redemption CreateTestRedemption()
    {
        return new Redemption(
            userId: Guid.NewGuid(),
            productId: Guid.NewGuid(),
            pointsSpent: Points.Create(100),
            quantity: 1);
    }
}
