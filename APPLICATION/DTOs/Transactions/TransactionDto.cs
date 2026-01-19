namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Transactions;

public class TransactionDto
{
    public Guid Id { get; set; }
    public int Amount { get; set; }
    public string Type { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public string Description { get; set; } = string.Empty;
}
