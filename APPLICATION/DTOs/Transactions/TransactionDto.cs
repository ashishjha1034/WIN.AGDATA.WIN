namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Transactions;

public record TransactionDto(
    Guid Id,
    int Amount,
    string Type,
    DateTime Timestamp,
    string Description
);
