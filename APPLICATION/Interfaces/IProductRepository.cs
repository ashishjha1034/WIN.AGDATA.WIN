using System;
using System.Collections.Generic;

namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IProductRepository
{
    Product? GetById(Guid productId);
    List<Product> GetAll();
    void Add(Product product);
    void Update(Product product);
    void Delete(Guid productId);
}
