namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

/// <summary>
/// Result of a product deactivation attempt.
/// </summary>
public class DeactivateProductResult
{
    public bool Success { get; init; }
    public bool HasWarnings { get; init; }
    public bool IsBlocked { get; init; }
    public DeactivateProductWarnings? Warnings { get; init; }
    public DeactivateProductBlocked? Blocked { get; init; }

    public static DeactivateProductResult Succeeded() => new() { Success = true };
    
    public static DeactivateProductResult WithWarnings(DeactivateProductWarnings warnings) => new()
    {
        Success = false,
        HasWarnings = true,
        Warnings = warnings
    };

    public static DeactivateProductResult WithBlock(DeactivateProductBlocked blocked) => new()
    {
        Success = false,
        IsBlocked = true,
        Blocked = blocked
    };
}

/// <summary>
/// Soft warnings that require admin confirmation before deactivation.
/// Returned with HTTP 409 Conflict.
/// </summary>
public class DeactivateProductWarnings
{
    public string Code { get; init; } = "DEACTIVATE_WARNINGS";
    public int Stock { get; init; }
    public int RecentRedemptions7d { get; init; }
    public int RecentUniqueUsers7d { get; init; }
    public int RecentRedemptions30d { get; init; }
    public int RecentUniqueUsers30d { get; init; }
    public DateTime? LastRedemptionDate { get; init; }
    public string Message { get; init; } = "Deactivation has warnings. To proceed, resubmit with force=true.";
}

/// <summary>
/// Hard block preventing deactivation due to active redemptions.
/// Returned with HTTP 400/422 Bad Request.
/// </summary>
public class DeactivateProductBlocked
{
    public string Code { get; init; } = "DEACTIVATE_BLOCKED";
    public int Pending { get; init; }
    public int Approved { get; init; }
    public string Message { get; init; } = "Cannot deactivate while redemptions are Pending/Approved.";
}

/// <summary>
/// Request body for deactivating a product.
/// </summary>
public class DeactivateProductRequest
{
    /// <summary>
    /// If true, bypasses soft warnings (stock > 0, recent demand) but not hard blocks.
    /// </summary>
    public bool Force { get; set; } = false;
}
