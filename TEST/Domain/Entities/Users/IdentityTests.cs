using WIN.AGDATA.WIN.Domain.Exceptions;
using Identity = Domain.Entities.Users.Identity;

namespace IdentityTests.Domain.Entities.Users
{
    public class IdentityTests
    {
        [Fact]
        public void Constructor_WithValidInputs_ShouldCreateIdentity()
        {
            // Arrange
            var employeeId = "EMP001";
            var email = "test@company.com";
            var firstName = "John";
            var lastName = "Doe";

            // Act
            var identity = new Identity(employeeId, email, firstName, lastName);

            // Assert
            identity.EmployeeId.Should().Be("EMP001");
            identity.Email.Should().Be("test@company.com");
            identity.FirstName.Should().Be("John");
            identity.LastName.Should().Be("Doe");
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("   ")]
        public void Constructor_WithInvalidEmployeeId_ShouldThrowDomainException(string employeeId)
        {
            // Act & Assert
            var action = () => new Identity(employeeId, "test@company.com", "John", "Doe");
            action.Should().Throw<DomainException>().WithMessage("Employee ID required");
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("   ")]
        [InlineData("invalid-email")]
        public void Constructor_WithInvalidEmail_ShouldThrowDomainException(string email)
        {
            // Act & Assert
            var action = () => new Identity("EMP001", email, "John", "Doe");
            action.Should().Throw<DomainException>();
        }

        [Fact]
        public void UpdateEmail_WithValidEmail_ShouldUpdateEmail()
        {
            // Arrange
            var identity = new Identity("EMP001", "old@company.com", "John", "Doe");
            var newEmail = "new@company.com";

            // Act
            identity.UpdateEmail(newEmail);

            // Assert
            identity.Email.Should().Be("new@company.com");
        }

        [Fact]
        public void UpdateEmail_WithInvalidEmail_ShouldThrowDomainException()
        {
            // Arrange
            var identity = new Identity("EMP001", "test@company.com", "John", "Doe");

            // Act & Assert
            var action = () => identity.UpdateEmail("invalid-email");
            action.Should().Throw<DomainException>().WithMessage("Invalid email");
        }

        [Fact]
        public void UpdateName_WithValidNames_ShouldUpdateNames()
        {
            // Arrange
            var identity = new Identity("EMP001", "test@company.com", "John", "Doe");

            // Act
            identity.UpdateName("Jane", "Smith");

            // Assert
            identity.FirstName.Should().Be("Jane");
            identity.LastName.Should().Be("Smith");
        }

        [Theory]
        [InlineData(null, "Smith")]
        [InlineData("", "Smith")]
        [InlineData("Jane", null)]
        [InlineData("Jane", "")]
        public void UpdateName_WithInvalidNames_ShouldThrowDomainException(string firstName, string lastName)
        {
            // Arrange
            var identity = new Identity("EMP001", "test@company.com", "John", "Doe");

            // Act & Assert
            var action = () => identity.UpdateName(firstName, lastName);
            action.Should().Throw<DomainException>();
        }
    }
}