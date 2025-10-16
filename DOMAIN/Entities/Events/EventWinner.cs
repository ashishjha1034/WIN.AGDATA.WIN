namespace WIN.AGDATA.WIN.Domain.Entities.Events;

public class EventWinner
{
    [Required]
    public string EmployeeId { get; }

    [Range(1, 5)]
    public int Rank { get; }

    public DateTime WonAt { get; }

    public EventWinner(string employeeId, int rank)
    {
        EmployeeId = ValidateAndNormalizeEmployeeId(employeeId);
        Rank = ValidateRank(rank);
        WonAt = DateTime.UtcNow;
    }

    private static string ValidateAndNormalizeEmployeeId(string employeeId)
    {
        if (string.IsNullOrWhiteSpace(employeeId))
            throw new DomainException("Employee ID is required");

        return employeeId.Trim().ToUpperInvariant();
    }

    private static int ValidateRank(int rank)
    {
        if (rank < 1 || rank > 5)
            throw new DomainException("Winner rank must be between 1 and 5");

        return rank;
    }

    public override bool Equals(object? obj)
        => obj is EventWinner winner && EmployeeId == winner.EmployeeId && Rank == winner.Rank;

    public override int GetHashCode() => HashCode.Combine(EmployeeId, Rank);
}
