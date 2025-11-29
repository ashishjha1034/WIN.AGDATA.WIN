using MediatR;

using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

namespace WIN.AGDATA.WIN.Application.Commands;

public class CreateProductCommand : IRequest<ProductDto>
{
    public CreateProductRequest Request { get; }
    public string CreatedBy { get; }
    public CreateProductCommand(CreateProductRequest request, string createdBy) { Request = request; CreatedBy = createdBy; }
}
