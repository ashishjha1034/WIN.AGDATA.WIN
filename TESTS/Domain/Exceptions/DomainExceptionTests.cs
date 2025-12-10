using WIN.AGDATA.WIN.Domain.Exceptions;

namespace IdentityTests.Domain.Exceptions
{
    public class DomainExceptionTests
    {
        [Fact]
        public void Constructor_WithoutParameters_ShouldCreateException()
        {
            // Act
            var exception = new DomainException();

            // Assert
            exception.Should().NotBeNull();
            exception.Message.Should().NotBeNull();
        }

        [Fact]
        public void Constructor_WithMessage_ShouldCreateExceptionWithMessage()
        {
            // Arrange
            var message = "This is a domain exception";

            // Act
            var exception = new DomainException(message);

            // Assert
            exception.Should().NotBeNull();
            exception.Message.Should().Be(message);
        }

        [Fact]
        public void Constructor_WithMessageAndInnerException_ShouldCreateExceptionWithBoth()
        {
            // Arrange
            var message = "This is a domain exception";
            var innerException = new InvalidOperationException("Inner exception");

            // Act
            var exception = new DomainException(message, innerException);

            // Assert
            exception.Should().NotBeNull();
            exception.Message.Should().Be(message);
            exception.InnerException.Should().Be(innerException);
        }

        [Fact]
        public void DomainException_ShouldInheritFromException()
        {
            // Arrange & Act
            var exception = new DomainException("Test message");

            // Assert
            exception.Should().BeOfType<DomainException>();
            exception.Should().BeAssignableTo<Exception>();
        }

        [Fact]
        public void DomainException_ShouldBeThrowableAndCatchable()
        {
            // Arrange
            var message = "Test domain exception";
            DomainException caughtException = null;

            // Act
            try
            {
                throw new DomainException(message);
            }
            catch (DomainException ex)
            {
                caughtException = ex;
            }

            // Assert
            caughtException.Should().NotBeNull();
            caughtException.Message.Should().Be(message);
        }
    }
}