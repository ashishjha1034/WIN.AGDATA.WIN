// WIN.AGDATA.WIN.Application/DTOs/AddPointsRequest.cs
namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Points
{
    public class AddPointsRequest
    {
        public string EmployeeId { get; set; } = string.Empty;
        public int Points { get; set; }
        public string Reason { get; set; } = string.Empty;
    }
}
