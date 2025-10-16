using Domain.Entities.Users;
using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Products;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Infrastructure.Repositories;
using WIN_AGDATA_WIN.Application.Interfaces;

namespace WIN.AGDATA.WIN.Application.Services;

public class RedemptionService : IRedemptionService
{
    private readonly IRedemptionRepository _redemptionRepository;
    private readonly IUserRepository _userRepository;
    private readonly IProductRepository _productRepository;
    private readonly IPointsManagementService _pointsService;
    private readonly ILogger<RedemptionService> _logger;

    public RedemptionService(
        IRedemptionRepository redemptionRepository,
        IUserRepository userRepository,
        IProductRepository productRepository,
        IPointsManagementService pointsService,
        ILogger<RedemptionService> logger)
    {
        _redemptionRepository = redemptionRepository ?? throw new ArgumentNullException(nameof(redemptionRepository));
        _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        _productRepository = productRepository ?? throw new ArgumentNullException(nameof(productRepository));
        _pointsService = pointsService ?? throw new ArgumentNullException(nameof(pointsService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    public Redemption RequestRedemption(string employeeId, Guid productId)
    {
        try
        {
            var user = GetUserOrThrow(employeeId);
            var product = GetProductOrThrow(productId);

            ValidateRedemptionRequest(user, product);

            var redemption = new Redemption(employeeId, productId, product.Pricing.RequiredPoints);
            _redemptionRepository.Add(redemption);

            product.DecreaseStock(1);
            _productRepository.Update(product);

            _pointsService.DeductPointsFromUser(
                employeeId,
                product.Pricing.RequiredPoints,
                $"Redeemed product: {product.Identity.Name}",
                redemption.Id);

            _logger.LogInformation("Redemption requested: {RedemptionId} by {EmployeeId} for product {ProductId}",
                redemption.Id, employeeId, productId);

            return redemption;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to request redemption for user {EmployeeId} and product {ProductId}", employeeId, productId);
            throw;
        }
    }

    public void ApproveRedemption(Guid redemptionId)
    {
        try
        {
            var redemption = GetRedemptionOrThrow(redemptionId);
            var status = _redemptionRepository.GetStatusById(redemptionId);

            if (status == null)
                throw new DomainException($"Redemption status not found: {redemptionId}");

            status.Approve();
            _redemptionRepository.UpdateStatus(status);

            _logger.LogInformation("Redemption approved: {RedemptionId}", redemptionId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to approve redemption: {RedemptionId}", redemptionId);
            throw;
        }
    }

    public void RejectRedemption(Guid redemptionId, string reason)
    {
        try
        {
            var redemption = GetRedemptionOrThrow(redemptionId);
            var status = _redemptionRepository.GetStatusById(redemptionId);

            if (status == null)
                throw new DomainException($"Redemption status not found: {redemptionId}");

            status.Reject(reason);
            _redemptionRepository.UpdateStatus(status);

            var product = _productRepository.GetById(redemption.ProductId);
            if (product != null)
            {
                product.IncreaseStock(1);
                _productRepository.Update(product);
            }

            _pointsService.AddPointsToUser(
                redemption.EmployeeId,
                redemption.PointsCost,
                $"Redemption rejected and points refunded: {reason}",
                "REFUND");

            _logger.LogInformation("Redemption rejected: {RedemptionId} - {Reason}", redemptionId, reason);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to reject redemption: {RedemptionId}", redemptionId);
            throw;
        }
    }

    public void MarkAsDelivered(Guid redemptionId)
    {
        try
        {
            var redemption = GetRedemptionOrThrow(redemptionId);
            var status = _redemptionRepository.GetStatusById(redemptionId);

            if (status == null)
                throw new DomainException($"Redemption status not found: {redemptionId}");

            status.MarkDelivered();
            _redemptionRepository.UpdateStatus(status);

            _logger.LogInformation("Redemption marked as delivered: {RedemptionId}", redemptionId);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to mark redemption as delivered: {RedemptionId}", redemptionId);
            throw;
        }
    }

    public List<Redemption> GetUserRedemptions(string employeeId)
    {
        return _redemptionRepository.GetByEmployeeId(employeeId);
    }

    public List<Redemption> GetPendingRedemptions()
    {
        return _redemptionRepository.GetByStatus(StatusValue.Pending);
    }

    public Redemption? GetRedemptionById(Guid redemptionId)
    {
        return _redemptionRepository.GetById(redemptionId);
    }

    private void ValidateRedemptionRequest(User user, Product product)
    {
        if (!user.IsActive)
            throw new DomainException($"User {user.Identity.EmployeeId} is not active");

        if (!product.IsAvailable())
            throw new DomainException($"Product {product.Identity.Name} is not available");

        if (!product.CanBeRedeemedBy(user))
            throw new DomainException($"User {user.Identity.EmployeeId} cannot afford product {product.Identity.Name}");
    }

    private User GetUserOrThrow(string employeeId)
    {
        var user = _userRepository.GetByEmployeeId(employeeId);
        if (user == null)
            throw new DomainException($"User not found: {employeeId}");

        return user;
    }

    private Product GetProductOrThrow(Guid productId)
    {
        var product = _productRepository.GetById(productId);
        if (product == null)
            throw new DomainException($"Product not found: {productId}");

        return product;
    }

    private Redemption GetRedemptionOrThrow(Guid redemptionId)
    {
        var redemption = _redemptionRepository.GetById(redemptionId);
        if (redemption == null)
            throw new DomainException($"Redemption not found: {redemptionId}");

        return redemption;
    }
}
