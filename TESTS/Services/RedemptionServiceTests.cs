using System;
using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using WIN.AGDATA.WIN.Application.Services;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Products;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Exceptions;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Services;

public class RedemptionServiceTests
{
    private readonly Mock<IUserRepository> _userRepo = new();
    private readonly Mock<IProductRepository> _productRepo = new();
    private readonly Mock<IRedemptionRepository> _redRepo = new();
    private readonly Mock<IPointsService> _pointsService = new();
    private readonly RedemptionService _service;

    public RedemptionServiceTests()
    {
        _service = new RedemptionService(_userRepo.Object, _productRepo.Object, _redRepo.Object, _pointsService.Object, new NullLogger<RedemptionService>());
    }

    [Fact]
    public void RequestRedemption_UserNotFound_Throws()
    {
        _userRepo.Setup(r => r.GetByEmployeeId("EMP1")).Returns((User?)null);

        Action act = () => _service.RequestRedemption("EMP1", Guid.NewGuid());

        act.Should().Throw<DomainException>().WithMessage("*User not found*");
    }

    [Fact]
    public void RequestRedemption_Success_CreatesRedemption()
    {
        var user = new User("EMP2", "u@x.com", "F", "L");
        _userRepo.Setup(r => r.GetByEmployeeId("EMP2")).Returns(user);

        var product = new Product("Prod", "desc more than 10", 50, 5);
        _productRepo.Setup(p => p.GetById(It.IsAny<Guid>())).Returns(product);

        Redemption? saved = null;
        _redRepo.Setup(r => r.Add(It.IsAny<Redemption>())).Callback<Redemption>(r => saved = r);

        var red = _service.RequestRedemption("EMP2", Guid.NewGuid());

        saved.Should().NotBeNull();
        red.Id.Should().Be(saved!.Id);
        _redRepo.Verify(r => r.Add(saved), Times.Once);
    }

    [Fact]
    public void ApproveRedemption_ReducesStockAndSpendsPoints()
    {
        var product = new Product("P", "description more than 10", 20, 2);
        var redemption = new Redemption("EMP3", product.Id, product.Pricing.RequiredPoints);

        _redRepo.Setup(r => r.GetById(redemption.Id)).Returns(redemption);
        _productRepo.Setup(p => p.GetById(product.Id)).Returns(product);

        _service.ApproveRedemption(redemption.Id);

        // points service SpendPoints should be called
        _pointsService.Verify(ps => ps.SpendPoints("EMP3", product.Pricing.RequiredPoints, It.IsAny<string>(), redemption.Id), Times.Once);
        // product stock decreased
        product.Inventory.StockQuantity.Should().Be(1);
        _productRepo.Verify(p => p.Update(product), Times.Once);
        _redRepo.Verify(r => r.Update(redemption), Times.Once);
    }
}
