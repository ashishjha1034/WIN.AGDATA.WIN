using MediatR;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Products;

public record ActivateProductCommand(Guid ProductId) : IRequest;