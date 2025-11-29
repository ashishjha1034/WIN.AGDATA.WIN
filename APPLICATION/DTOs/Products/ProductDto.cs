namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

public record ProductDto(
    Guid Id,
    string Name,
    string Description,
    string Category,
    string? ImageUrl,
    int PointsCost,
    int QuantityAvailable,
    bool IsActive);