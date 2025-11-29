using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Application.Commands;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Application.Mappers;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Points;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

namespace WIN.AGDATA.WIN.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _productRepo;
    private readonly IMediator _mediator;
    private readonly ILogger<ProductsController> _logger;

    public ProductsController(IProductRepository productRepo, IMediator mediator, ILogger<ProductsController> logger)
    {
        _productRepo = productRepo;
        _mediator = mediator;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProductDto>>> GetAll()
    {
        var products = await _productRepo.GetAllAsync() ?? new List<Product>();
        var dtos = products.Select(ProductMapper.ToDto);
        return Ok(dtos);
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<ProductDto>> GetById(Guid id)
    {
        var product = await _productRepo.GetByIdAsync(id);
        if (product == null) return NotFound();
        return Ok(ProductMapper.ToDto(product));
    }

    [HttpPost]
    public async Task<ActionResult<ProductDto>> Create([FromBody] CreateProductRequest dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var createdBy = User?.Identity?.Name ?? "SYSTEM";
        var result = await _mediator.Send(new CreateProductCommand(dto, createdBy));
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:guid}/points")]
    public async Task<ActionResult> UpdatePoints(Guid id, [FromBody] UpdatePointsRequest dto)
    {
        var product = await _productRepo.GetByIdAsync(id);
        if (product == null) return NotFound();
        product.UpdatePoints(dto.NewPoints, User?.Identity?.Name ?? "SYSTEM");
        await _productRepo.UpdateAsync(product);
        return NoContent();
    }

    [HttpPut("{id:guid}/stock")]
    public async Task<ActionResult> UpdateStock(Guid id, [FromBody] UpdateStockRequest dto)
    {
        var product = await _productRepo.GetByIdAsync(id);
        if (product == null) return NotFound();
        product.UpdateStock(dto.NewQuantity, User?.Identity?.Name ?? "SYSTEM");
        await _productRepo.UpdateAsync(product);
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        var product = await _productRepo.GetByIdAsync(id);
        if (product == null) return NotFound();
        await _productRepo.DeleteAsync(id);
        return NoContent();
    }
}