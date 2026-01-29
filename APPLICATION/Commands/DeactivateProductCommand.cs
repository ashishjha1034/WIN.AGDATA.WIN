using MediatR;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Products;

/// <summary>
/// Command to deactivate a product. Returns a result indicating success or warnings.
/// </summary>
/// <param name="ProductId">The ID of the product to deactivate</param>
/// <param name="Force">If true, bypasses soft warnings (stock > 0, recent demand) but not hard blocks</param>
public record DeactivateProductCommand(Guid ProductId, bool Force = false) : IRequest<DeactivateProductResult>;