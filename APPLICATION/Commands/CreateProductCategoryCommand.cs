using MediatR;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Products;

public record CreateProductCategoryCommand(
    string Name,
    string? Description = null,
    int DisplayOrder = 0
) : IRequest<ProductCategoryDto>;