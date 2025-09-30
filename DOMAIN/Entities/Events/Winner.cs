using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Events
{
    public class Winner
    {
        public string EmployeeEmail { get; }
        public int Rank { get; }
        public string EmployeeName { get; }

        public Winner(string employeeEmail, int rank, string employeeName = "")
        {
            ValidateEmail(employeeEmail);
            ValidateRank(rank);

            EmployeeEmail = employeeEmail.Trim().ToLower();
            Rank = rank;
            EmployeeName = employeeName?.Trim() ?? "Unknown";
        }

        private void ValidateEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                throw new DomainException("Employee email is required");
            if (!email.Contains("@"))
                throw new DomainException("Invalid email format");
        }

        private void ValidateRank(int rank)
        {
            if (rank < 1)
                throw new DomainException("Winner rank must be positive");
        }

        public override bool Equals(object obj)
        {
            return obj is Winner winner &&
                   EmployeeEmail == winner.EmployeeEmail &&
                   Rank == winner.Rank;
        }

        public override int GetHashCode() => HashCode.Combine(EmployeeEmail, Rank);
    }
}