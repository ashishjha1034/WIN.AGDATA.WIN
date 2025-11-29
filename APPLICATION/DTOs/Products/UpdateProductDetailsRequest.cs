namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

public record UpdateProductDetailsRequest(
    string Name,
    string Description,
    Guid CategoryId,
    string? ImageUrl = null);