using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IUnitOfWork _uow;
    private readonly ILogger<ProductService> _logger;

    public ProductService(IProductRepository productRepository, IUnitOfWork uow, ILogger<ProductService> logger)
    {
        _productRepository = productRepository ?? throw new ArgumentNullException(nameof(productRepository));
        _uow = uow ?? throw new ArgumentNullException(nameof(uow));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<Product> CreateProductAsync(string name, string description, int requiredPoints, int stockQuantity, string createdBy = "SYSTEM")
    {
        try
        {
            var product = new Product(name, description, requiredPoints, stockQuantity, createdBy);
            await _productRepository.AddAsync(product);
            await _uow.SaveChangesAsync();

            _logger.LogInformation("Product created: {ProductName} ({ProductId})", product.Identity.Name, product.Id);
            return product;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating product");
            throw;
        }
    }

    public async Task<Product?> GetProductByIdAsync(Guid productId)
    {
        try
        {
            return await _productRepository.GetByIdAsync(productId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving product: {ProductId}", productId);
            throw;
        }
    }

    public async Task<List<Product>> GetAllProductsAsync()
    {
        try
        {
            var products = await _productRepository.GetAllAsync();
            return products.ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving all products");
            throw;
        }
    }

    public async Task<List<Product>> GetAvailableProductsAsync()
    {
        try
        {
            var products = await _productRepository.GetAllAsync();
            return products.Where(p => p.IsAvailable()).ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving available products");
            throw;
        }
    }

    public async Task UpdateProductDetailsAsync(Guid productId, string name, string description, string modifiedBy = "SYSTEM")
    {
        try
        {
            var product = await _productRepository.GetByIdAsync(productId);
            ValidationGuards.ValidateEntityExists(product, "Product", productId.ToString());

            product.UpdateDetails(name, description, modifiedBy);
            await _productRepository.UpdateAsync(product);
            await _uow.SaveChangesAsync();

            _logger.LogInformation("Product details updated: {ProductId}", productId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating product details: {ProductId}", productId);
            throw;
        }
    }

    public async Task UpdateProductPointsAsync(Guid productId, int newPoints, string modifiedBy = "SYSTEM")
    {
        try
        {
            var product = await _productRepository.GetByIdAsync(productId);
            ValidationGuards.ValidateEntityExists(product, "Product", productId.ToString());

            product.UpdatePoints(newPoints, modifiedBy);
            await _productRepository.UpdateAsync(product);
            await _uow.SaveChangesAsync();

            _logger.LogInformation("Product points updated: {ProductId}", productId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating product points: {ProductId}", productId);
            throw;
        }
    }

    public async Task UpdateProductStockAsync(Guid productId, int newQuantity, string modifiedBy = "SYSTEM")
    {
        try
        {
            var product = await _productRepository.GetByIdAsync(productId);
            ValidationGuards.ValidateEntityExists(product, "Product", productId.ToString());

            product.UpdateStock(newQuantity, modifiedBy);
            await _productRepository.UpdateAsync(product);
            await _uow.SaveChangesAsync();

            _logger.LogInformation("Product stock updated: {ProductId}", productId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating product stock: {ProductId}", productId);
            throw;
        }
    }

    public async Task DeactivateProductAsync(Guid productId, string modifiedBy = "SYSTEM")
    {
        try
        {
            var product = await _productRepository.GetByIdAsync(productId);
            ValidationGuards.ValidateEntityExists(product, "Product", productId.ToString());

            product.Deactivate("Product deactivated", modifiedBy);
            await _productRepository.UpdateAsync(product);
            await _uow.SaveChangesAsync();

            _logger.LogInformation("Product deactivated: {ProductId}", productId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deactivating product: {ProductId}", productId);
            throw;
        }
    }

    public async Task ActivateProductAsync(Guid productId, string modifiedBy = "SYSTEM")
    {
        try
        {
            var product = await _productRepository.GetByIdAsync(productId);
            ValidationGuards.ValidateEntityExists(product, "Product", productId.ToString());

            product.Activate(modifiedBy);
            await _productRepository.UpdateAsync(product);
            await _uow.SaveChangesAsync();

            _logger.LogInformation("Product activated: {ProductId}", productId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error activating product: {ProductId}", productId);
            throw;
        }
    }
}