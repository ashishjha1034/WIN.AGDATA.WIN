// APPLICATION/DTOs/RedemptionDto.cs
namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;

public class RedemptionDto
{
    public Guid Id { get; set; }
    public string EmployeeId { get; set; } = null!;
    public Guid ProductId { get; set; }
    public int PointsCost { get; set; }
    public string Status { get; set; } = null!; 
    public DateTime RequestedAt { get; set; }
}
