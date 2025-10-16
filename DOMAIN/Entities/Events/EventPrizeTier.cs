using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Events
{
    public class EventPrizeTier
    {
        public int Rank { get; }  // 1 = 1st, 2 = 2nd, etc.
        public int Points { get; }
        public string Description { get; }

        public EventPrizeTier(int rank, int points, string description = "")
        {
            ValidateRank(rank);
            ValidatePoints(points);
            Rank = rank;
            Points = points;
            Description = string.IsNullOrWhiteSpace(description) ? $"Rank {rank} Prize" : description.Trim();
        }

        private void ValidateRank(int rank)
        {
            if (rank < 1 || rank > 5)
                throw new DomainException("Prize rank must be between 1 and 5");
        }


        private void ValidatePoints(int points)
        {
            if (points <= 0)
                throw new DomainException("Prize points must be positive");
            if (points > 10000)
                throw new DomainException("Prize points cannot exceed 10,000");
        }

        public override bool Equals(object obj)
        {
            return obj is EventPrizeTier tier && Rank == tier.Rank;
        }

        public override int GetHashCode() => Rank.GetHashCode();
    }
}