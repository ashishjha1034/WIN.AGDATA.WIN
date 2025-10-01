using WIN.AGDATA.WIN.Application.Services;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace IdentityTests.Application.Services
{
    public class ProductServiceTests
    {
        private readonly ProductService _productService;

        public ProductServiceTests()
        {
            _productService = new ProductService();
        }

        [Fact]
        public void CreateProduct_WithValidInputs_ShouldCreateAndReturnProduct()
        {
            // Arrange
            var name = "Gaming Mouse";
            var description = "High precision gaming mouse with RGB lighting";
            var requiredPoints = 500;
            var stockQuantity = 10;

            // Act
            var product = _productService.CreateProduct(name, description, requiredPoints, stockQuantity);

            // Assert
            product.Should().NotBeNull();
            product.Identity.Name.Should().Be("Gaming Mouse");
            product.Identity.Description.Should().Be("High precision gaming mouse with RGB lighting");
            product.Pricing.RequiredPoints.Should().Be(500);
            product.Inventory.StockQuantity.Should().Be(10);
        }

        [Fact]
        public void GetProduct_WithExistingProduct_ShouldReturnProduct()
        {
            // Arrange
            var product = _productService.CreateProduct("Gaming Mouse", "High precision gaming mouse", 500, 10);
            var productHashCode = product.GetHashCode();
            var guidFromHashCode = new Guid(productHashCode.ToString("X8") + "-0000-0000-0000-000000000000");

            // Act
            var foundProduct = _productService.GetProduct(guidFromHashCode);

            // Assert
            foundProduct.Should().NotBeNull();
            foundProduct.Identity.Name.Should().Be("Gaming Mouse");
        }

        [Fact]
        public void GetProduct_WithNonExistingProduct_ShouldReturnNull()
        {
            // Act
            var foundProduct = _productService.GetProduct(Guid.NewGuid());

            // Assert
            foundProduct.Should().BeNull();
        }

        [Fact]
        public void GetAllProducts_WithMultipleProducts_ShouldReturnAllProducts()
        {
            // Arrange
            _productService.CreateProduct("Gaming Mouse", "High precision gaming mouse", 500, 10);
            _productService.CreateProduct("Keyboard", "Mechanical keyboard with RGB", 750, 5);
            _productService.CreateProduct("Headset", "Wireless gaming headset", 300, 15);

            // Act
            var allProducts = _productService.GetAllProducts();

            // Assert
            allProducts.Should().HaveCount(3);
            allProducts.Should().Contain(p => p.Identity.Name == "Gaming Mouse");
            allProducts.Should().Contain(p => p.Identity.Name == "Keyboard");
            allProducts.Should().Contain(p => p.Identity.Name == "Headset");
        }

        [Fact]
        public void UpdateProduct_WithValidInputs_ShouldUpdateProduct()
        {
            // Arrange
            var product = _productService.CreateProduct("Old Name", "Old description here", 500, 10);
            var productHashCode = product.GetHashCode();
            var guidFromHashCode = new Guid(productHashCode.ToString("X8") + "-0000-0000-0000-000000000000");

            // Act
            _productService.UpdateProduct(guidFromHashCode, "New Gaming Mouse", "New description with more details", 750);

            // Assert
            var updatedProduct = _productService.GetProduct(guidFromHashCode);
            updatedProduct.Identity.Name.Should().Be("New Gaming Mouse");
            updatedProduct.Identity.Description.Should().Be("New description with more details");
            updatedProduct.Pricing.RequiredPoints.Should().Be(750);
        }

        [Fact]
        public void UpdateProduct_WithNonExistentProduct_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => _productService.UpdateProduct(Guid.NewGuid(), "New Name", "New description", 500);
            action.Should().Throw<DomainException>().WithMessage("Product not found");
        }

        [Fact]
        public void UpdateStock_WithValidInputs_ShouldUpdateStock()
        {
            // Arrange
            var product = _productService.CreateProduct("Gaming Mouse", "High precision gaming mouse", 500, 10);
            var productHashCode = product.GetHashCode();
            var guidFromHashCode = new Guid(productHashCode.ToString("X8") + "-0000-0000-0000-000000000000");

            // Act
            _productService.UpdateStock(guidFromHashCode, 25);

            // Assert
            var updatedProduct = _productService.GetProduct(guidFromHashCode);
            updatedProduct.Inventory.StockQuantity.Should().Be(25);
        }

        [Fact]
        public void UpdateStock_WithNonExistentProduct_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => _productService.UpdateStock(Guid.NewGuid(), 25);
            action.Should().Throw<DomainException>().WithMessage("Product not found");
        }

        [Fact]
        public void DeleteProduct_WithExistingProduct_ShouldRemoveProduct()
        {
            // Arrange
            var product = _productService.CreateProduct("Gaming Mouse", "High precision gaming mouse", 500, 10);
            var productHashCode = product.GetHashCode();
            var guidFromHashCode = new Guid(productHashCode.ToString("X8") + "-0000-0000-0000-000000000000");

            // Act
            _productService.DeleteProduct(guidFromHashCode);

            // Assert
            var deletedProduct = _productService.GetProduct(guidFromHashCode);
            deletedProduct.Should().BeNull();
        }

        [Fact]
        public void DeleteProduct_WithNonExistentProduct_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => _productService.DeleteProduct(Guid.NewGuid());
            action.Should().Throw<DomainException>().WithMessage("Product not found");
        }
    }
}