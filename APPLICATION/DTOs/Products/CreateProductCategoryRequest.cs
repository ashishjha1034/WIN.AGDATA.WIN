namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

public class CreateProductCategoryRequest
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public int DisplayOrder { get; set; } = 0;
}