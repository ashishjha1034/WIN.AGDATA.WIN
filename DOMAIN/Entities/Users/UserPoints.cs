// DOMAIN/ValueObjects/UserPoints.cs
using System;

namespace WIN.AGDATA.WIN.Domain.ValueObjects
{
    public class UserPoints
    {
        // Total earned minus spent (you may keep two separate fields if you prefer)
        public int CurrentBalance { get; private set; }

        // Parameterless ctor for EF
        private UserPoints() { }

        public UserPoints(int initialBalance = 0)
        {
            if (initialBalance < 0) throw new DomainException("Initial points cannot be negative");
            CurrentBalance = initialBalance;
        }

        public void AddPoints(int amount)
        {
            if (amount <= 0) throw new DomainException("Points to add must be positive");
            CurrentBalance += amount;
        }

        public void SpendPoints(int amount)
        {
            if (amount <= 0) throw new DomainException("Points to spend must be positive");
            if (CurrentBalance < amount) throw new DomainException("Insufficient points");
            CurrentBalance -= amount;
        }

        public void RefundPoints(int amount)
        {
            if (amount <= 0) throw new DomainException("Refund must be positive");
            CurrentBalance += amount;
        }

        public override string ToString() => $"Points: {CurrentBalance}";
    }
}
