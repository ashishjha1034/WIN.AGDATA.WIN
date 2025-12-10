using MediatR;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Products;

public record CreateProductCommand(
    string Name,
    string? Description,
    Guid CategoryId,
    int PointsCost,
    string? ImageUrl,
    int InitialStock) : IRequest<ProductDto>;