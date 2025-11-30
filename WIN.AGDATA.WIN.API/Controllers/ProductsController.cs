using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.APPLICATION.Commands.Products;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    private readonly IProductRepository _productRepository;

    public ProductsController(IMediator mediator, IMapper mapper, IProductRepository productRepository)
    {
        _mediator = mediator;
        _mapper = mapper;
        _productRepository = productRepository;
    }

    // GET: api/products
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ProductDto>>> GetProducts(
        [FromQuery] Guid? categoryId = null,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 20)
    {
        var products = categoryId.HasValue
            ? await _productRepository.GetByCategoryAsync(categoryId.Value)
            : await _productRepository.GetActiveWithDetailsAsync();

        var dtos = _mapper.Map<List<ProductDto>>(products);
        var result = dtos.Skip((page - 1) * pageSize).Take(pageSize).ToList();
        return Ok(result);
    }

    // GET: api/products/{id}
    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProductDto>> GetProduct(Guid id)
    {
        var product = await _productRepository.GetActiveWithDetailsAsync(id);
        if (product == null) return NotFound();
        return Ok(_mapper.Map<ProductDto>(product));
    }

    // POST: api/products (Admin only)
    [HttpPost]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductRequest request)
    {
        var command = new CreateProductCommand(
            request.Name,
            request.Description,
            request.CategoryId,
            request.PointsCost,
            request.ImageUrl,
            request.InitialStock ?? 0);

        var result = await _mediator.Send(command);
        return CreatedAtAction(nameof(GetProduct), new { id = result.Id }, result);
    }

    [HttpPut("{id:guid}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> UpdateProduct(Guid id, [FromBody] UpdateProductDetailsRequest request)
    {
        var product = await _productRepository.GetByIdAsync(id);
        if (product == null) return NotFound();

        product.UpdateDetails(
            request.Name,
            request.Description,
            request.CategoryId,
            request.PointsCost,
            request.ImageUrl);

        await _productRepository.UpdateAsync(product);
        return NoContent();
    }

    // PUT: api/products/{id}/stock (Admin only)
    [HttpPut("{id:guid}/stock")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<IActionResult> AdjustStock(Guid id, [FromBody] UpdateStockRequest request)
    {
        var product = await _productRepository.GetByIdWithInventoryAsync(id);
        if (product == null) return NotFound();

        product.Inventory.AdjustStock(request.AdjustBy, User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value == "admin"
            ? Guid.Empty : Guid.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value));

        await _productRepository.UpdateAsync(product);
        return NoContent();
    }

    // GET: api/product-categories
    [HttpGet("/api/product-categories")]
    public async Task<ActionResult<IReadOnlyList<ProductCategoryDto>>> GetCategories()
    {
        var categories = await _productRepository.GetCategoriesAsync();
        return Ok(_mapper.Map<List<ProductCategoryDto>>(categories));
    }
}