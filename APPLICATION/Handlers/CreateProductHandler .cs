using AutoMapper;
using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Products;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers;

public class CreateProductHandler : IRequestHandler<CreateProductCommand, ProductDto>
{
    private readonly IProductRepository _productRepository;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public CreateProductHandler(IProductRepository productRepository, IMapper mapper, IUnitOfWork unitOfWork)
    {
        _productRepository = productRepository;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<ProductDto> Handle(CreateProductCommand request, CancellationToken ct)
    {
        var product = new Product(
            request.Name,
            request.Description,
            request.CategoryId,
            request.PointsCost,
            request.ImageUrl);

        if (request.InitialStock > 0)
        {
            product.Inventory.AdjustStock(request.InitialStock, Guid.Empty);
        }

        _productRepository.Add(product);
        await _unitOfWork.SaveChangesAsync(ct);

        var loaded = await _productRepository.GetActiveWithDetailsAsync(product.Id);
        return _mapper.Map<ProductDto>(loaded!);
    }
}