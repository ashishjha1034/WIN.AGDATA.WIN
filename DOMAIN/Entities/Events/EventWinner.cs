using System;
using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.Domain.Entities.Events;


public class Winner
{
    [Required]
    [StringLength(20, MinimumLength = 3)]
    public string EmployeeId { get; private set; }

    [Required]
    [Range(1, 5)]
    public int Rank { get; private set; }

    [Required]
    public DateTime WonAt { get; private set; }

    private Winner() { }

    public Winner(string employeeId, int rank)
    {
        // Use ValidationGuards for consistent validation
        EmployeeId = ValidationGuards.ValidateAndNormalizeId(employeeId, "Employee ID");
        ValidationGuards.ValidateRank(rank);

        Rank = rank;
        WonAt = DateTime.UtcNow;
    }

    public override bool Equals(object? obj)
    {
        if (obj is not Winner other)
            return false;

        return EmployeeId == other.EmployeeId && Rank == other.Rank;
    }

    public override int GetHashCode() => HashCode.Combine(EmployeeId, Rank);

    public override string? ToString() => $"{EmployeeId} - Rank {Rank}";
}
