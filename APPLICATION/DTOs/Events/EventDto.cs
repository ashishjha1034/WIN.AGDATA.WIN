namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

public class EventDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public DateTime EventDate { get; set; }
    public string Description { get; set; } = null!;
    public string Status { get; set; } = null!;
    public int ParticipantCount { get; set; }
    public int? TotalPointsPool { get; set; }
    public int DistributedPoints { get; set; }
    public string? Location { get; set; }
    public int? MaxParticipants { get; set; }
    public DateTime? RegistrationEndDate { get; set; }
    /// <summary>
    /// Registration end date in UTC. This is the same value as RegistrationEndDate.
    /// Included for frontend compatibility.
    /// </summary>
    public DateTime? RegistrationEndDateUtc { get; set; }
    public string? BannerImageUrl { get; set; }
    /// <summary>
    /// Percentage of points awarded from the total pool.
    /// Calculated as: (DistributedPoints / TotalPointsPool) * 100, rounded to 2 decimals.
    /// Returns 0% if pool is unlimited (TotalPointsPool is null) or 0.
    /// </summary>
    public decimal AwardedPercent { get; set; } = 0m;
}

