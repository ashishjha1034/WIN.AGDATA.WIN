using System;
using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using WIN.AGDATA.WIN.Application.Services;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Products;
using WIN.AGDATA.WIN.Domain.Exceptions;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Services;

public class ProductServiceTests
{
    private readonly Mock<IProductRepository> _productRepo = new();
    private readonly ProductService _service;

    public ProductServiceTests()
    {
        _service = new ProductService(_productRepo.Object, new NullLogger<ProductService>());
    }

    [Fact]
    public void CreateProduct_Valid_CreatesAndPersists()
    {
        Product? saved = null;
        _productRepo.Setup(r => r.Add(It.IsAny<Product>())).Callback<Product>(p => saved = p);

        var product = _service.CreateProduct("Badge", "Cool badge", 100, 10);

        saved.Should().NotBeNull();
        product.Should().Be(saved);
        product.Identity.Name.Should().Be("Badge");
        _productRepo.Verify(r => r.Add(saved!), Times.Once);
    }

    [Fact]
    public void UpdateProductDetails_ProductNotFound_ThrowsDomainException()
    {
        _productRepo.Setup(r => r.GetById(It.IsAny<Guid>())).Returns((Product?)null);

        Action act = () => _service.UpdateProductDetails(Guid.NewGuid(), "n", "d");

        act.Should().Throw<DomainException>().WithMessage("*Product not found*");
    }
}
