using AutoMapper;
using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.APPLICATION.Commands.Redemptions;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
using WIN.AGDATA.WIN.Domain.Entities.Products;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Redemptions;

public class CreateRedemptionHandler : IRequestHandler<CreateRedemptionCommand, RedemptionDto>
{
    private readonly IMapper _mapper;
    private readonly IRedemptionRepository _redemptionRepo;
    private readonly IProductRepository _productRepo;
    private readonly IUserRepository _userRepo;
    private readonly IUnitOfWork _unitOfWork;

    public CreateRedemptionHandler(
        IMapper mapper,
        IRedemptionRepository redemptionRepo,
        IProductRepository productRepo,
        IUserRepository userRepo,
        IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _redemptionRepo = redemptionRepo;
        _productRepo = productRepo;
        _userRepo = userRepo;
        _unitOfWork = unitOfWork;
    }

    public async Task<RedemptionDto> Handle(CreateRedemptionCommand request, CancellationToken ct)
    {
        var product = await _productRepo.GetActiveWithDetailsAsync(request.ProductId)
                     ?? throw new InvalidOperationException("Product not found or inactive");

        var pointsCost = product.CurrentPricing.PointsCost * request.Quantity;
        var user = await _userRepo.GetByIdWithPointsAsync(request.UserId)
                  ?? throw new InvalidOperationException("User not found");

        user.PointsAccount.SpendPoints(pointsCost, request.UserId);

        product.Inventory.Reserve(request.Quantity);

        var redemption = new Redemption(request.UserId, request.ProductId, pointsCost, request.Quantity);

        _redemptionRepo.Add(redemption);
        await _unitOfWork.SaveChangesAsync(ct);

        return _mapper.Map<RedemptionDto>(redemption);
    }
}