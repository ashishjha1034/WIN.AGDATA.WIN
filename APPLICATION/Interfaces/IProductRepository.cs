using WIN.AGDATA.WIN.Domain.Entities.Products;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public interface IProductRepository
{
    void Add(Product product);
    void Update(Product product);
    void Delete(Guid productId);

    Product? GetById(Guid productId);
    Product? GetByName(string name);
    List<Product> GetAll();
    List<Product> GetAvailable();
    List<Product> GetByPointsRange(int minPoints, int maxPoints);

    bool ExistsById(Guid productId);
}
