using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;

namespace IdentityTests.Domain.Entities.Transactions
{
    public class PointsTransactionTests
    {
        private class TestPointsTransaction : PointsTransaction
        {
            public TestPointsTransaction(string employeeId, int points, string description)
                : base(employeeId, points, description)
            {
            }
        }

        [Fact]
        public void Constructor_WithValidInputs_ShouldCreateTransaction()
        {
            // Arrange & Act
            var transaction = new TestPointsTransaction("EMP001", 100, "Test bonus");

            // Assert
            transaction.Id.Should().NotBe(Guid.Empty);
            transaction.EmployeeId.Should().Be("EMP001");
            transaction.Points.Should().Be(100);
            transaction.Description.Should().Be("Test bonus");
            transaction.TransactionDate.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("   ")]
        public void Constructor_WithInvalidEmployeeId_ShouldThrowDomainException(string employeeId)
        {
            // Act & Assert
            var action = () => new TestPointsTransaction(employeeId, 100, "Test bonus");
            action.Should().Throw<DomainException>().WithMessage("Employee ID is required");
        }

        [Fact]
        public void Constructor_WithZeroPoints_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => new TestPointsTransaction("EMP001", 0, "Test bonus");
            action.Should().Throw<DomainException>().WithMessage("Points cannot be zero");
        }

        [Theory]
        [InlineData(null)]
        [InlineData("")]
        [InlineData("   ")]
        public void Constructor_WithInvalidDescription_ShouldThrowDomainException(string description)
        {
            // Act & Assert
            var action = () => new TestPointsTransaction("EMP001", 100, description);
            action.Should().Throw<DomainException>().WithMessage("Transaction description is required");
        }

        [Fact]
        public void Constructor_ShouldTrimAndUpperCaseEmployeeId()
        {
            // Act
            var transaction = new TestPointsTransaction("  emp001  ", 100, "Test bonus");

            // Assert
            transaction.EmployeeId.Should().Be("EMP001");
        }

        [Fact]
        public void Constructor_ShouldTrimDescription()
        {
            // Act
            var transaction = new TestPointsTransaction("EMP001", 100, "  Test bonus  ");

            // Assert
            transaction.Description.Should().Be("Test bonus");
        }
    }
}