using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Common;

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

    public Product CreateProduct(string name, string description, int requiredPoints, int stockQuantity)
    {
        try
        {
            var product = new Product(name, description, requiredPoints, stockQuantity, "SYSTEM");
            _productRepository.Add(product);

            _logger.LogInformation($"Product created: {product.Identity.Name}");
            return product;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating product");
            throw;
        }
    }

    public Product? GetProductById(Guid productId)
    {
        try
        {
            return _productRepository.GetById(productId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error retrieving product: {productId}");
            throw;
        }
    }

    public List<Product> GetAllProducts()
    {
        try
        {
            return _productRepository.GetAll();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving all products");
            throw;
        }
    }

    public List<Product> GetAvailableProducts()
    {
        try
        {
            return _productRepository.GetAll().Where(p => p.IsAvailable()).ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving available products");
            throw;
        }
    }

    public void UpdateProductDetails(Guid productId, string name, string description)
    {
        try
        {
            var product = _productRepository.GetById(productId);
            ValidationGuards.ValidateEntityExists(product, "Product", productId.ToString());


            product.UpdateDetails(name, description, "SYSTEM");
            _productRepository.Update(product);

            _logger.LogInformation($"Product details updated: {productId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error updating product details: {productId}");
            throw;
        }
    }

    public void UpdateProductPoints(Guid productId, int newPoints)
    {
        try
        {
            var product = _productRepository.GetById(productId);
            ValidationGuards.ValidateEntityExists(product, "Product", productId.ToString());


            product.UpdatePoints(newPoints, "SYSTEM");
            _productRepository.Update(product);

            _logger.LogInformation($"Product points updated: {productId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error updating product points: {productId}");
            throw;
        }
    }

    public void UpdateProductPricing(Guid productId, int newPoints)
    {
        try
        {
            var product = _productRepository.GetById(productId);
            ValidationGuards.ValidateEntityExists(product, "Product", productId.ToString());


            product.UpdatePoints(newPoints, "SYSTEM");
            _productRepository.Update(product);

            _logger.LogInformation($"Product pricing updated: {productId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error updating product pricing: {productId}");
            throw;
        }
    }
    public void UpdateProductStock(Guid productId, int newQuantity)
    {
        try
        {
            var product = _productRepository.GetById(productId);
            ValidationGuards.ValidateEntityExists(product, "Product", productId.ToString());


            product.UpdateStock(newQuantity, "SYSTEM");
            _productRepository.Update(product);

            _logger.LogInformation($"Product stock updated: {productId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error updating product stock: {productId}");
            throw;
        }
    }



    public void DeactivateProduct(Guid productId)
    {
        try
        {
            var product = _productRepository.GetById(productId);
            ValidationGuards.ValidateEntityExists(product, "Product", productId.ToString());


            product.Deactivate("SYSTEM");
            _productRepository.Update(product);

            _logger.LogInformation($"Product deactivated: {productId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error deactivating product: {productId}");
            throw;
        }
    }

    public void ActivateProduct(Guid productId)
    {
        try
        {
            var product = _productRepository.GetById(productId);
            ValidationGuards.ValidateEntityExists(product, "Product", productId.ToString());


            product.Activate("SYSTEM");
            _productRepository.Update(product);

            _logger.LogInformation($"Product activated: {productId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error activating product: {productId}");
            throw;
        }
    }
}
