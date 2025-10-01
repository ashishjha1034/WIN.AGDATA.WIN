using WIN.AGDATA.WIN.Domain.Exceptions;

namespace IdentityTests.Domain.Entities.Users
{
    public class StatusTests
    {
        [Fact]
        public void Constructor_ShouldCreateActiveStatus()
        {
            // Act
            var status = new Status();

            // Assert
            status.IsActive.Should().BeTrue();
            status.CreatedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
            status.LastModifiedAt.Should().BeNull();
        }

        [Fact]
        public void Deactivate_WhenActive_ShouldDeactivateUser()
        {
            // Arrange
            var status = new Status();

            // Act
            status.Deactivate();

            // Assert
            status.IsActive.Should().BeFalse();
            status.LastModifiedAt.Should().NotBeNull();
            status.LastModifiedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
        }

        [Fact]
        public void Deactivate_WhenAlreadyInactive_ShouldThrowDomainException()
        {
            // Arrange
            var status = new Status();
            status.Deactivate();

            // Act & Assert
            var action = () => status.Deactivate();
            action.Should().Throw<DomainException>().WithMessage("Already inactive");
        }

        [Fact]
        public void Reactivate_WhenInactive_ShouldReactivateUser()
        {
            // Arrange
            var status = new Status();
            status.Deactivate();

            // Act
            status.Reactivate();

            // Assert
            status.IsActive.Should().BeTrue();
            status.LastModifiedAt.Should().NotBeNull();
        }

        [Fact]
        public void Reactivate_WhenAlreadyActive_ShouldThrowDomainException()
        {
            // Arrange
            var status = new Status();

            // Act & Assert
            var action = () => status.Reactivate();
            action.Should().Throw<DomainException>().WithMessage("Already active");
        }
    }
}