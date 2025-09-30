using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.Entities.Products;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN_AGDATA_WIN.Application.Interfaces;

namespace WIN_AGDATA_WIN.Application.Services
{
    public class RedemptionService : IRedemptionService
    {
        private readonly List<Redemption> _redemptions = new();
        private readonly List<RStatus> _redemptionStatuses = new();
        private readonly IUserService _userService;
        private readonly IProductService _productService;
        private readonly object _lock = new object();

        public RedemptionService(IUserService userService, IProductService productService)
        {
            _userService = userService;
            _productService = productService;
        }

        public Redemption RequestRedemption(string employeeId, Guid productId)
        {
            lock (_lock)
            {
                var user = _userService.GetUserByEmployeeId(employeeId)
                    ?? throw new DomainException($"User with Employee ID {employeeId} not found");

                var product = _productService.GetProduct(productId)
                    ?? throw new DomainException($"Product with ID {productId} not found");

                // Validate business rules
                if (!user.Status.IsActive)
                    throw new DomainException("Cannot request redemption for inactive user");

                if (!user.CanRedeem(product.Pricing.RequiredPoints))
                    throw new DomainException($"Insufficient points. Available: {user.Points.Balance}, Required: {product.Pricing.RequiredPoints}");

                if (!product.IsAvailable())
                    throw new DomainException("Product is not available");

                // Create redemption
                var redemption = new Redemption(employeeId, productId, product.Pricing.RequiredPoints);
                _redemptions.Add(redemption);

                // Create initial status
                var status = new RStatus(redemption.Id);
                _redemptionStatuses.Add(status);

                // Deduct stock
                product.Inventory.DecreaseStock(1);

                return redemption;
            }
        }

        public void ApproveRedemption(Guid redemptionId)
        {
            lock (_lock)
            {
                var status = GetStatus(redemptionId);
                status.Approve();
            }
        }

        public void RejectRedemption(Guid redemptionId, string reason)
        {
            lock (_lock)
            {
                var status = GetStatus(redemptionId);
                status.Reject(reason);
            }
        }

        public void MarkRedemptionDelivered(Guid redemptionId)
        {
            lock (_lock)
            {
                var status = GetStatus(redemptionId);
                status.MarkDelivered();
            }
        }

        public List<Redemption> GetUserRedemptions(string employeeId)
        {
            lock (_lock)
            {
                return _redemptions
                    .Where(r => string.Equals(r.EmployeeId, employeeId, StringComparison.OrdinalIgnoreCase))
                    .OrderByDescending(r => r.RequestedAt)
                    .ToList();
            }
        }

        public List<Redemption> GetPendingRedemptions()
        {
            lock (_lock)
            {
                var pendingStatuses = _redemptionStatuses
                    .Where(s => s.CurrentStatus == StatusValue.Pending)
                    .Select(s => s.RedemptionId)
                    .ToList();

                return _redemptions
                    .Where(r => pendingStatuses.Contains(r.Id))
                    .OrderBy(r => r.RequestedAt)
                    .ToList();
            }
        }

        private RStatus GetStatus(Guid redemptionId)
        {
            var status = _redemptionStatuses.FirstOrDefault(s => s.RedemptionId == redemptionId);
            return status ?? throw new DomainException($"Redemption status not found for ID: {redemptionId}");
        }
    }
}