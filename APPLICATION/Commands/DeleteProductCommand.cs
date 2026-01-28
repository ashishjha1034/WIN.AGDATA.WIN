using MediatR;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Products;

public record DeleteProductCommand(Guid ProductId) : IRequest;