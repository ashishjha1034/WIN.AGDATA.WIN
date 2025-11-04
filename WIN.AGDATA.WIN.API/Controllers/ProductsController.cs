using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.Application.Interfaces;

namespace WIN.AGDATA.WIN.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(IProductService productService, ILogger<ProductsController> logger)
    {
        _productService = productService ?? throw new ArgumentNullException(nameof(productService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [HttpPost]
    public IActionResult CreateProduct([FromBody] CreateProductRequest request)
    {
        try
        {
            var product = _productService.CreateProduct(request.Name, request.Description, request.RequiredPoints, request.StockQuantity);
            return Created($"api/products/{product.Id}", product);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating product");
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    public IActionResult GetProductById(Guid id)
    {
        try
        {
            var product = _productService.GetProductById(id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting product");
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public IActionResult GetAllProducts()
    {
        try
        {
            var products = _productService.GetAllProducts();
            return Ok(products);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting products");
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("available")]
    public IActionResult GetAvailableProducts()
    {
        try
        {
            var products = _productService.GetAvailableProducts();
            return Ok(products);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting available products");
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}/details")]
    public IActionResult UpdateProductDetails(Guid id, [FromBody] UpdateProductDetailsRequest request)
    {
        try
        {
            _productService.UpdateProductDetails(id, request.Name, request.Description);
            return Ok("Product details updated");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating product details");
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}/points")]
    public IActionResult UpdateProductPoints(Guid id, [FromBody] UpdatePointsRequest request)
    {
        try
        {
            _productService.UpdateProductPoints(id, request.NewPoints);
            return Ok("Product points updated");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating product points");
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}/stock")]
    public IActionResult UpdateProductStock(Guid id, [FromBody] UpdateStockRequest request)
    {
        try
        {
            _productService.UpdateProductStock(id, request.NewQuantity);
            return Ok("Product stock updated");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating product stock");
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}/deactivate")]
    public IActionResult DeactivateProduct(Guid id)
    {
        try
        {
            _productService.DeactivateProduct(id);
            return Ok("Product deactivated");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deactivating product");
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{id}/activate")]
    public IActionResult ActivateProduct(Guid id)
    {
        try
        {
            _productService.ActivateProduct(id);
            return Ok("Product activated");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error activating product");
            return BadRequest(ex.Message);
        }
    }
}

public class CreateProductRequest
{
    public string Name { get; set; }
    public string Description { get; set; }
    public int RequiredPoints { get; set; }
    public int StockQuantity { get; set; }
}

public class UpdateProductDetailsRequest
{
    public string Name { get; set; }
    public string Description { get; set; }
}

public class UpdatePointsRequest
{
    public int NewPoints { get; set; }
}

public class UpdateStockRequest
{
    public int NewQuantity { get; set; }
}
