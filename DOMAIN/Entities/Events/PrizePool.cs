using WIN.AGDATA.WIN.Domain.Exceptions;
using System.Linq;

namespace WIN.AGDATA.WIN.Domain.Entities.Events
{
    public class PrizePool
    {
        private List<PrizeTier> _tiers = new();
        public IReadOnlyList<PrizeTier> Tiers => _tiers.AsReadOnly();

        public PrizePool(List<PrizeTier> tiers)
        {
            ValidateTiers(tiers);
            _tiers = tiers.OrderBy(t => t.Rank).ToList();
        }

        public void AddTier(PrizeTier tier)
        {
            if (_tiers.Any(t => t.Rank == tier.Rank))
                throw new DomainException($"Prize tier for rank {tier.Rank} already exists");

            _tiers.Add(tier);
            _tiers = _tiers.OrderBy(t => t.Rank).ToList();
            ValidateSequentialRanks();
        }

        public void RemoveTier(int rank)
        {
            _tiers.RemoveAll(t => t.Rank == rank);
            ValidateSequentialRanks();
        }

        public int? GetPoints(int rank) => _tiers.FirstOrDefault(t => t.Rank == rank)?.Points;

        private void ValidateTiers(List<PrizeTier> tiers)
        {
            if (tiers == null || !tiers.Any())
                throw new DomainException("At least one prize tier required");

            if (tiers.Count > 5)
                throw new DomainException("Maximum 5 prize tiers allowed");

            ValidateSequentialRanks(tiers);
        }

        private void ValidateSequentialRanks(List<PrizeTier> tiers = null)
        {
            var targetTiers = tiers ?? _tiers;
            var orderedRanks = targetTiers.Select(t => t.Rank).OrderBy(r => r).ToList();

            for (int i = 0; i < orderedRanks.Count; i++)
            {
                if (orderedRanks[i] != i + 1)
                    throw new DomainException("Prize ranks must be sequential starting from 1");
            }
        }
    }
}