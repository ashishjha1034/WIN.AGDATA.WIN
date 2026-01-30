using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

/// <summary>
/// Distribution mode for bulk awards.
/// </summary>
public enum DistributionMode
{
    /// <summary>
    /// Admin specifies exact points per participant (legacy behavior).
    /// </summary>
    Manual,
    
    /// <summary>
    /// Split the entire remaining pool equally across selected participants.
    /// Deterministic remainder handling: first N participants get floor+1, rest get floor.
    /// </summary>
    EqualSplit,
    
    /// <summary>
    /// Admin specifies points for top N-1 ranks.
    /// The last rank auto-receives: RemainingPool - sum(previous ranks).
    /// </summary>
    RankBased
}

/// <summary>
/// Request to bulk award points to multiple participants.
/// All-or-nothing: if any participant is ineligible, the entire request fails.
/// </summary>
public record BulkAwardPointsRequest
{
    /// <summary>
    /// List of participant awards (required for Manual mode, optional for EqualSplit/RankBased).
    /// For EqualSplit/RankBased modes, this list specifies eligible participant IDs only.
    /// </summary>
    public IReadOnlyList<BulkAwardItem> Awards { get; init; } = new List<BulkAwardItem>();
    
    /// <summary>
    /// Distribution mode: Manual (default), EqualSplit, or RankBased.
    /// </summary>
    public DistributionMode Mode { get; init; } = DistributionMode.Manual;
    
    /// <summary>
    /// When true, consumes the entire remaining pool.
    /// Used with EqualSplit or RankBased modes.
    /// </summary>
    public bool ConsumeEntirePool { get; init; } = false;
    
    /// <summary>
    /// Points for each rank position (1st, 2nd, 3rd, etc.).
    /// Used only in RankBased mode. The last rank's points are auto-calculated.
    /// Example: [500, 300, 150] means Rank 1=500, Rank 2=300, Rank 3=150, Rank 4=auto.
    /// </summary>
    public IReadOnlyList<int>? RankPoints { get; init; }
}

/// <summary>
/// Individual participant award in a bulk request.
/// </summary>
/// <param name="ParticipantId">The participant's user ID</param>
/// <param name="Points">Points to award (must be positive)</param>
/// <param name="Rank">Optional rank position (1st, 2nd, etc.)</param>
public record BulkAwardItem(
    [Required]
    Guid ParticipantId,
    
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Points must be positive")]
    int Points,
    
    int? Rank = null
);

/// <summary>
/// Response from a bulk award operation.
/// </summary>
public record BulkAwardPointsResponse
{
    public bool Success { get; init; }
    public string Message { get; init; } = null!;
    public Guid EventId { get; init; }
    public int TotalPointsAwarded { get; init; }
    public int ParticipantsAwarded { get; init; }
    public int? RemainingPoolPoints { get; init; }
}
