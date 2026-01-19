namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

public record UpdateProductDetailsRequest(
    string? Name = null,
    string? Description = null,
    Guid? CategoryId = null,
    int? PointsCost = null,
    string? ImageUrl = null);