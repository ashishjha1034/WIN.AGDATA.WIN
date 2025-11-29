using AutoMapper;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.APPLICATION.Mappers;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<Product, ProductDto>()
            .ForMember(d => d.Category, o => o.MapFrom(s => s.Category.Name))
            .ForMember(d => d.PointsCost, o => o.MapFrom(s => s.CurrentPricing.PointsCost))
            .ForMember(d => d.QuantityAvailable, o => o.MapFrom(s => s.Inventory.QuantityAvailable));

        CreateMap<CreateProductRequest, Product>()
            .ForMember(p => p.CategoryId, o => o.MapFrom(r => r.CategoryId));
    }
}