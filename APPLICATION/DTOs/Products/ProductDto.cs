namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

public record ProductDto(
    Guid Id,
    string Name,
    string? Description,
    Guid CategoryId,
    string CategoryName,
    int PointsCost,
    string? ImageUrl,
    int StockLevel,
    bool IsActive);