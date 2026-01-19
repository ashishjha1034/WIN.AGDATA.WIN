namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

public class CreateProductRequest
{
    public string Name { get; set; } = null!;
    public string? Description { get; set; }
    public Guid CategoryId { get; set; }
    public int PointsCost { get; set; }
    public string? ImageUrl { get; set; }
    public int? InitialStock { get; set; }
}
