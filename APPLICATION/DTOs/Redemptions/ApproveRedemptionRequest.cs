namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;

public record ApproveRedemptionRequest(Guid ApprovedBy, string? Notes = null);
