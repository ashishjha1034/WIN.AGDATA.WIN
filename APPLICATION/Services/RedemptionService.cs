using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Application.Services;

public class RedemptionService : IRedemptionService
{
    private readonly IUserRepository _userRepository;
    private readonly IProductRepository _productRepository;
    private readonly IRedemptionRepository _redemptionRepository;
    private readonly IPointsService _pointsService;
    private readonly IUnitOfWork _uow;
    private readonly ILogger<RedemptionService> _logger;

    public RedemptionService(
        IUserRepository userRepository,
        IProductRepository productRepository,
        IRedemptionRepository redemptionRepository,
        IPointsService pointsService,
        IUnitOfWork uow,
        ILogger<RedemptionService> logger)
    {
        _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        _productRepository = productRepository ?? throw new ArgumentNullException(nameof(productRepository));
        _redemptionRepository = redemptionRepository ?? throw new ArgumentNullException(nameof(redemptionRepository));
        _pointsService = pointsService ?? throw new ArgumentNullException(nameof(pointsService));
        _uow = uow ?? throw new ArgumentNullException(nameof(uow));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public async Task<Redemption> RequestRedemptionAsync(string employeeId, Guid productId, string createdBy = "SYSTEM")
    {
        try
        {
            var user = await _userRepository.GetByEmployeeIdAsync(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            if (!user.CanRedeemProducts())
                throw new DomainException($"User {employeeId} cannot redeem products");

            var product = await _productRepository.GetByIdAsync(productId);
            ValidationGuards.ValidateEntityExists(product, "Product", productId.ToString());

            if (!product.IsAvailable())
                throw new DomainException($"Product is not available: {productId}");

            if (!product.CanBeRedeemedBy(user.Points.CurrentBalance))
                throw new DomainException($"Insufficient points. Required: {product.Pricing.RequiredPoints}, Available: {user.Points.CurrentBalance}");

            var redemption = new Redemption(employeeId, productId, product.Pricing.RequiredPoints, createdBy);
            await _redemptionRepository.AddAsync(redemption);
            await _uow.SaveChangesAsync();

            _logger.LogInformation("Redemption requested: {EmployeeId} for product {ProductId}", employeeId, productId);
            return redemption;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error requesting redemption for: {EmployeeId}", employeeId);
            throw;
        }
    }

    public async Task<Redemption?> GetRedemptionByIdAsync(Guid redemptionId)
    {
        try
        {
            return await _redemptionRepository.GetByIdAsync(redemptionId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving redemption: {RedemptionId}", redemptionId);
            throw;
        }
    }

    public async Task<List<Redemption>> GetUserRedemptionsAsync(string employeeId)
    {
        try
        {
            var redemptions = await _redemptionRepository.GetByEmployeeIdAsync(employeeId);
            return redemptions.ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving redemptions for: {EmployeeId}", employeeId);
            throw;
        }
    }

    public async Task<List<Redemption>> GetPendingRedemptionsAsync()
    {
        try
        {
            var redemptions = await _redemptionRepository.GetAllAsync();
            return redemptions
                .Where(r => r.Status.Value == StatusValue.Pending)
                .ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving pending redemptions");
            throw;
        }
    }

    public async Task ApproveRedemptionAsync(Guid redemptionId, string approvedBy = "SYSTEM")
    {
        try
        {
            var redemption = await _redemptionRepository.GetByIdAsync(redemptionId);
            if (redemption == null)
                throw new DomainException($"Redemption not found: {redemptionId}");

            await _pointsService.SpendPointsAsync(
                redemption.EmployeeId,
                redemption.PointsCost,
                $"Product redemption approved",
                redemptionId);

            var product = await _productRepository.GetByIdAsync(redemption.ProductId);
            if (product != null)
            {
                product.DecreaseStock(1, approvedBy);
                await _productRepository.UpdateAsync(product);
            }

            redemption.Approve(approvedBy);
            await _redemptionRepository.UpdateAsync(redemption);
            await _uow.SaveChangesAsync();

            _logger.LogInformation("Redemption approved: {RedemptionId}", redemptionId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error approving redemption: {RedemptionId}", redemptionId);
            throw;
        }
    }

    public async Task RejectRedemptionAsync(Guid redemptionId, string reason, string rejectedBy = "SYSTEM")
    {
        try
        {
            var redemption = await _redemptionRepository.GetByIdAsync(redemptionId);
            if (redemption == null)
                throw new DomainException($"Redemption not found: {redemptionId}");

            redemption.Reject(reason, rejectedBy);
            await _redemptionRepository.UpdateAsync(redemption);
            await _uow.SaveChangesAsync();

            _logger.LogInformation("Redemption rejected: {RedemptionId}", redemptionId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error rejecting redemption: {RedemptionId}", redemptionId);
            throw;
        }
    }

    public async Task MarkAsDeliveredAsync(Guid redemptionId, string deliveredBy = "SYSTEM")
    {
        try
        {
            var redemption = await _redemptionRepository.GetByIdAsync(redemptionId);
            if (redemption == null)
                throw new DomainException($"Redemption not found: {redemptionId}");

            redemption.MarkDelivered(deliveredBy);
            await _redemptionRepository.UpdateAsync(redemption);
            await _uow.SaveChangesAsync();

            _logger.LogInformation("Redemption marked as delivered: {RedemptionId}", redemptionId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error marking redemption as delivered: {RedemptionId}", redemptionId);
            throw;
        }
    }
}