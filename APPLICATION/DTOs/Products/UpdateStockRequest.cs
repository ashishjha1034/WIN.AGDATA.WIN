namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

public record UpdateStockRequest(
    int Amount,
    string Operation = "adjust"); // "increase", "decrease", or "adjust"