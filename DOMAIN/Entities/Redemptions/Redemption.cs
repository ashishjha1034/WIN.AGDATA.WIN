using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Redemptions
{
    public class Redemption
    {
        public Guid Id { get; }
        public string EmployeeId { get; }
        public Guid ProductId { get; }
        public int PointsCost { get; }
        public DateTime RequestedAt { get; }

        public Redemption(string employeeId, Guid productId, int pointsCost)
        {
            ValidateEmployeeId(employeeId);
            ValidateProductId(productId);
            ValidatePointsCost(pointsCost);

            Id = Guid.NewGuid();
            EmployeeId = employeeId.Trim().ToUpper();
            ProductId = productId;
            PointsCost = pointsCost;
            RequestedAt = DateTime.UtcNow;
        }

        private void ValidateEmployeeId(string employeeId)
        {
            if (string.IsNullOrWhiteSpace(employeeId))
                throw new DomainException("Employee ID is required");
        }

        private void ValidateProductId(Guid productId)
        {
            if (productId == Guid.Empty)
                throw new DomainException("Product ID is required");
        }

        private void ValidatePointsCost(int pointsCost)
        {
            if (pointsCost <= 0)
                throw new DomainException("Points cost must be positive");
        }
    }
}