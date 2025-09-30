using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Transactions
{
    public abstract class PointsTransaction
    {
        public Guid Id { get; }
        public string EmployeeId { get; }
        public int Points { get; }
        public string Description { get; }
        public DateTime TransactionDate { get; }

        protected PointsTransaction(string employeeId, int points, string description)
        {
            ValidateEmployeeId(employeeId);
            ValidatePoints(points);
            ValidateDescription(description);

            Id = Guid.NewGuid();
            EmployeeId = employeeId.Trim().ToUpper();
            Points = points;
            Description = description.Trim();
            TransactionDate = DateTime.UtcNow;
        }

        private void ValidateEmployeeId(string employeeId)
        {
            if (string.IsNullOrWhiteSpace(employeeId))
                throw new DomainException("Employee ID is required");
        }

        private void ValidatePoints(int points)
        {
            if (points == 0)
                throw new DomainException("Points cannot be zero");
        }

        private void ValidateDescription(string description)
        {
            if (string.IsNullOrWhiteSpace(description))
                throw new DomainException("Transaction description is required");
        }
    }
}