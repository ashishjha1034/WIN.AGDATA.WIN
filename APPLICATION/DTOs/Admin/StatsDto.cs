namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Admin;

public record StatsDto(
    int TotalUsers,
    int TotalPointsEarned,
    int TotalPointsRedeemed,
    int PendingRedemptions
);
