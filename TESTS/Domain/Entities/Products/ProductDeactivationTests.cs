namespace WIN.AGDATA.WIN.Tests.Domain.Entities.Products;

/// <summary>
/// Tests for Product entity domain validation including deactivation rules.
/// </summary>
public class ProductTests
{
    #region ValidateDeactivation Tests

    [Fact]
    public void ValidateDeactivation_WhenPendingRedemptionsExist_ThrowsProductDeactivationBlockedException()
    {
        // Arrange
        var product = CreateTestProduct(stock: 0);

        // Act & Assert
        var exception = Assert.Throws<ProductDeactivationBlockedException>(
            () => product.ValidateDeactivation(
                pendingRedemptions: 3,
                approvedRedemptions: 0));

        exception.PendingCount.Should().Be(3);
        exception.ApprovedCount.Should().Be(0);
        exception.Message.Should().Contain("Pending: 3");
    }

    [Fact]
    public void ValidateDeactivation_WhenApprovedRedemptionsExist_ThrowsProductDeactivationBlockedException()
    {
        // Arrange
        var product = CreateTestProduct(stock: 0);

        // Act & Assert
        var exception = Assert.Throws<ProductDeactivationBlockedException>(
            () => product.ValidateDeactivation(
                pendingRedemptions: 0,
                approvedRedemptions: 2));

        exception.PendingCount.Should().Be(0);
        exception.ApprovedCount.Should().Be(2);
    }

    [Fact]
    public void ValidateDeactivation_WhenStockGreaterThanZero_ReturnsWarnings()
    {
        // Arrange
        var product = CreateTestProduct(stock: 12);

        // Act
        var warnings = product.ValidateDeactivation(
            pendingRedemptions: 0,
            approvedRedemptions: 0);

        // Assert
        warnings.Should().NotBeNull();
        warnings!.Stock.Should().Be(12);
        warnings.HasWarnings.Should().BeTrue();
    }

    [Fact]
    public void ValidateDeactivation_WhenRecentRedemptionsExist_ReturnsWarnings()
    {
        // Arrange
        var product = CreateTestProduct(stock: 0);

        // Act
        var warnings = product.ValidateDeactivation(
            pendingRedemptions: 0,
            approvedRedemptions: 0,
            recentRedemptions7d: 9,
            uniqueUsers7d: 6);

        // Assert
        warnings.Should().NotBeNull();
        warnings!.RecentRedemptions7d.Should().Be(9);
        warnings.RecentUniqueUsers7d.Should().Be(6);
        warnings.HasWarnings.Should().BeTrue();
    }

    [Fact]
    public void ValidateDeactivation_WhenNoIssues_ReturnsNull()
    {
        // Arrange
        var product = CreateTestProduct(stock: 0);

        // Act
        var warnings = product.ValidateDeactivation(
            pendingRedemptions: 0,
            approvedRedemptions: 0,
            recentRedemptions7d: 0,
            uniqueUsers7d: 0);

        // Assert
        warnings.Should().BeNull();
    }

    #endregion

    #region Deactivate Tests

    [Fact]
    public void Deactivate_WhenPendingRedemptionsExist_ThrowsException()
    {
        // Arrange
        var product = CreateTestProduct(stock: 0);

        // Act & Assert
        Assert.Throws<ProductDeactivationBlockedException>(
            () => product.Deactivate(
                "Test reason",
                pendingRedemptions: 1,
                approvedRedemptions: 0,
                force: true)); // Even with force, blocks cannot be bypassed
    }

    [Fact]
    public void Deactivate_WhenNoBlockers_SetsIsActiveToFalse()
    {
        // Arrange
        var product = CreateTestProduct(stock: 0);
        product.IsActive.Should().BeTrue();

        // Act
        product.Deactivate(
            "Deactivated for testing",
            pendingRedemptions: 0,
            approvedRedemptions: 0,
            force: false);

        // Assert
        product.IsActive.Should().BeFalse();
        product.DeactivationReason.Should().Be("Deactivated for testing");
    }

    [Fact]
    public void Deactivate_WithSimpleOverload_SetsIsActiveToFalse()
    {
        // Arrange
        var product = CreateTestProduct(stock: 0);

        // Act
        product.Deactivate("Simple deactivation");

        // Assert
        product.IsActive.Should().BeFalse();
        product.DeactivationReason.Should().Be("Simple deactivation");
    }

    #endregion

    #region ProductDeactivationWarnings Tests

    [Fact]
    public void ProductDeactivationWarnings_HasWarnings_TrueWhenStockGreaterThanZero()
    {
        // Arrange & Act
        var warnings = new ProductDeactivationWarnings(stock: 10, recentRedemptions7d: 0, recentUniqueUsers7d: 0);

        // Assert
        warnings.HasWarnings.Should().BeTrue();
    }

    [Fact]
    public void ProductDeactivationWarnings_HasWarnings_TrueWhenRecentRedemptionsExist()
    {
        // Arrange & Act
        var warnings = new ProductDeactivationWarnings(stock: 0, recentRedemptions7d: 5, recentUniqueUsers7d: 3);

        // Assert
        warnings.HasWarnings.Should().BeTrue();
    }

    [Fact]
    public void ProductDeactivationWarnings_HasWarnings_FalseWhenBothZero()
    {
        // Arrange & Act
        var warnings = new ProductDeactivationWarnings(stock: 0, recentRedemptions7d: 0, recentUniqueUsers7d: 0);

        // Assert
        warnings.HasWarnings.Should().BeFalse();
    }

    #endregion

    #region Helper Methods

    private Product CreateTestProduct(int stock)
    {
        var categoryId = Guid.NewGuid();
        var product = new Product("Test Product", "Description", categoryId, 100, null);
        
        // Adjust inventory stock if needed
        if (product.Inventory != null && stock > 0)
        {
            product.Inventory.AdjustStock(stock, Guid.NewGuid());
        }

        return product;
    }

    #endregion
}
