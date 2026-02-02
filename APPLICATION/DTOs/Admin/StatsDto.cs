namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Admin;

public record StatsDto(
    int TotalUsers,
    decimal TotalPointsEarned,
    decimal TotalPointsRedeemed,
    int PendingRedemptions
);
