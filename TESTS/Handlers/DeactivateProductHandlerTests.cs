using WIN.AGDATA.WIN.APPLICATION.Commands.Products;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using WIN.AGDATA.WIN.APPLICATION.Handlers;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.Tests.Handlers;

/// <summary>
/// Tests for DeactivateProductHandler implementing safe product deactivation.
/// Tests cover: Hard blocks, Soft warnings, Happy path, and Transactional guard.
/// </summary>
public class DeactivateProductHandlerTests
{
    private readonly Mock<IProductRepository> _productRepositoryMock;
    private readonly Mock<IRedemptionRepository> _redemptionRepositoryMock;
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly DeactivateProductHandler _handler;

    public DeactivateProductHandlerTests()
    {
        _productRepositoryMock = new Mock<IProductRepository>();
        _redemptionRepositoryMock = new Mock<IRedemptionRepository>();
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        
        _handler = new DeactivateProductHandler(
            _productRepositoryMock.Object,
            _redemptionRepositoryMock.Object,
            _unitOfWorkMock.Object);
    }

    #region Hard Block Tests

    [Fact]
    public async Task Handle_WhenPendingRedemptionsExist_ReturnsBlockedResult()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var product = CreateTestProduct(productId, stock: 0);
        var command = new DeactivateProductCommand(productId, Force: false);

        _productRepositoryMock
            .Setup(r => r.GetByIdWithInventoryAsync(productId))
            .ReturnsAsync(product);

        _redemptionRepositoryMock
            .Setup(r => r.GetPendingAndApprovedCountsForProductAsync(productId))
            .ReturnsAsync(new PendingApprovedCounts(3, 0)); // 3 pending

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Success.Should().BeFalse();
        result.IsBlocked.Should().BeTrue();
        result.Blocked.Should().NotBeNull();
        result.Blocked!.Code.Should().Be("DEACTIVATE_BLOCKED");
        result.Blocked.Pending.Should().Be(3);
        result.Blocked.Approved.Should().Be(0);

        // Verify product was not deactivated
        _productRepositoryMock.Verify(r => r.UpdateAsync(It.IsAny<Product>()), Times.Never);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Handle_WhenApprovedRedemptionsExist_ReturnsBlockedResult()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var product = CreateTestProduct(productId, stock: 0);
        var command = new DeactivateProductCommand(productId, Force: false);

        _productRepositoryMock
            .Setup(r => r.GetByIdWithInventoryAsync(productId))
            .ReturnsAsync(product);

        _redemptionRepositoryMock
            .Setup(r => r.GetPendingAndApprovedCountsForProductAsync(productId))
            .ReturnsAsync(new PendingApprovedCounts(0, 2)); // 2 approved

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Success.Should().BeFalse();
        result.IsBlocked.Should().BeTrue();
        result.Blocked.Should().NotBeNull();
        result.Blocked!.Pending.Should().Be(0);
        result.Blocked.Approved.Should().Be(2);
    }

    [Fact]
    public async Task Handle_WhenBothPendingAndApprovedExist_ReturnsBlockedWithBothCounts()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var product = CreateTestProduct(productId, stock: 0);
        var command = new DeactivateProductCommand(productId, Force: false);

        _productRepositoryMock
            .Setup(r => r.GetByIdWithInventoryAsync(productId))
            .ReturnsAsync(product);

        _redemptionRepositoryMock
            .Setup(r => r.GetPendingAndApprovedCountsForProductAsync(productId))
            .ReturnsAsync(new PendingApprovedCounts(3, 1)); // 3 pending, 1 approved

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsBlocked.Should().BeTrue();
        result.Blocked!.Pending.Should().Be(3);
        result.Blocked.Approved.Should().Be(1);
        result.Blocked.Message.Should().Contain("Pending: 3");
        result.Blocked.Message.Should().Contain("Approved: 1");
    }

    [Fact]
    public async Task Handle_WhenBlockedAndForceIsTrue_StillBlocked()
    {
        // Arrange - Force cannot bypass hard blocks
        var productId = Guid.NewGuid();
        var product = CreateTestProduct(productId, stock: 0);
        var command = new DeactivateProductCommand(productId, Force: true);

        _productRepositoryMock
            .Setup(r => r.GetByIdWithInventoryAsync(productId))
            .ReturnsAsync(product);

        _redemptionRepositoryMock
            .Setup(r => r.GetPendingAndApprovedCountsForProductAsync(productId))
            .ReturnsAsync(new PendingApprovedCounts(1, 0));

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert - Force cannot bypass hard blocks
        result.IsBlocked.Should().BeTrue();
        _productRepositoryMock.Verify(r => r.UpdateAsync(It.IsAny<Product>()), Times.Never);
    }

    #endregion

    #region Soft Warning Tests

    [Fact]
    public async Task Handle_WhenStockGreaterThanZero_ReturnsWarningsWithoutForce()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var product = CreateTestProduct(productId, stock: 12);
        var command = new DeactivateProductCommand(productId, Force: false);

        _productRepositoryMock
            .Setup(r => r.GetByIdWithInventoryAsync(productId))
            .ReturnsAsync(product);

        _redemptionRepositoryMock
            .Setup(r => r.GetPendingAndApprovedCountsForProductAsync(productId))
            .ReturnsAsync(new PendingApprovedCounts(0, 0));

        _redemptionRepositoryMock
            .Setup(r => r.GetRecentRedemptionStatsForProductAsync(productId, 7))
            .ReturnsAsync(new RecentRedemptionStats(0, 0, null));

        _redemptionRepositoryMock
            .Setup(r => r.GetRecentRedemptionStatsForProductAsync(productId, 30))
            .ReturnsAsync(new RecentRedemptionStats(0, 0, null));

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Success.Should().BeFalse();
        result.HasWarnings.Should().BeTrue();
        result.Warnings.Should().NotBeNull();
        result.Warnings!.Code.Should().Be("DEACTIVATE_WARNINGS");
        result.Warnings.Stock.Should().Be(12);
    }

    [Fact]
    public async Task Handle_WhenRecentRedemptionsExist_ReturnsWarningsWithoutForce()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var product = CreateTestProduct(productId, stock: 0); // No stock
        var command = new DeactivateProductCommand(productId, Force: false);

        _productRepositoryMock
            .Setup(r => r.GetByIdWithInventoryAsync(productId))
            .ReturnsAsync(product);

        _redemptionRepositoryMock
            .Setup(r => r.GetPendingAndApprovedCountsForProductAsync(productId))
            .ReturnsAsync(new PendingApprovedCounts(0, 0));

        _redemptionRepositoryMock
            .Setup(r => r.GetRecentRedemptionStatsForProductAsync(productId, 7))
            .ReturnsAsync(new RecentRedemptionStats(9, 6, DateTime.UtcNow.AddDays(-2)));

        _redemptionRepositoryMock
            .Setup(r => r.GetRecentRedemptionStatsForProductAsync(productId, 30))
            .ReturnsAsync(new RecentRedemptionStats(15, 10, DateTime.UtcNow.AddDays(-2)));

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.HasWarnings.Should().BeTrue();
        result.Warnings!.RecentRedemptions7d.Should().Be(9);
        result.Warnings.RecentUniqueUsers7d.Should().Be(6);
        result.Warnings.RecentRedemptions30d.Should().Be(15);
        result.Warnings.RecentUniqueUsers30d.Should().Be(10);
    }

    [Fact]
    public async Task Handle_WhenWarningsExistAndForceIsTrue_Succeeds()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var product = CreateTestProduct(productId, stock: 12);
        var command = new DeactivateProductCommand(productId, Force: true);

        _productRepositoryMock
            .Setup(r => r.GetByIdWithInventoryAsync(productId))
            .ReturnsAsync(product);

        _redemptionRepositoryMock
            .Setup(r => r.GetPendingAndApprovedCountsForProductAsync(productId))
            .ReturnsAsync(new PendingApprovedCounts(0, 0));

        _redemptionRepositoryMock
            .Setup(r => r.GetRecentRedemptionStatsForProductAsync(productId, 7))
            .ReturnsAsync(new RecentRedemptionStats(5, 3, DateTime.UtcNow.AddDays(-1)));

        _redemptionRepositoryMock
            .Setup(r => r.GetRecentRedemptionStatsForProductAsync(productId, 30))
            .ReturnsAsync(new RecentRedemptionStats(10, 7, DateTime.UtcNow.AddDays(-1)));

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Success.Should().BeTrue();
        result.HasWarnings.Should().BeFalse();
        result.IsBlocked.Should().BeFalse();

        // Verify product was deactivated
        _productRepositoryMock.Verify(r => r.UpdateAsync(product), Times.Once);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        product.IsActive.Should().BeFalse();
    }

    #endregion

    #region Happy Path Tests

    [Fact]
    public async Task Handle_WhenNoBlockersOrWarnings_SucceedsImmediately()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var product = CreateTestProduct(productId, stock: 0);
        var command = new DeactivateProductCommand(productId, Force: false);

        _productRepositoryMock
            .Setup(r => r.GetByIdWithInventoryAsync(productId))
            .ReturnsAsync(product);

        _redemptionRepositoryMock
            .Setup(r => r.GetPendingAndApprovedCountsForProductAsync(productId))
            .ReturnsAsync(new PendingApprovedCounts(0, 0));

        _redemptionRepositoryMock
            .Setup(r => r.GetRecentRedemptionStatsForProductAsync(productId, 7))
            .ReturnsAsync(new RecentRedemptionStats(0, 0, null));

        _redemptionRepositoryMock
            .Setup(r => r.GetRecentRedemptionStatsForProductAsync(productId, 30))
            .ReturnsAsync(new RecentRedemptionStats(0, 0, null));

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Success.Should().BeTrue();
        result.HasWarnings.Should().BeFalse();
        result.IsBlocked.Should().BeFalse();

        _productRepositoryMock.Verify(r => r.UpdateAsync(product), Times.Once);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        product.IsActive.Should().BeFalse();
    }

    [Fact]
    public async Task Handle_WhenProductNotFound_ThrowsInvalidOperationException()
    {
        // Arrange
        var productId = Guid.NewGuid();
        var command = new DeactivateProductCommand(productId, Force: false);

        _productRepositoryMock
            .Setup(r => r.GetByIdWithInventoryAsync(productId))
            .ReturnsAsync((Product?)null);

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(
            () => _handler.Handle(command, CancellationToken.None));
    }

    #endregion

    #region Helper Methods

    private Product CreateTestProduct(Guid productId, int stock)
    {
        var categoryId = Guid.NewGuid();
        var product = new Product("Test Product", "Description", categoryId, 100, null);
        
        // Use reflection to set the Id since it's private - use DeclaredOnly to avoid ambiguity with base class
        var idProperty = typeof(Product).GetProperty("Id", 
            System.Reflection.BindingFlags.Instance | 
            System.Reflection.BindingFlags.Public | 
            System.Reflection.BindingFlags.DeclaredOnly);
        idProperty?.SetValue(product, productId);
        
        // Adjust inventory stock
        if (product.Inventory != null && stock > 0)
        {
            product.Inventory.AdjustStock(stock, Guid.NewGuid());
        }

        return product;
    }

    #endregion
}
