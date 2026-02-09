using AutoMapper;
using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Redemptions;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.Exceptions;
using System.Diagnostics;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Redemptions;

public class CreateRedemptionHandler : IRequestHandler<CreateRedemptionCommand, RedemptionDto>
{
    private readonly IMapper _mapper;
    private readonly IRedemptionRepository _redemptionRepo;
    private readonly IProductRepository _productRepo;
    private readonly IUserRepository _userRepo;
    private readonly ITransactionRepository _transactionRepo;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public CreateRedemptionHandler(
        IMapper mapper,
        IRedemptionRepository redemptionRepo,
        IProductRepository productRepo,
        IUserRepository userRepo,
        ITransactionRepository transactionRepo,
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _mapper = mapper;
        _redemptionRepo = redemptionRepo;
        _productRepo = productRepo;
        _userRepo = userRepo;
        _transactionRepo = transactionRepo;
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<RedemptionDto> Handle(CreateRedemptionCommand request, CancellationToken ct)
    {
        try
        {
            Debug.WriteLine($"[CreateRedemption] Starting for UserId={request.UserId}, ProductId={request.ProductId}, Qty={request.Quantity}");

            // Enforce quantity = 1 per redemption request
            if (request.Quantity != 1)
                throw new DomainException("You can only redeem 1 quantity per request. For additional quantities, please submit separate requests after your current redemption is delivered.");

            Debug.WriteLine($"[CreateRedemption] Quantity validation passed");

            // Check if user already has a pending/approved redemption for this product
            var hasPendingRedemption = await _redemptionRepo.HasPendingRedemptionForProductAsync(request.UserId, request.ProductId);
            if (hasPendingRedemption)
                throw new DomainException("You already have a pending redemption for this product. Please wait until your previous redemption is delivered before requesting again.");

            Debug.WriteLine($"[CreateRedemption] Pending redemption check passed");

            var product = await _productRepo.GetActiveWithDetailsAsync(request.ProductId)
                         ?? throw new DomainException("Product not found or inactive");

            Debug.WriteLine($"[CreateRedemption] Product loaded: {product.Name}, CurrentPricing={product.CurrentPricing}");

            var pointsCost = product.CurrentPricing * request.Quantity;
            if (pointsCost <= 0)
                throw new DomainException("Invalid points cost");

            Debug.WriteLine($"[CreateRedemption] Points cost calculated: {pointsCost}");

            var user = await _userRepo.GetByIdWithPointsAsync(request.UserId)
                      ?? throw new DomainException("User not found");

            Debug.WriteLine($"[CreateRedemption] User loaded: {user.Email}, CurrentBalance={user.PointsAccount.CurrentBalance}");

            // Cast to decimal for proper comparison with account balance
            var pointsCostDecimal = Convert.ToDecimal(pointsCost);
            if (user.PointsAccount.CurrentBalance < pointsCostDecimal)
                throw new DomainException("Insufficient points balance");

            Debug.WriteLine($"[CreateRedemption] Balance check passed");

            // Validate product/user exist before modifying state
            if (product.Id == Guid.Empty)
                throw new DomainException("Invalid product reference");

            Debug.WriteLine($"[CreateRedemption] Product reference valid");

            // Reserve stock
            product.Inventory.AdjustStock(-request.Quantity, request.UserId);
            Debug.WriteLine($"[CreateRedemption] Stock adjusted. Available={product.Inventory.QuantityAvailable}, Reserved={product.Inventory.QuantityReserved}");

            // Deduct points - use current user ID who is making the redemption
            var currentUserId = _currentUserService.GetCurrentUserId();
            Debug.WriteLine($"[CreateRedemption] Current user ID: {currentUserId}");
            
            user.PointsAccount.SpendPoints(pointsCostDecimal, currentUserId);
            Debug.WriteLine($"[CreateRedemption] Points spent. New balance: {user.PointsAccount.CurrentBalance}");

            // Create redemption entity
            var redemption = new Redemption(request.UserId, request.ProductId, pointsCost, request.Quantity);
            _redemptionRepo.Add(redemption);
            Debug.WriteLine($"[CreateRedemption] Redemption entity created with ID: {redemption.Id}");

            // Create transaction record for redemption
            var transaction = UserPointsTransaction.CreateRedeemed(
                userId: request.UserId,
                points: Points.Create(pointsCostDecimal),
                source: "Product Redemption",
                sourceId: request.ProductId,
                description: $"Redeemed {product.Name} (Qty: {request.Quantity})",
                balanceAfter: user.PointsAccount.CurrentBalance,
                processedBy: currentUserId
            );

            _transactionRepo.Add(transaction);
            Debug.WriteLine($"[CreateRedemption] Transaction entity created with ID: {transaction.Id}");

            Debug.WriteLine($"[CreateRedemption] About to save changes to database...");
            Debug.WriteLine($"[CreateRedemption] Redemption: {System.Text.Json.JsonSerializer.Serialize(new { redemption.Id, redemption.UserId, redemption.ProductId, redemption.PointsSpent, redemption.Status })}");
            
            await _unitOfWork.SaveChangesAsync(ct);
            Debug.WriteLine($"[CreateRedemption] Changes saved to database successfully");

            var loaded = await _redemptionRepo.GetByIdWithDetailsAsync(redemption.Id);
            if (loaded == null)
                throw new InvalidOperationException($"Failed to retrieve saved redemption with ID: {redemption.Id}");
                
            var result = _mapper.Map<RedemptionDto>(loaded);
            Debug.WriteLine($"[CreateRedemption] Redemption mapped to DTO successfully");
            
            return result;
        }
        catch (Exception ex)
        {
            Debug.WriteLine($"[CreateRedemption] ERROR: {ex.Message}");
            Debug.WriteLine($"[CreateRedemption] Stack Trace: {ex.StackTrace}");
            if (ex.InnerException != null)
            {
                Debug.WriteLine($"[CreateRedemption] Inner Exception: {ex.InnerException.Message}");
                Debug.WriteLine($"[CreateRedemption] Inner Stack: {ex.InnerException.StackTrace}");
            }
            throw;
        }
    }
}
