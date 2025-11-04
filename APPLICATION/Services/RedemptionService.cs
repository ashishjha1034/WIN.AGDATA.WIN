using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using WIN.AGDATA.WIN.Application.Interfaces;


namespace WIN.AGDATA.WIN.Application.Services;

public class RedemptionService : IRedemptionService
{
    private readonly IUserRepository _userRepository;
    private readonly IProductRepository _productRepository;
    private readonly IRedemptionRepository _redemptionRepository;
    private readonly IPointsService _pointsService;
    private readonly ILogger<RedemptionService> _logger;

    public RedemptionService(
        IUserRepository userRepository,
        IProductRepository productRepository,
        IRedemptionRepository redemptionRepository,
        IPointsService pointsService,
        ILogger<RedemptionService> logger)
    {
        _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        _productRepository = productRepository ?? throw new ArgumentNullException(nameof(productRepository));
        _redemptionRepository = redemptionRepository ?? throw new ArgumentNullException(nameof(redemptionRepository));
        _pointsService = pointsService ?? throw new ArgumentNullException(nameof(pointsService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public Redemption RequestRedemption(string employeeId, Guid productId)
    {
        try
        {
            var user = _userRepository.GetByEmployeeId(employeeId);
            if (user == null)
                throw new DomainException($"User not found: {employeeId}");

            if (!user.CanRedeemProducts())
                throw new DomainException($"User {employeeId} cannot redeem products");

            var product = _productRepository.GetById(productId);
            if (product == null)
                throw new DomainException($"Product not found: {productId}");

            if (!product.IsAvailable())
                throw new DomainException($"Product is not available: {productId}");

            if (!product.CanBeRedeemedBy(user.Points.CurrentBalance))
                throw new DomainException($"Insufficient points. Required: {product.Pricing.RequiredPoints}, Available: {user.Points.CurrentBalance}");

            var redemption = new Redemption(employeeId, productId, product.Pricing.RequiredPoints);
            _redemptionRepository.Add(redemption);

            _logger.LogInformation($"Redemption requested: {employeeId} for product {productId}");
            return redemption;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error requesting redemption for: {employeeId}");
            throw;
        }
    }

    public Redemption? GetRedemptionById(Guid redemptionId)
    {
        try
        {
            return _redemptionRepository.GetById(redemptionId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error retrieving redemption: {redemptionId}");
            throw;
        }
    }

    public List<Redemption> GetUserRedemptions(string employeeId)
    {
        try
        {
            return _redemptionRepository.GetByEmployeeId(employeeId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error retrieving redemptions for: {employeeId}");
            throw;
        }
    }

    public void ApproveRedemption(Guid redemptionId)
    {
        try
        {
            var redemption = _redemptionRepository.GetById(redemptionId);
            if (redemption == null)
                throw new DomainException($"Redemption not found: {redemptionId}");

            _pointsService.SpendPoints(redemption.EmployeeId, redemption.PointsCost, $"Product redemption", redemptionId);

            var product = _productRepository.GetById(redemption.ProductId);
            if (product != null)
            {
                product.DecreaseStock(1);
                _productRepository.Update(product);
            }

            redemption.Status.Approve();
            _redemptionRepository.Update(redemption);

            _logger.LogInformation($"Redemption approved: {redemptionId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error approving redemption: {redemptionId}");
            throw;
        }
    }

    public void RejectRedemption(Guid redemptionId, string reason)
    {
        try
        {
            var redemption = _redemptionRepository.GetById(redemptionId);
            if (redemption == null)
                throw new DomainException($"Redemption not found: {redemptionId}");

            redemption.Status.Reject(reason);
            _redemptionRepository.Update(redemption);

            _logger.LogInformation($"Redemption rejected: {redemptionId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error rejecting redemption: {redemptionId}");
            throw;
        }
    }

    public void MarkAsDelivered(Guid redemptionId)
    {
        try
        {
            var redemption = _redemptionRepository.GetById(redemptionId);
            if (redemption == null)
                throw new DomainException($"Redemption not found: {redemptionId}");

            redemption.Status.MarkDelivered();
            _redemptionRepository.Update(redemption);

            _logger.LogInformation($"Redemption marked as delivered: {redemptionId}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error marking redemption as delivered: {redemptionId}");
            throw;
        }
    }
    public List<Redemption> GetPendingRedemptions()
    {
        try
        {
            return _redemptionRepository.GetAll()
                .Where(r => r.Status.Value == StatusValue.Pending)
                .ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving pending redemptions");
            throw;
        }
    }

}
