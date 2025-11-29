// WIN.AGDATA.WIN.Application/DTOs/SpendPointsRequest.cs
namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Points
{
    public class SpendPointsRequest
    {
        public string EmployeeId { get; set; } = string.Empty;
        public int Points { get; set; }
        public string Reason { get; set; } = string.Empty;
    }
}
