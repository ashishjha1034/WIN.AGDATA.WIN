using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace IdentityTests.Domain.Entities.Redemptions
{
    public class RStatusTests
    {
        [Fact]
        public void Constructor_WithValidRedemptionId_ShouldCreateRStatus()
        {
            // Arrange
            var redemptionId = Guid.NewGuid();

            // Act
            var status = new RStatus(redemptionId);

            // Assert
            status.RedemptionId.Should().Be(redemptionId);
            status.CurrentStatus.Should().Be(StatusValue.Pending);
            status.ApprovedAt.Should().BeNull();
            status.DeliveredAt.Should().BeNull();
            status.RejectionReason.Should().BeNull();
            status.CanBeModified.Should().BeTrue();
            status.IsCompleted.Should().BeFalse();
        }

        [Fact]
        public void Constructor_WithEmptyRedemptionId_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => new RStatus(Guid.Empty);
            action.Should().Throw<DomainException>().WithMessage("Redemption ID is required");
        }

        [Fact]
        public void Approve_WhenPending_ShouldApproveStatus()
        {
            // Arrange
            var status = new RStatus(Guid.NewGuid());

            // Act
            status.Approve();

            // Assert
            status.CurrentStatus.Should().Be(StatusValue.Approved);
            status.ApprovedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
            status.RejectionReason.Should().BeNull();
            status.CanBeModified.Should().BeFalse();
            status.IsCompleted.Should().BeFalse();
        }

        [Fact]
        public void Approve_WhenNotPending_ShouldThrowDomainException()
        {
            // Arrange
            var status = new RStatus(Guid.NewGuid());
            status.Approve();

            // Act & Assert
            var action = () => status.Approve();
            action.Should().Throw<DomainException>().WithMessage("Only pending redemptions can be approved");
        }

        [Fact]
        public void Reject_WhenPendingWithValidReason_ShouldRejectStatus()
        {
            // Arrange
            var status = new RStatus(Guid.NewGuid());
            var rejectionReason = "Product out of stock";

            // Act
            status.Reject(rejectionReason);

            // Assert
            status.CurrentStatus.Should().Be(StatusValue.Rejected);
            status.RejectionReason.Should().Be("Product out of stock");
            status.CanBeModified.Should().BeFalse();
            status.IsCompleted.Should().BeTrue();
        }

        [Fact]
        public void Reject_WhenNotPending_ShouldThrowDomainException()
        {
            // Arrange
            var status = new RStatus(Guid.NewGuid());
            status.Approve();

            // Act & Assert
            var action = () => status.Reject("Some reason");
            action.Should().Throw<DomainException>().WithMessage("Only pending redemptions can be rejected");
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("   ")]
        public void Reject_WithInvalidReason_ShouldThrowDomainException(string reason)
        {
            // Arrange
            var status = new RStatus(Guid.NewGuid());

            // Act & Assert
            var action = () => status.Reject(reason);
            action.Should().Throw<DomainException>().WithMessage("Rejection reason is required");
        }

        [Fact]
        public void MarkDelivered_WhenApproved_ShouldMarkAsDelivered()
        {
            // Arrange
            var status = new RStatus(Guid.NewGuid());
            status.Approve();

            // Act
            status.MarkDelivered();

            // Assert
            status.CurrentStatus.Should().Be(StatusValue.Delivered);
            status.DeliveredAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
            status.CanBeModified.Should().BeFalse();
            status.IsCompleted.Should().BeTrue();
        }

        [Fact]
        public void MarkDelivered_WhenNotApproved_ShouldThrowDomainException()
        {
            // Arrange
            var status = new RStatus(Guid.NewGuid());

            // Act & Assert
            var action = () => status.MarkDelivered();
            action.Should().Throw<DomainException>().WithMessage("Only approved redemptions can be marked delivered");
        }
    }
}