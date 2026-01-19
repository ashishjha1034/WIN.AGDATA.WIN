namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

public class ProductDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public Guid CategoryId { get; set; }
    public string CategoryName { get; set; } = null!;
    public int PointsCost { get; set; }
    public string? ImageUrl { get; set; }
    public int StockLevel { get; set; }
    public bool IsActive { get; set; }
}