using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.Application.Commands;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Application.Mappers;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Application.Handlers;

public class CreateRedemptionHandler : IRequestHandler<CreateRedemptionCommand, RedemptionDto>
{
    private readonly IRedemptionRepository _redRepo;
    private readonly IProductRepository _productRepo;
    private readonly IUserRepository _userRepo;
    private readonly IUnitOfWork _uow;
    private readonly ILogger<CreateRedemptionHandler> _logger;

    public CreateRedemptionHandler(
        IRedemptionRepository redRepo,
        IProductRepository productRepo,
        IUserRepository userRepo,
        IUnitOfWork uow,
        ILogger<CreateRedemptionHandler> logger)
    {
        _redRepo = redRepo;
        _productRepo = productRepo;
        _userRepo = userRepo;
        _uow = uow;
        _logger = logger;
    }

    public async Task<RedemptionDto> Handle(CreateRedemptionCommand request, CancellationToken cancellationToken)
    {
        var user = await _userRepo.GetByIdAsync(request.UserId);
        if (user == null) throw new DomainException($"User with id {request.UserId} not found.");

        var product = await _productRepo.GetByIdAsync(request.ProductId);
        if (product == null) throw new DomainException($"Product with id {request.ProductId} not found.");

        if (!product.IsAvailable()) throw new DomainException("Product not available.");
        if (!product.CanBeRedeemedBy(user.Points.CurrentBalance)) throw new DomainException("Insufficient points.");

        var redemption = new Domain.Entities.Redemptions.Redemption(
            user.Identity.EmployeeId,
            product.Id,
            product.Pricing.RequiredPoints,
            request.CreatedBy);

        await _redRepo.AddAsync(redemption);
        user.SpendPoints(redemption.PointsCost, request.CreatedBy);
        await _userRepo.UpdateAsync(user);
        product.DecreaseStock(1, request.CreatedBy);
        await _productRepo.UpdateAsync(product);

        await _uow.SaveChangesAsync();

        _logger.LogInformation("Created redemption {Id}", redemption.Id);
        return RedemptionMapper.ToDto(redemption);
    }
}