using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace IdentityTests.Domain.Entities.Products
{
    public class InventoryTests
    {
        [Fact]
        public void Constructor_WithValidStock_ShouldCreateInventory()
        {
            // Arrange & Act
            var inventory = new Inventory(10);

            // Assert
            inventory.StockQuantity.Should().Be(10);
            inventory.LastStockUpdate.Should().BeNull();
        }

        [Fact]
        public void Constructor_WithDefaultStock_ShouldCreateInventoryWithZeroStock()
        {
            // Arrange & Act
            var inventory = new Inventory();

            // Assert
            inventory.StockQuantity.Should().Be(0);
        }

        [Fact]
        public void Constructor_WithNegativeStock_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => new Inventory(-5);
            action.Should().Throw<DomainException>().WithMessage("Stock quantity cannot be negative");
        }

        [Fact]
        public void IncreaseStock_WithValidQuantity_ShouldIncreaseStock()
        {
            // Arrange
            var inventory = new Inventory(10);

            // Act
            inventory.IncreaseStock(5);

            // Assert
            inventory.StockQuantity.Should().Be(15);
            inventory.LastStockUpdate.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-5)]
        public void IncreaseStock_WithInvalidQuantity_ShouldThrowDomainException(int quantity)
        {
            // Arrange
            var inventory = new Inventory(10);

            // Act & Assert
            var action = () => inventory.IncreaseStock(quantity);
            action.Should().Throw<DomainException>().WithMessage("Quantity to add must be positive");
        }

        [Fact]
        public void DecreaseStock_WithValidQuantity_ShouldDecreaseStock()
        {
            // Arrange
            var inventory = new Inventory(10);

            // Act
            inventory.DecreaseStock(3);

            // Assert
            inventory.StockQuantity.Should().Be(7);
            inventory.LastStockUpdate.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
        }

        [Fact]
        public void DecreaseStock_WithInsufficientStock_ShouldThrowDomainException()
        {
            // Arrange
            var inventory = new Inventory(5);

            // Act & Assert
            var action = () => inventory.DecreaseStock(10);
            action.Should().Throw<DomainException>().WithMessage("Insufficient stock. Available: 5, Requested: 10");
        }

        [Theory]
        [InlineData(0)]
        [InlineData(-3)]
        public void DecreaseStock_WithInvalidQuantity_ShouldThrowDomainException(int quantity)
        {
            // Arrange
            var inventory = new Inventory(10);

            // Act & Assert
            var action = () => inventory.DecreaseStock(quantity);
            action.Should().Throw<DomainException>().WithMessage("Quantity to deduct must be positive");
        }

        [Fact]
        public void SetStock_WithValidQuantity_ShouldSetStock()
        {
            // Arrange
            var inventory = new Inventory(10);

            // Act
            inventory.SetStock(25);

            // Assert
            inventory.StockQuantity.Should().Be(25);
            inventory.LastStockUpdate.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
        }

        [Fact]
        public void SetStock_WithNegativeQuantity_ShouldThrowDomainException()
        {
            // Arrange
            var inventory = new Inventory(10);

            // Act & Assert
            var action = () => inventory.SetStock(-5);
            action.Should().Throw<DomainException>().WithMessage("Stock quantity cannot be negative");
        }

        [Theory]
        [InlineData(0, false)]
        [InlineData(1, true)]
        [InlineData(10, true)]
        public void IsInStock_WithVariousStockLevels_ShouldReturnExpectedResult(int stockQuantity, bool expectedResult)
        {
            // Arrange
            var inventory = new Inventory(stockQuantity);

            // Act
            var result = inventory.IsInStock();

            // Assert
            result.Should().Be(expectedResult);
        }
    }
}