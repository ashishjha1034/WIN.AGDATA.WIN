using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Transactions
{
    public class PointsSpending : PointsTransaction
    {
        public Guid RedemptionId { get; }

        public PointsSpending(string employeeId, int points, Guid redemptionId, string description)
            : base(employeeId, -Math.Abs(points), description) // Always negative
        {
            ValidateRedemptionId(redemptionId);
            RedemptionId = redemptionId;
        }

        private void ValidateRedemptionId(Guid redemptionId)
        {
            if (redemptionId == Guid.Empty)
                throw new DomainException("Redemption ID is required for points spending");
        }
    }
}