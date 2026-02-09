namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Transactions;

public class TransactionDto
{
    public Guid Id { get; set; }
    public decimal Amount { get; set; }
    public string Type { get; set; } = string.Empty;
    public DateTime Timestamp { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Source { get; set; } = string.Empty;
    public Guid? SourceId { get; set; }
    public decimal BalanceAfter { get; set; }
    public Guid? ProcessedBy { get; set; }
}
