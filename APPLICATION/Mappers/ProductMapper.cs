// APPLICATION/Mappers/ProductMapper.cs
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.Application.Mappers;

public static class ProductMapper
{
    public static ProductDto ToDto(Product p)
    {
        if (p == null) return null!;

        return new ProductDto
        {
            Id = p.Id,
            Name = p.Identity.Name,
            Description = p.Identity.Description,
            RequiredPoints = p.Pricing.RequiredPoints,
            StockQuantity = p.Inventory.StockQuantity,
            IsActive = p.IsActive,
            CreatedAt = p.CreatedAt,
            CreatedBy = p.CreatedBy
        };
    }

    public static Product ToEntity(CreateProductRequest req, string createdBy = "SYSTEM")
    {
        return new Product(req.Name, req.Description, req.RequiredPoints, req.StockQuantity, createdBy);
    }

    public static void PatchFromDto(Product product, CreateProductRequest dto, string modifiedBy = "SYSTEM")
    {
        if (product == null) throw new ArgumentNullException(nameof(product));
        product.UpdateDetails(dto.Name, dto.Description, modifiedBy);
        product.UpdatePoints(dto.RequiredPoints, modifiedBy);
        product.UpdateStock(dto.StockQuantity, modifiedBy);
    }
}
