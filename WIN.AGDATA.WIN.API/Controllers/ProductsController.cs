using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
    private readonly IUnitOfWork _unitOfWork;

    public ProductsController(
        IProductRepository productRepository,
        IMediator mediator,
        IMapper mapper,
        IUnitOfWork unitOfWork)
    {
        _productRepository = productRepository;
        _mediator = mediator;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
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
    /// Get all products including inactive (admin only)
    /// </summary>
    /// <remarks>
    /// Retrieve all products (both active and inactive) for admin management.
    /// Admin only operation.
    /// </remarks>
    /// <returns>List of all products</returns>
    /// <response code="200">Products retrieved successfully</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpGet("admin/all")]
    [Authorize(Policy = "PasswordChanged", Roles = "Admin")]
    [SwaggerOperation(Summary = "Get all products (admin)", Description = "List all products including inactive ones (admin only)")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> GetAllProductsAdmin()
    {
        try
        {
            var allProducts = await _productRepository.GetAllWithDetailsAsync();
            var products = _mapper.Map<List<ProductDto>>(allProducts);

            return Ok(new
            {
                count = products.Count,
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
            // For admin users, get any product (active or inactive)
            // For non-admin users, only get active products
            Product? product;
            
            var isAdmin = User.IsInRole("Admin");
            if (isAdmin)
            {
                product = await _productRepository.GetByIdForUpdateAsync(id);
            }
            else
            {
                product = await _productRepository.GetActiveWithDetailsAsync(id);
            }

            if (product == null)
                return NotFound(new { message = "Product not found" });

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
    [Authorize(Policy = "PasswordChanged", Roles = "Admin")]
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
    /// All fields are optional - only provide the fields you want to update.
    /// </remarks>
    /// <param name="id">Product ID</param>
    /// <param name="request">Updated product details (partial updates supported)</param>
    /// <returns>Confirmation message</returns>
    /// <response code="200">Product updated</response>
    /// <response code="403">Forbidden - admin only</response>
    /// <response code="404">Product not found</response>
    [HttpPut("{id:guid}")]
    [Authorize(Policy = "PasswordChanged", Roles = "Admin")]
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
            // Get product with tracking (no AsNoTracking)
            var product = await _productRepository.GetByIdForUpdateAsync(id);
            if (product == null)
                return NotFound(new { message = "Product not found" });

            // Only update fields that are provided (not null/empty)
            var name = !string.IsNullOrWhiteSpace(request.Name) ? request.Name : product.Name;
            var description = request.Description ?? product.Description;
            var categoryId = request.CategoryId ?? product.CategoryId;
            var pointsCost = request.PointsCost ?? product.CurrentPricing;
            var imageUrl = request.ImageUrl ?? product.ImageUrl;

            // Update the product
            product.UpdateDetails(name, description, categoryId, pointsCost, imageUrl);

            // SaveChangesAsync will track and save changes automatically
            await _unitOfWork.SaveChangesAsync();

            return Ok(new { message = "Product updated successfully", productId = id });
        }
        catch (DbUpdateConcurrencyException ex)
        {
            return StatusCode(StatusCodes.Status409Conflict,
                new { message = "Product was modified by another user. Please refresh and try again.", error = ex.Message });
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
    /// <param name="request">Stock adjustment amount and operation type</param>
    /// <returns>Updated stock level</returns>
    /// <response code="200">Stock adjusted</response>
    /// <response code="403">Forbidden - admin only</response>
    /// <response code="404">Product not found</response>
    [HttpPut("{id:guid}/stock")]
    [Authorize(Policy = "PasswordChanged", Roles = "Admin")]
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

            var adjustmentAmount = request.Amount;
            
            // Handle operation type
            if (request.Operation?.ToLower() == "decrease")
            {
                adjustmentAmount = -Math.Abs(request.Amount);
            }
            else if (request.Operation?.ToLower() == "increase")
            {
                adjustmentAmount = Math.Abs(request.Amount);
            }
            // "adjust" uses the amount as-is (can be positive or negative)

            product.Inventory.AdjustStock(adjustmentAmount, Guid.Empty);
            await _productRepository.UpdateAsync(product);
            await _unitOfWork.SaveChangesAsync();

            return Ok(new
            {
                message = "Stock adjusted successfully",
                productId = id,
                adjustment = adjustmentAmount,
                operation = request.Operation ?? "adjust",
                newStock = product.Inventory.QuantityAvailable
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to adjust stock", error = ex.Message });
        }
    }

    /// <summary>
    /// Create product category
    /// </summary>
    /// <remarks>
    /// Add a new product category to the system.
    /// Admin only operation.
    /// </remarks>
    /// <param name="request">Category creation details</param>
    /// <returns>Created category</returns>
    /// <response code="201">Category created successfully</response>
    /// <response code="400">Invalid input or category name already exists</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpPost("categories")]
    [Authorize(Policy = "PasswordChanged", Roles = "Admin")]
    [SwaggerOperation(Summary = "Create category", Description = "Add new product category (admin only)")]
    [ProducesResponseType(typeof(ProductCategoryDto), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<ProductCategoryDto>> CreateCategory([FromBody] CreateProductCategoryRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var command = new CreateProductCategoryCommand(request.Name, request.Description, request.DisplayOrder);
            var result = await _mediator.Send(command);
            
            return CreatedAtAction(nameof(GetCategories), result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to create category", error = ex.Message });
        }
    }

    /// <summary>
    /// Deactivate product
    /// </summary>
    /// <remarks>
    /// Deactivate a product, making it unavailable for new redemptions.
    /// Admin only operation.
    /// </remarks>
    /// <param name="id">Product ID</param>
    /// <returns>Confirmation message</returns>
    /// <response code="200">Product deactivated successfully</response>
    /// <response code="403">Forbidden - admin only</response>
    /// <response code="404">Product not found</response>
    [HttpPost("{id:guid}/deactivate")]
    [Authorize(Policy = "PasswordChanged", Roles = "Admin")]
    [SwaggerOperation(Summary = "Deactivate product", Description = "Disable product from catalog (admin only)")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeactivateProduct(Guid id)
    {
        try
        {
            var command = new DeactivateProductCommand(id);
            await _mediator.Send(command);

            return Ok(new { message = "Product deactivated successfully", productId = id });
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to deactivate product", error = ex.Message });
        }
    }

    /// <summary>
    /// Activate product
    /// </summary>
    /// <remarks>
    /// Activate a product, making it available for new redemptions.
    /// Admin only operation.
    /// </remarks>
    /// <param name="id">Product ID</param>
    /// <returns>Confirmation message</returns>
    /// <response code="200">Product activated successfully</response>
    /// <response code="403">Forbidden - admin only</response>
    /// <response code="404">Product not found</response>
    [HttpPost("{id:guid}/activate")]
    [Authorize(Policy = "PasswordChanged", Roles = "Admin")]
    [SwaggerOperation(Summary = "Activate product", Description = "Enable product in catalog (admin only)")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> ActivateProduct(Guid id)
    {
        try
        {
            var command = new ActivateProductCommand(id);
            await _mediator.Send(command);

            return Ok(new { message = "Product activated successfully", productId = id });
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to activate product", error = ex.Message });
        }
    }

    /// <summary>
    /// Delete product
    /// </summary>
    /// <remarks>
    /// Permanently delete a product from the system.
    /// Admin only operation. Use with caution as this cannot be undone.
    /// </remarks>
    /// <param name="id">Product ID</param>
    /// <returns>Confirmation message</returns>
    /// <response code="200">Product deleted successfully</response>
    /// <response code="403">Forbidden - admin only</response>
    /// <response code="404">Product not found</response>
    [HttpDelete("{id:guid}")]
    [Authorize(Policy = "PasswordChanged", Roles = "Admin")]
    [SwaggerOperation(Summary = "Delete product", Description = "Permanently remove product (admin only)")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> DeleteProduct(Guid id)
    {
        try
        {
            var command = new DeleteProductCommand(id);
            await _mediator.Send(command);

            return Ok(new { message = "Product deleted successfully", productId = id });
        }
        catch (InvalidOperationException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to delete product", error = ex.Message });
        }
    }
}
