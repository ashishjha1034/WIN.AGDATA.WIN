namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;

public class RedemptionListResponseDto
{
    public List<RedemptionDto> Items { get; set; } = new();
    public RedemptionStatusCounts Counts { get; set; } = new();
}
