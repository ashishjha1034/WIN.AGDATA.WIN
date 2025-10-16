using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.API.Controllers;

public class ProductsController : ApiControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService ?? throw new ArgumentNullException(nameof(productService));
    }

    [HttpPost]
    public IActionResult CreateProduct([FromBody] CreateProductRequest request)
    {
        try
        {
            var product = _productService.CreateProduct(request.Name, request.Description, request.RequiredPoints, request.StockQuantity);
            return CreatedAtAction(nameof(GetProductById),
                new { productId = product.GetHashCode() },
                new ProductResponse(product));
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet("{productId:guid}")]
    public IActionResult GetProductById(Guid productId)
    {
        try
        {
            var product = _productService.GetProductById(productId);
            return OkOrNotFound(product == null ? null : new ProductResponse(product));
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet]
    public IActionResult GetAllProducts()
    {
        try
        {
            var products = _productService.GetAllProducts();
            var response = products.Select(p => new ProductResponse(p));
            return Ok(response);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet("available")]
    public IActionResult GetAvailableProducts()
    {
        try
        {
            var products = _productService.GetAvailableProducts();
            var response = products.Select(p => new ProductResponse(p));
            return Ok(response);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPut("{productId:guid}/stock")]
    public IActionResult UpdateProductStock(Guid productId, [FromBody] UpdateStockRequest request)
    {
        try
        {
            _productService.UpdateProductStock(productId, request.NewQuantity);
            return Ok(new { message = "Product stock updated successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPut("{productId:guid}/pricing")]
    public IActionResult UpdateProductPricing(Guid productId, [FromBody] UpdatePricingRequest request)
    {
        try
        {
            _productService.UpdateProductPricing(productId, request.NewPoints);
            return Ok(new { message = "Product pricing updated successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }
}

public record CreateProductRequest(string Name, string Description, int RequiredPoints, int StockQuantity = 0);
public record UpdateStockRequest(int NewQuantity);
public record UpdatePricingRequest(int NewPoints);

public record ProductResponse(
    string Name,
    string Description,
    int RequiredPoints,
    int StockQuantity,
    bool IsAvailable,
    DateTime? LastStockUpdate)
{
    public ProductResponse(Product product) : this(
        product.Identity.Name,
        product.Identity.Description,
        product.Pricing.RequiredPoints,
        product.Inventory.StockQuantity,
        product.IsAvailable(),
        product.Inventory.LastStockUpdate)
    { }
}
