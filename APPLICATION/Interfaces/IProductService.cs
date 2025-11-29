using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IProductService
{
    Task<Product> CreateProductAsync(string name, string description, int requiredPoints, int stockQuantity, string createdBy = "SYSTEM");
    Task<Product?> GetProductByIdAsync(Guid productId);
    Task<List<Product>> GetAllProductsAsync();
    Task<List<Product>> GetAvailableProductsAsync();
    Task UpdateProductDetailsAsync(Guid productId, string name, string description, string modifiedBy = "SYSTEM");
    Task UpdateProductPointsAsync(Guid productId, int newPoints, string modifiedBy = "SYSTEM");
    Task UpdateProductStockAsync(Guid productId, int newQuantity, string modifiedBy = "SYSTEM");
    Task DeactivateProductAsync(Guid productId, string modifiedBy = "SYSTEM");
    Task ActivateProductAsync(Guid productId, string modifiedBy = "SYSTEM");
}