using System;
using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.Domain.Entities.Events;

public class PrizeTier
{
    [Key]
    public int Id { get; private set; }

    [Required]
    [Range(1, 5)]
    public int Rank { get; private set; }

    [Required]
    [Range(1, 10000)]
    public int Points { get; private set; }

    [StringLength(255)]
    public string? Description { get; set; }

    private PrizeTier() { }

    public PrizeTier(int rank, int points, string? description = null)
    {
        ValidationGuards.ValidateRank(rank);
        ValidationGuards.ValidatePoints(points);

        Rank = rank;
        Points = points;
        Description = description;
    }

    public override bool Equals(object? obj)
    {
        if (obj is not PrizeTier other)
            return false;

        return Rank == other.Rank;
    }

    public override int GetHashCode() => Rank.GetHashCode();

    public override string? ToString() => $"Rank {Rank}: {Points} points";
}
