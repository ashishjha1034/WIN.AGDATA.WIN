using AutoMapper;
using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.APPLICATION.Commands.Products;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Products;

public class CreateProductHandler : IRequestHandler<CreateProductCommand, ProductDto>
{
    private readonly IMapper _mapper;
    private readonly IProductRepository _productRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateProductHandler(IMapper mapper, IProductRepository productRepository, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _productRepository = productRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<ProductDto> Handle(CreateProductCommand request, CancellationToken ct)
    {
        var product = new Product(request.Name, request.Description, request.CategoryId, request.ImageUrl);

        // Create pricing (current)
        var pricing = new ProductPricing(product.Id, request.PointsCost, DateTime.UtcNow);
        product.GetType().GetProperty("CurrentPricing")!
            .SetValue(product, pricing);

        // Create inventory
        var inventory = new InventoryItem(product.Id);
        product.GetType().GetProperty("Inventory")!
            .SetValue(product, inventory);

        _productRepository.Add(product);
        await _unitOfWork.SaveChangesAsync(ct);

        return _mapper.Map<ProductDto>(product);
    }
}