namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;

public record RedemptionDto(
    Guid Id,
    Guid ProductId,
    string ProductName,
    int PointsSpent,
    int Quantity,
    string Status,
    DateTime RequestedAt,
    DateTime? ApprovedAt,
    DateTime? DeliveredAt,
    string? RejectionReason);