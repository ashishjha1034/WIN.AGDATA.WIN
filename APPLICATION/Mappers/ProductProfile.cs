// APPLICATION/Mapping/ProductProfile.cs
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using AutoMapper;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.Application.Mapping
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<CreateProductRequest, Product>()
                .ConstructUsing((src, ctx) => new Product(src.Name, src.Description, src.RequiredPoints, src.StockQuantity, "SYSTEM"));

            CreateMap<Product, ProductDto>()
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Identity.Name))
                .ForMember(d => d.Description, o => o.MapFrom(s => s.Identity.Description))
                .ForMember(d => d.RequiredPoints, o => o.MapFrom(s => s.Pricing.RequiredPoints))
                .ForMember(d => d.StockQuantity, o => o.MapFrom(s => s.Inventory.StockQuantity))
                .ForMember(d => d.CreatedBy, o => o.MapFrom(s => s.CreatedBy))
                .ForMember(d => d.CreatedAt, o => o.MapFrom(s => s.CreatedAt));
        }
    }
}
