using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using WIN.AGDATA.WIN.APPLICATION.Commands.Products;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.API.Controllers;

/// <summary>
/// Product catalog and inventory management endpoints
/// </summary>
[ApiController]
[Route("api/[controller]")]
[SwaggerTag("Product Catalog")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _productRepository;
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public ProductsController(
        IProductRepository productRepository,
        IMediator mediator,
        IMapper mapper)
    {
        _productRepository = productRepository;
        _mediator = mediator;
        _mapper = mapper;
    }

    /// <summary>
    /// Get all active products
    /// </summary>
    /// <remarks>
    /// Retrieve all active products from the catalog.
    /// Optionally filter by category ID.
    /// No authentication required.
    /// </remarks>
    /// <param name="categoryId">Optional category filter</param>
    /// <returns>List of products</returns>
    /// <response code="200">Products retrieved successfully</response>
    [HttpGet]
    [AllowAnonymous]
    [SwaggerOperation(Summary = "Get all products", Description = "List active products in catalog")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    public async Task<ActionResult> GetProducts([FromQuery] Guid? categoryId = null)
    {
        try
        {
            IReadOnlyList<ProductDto> products;

            if (categoryId.HasValue)
            {
                var categoryProducts = await _productRepository.GetByCategoryAsync(categoryId.Value);
                products = _mapper.Map<List<ProductDto>>(categoryProducts);
            }
            else
            {
                var allProducts = await _productRepository.GetActiveWithDetailsAsync();
                products = _mapper.Map<List<ProductDto>>(allProducts);
            }

            return Ok(new
            {
                count = products.Count,
                categoryId = categoryId,
                data = products
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve products", error = ex.Message });
        }
    }

    /// <summary>
    /// Get product by ID
    /// </summary>
    /// <remarks>
    /// Retrieve detailed information for a specific product.
    /// No authentication required.
    /// </remarks>
    /// <param name="id">Product ID</param>
    /// <returns>Product details</returns>
    /// <response code="200">Product found</response>
    /// <response code="404">Product not found</response>
    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    [SwaggerOperation(Summary = "Get product by ID", Description = "Retrieve specific product details")]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetProduct(Guid id)
    {
        try
        {
            var product = await _productRepository.GetActiveWithDetailsAsync(id);

            if (product == null)
                return NotFound(new { message = "Product not found or inactive" });

            var productDto = _mapper.Map<ProductDto>(product);
            return Ok(productDto);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve product", error = ex.Message });
        }
    }

    /// <summary>
    /// Get all product categories
    /// </summary>
    /// <remarks>
    /// Retrieve all available product categories.
    /// No authentication required.
    /// </remarks>
    /// <returns>List of categories</returns>
    /// <response code="200">Categories retrieved</response>
    [HttpGet("categories/all")]
    [AllowAnonymous]
    [SwaggerOperation(Summary = "Get categories", Description = "List all product categories")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    public async Task<ActionResult> GetCategories()
    {
        try
        {
            var categories = await _productRepository.GetCategoriesAsync();

            return Ok(new
            {
                count = categories.Count,
                data = _mapper.Map<List<ProductCategoryDto>>(categories)
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve categories", error = ex.Message });
        }
    }

    /// <summary>
    /// Create new product
    /// </summary>
    /// <remarks>
    /// Add a new product to the catalog.
    /// Admin only operation.
    /// 
    /// Example:
    ///
    ///     POST /api/products
    ///     {
    ///       "name": "Premium Mug",
    ///       "description": "Branded ceramic mug",
    ///       "categoryId": "00000000-0000-0000-0000-000000000000",
    ///       "pointsCost": 500,
    ///       "imageUrl": "https://example.com/mug.jpg",
    ///       "initialStock": 100
    ///     }
    /// </remarks>
    /// <param name="request">Product creation details</param>
    /// <returns>Created product</returns>
    /// <response code="201">Product created successfully</response>
    /// <response code="400">Invalid input</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpPost]
    [Authorize(Roles = "Admin")]
    [SwaggerOperation(Summary = "Create product", Description = "Add new product to catalog (admin only)")]
    [ProducesResponseType(typeof(ProductDto), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var command = new CreateProductCommand(
                request.Name,
                request.Description,
                request.CategoryId,
                request.PointsCost,
                request.ImageUrl,
                request.InitialStock ?? 0
            );

            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetProduct), new { id = result.Id }, result);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to create product", error = ex.Message });
        }
    }

    /// <summary>
    /// Update product details
    /// </summary>
    /// <remarks>
    /// Modify product information like name, description, and points cost.
    /// Admin only operation.
    /// </remarks>
    /// <param name="id">Product ID</param>
    /// <param name="request">Updated product details</param>
    /// <returns>Confirmation message</returns>
    /// <response code="200">Product updated</response>
    /// <response code="403">Forbidden - admin only</response>
    /// <response code="404">Product not found</response>
    [HttpPut("{id:guid}")]
    [Authorize(Roles = "Admin")]
    [SwaggerOperation(Summary = "Update product", Description = "Modify product information (admin only)")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> UpdateProduct(Guid id, [FromBody] UpdateProductDetailsRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null)
                return NotFound(new { message = "Product not found" });

            product.UpdateDetails(request.Name, request.Description, request.CategoryId, request.PointsCost, request.ImageUrl);

            await _productRepository.UpdateAsync(product);

            return Ok(new { message = "Product updated successfully", productId = id });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to update product", error = ex.Message });
        }
    }

    /// <summary>
    /// Adjust product stock
    /// </summary>
    /// <remarks>
    /// Increase or decrease product inventory.
    /// Admin only operation.
    /// Positive numbers add to stock, negative numbers deduct.
    /// </remarks>
    /// <param name="id">Product ID</param>
    /// <param name="request">Stock adjustment amount</param>
    /// <returns>Updated stock level</returns>
    /// <response code="200">Stock adjusted</response>
    /// <response code="403">Forbidden - admin only</response>
    /// <response code="404">Product not found</response>
    [HttpPut("{id:guid}/stock")]
    [Authorize(Roles = "Admin")]
    [SwaggerOperation(Summary = "Adjust stock", Description = "Update product inventory level (admin only)")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> AdjustStock(Guid id, [FromBody] UpdateStockRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var product = await _productRepository.GetByIdWithInventoryAsync(id);
            if (product == null)
                return NotFound(new { message = "Product not found" });

            product.Inventory.AdjustStock(request.AdjustBy, Guid.Empty);
            await _productRepository.UpdateAsync(product);

            return Ok(new
            {
                message = "Stock adjusted successfully",
                productId = id,
                adjustment = request.AdjustBy,
                newStock = product.Inventory.CurrentStock
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to adjust stock", error = ex.Message });
        }
    }
}
