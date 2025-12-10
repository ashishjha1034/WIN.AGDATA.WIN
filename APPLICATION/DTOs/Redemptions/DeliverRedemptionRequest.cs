namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;

public record DeliverRedemptionRequest(Guid DeliveredBy, string? Notes = null);
