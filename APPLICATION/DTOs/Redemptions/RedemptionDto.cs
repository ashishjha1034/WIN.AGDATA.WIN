using WIN.AGDATA.WIN.Domain.Enums;

namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;

public record RedemptionDto(
    Guid Id,
    Guid UserId,
    string UserName,
    Guid ProductId,
    string ProductName,
    int PointsSpent,
    int Quantity,
    RedemptionStatus Status,
    string? AdminNotes,
    DateTime CreatedAt);