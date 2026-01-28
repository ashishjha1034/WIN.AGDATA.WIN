using AutoMapper;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.APPLICATION.Mappers;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<Product, ProductDto>()
            .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.Name))
            .ForMember(dest => dest.StockLevel, opt => opt.MapFrom(src => src.Inventory!.QuantityAvailable))
            .ForMember(dest => dest.PointsCost, opt => opt.MapFrom(src => src.CurrentPricing))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(src => src.CreatedAt));

        CreateMap<ProductCategory, ProductCategoryDto>();
    }
}