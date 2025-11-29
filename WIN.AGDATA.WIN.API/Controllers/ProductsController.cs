using AutoMapper;
using MediatR;
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

    [HttpPost]
    public async Task<ActionResult<ProductDto>> CreateProduct([FromBody] CreateProductRequest request)
    {
        var result = await _mediator.Send(new CreateProductCommand(
            request.Name, request.Description, request.CategoryId, request.PointsCost, request.ImageUrl));
        return CreatedAtAction(nameof(GetProduct), new { id = result.Id }, result);
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ProductDto>>> GetAllProducts()
    {
        var products = await _productRepository.GetActiveWithDetailsAsync();
        return Ok(_mapper.Map<IReadOnlyList<ProductDto>>(products));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProductDto>> GetProduct(Guid id)
    {
        var product = await _productRepository.GetActiveWithDetailsAsync(id);
        if (product == null) return NotFound();
        return Ok(_mapper.Map<ProductDto>(product));
    }

    [HttpPut("{id:guid}/stock")]
    public async Task<IActionResult> UpdateStock(Guid id, [FromBody] UpdateStockRequest request)
    {
        var product = await _productRepository.GetByIdWithInventoryAsync(id);
        if (product == null) return NotFound();

        product.Inventory.AdjustStock(request.AdjustBy, Guid.Empty); // admin
        await _productRepository.UpdateAsync(product);
        return NoContent();
    }
}