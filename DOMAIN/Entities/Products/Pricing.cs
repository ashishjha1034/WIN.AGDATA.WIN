using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Products
{
    public class Pricing
    {
        public int RequiredPoints { get; private set; }

        public Pricing(int requiredPoints)
        {
            ValidateRequiredPoints(requiredPoints);
            RequiredPoints = requiredPoints;
        }

        public void UpdatePoints(int newPoints)
        {
            ValidateRequiredPoints(newPoints);
            RequiredPoints = newPoints;
        }

        private void ValidateRequiredPoints(int points)
        {
            if (points <= 0)
                throw new DomainException("Required points must be positive");

            if (points > 100000)
                throw new DomainException("Required points cannot exceed 100,000");
        }

        public bool CanAfford(int userPoints) => userPoints >= RequiredPoints;
    }
}