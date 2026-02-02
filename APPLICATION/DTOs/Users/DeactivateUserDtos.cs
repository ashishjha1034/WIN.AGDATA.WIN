namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

/// <summary>
/// Result of a user deactivation attempt.
/// </summary>
public class DeactivateUserResult
{
    public bool Success { get; init; }
    public bool HasWarnings { get; init; }
    public bool IsBlocked { get; init; }
    public DeactivateUserWarnings? Warnings { get; init; }
    public DeactivateUserBlocked? Blocked { get; init; }

    public static DeactivateUserResult Succeeded() => new() { Success = true };

    public static DeactivateUserResult WithWarnings(DeactivateUserWarnings warnings) => new()
    {
        Success = false,
        HasWarnings = true,
        Warnings = warnings
    };

    public static DeactivateUserResult WithBlock(DeactivateUserBlocked blocked) => new()
    {
        Success = false,
        IsBlocked = true,
        Blocked = blocked
    };
}

/// <summary>
/// Soft warnings that require admin confirmation before user deactivation.
/// Returned with HTTP 409 Conflict.
/// </summary>
public class DeactivateUserWarnings
{
    public string Code { get; init; } = "DEACTIVATE_USER_WARNINGS";
    
    /// <summary>
    /// User's current points balance (warning if > 0)
    /// </summary>
    public decimal PointsBalance { get; init; }
    
    /// <summary>
    /// Count of completed events user participated in
    /// </summary>
    public int CompletedEventsCount { get; init; }
    
    /// <summary>
    /// Count of completed redemptions (fulfilled/delivered)
    /// </summary>
    public int CompletedRedemptionsCount { get; init; }
    
    /// <summary>
    /// User's last activity timestamp (based on recent transactions)
    /// </summary>
    public DateTime? LastActivityDate { get; init; }
    
    /// <summary>
    /// Number of days since last activity
    /// </summary>
    public int? DaysSinceLastActivity { get; init; }
    
    /// <summary>
    /// Human-readable message for the UI
    /// </summary>
    public string Message { get; init; } = "Deactivation has warnings. To proceed, resubmit with force=true.";
}

/// <summary>
/// Hard block preventing user deactivation.
/// Returned with HTTP 422 Unprocessable Entity.
/// Using record type to support 'with' expressions for immutable updates.
/// </summary>
public record DeactivateUserBlocked
{
    public string Code { get; init; } = "DEACTIVATE_USER_BLOCKED";
    
    /// <summary>
    /// Count of pending redemptions (cannot deactivate)
    /// </summary>
    public int PendingRedemptionsCount { get; init; }
    
    /// <summary>
    /// Count of approved (ready for pickup) redemptions (cannot deactivate)
    /// </summary>
    public int ApprovedRedemptionsCount { get; init; }
    
    /// <summary>
    /// Count of active event registrations (Draft/Active events) (cannot deactivate)
    /// </summary>
    public int ActiveEventRegistrationsCount { get; init; }
    
    /// <summary>
    /// True if target user is an Admin (admin cannot deactivate another admin)
    /// </summary>
    public bool TargetIsAdmin { get; init; }
    
    /// <summary>
    /// True if admin is trying to deactivate themselves
    /// </summary>
    public bool SelfDeactivation { get; init; }
    
    /// <summary>
    /// List of specific reasons for the block
    /// </summary>
    public List<string> Reasons { get; init; } = new();
    
    /// <summary>
    /// Human-readable message for the UI
    /// </summary>
    public string Message { get; init; } = "Cannot deactivate user due to blocking conditions.";
}

/// <summary>
/// Request body for deactivating a user.
/// </summary>
public class DeactivateUserRequest
{
    /// <summary>
    /// If true, bypasses soft warnings (points balance > 0, recent activity) but not hard blocks.
    /// </summary>
    public bool Force { get; set; } = false;
}
