using System.Reflection;

namespace WIN_AGDATA_WIN.Domain.Entities.Events;

public class Event
{
    [Required]
    [StringLength(20, MinimumLength = 3)]
    public string EventId { get; }

    public WIN.AGDATA.WIN.Domain.Entities.Events.EventInfo Info { get; }

    public List<EventPrizeTier> Prizes { get; private set; }

    public EventStatus Status { get; }

    public Event(string eventId, string name, string description, DateTime eventDate, List<EventPrizeTier> prizeTiers)
    {
        EventId = ValidateAndNormalizeEventId(eventId);
        Info = new WIN.AGDATA.WIN.Domain.Entities.Events.EventInfo(name, description, eventDate);
        Prizes = ValidateAndOrderPrizes(prizeTiers);
        Status = new EventStatus();
    }

    public void AddPrizeTier(EventPrizeTier tier)
    {
        if (Prizes.Any(p => p.Rank == tier.Rank))
            throw new DomainException($"Prize tier for rank {tier.Rank} already exists");

        Prizes.Add(tier);
        Prizes = Prizes.OrderBy(p => p.Rank).ToList();
        ValidateSequentialRanks();
    }

    public void UpdatePrizeTier(int rank, int newPoints, string newDescription = "")
    {
        var existingTier = Prizes.FirstOrDefault(p => p.Rank == rank);
        if (existingTier == null)
            throw new DomainException($"No prize tier found for rank {rank}");

        Prizes.Remove(existingTier);
        Prizes.Add(new EventPrizeTier(rank, newPoints, newDescription));
        Prizes = Prizes.OrderBy(p => p.Rank).ToList();
    }

    public void RemovePrizeTier(int rank)
    {
        var removed = Prizes.RemoveAll(p => p.Rank == rank);
        if (removed == 0)
            throw new DomainException($"No prize tier found for rank {rank}");

        ValidateSequentialRanks();
    }

    public int? GetPointsForRank(int rank) => Prizes.FirstOrDefault(p => p.Rank == rank)?.Points;

    public void CompleteEvent(List<EventWinner> winners)
    {
        ValidateWinnersAgainstPrizes(winners);
        Status.Complete(winners);
    }

    public bool CanAllocatePoints() => Status.IsActive && Info.IsRecent;

    private static string ValidateAndNormalizeEventId(string eventId)
    {
        if (string.IsNullOrWhiteSpace(eventId))
            throw new DomainException("Event ID is required");

        var normalized = eventId.Trim().ToUpperInvariant();
        if (normalized.Length < 3 || normalized.Length > 20)
            throw new DomainException("Event ID must be between 3 and 20 characters");

        return normalized;
    }

    private static List<EventPrizeTier> ValidateAndOrderPrizes(List<EventPrizeTier> prizes)
    {
        if (prizes == null || !prizes.Any())
            throw new DomainException("At least one prize tier is required");

        if (prizes.Count > 5)
            throw new DomainException("Maximum 5 prize tiers allowed");

        var orderedPrizes = prizes.OrderBy(p => p.Rank).ToList();
        ValidateSequentialRanks(orderedPrizes);

        return orderedPrizes;
    }

    private void ValidateSequentialRanks()
    {
        ValidateSequentialRanks(Prizes);
    }

    private static void ValidateSequentialRanks(List<EventPrizeTier> prizes)
    {
        var ranks = prizes.Select(p => p.Rank).OrderBy(r => r).ToList();
        for (int i = 0; i < ranks.Count; i++)
        {
            if (ranks[i] != i + 1)
                throw new DomainException("Prize ranks must be sequential starting from 1");
        }
    }

    private void ValidateWinnersAgainstPrizes(List<EventWinner> winners)
    {
        if (winners.Count > Prizes.Count)
            throw new DomainException("More winners than available prizes");

        var availableRanks = Prizes.Select(p => p.Rank).ToHashSet();
        var winnerRanks = winners.Select(w => w.Rank).ToList();

        var invalidRanks = winnerRanks.Where(r => !availableRanks.Contains(r));
        if (invalidRanks.Any())
            throw new DomainException($"No prize tier for ranks: {string.Join(", ", invalidRanks)}");

        var duplicateRanks = winnerRanks.GroupBy(r => r).Where(g => g.Count() > 1).Select(g => g.Key);
        if (duplicateRanks.Any())
            throw new DomainException($"Duplicate winner ranks: {string.Join(", ", duplicateRanks)}");
    }

    public override bool Equals(object? obj) => obj is Event eventObj && EventId == eventObj.EventId;
    public override int GetHashCode() => EventId.GetHashCode();
}
