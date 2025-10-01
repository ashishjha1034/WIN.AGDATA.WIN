using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace IdentityTests.Domain.Entities.Products
{
    public class IdentityTests
    {
        [Fact]
        public void Constructor_WithValidInputs_ShouldCreateProductIdentity()
        {
            // Arrange
            var name = "Gaming Mouse";
            var description = "High precision gaming mouse with RGB lighting";

            // Act
            var identity = new WIN.AGDATA.WIN.Domain.Entities.Products.Identity(name, description);

            // Assert
            identity.Name.Should().Be("Gaming Mouse");
            identity.Description.Should().Be("High precision gaming mouse with RGB lighting");
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("   ")]
        [InlineData("A")] // Too short
        public void Constructor_WithInvalidName_ShouldThrowDomainException(string name)
        {
            // Act & Assert
            var action = () => new WIN.AGDATA.WIN.Domain.Entities.Products.Identity(name, "Valid description here");
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
            var action = () => new WIN.AGDATA.WIN.Domain.Entities.Products.Identity("Valid Name", description);
            action.Should().Throw<DomainException>();
        }

        [Fact]
        public void UpdateName_WithValidName_ShouldUpdateName()
        {
            // Arrange
            var identity = new WIN.AGDATA.WIN.Domain.Entities.Products.Identity("Old Name", "Description here");

            // Act
            identity.UpdateName("New Gaming Mouse");

            // Assert
            identity.Name.Should().Be("New Gaming Mouse");
        }

        [Fact]
        public void UpdateDescription_WithValidDescription_ShouldUpdateDescription()
        {
            // Arrange
            var identity = new WIN.AGDATA.WIN.Domain.Entities.Products.Identity("Gaming Mouse", "Old description");

            // Act
            identity.UpdateDescription("New description with more details");

            // Assert
            identity.Description.Should().Be("New description with more details");
        }

        [Fact]
        public void Equals_WithSameNames_ShouldReturnTrue()
        {
            // Arrange
            var identity1 = new WIN.AGDATA.WIN.Domain.Entities.Products.Identity("Gaming Mouse", "Description 1");
            var identity2 = new WIN.AGDATA.WIN.Domain.Entities.Products.Identity("Gaming Mouse", "Description 2");

            // Act & Assert
            identity1.Equals(identity2).Should().BeTrue();
        }

        [Fact]
        public void GetHashCode_WithSameNames_ShouldReturnSameHashCode()
        {
            // Arrange
            var identity1 = new WIN.AGDATA.WIN.Domain.Entities.Products.Identity("Gaming Mouse", "Description 1");
            var identity2 = new WIN.AGDATA.WIN.Domain.Entities.Products.Identity("gaming mouse", "Description 2");

            // Act & Assert
            identity1.GetHashCode().Should().Be(identity2.GetHashCode());
        }
    }
}