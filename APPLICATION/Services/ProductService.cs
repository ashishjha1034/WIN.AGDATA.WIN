using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Products;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Infrastructure.Repositories;

namespace WIN.AGDATA.WIN.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly ILogger<ProductService> _logger;

    public ProductService(IProductRepository productRepository, ILogger<ProductService> logger)
    {
        _productRepository = productRepository ?? throw new ArgumentNullException(nameof(productRepository));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public Product CreateProduct(string name, string description, int requiredPoints, int stockQuantity = 0)
    {
        try
        {
            if (_productRepository.GetByName(name) != null)
                throw new DomainException($"Product with name '{name}' already exists");

            var product = new Product(name, description, requiredPoints, stockQuantity);
            _productRepository.Add(product);

            _logger.LogInformation("Product created successfully: {ProductName}", name);
            return product;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create product: {ProductName}", name);
            throw;
        }
    }

    public List<Product> GetAllProducts()
    {
        return _productRepository.GetAll();
    }

    public List<Product> GetAvailableProducts()
    {
        return _productRepository.GetAvailable();
    }

    public Product? GetProductById(Guid productId)
    {
        return _productRepository.GetById(productId);
    }

    public void UpdateProductStock(Guid productId, int newQuantity)
    {
        try
        {
            var product = GetProductOrThrow(productId);
            product.Inventory.SetStock(newQuantity);
            _productRepository.Update(product);

            _logger.LogInformation("Product stock updated: {ProductId} to {NewQuantity}", productId, newQuantity);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to update product stock: {ProductId}", productId);
            throw;
        }
    }

    public void UpdateProductPricing(Guid productId, int newPoints)
    {
        try
        {
            var product = GetProductOrThrow(productId);
            product.Pricing.UpdatePoints(newPoints);
            _productRepository.Update(product);

            _logger.LogInformation("Product pricing updated: {ProductId} to {NewPoints} points", productId, newPoints);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to update product pricing: {ProductId}", productId);
            throw;
        }
    }

    private Product GetProductOrThrow(Guid productId)
    {
        var product = _productRepository.GetById(productId);
        if (product == null)
            throw new DomainException($"Product not found: {productId}");

        return product;
    }
}
