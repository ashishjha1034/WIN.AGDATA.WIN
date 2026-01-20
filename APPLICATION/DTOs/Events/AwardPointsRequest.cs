using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

/// <summary>
/// Request to award points to a single participant.
/// </summary>
/// <param name="Points">Points to award (must be positive)</param>
/// <param name="Rank">Optional rank position (1st, 2nd, etc.)</param>
public record AwardPointsRequest(
    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Points must be positive")]
    int Points,
    int? Rank = null
);
