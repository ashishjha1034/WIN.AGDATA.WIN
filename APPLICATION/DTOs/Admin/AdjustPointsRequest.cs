namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Admin;

public record AdjustPointsRequest(
    Guid UserId,
    int Amount,
    string Reason
);
