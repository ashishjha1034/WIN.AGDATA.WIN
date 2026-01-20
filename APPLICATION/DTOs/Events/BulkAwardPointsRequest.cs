using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

/// <summary>
/// Request to bulk award points to multiple participants.
/// All-or-nothing: if any participant is ineligible, the entire request fails.
/// </summary>
public record BulkAwardPointsRequest
{
    /// <summary>
    /// List of participant awards
    /// </summary>
    [Required]
    [MinLength(1, ErrorMessage = "At least one award is required")]
    public IReadOnlyList<BulkAwardItem> Awards { get; init; } = new List<BulkAwardItem>();
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
