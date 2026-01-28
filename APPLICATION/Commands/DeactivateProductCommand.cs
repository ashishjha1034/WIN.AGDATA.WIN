using MediatR;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Products;

public record DeactivateProductCommand(Guid ProductId) : IRequest;