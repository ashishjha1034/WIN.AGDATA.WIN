using WIN.AGDATA.WIN.Domain.Exceptions;

namespace Domain.Entities.Users
{
    public class Points
    {
        public int Balance { get; private set; }
        public DateTime LastUpdated { get; private set; }

        public Points(int initialBalance = 0)
        {
            if (initialBalance < 0) throw new DomainException("Balance cannot be negative");
            Balance = initialBalance;
            LastUpdated = DateTime.UtcNow;
        }

        public void Add(int points)
        {
            if (points <= 0) throw new DomainException("Points must be positive");
            Balance += points;
            LastUpdated = DateTime.UtcNow;
        }

        public void Deduct(int points)
        {
            if (points <= 0) throw new DomainException("Points must be positive");
            if (Balance < points) throw new DomainException("Insufficient points");
            Balance -= points;
            LastUpdated = DateTime.UtcNow;
        }
    }
}