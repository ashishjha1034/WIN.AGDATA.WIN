using System;
using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Application.Services;
using WIN.AGDATA.WIN.Domain.Entities.Products;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Exceptions;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Services;

public class RedemptionServiceNegativeTests
{
    private readonly Mock<IUserRepository> _userRepo = new();
    private readonly Mock<IProductRepository> _productRepo = new();
    private readonly Mock<IRedemptionRepository> _redRepo = new();
    private readonly Mock<IPointsService> _pointsService = new();
    private readonly RedemptionService _service;

    public RedemptionServiceNegativeTests()
    {
        _service = new RedemptionService(
            _userRepo.Object,
            _productRepo.Object,
            _redRepo.Object,
            _pointsService.Object,
            new NullLogger<RedemptionService>());
    }

    [Fact]
    public void RequestRedemption_ProductOutOfStock_ThrowsDomainException()
    {
        // Arrange
        var user = new User("EMP10", "u@x.com", "F", "L");
        _userRepo.Setup(r => r.GetByEmployeeId("EMP10")).Returns(user);

        // product with zero stock
        var product = new Product("P", "description more than 10", 100, 0);
        _productRepo.Setup(p => p.GetById(It.IsAny<Guid>())).Returns(product);

        // Act
        Action act = () => _service.RequestRedemption("EMP10", Guid.NewGuid());

        // Assert
        act.Should().Throw<DomainException>().WithMessage("*Product is not available*");
    }

    [Fact]
    public void RejectRedemption_SetsStatusToRejectedAndSaves()
    {
        // Arrange
        var product = new Product("P2", "description more than 10", 20, 2);
        var redemption = new Redemption("EMP11", product.Id, product.Pricing.RequiredPoints);

        _redRepo.Setup(r => r.GetById(redemption.Id)).Returns(redemption);
        Redemption? updated = null;
        _redRepo.Setup(r => r.Update(It.IsAny<Redemption>())).Callback<Redemption>(r => updated = r);

        // Act
        _service.RejectRedemption(redemption.Id, "Invalid address");

        // Assert
        updated.Should().NotBeNull();
        updated!.Status.Value.Should().Be(StatusValue.Rejected);
        updated.Status.RejectionReason.Should().Be("Invalid address");
        _redRepo.Verify(r => r.Update(redemption), Times.Once);
    }
}
