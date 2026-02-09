using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Products;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers;

public class DeactivateProductHandler : IRequestHandler<DeactivateProductCommand, DeactivateProductResult>
{
    private readonly IProductRepository _productRepository;
    private readonly IRedemptionRepository _redemptionRepository;
    private readonly IUnitOfWork _unitOfWork;

    public DeactivateProductHandler(
        IProductRepository productRepository,
        IRedemptionRepository redemptionRepository,
        IUnitOfWork unitOfWork)
    {
        _productRepository = productRepository;
        _redemptionRepository = redemptionRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<DeactivateProductResult> Handle(DeactivateProductCommand request, CancellationToken cancellationToken)
    {
        // 1. Load product with inventory for stock check
        var product = await _productRepository.GetByIdWithInventoryAsync(request.ProductId);
        if (product == null)
        {
            throw new InvalidOperationException($"Product with ID '{request.ProductId}' not found");
        }

        // 2. Query pending/approved counts (hard blockers)
        var pendingApproved = await _redemptionRepository.GetPendingAndApprovedCountsForProductAsync(request.ProductId);

        // 3. Check hard blockers first - these cannot be bypassed
        if (pendingApproved.PendingCount > 0 || pendingApproved.ApprovedCount > 0)
        {
            return DeactivateProductResult.WithBlock(new DeactivateProductBlocked
            {
                Pending = pendingApproved.PendingCount,
                Approved = pendingApproved.ApprovedCount,
                Message = $"Cannot deactivate while redemptions are Pending/Approved (Pending: {pendingApproved.PendingCount}, Approved: {pendingApproved.ApprovedCount})."
            });
        }

        // 4. Query recent redemption stats for soft warnings
        var stats7d = await _redemptionRepository.GetRecentRedemptionStatsForProductAsync(request.ProductId, 7);
        var stats30d = await _redemptionRepository.GetRecentRedemptionStatsForProductAsync(request.ProductId, 30);

        // 5. Check for soft warnings
        var stock = product.Inventory?.QuantityAvailable ?? 0;
        var hasWarnings = stock > 0 || stats7d.TotalRedemptions > 0;

        // If there are warnings and force is not set, return warnings for UI confirmation
        if (hasWarnings && !request.Force)
        {
            return DeactivateProductResult.WithWarnings(new DeactivateProductWarnings
            {
                Stock = stock,
                RecentRedemptions7d = stats7d.TotalRedemptions,
                RecentUniqueUsers7d = stats7d.UniqueUsers,
                RecentRedemptions30d = stats30d.TotalRedemptions,
                RecentUniqueUsers30d = stats30d.UniqueUsers,
                LastRedemptionDate = stats7d.LastRedemptionDate ?? stats30d.LastRedemptionDate,
                Message = "Deactivation has warnings. To proceed, resubmit with force=true."
            });
        }

        // 6. Validate domain rules (this will throw if hard blocks exist - double check)
        // Pass 0 for pending/approved since we already checked above
        product.ValidateDeactivation(
            pendingApproved.PendingCount,
            pendingApproved.ApprovedCount,
            stats7d.TotalRedemptions,
            stats7d.UniqueUsers,
            stats30d.TotalRedemptions,
            stats30d.UniqueUsers,
            stats7d.LastRedemptionDate ?? stats30d.LastRedemptionDate);

        // 7. Perform deactivation within transaction
        product.Deactivate(
            reason: "Deactivated by admin",
            deactivatedBy: Guid.Empty, // TODO: Get current user ID
            pendingRedemptions: pendingApproved.PendingCount,
            approvedRedemptions: pendingApproved.ApprovedCount,
            force: request.Force);

        await _productRepository.UpdateAsync(product);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        return DeactivateProductResult.Succeeded();
    }
}