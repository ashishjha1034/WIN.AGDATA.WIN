using WIN.AGDATA.WIN.Domain.Enums;

namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;

public class RedemptionDetailDto
{
    public Guid Id { get; set; }
    
    // Redemption info
    public int PointsSpent { get; set; }
    public int Quantity { get; set; }
    public RedemptionStatus Status { get; set; }
    public string? AdminNotes { get; set; }
    public DateTime CreatedAt { get; set; }
    
    // Approval/Delivery info
    public Guid? ApprovedBy { get; set; }
    public DateTime? ApprovedAt { get; set; }
    public Guid? DeliveredBy { get; set; }
    public DateTime? DeliveredAt { get; set; }
    
    // User snapshot
    public Guid UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string UserEmail { get; set; } = string.Empty;
    public string UserAvatarUrl { get; set; } = string.Empty;
    public int UserCurrentBalance { get; set; }
    public int UserTotalEarned { get; set; }
    public int UserTotalRedeemed { get; set; }
    
    // Product snapshot
    public Guid ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public string ProductDescription { get; set; } = string.Empty;
    public string ProductCategory { get; set; } = string.Empty;
    public string ProductImageUrl { get; set; } = string.Empty;
    public int ProductPointsPerUnit { get; set; }
    public int ProductTotalPoints { get; set; }
}
