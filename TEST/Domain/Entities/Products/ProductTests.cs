using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace IdentityTests.Domain.Entities.Products
{
    public class ProductTests
    {
        [Fact]
        public void Constructor_WithValidInputs_ShouldCreateProduct()
        {
            // Arrange
            var name = "Gaming Mouse";
            var description = "High precision gaming mouse";
            var requiredPoints = 500;
            var stockQuantity = 10;

            // Act
            var product = new Product(name, description, requiredPoints, stockQuantity);

            // Assert
            product.Identity.Name.Should().Be("Gaming Mouse");
            product.Identity.Description.Should().Be("High precision gaming mouse");
            product.Pricing.RequiredPoints.Should().Be(500);
            product.Inventory.StockQuantity.Should().Be(10);
        }

        [Fact]
        public void Constructor_WithDefaultStock_ShouldCreateProductWithZeroStock()
        {
            // Arrange & Act
            var product = new Product("Gaming Mouse", "High precision gaming mouse", 500);

            // Assert
            product.Inventory.StockQuantity.Should().Be(0);
        }

        [Fact]
        public void UpdateDetails_WithValidInputs_ShouldUpdateProduct()
        {
            // Arrange
            var product = new Product("Old Name", "Old description", 500, 10);

            // Act
            product.UpdateDetails("New Gaming Mouse", "New description here", 750);

            // Assert
            product.Identity.Name.Should().Be("New Gaming Mouse");
            product.Identity.Description.Should().Be("New description here");
            product.Pricing.RequiredPoints.Should().Be(750);
        }

        [Fact]
        public void IncreaseStock_WithValidQuantity_ShouldIncreaseInventory()
        {
            // Arrange
            var product = new Product("Gaming Mouse", "High precision gaming mouse", 500, 10);

            // Act
            product.IncreaseStock(5);

            // Assert
            product.Inventory.StockQuantity.Should().Be(15);
        }

        [Fact]
        public void DecreaseStock_WithValidQuantity_ShouldDecreaseInventory()
        {
            // Arrange
            var product = new Product("Gaming Mouse", "High precision gaming mouse", 500, 10);

            // Act
            product.DecreaseStock(3);

            // Assert
            product.Inventory.StockQuantity.Should().Be(7);
        }

        [Theory]
        [InlineData(0, false)]  // No stock
        [InlineData(1, true)]   // Has stock
        [InlineData(10, true)]  // Multiple items in stock
        public void IsAvailable_WithVariousStockLevels_ShouldReturnExpectedResult(int stockQuantity, bool expectedResult)
        {
            // Arrange
            var product = new Product("Gaming Mouse", "High precision gaming mouse", 500, stockQuantity);

            // Act
            var result = product.IsAvailable();

            // Assert
            result.Should().Be(expectedResult);
        }

        [Fact]
        public void CanBeRedeemedBy_WithActiveUserAndSufficientPointsAndStock_ShouldReturnTrue()
        {
            // Arrange
            var product = new Product("Gaming Mouse", "High precision gaming mouse", 500, 10);
            var user = new User("EMP001", "test@company.com", "John", "Doe");
            user.AddPoints(600, "Bonus");

            // Act
            var result = product.CanBeRedeemedBy(user);

            // Assert
            result.Should().BeTrue();
        }

        [Fact]
        public void CanBeRedeemedBy_WithInsufficientPoints_ShouldReturnFalse()
        {
            // Arrange
            var product = new Product("Gaming Mouse", "High precision gaming mouse", 500, 10);
            var user = new User("EMP001", "test@company.com", "John", "Doe");
            user.AddPoints(300, "Bonus");

            // Act
            var result = product.CanBeRedeemedBy(user);

            // Assert
            result.Should().BeFalse();
        }

        [Fact]
        public void CanBeRedeemedBy_WithNoStock_ShouldReturnFalse()
        {
            // Arrange
            var product = new Product("Gaming Mouse", "High precision gaming mouse", 500, 0);
            var user = new User("EMP001", "test@company.com", "John", "Doe");
            user.AddPoints(600, "Bonus");

            // Act
            var result = product.CanBeRedeemedBy(user);

            // Assert
            result.Should().BeFalse();
        }
    }
}