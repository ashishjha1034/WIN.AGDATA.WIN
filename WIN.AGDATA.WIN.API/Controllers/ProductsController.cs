using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.API.Controllers
{
    public class ProductsController : ApiControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        public IActionResult CreateProduct([FromBody] CreateProductRequest request)
        {
            try
            {
                var product = _productService.CreateProduct(
                    request.Name,
                    request.Description,
                    request.RequiredPoints,
                    request.StockQuantity
                );

                return CreatedAtAction(nameof(GetProduct),
                    new { productId = product.GetHashCode() },
                    new ProductResponse(product));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("{productId}")]
        public IActionResult GetProduct(Guid productId)
        {
            try
            {
                var product = _productService.GetProduct(productId);
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

        [HttpPut("{productId}")]
        public IActionResult UpdateProduct(Guid productId, [FromBody] UpdateProductRequest request)
        {
            try
            {
                _productService.UpdateProduct(
                    productId,
                    request.Name,
                    request.Description,
                    request.RequiredPoints
                );

                return Ok(new { message = "Product updated successfully" });
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpPut("{productId}/stock")]
        public IActionResult UpdateStock(Guid productId, [FromBody] UpdateStockRequest request)
        {
            try
            {
                _productService.UpdateStock(productId, request.NewStock);
                return Ok(new { message = "Stock updated successfully" });
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpDelete("{productId}")]
        public IActionResult DeleteProduct(Guid productId)
        {
            try
            {
                _productService.DeleteProduct(productId);
                return Ok(new { message = "Product deleted successfully" });
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }

    // Request/Response DTOs
    public record CreateProductRequest(
        string Name,
        string Description,
        int RequiredPoints,
        int StockQuantity
    );

    public record UpdateProductRequest(
        string Name,
        string Description,
        int RequiredPoints
    );

    public record UpdateStockRequest(int NewStock);

    public record ProductResponse(
        string Name,
        string Description,
        int RequiredPoints,
        int StockQuantity,
        bool IsAvailable
    )
    {
        public ProductResponse(Product product) : this(
            product.Identity.Name,
            product.Identity.Description,
            product.Pricing.RequiredPoints,
            product.Inventory.StockQuantity,
            product.IsAvailable()
        )
        { }
    }
}