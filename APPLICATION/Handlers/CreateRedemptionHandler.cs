using AutoMapper;
using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Redemptions;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Domain.Exceptions;

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
                     ?? throw new DomainException("Product not found or inactive");

        var pointsCost = product.CurrentPricing * request.Quantity;
        if (pointsCost <= 0) throw new DomainException("Invalid points cost");

        var user = await _userRepo.GetByIdWithPointsAsync(request.UserId)
                  ?? throw new DomainException("User not found");

        if (user.PointsAccount.CurrentBalance < pointsCost)
            throw new DomainException("Insufficient points balance");

        // Reserve stock
        product.Inventory.AdjustStock(-request.Quantity, request.UserId);

        // Deduct points
        user.PointsAccount.SpendPoints(pointsCost, Guid.NewGuid());

        var redemption = new Redemption(request.UserId, request.ProductId, pointsCost, request.Quantity);
        _redemptionRepo.Add(redemption);

        await _unitOfWork.SaveChangesAsync(ct);

        var loaded = await _redemptionRepo.GetByIdWithDetailsAsync(redemption.Id);
        return _mapper.Map<RedemptionDto>(loaded!);
    }
}