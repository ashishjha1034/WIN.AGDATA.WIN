using MediatR;
using Microsoft.Extensions.Logging;
using System.Threading;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Application.Commands;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Application.Mappers;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

namespace WIN.AGDATA.WIN.Application.Handlers;

public class CreateProductHandler : IRequestHandler<CreateProductCommand, ProductDto>
{
    private readonly IProductRepository _productRepo;
    private readonly IUnitOfWork _uow;
    private readonly ILogger<CreateProductHandler> _logger;

    public CreateProductHandler(IProductRepository productRepo, IUnitOfWork uow, ILogger<CreateProductHandler> logger)
    {
        _productRepo = productRepo;
        _uow = uow;
        _logger = logger;
    }

    public async Task<ProductDto> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var r = request.Request;
        var product = new Domain.Entities.Products.Product(r.Name, r.Description, r.RequiredPoints, r.StockQuantity, request.CreatedBy);
        await _productRepo.AddAsync(product);
        await _uow.SaveChangesAsync();
        var dto = ProductMapper.ToDto(product);
        _logger.LogInformation("Product created {ProductId}", product.Id);
        return dto;
    }
}