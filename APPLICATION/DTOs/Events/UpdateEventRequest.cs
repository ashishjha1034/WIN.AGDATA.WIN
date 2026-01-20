using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

/// <summary>
/// Request DTO for updating an event.
/// Only events in Draft (Created) status can be updated.
/// </summary>
public class UpdateEventRequest
{
    [Required(ErrorMessage = "Event name is required")]
    public string Name { get; set; } = null!;

    [Required(ErrorMessage = "Description is required")]
    public string Description { get; set; } = null!;

    [Required(ErrorMessage = "Event date is required")]
    public DateTime EventDate { get; set; }

    /// <summary>
    /// Registration deadline (UTC). Registration is allowed until this date/time (inclusive).
    /// Required for MVP.
    /// </summary>
    [Required(ErrorMessage = "RegistrationEndDateUtc is required. Registration deadline must be specified.")]
    public DateTime RegistrationEndDateUtc { get; set; }

    public string? Location { get; set; }

    public int? MaxParticipants { get; set; }

    public string? BannerImageUrl { get; set; }

    public int? TotalPointsPool { get; set; }
}
