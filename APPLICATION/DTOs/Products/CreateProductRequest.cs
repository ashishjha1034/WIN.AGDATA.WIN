// WIN.AGDATA.WIN.Application/DTOs/CreateProductRequest.cs
namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Products
{
    public class CreateProductRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int RequiredPoints { get; set; }
        public int StockQuantity { get; set; }
    }
}
