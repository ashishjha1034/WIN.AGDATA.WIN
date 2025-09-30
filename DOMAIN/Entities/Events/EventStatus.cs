using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Events
{
    public class EventStatus
    {
        public bool IsActive { get; private set; }
        public bool IsCompleted { get; private set; }
        public List<Winner> Winners { get; private set; } = new();
        public DateTime CreatedAt { get; }
        public DateTime? CompletedAt { get; private set; }

        public EventStatus()
        {
            IsActive = true;
            IsCompleted = false;
            CreatedAt = DateTime.UtcNow;
        }

        public void Complete(List<Winner> winners, PrizePool prizes)
        {
            ValidateCompletion(winners, prizes);

            Winners = winners;
            IsCompleted = true;
            CompletedAt = DateTime.UtcNow;
        }

        public void Deactivate()
        {
            if (!IsActive)
                throw new DomainException("Event is already inactive");

            IsActive = false;
        }

        public void Reactivate()
        {
            if (IsActive)
                throw new DomainException("Event is already active");

            IsActive = true;
        }

        private void ValidateCompletion(List<Winner> winners, PrizePool prizes)
        {
            if (!IsActive)
                throw new DomainException("Cannot complete inactive event");

            if (IsCompleted)
                throw new DomainException("Event is already completed");

            if (winners == null || !winners.Any())
                throw new DomainException("At least one winner required");

            if (winners.Count > prizes.Tiers.Count)
                throw new DomainException("More winners than available prizes");

            // Validate all winner ranks match available prize tiers
            var availableRanks = prizes.Tiers.Select(t => t.Rank).ToList();
            var winnerRanks = winners.Select(w => w.Rank).ToList();

            var invalidRanks = winnerRanks.Except(availableRanks);
            if (invalidRanks.Any())
                throw new DomainException($"No prize tier for ranks: {string.Join(", ", invalidRanks)}");

            // Validate no duplicate winner ranks
            var duplicateRanks = winners.GroupBy(w => w.Rank).Where(g => g.Count() > 1).Select(g => g.Key);
            if (duplicateRanks.Any())
                throw new DomainException($"Duplicate winner ranks: {string.Join(", ", duplicateRanks)}");
        }
    }
}