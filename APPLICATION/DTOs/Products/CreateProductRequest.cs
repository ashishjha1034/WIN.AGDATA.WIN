namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

public record CreateProductRequest(
    string Name,
    string? Description,
    Guid CategoryId,
    int PointsCost,
    string? ImageUrl,
    int? InitialStock);