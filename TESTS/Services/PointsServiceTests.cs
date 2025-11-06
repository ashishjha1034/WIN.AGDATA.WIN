using System;
using System.Collections.Generic;
using FluentAssertions;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using WIN.AGDATA.WIN.Application.Services;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Exceptions;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Services;

public class PointsServiceTests
{
    private readonly Mock<IUserRepository> _userRepo = new();
    private readonly Mock<ITransactionRepository> _txRepo = new();
    private readonly PointsService _service;

    public PointsServiceTests()
    {
        var logger = new NullLogger<PointsService>();
        _service = new PointsService(_userRepo.Object, _txRepo.Object, new NullLogger<PointsService>());
    }

    [Fact]
    public void GetUserPointsBalance_UserNotFound_ThrowsDomainException()
    {
        _userRepo.Setup(r => r.GetByEmployeeId(It.IsAny<string>())).Returns((User?)null);

        Action act = () => _service.GetUserPointsBalance("EMP001");

        act.Should().Throw<DomainException>().WithMessage("User not found: EMP001");
    }

    [Fact]
    public void AddPoints_UserExists_AddsTransactionAndUpdatesUserPoints()
    {
        var user = new User("EMP001", "e@x.com", "First", "Last");
        _userRepo.Setup(r => r.GetByEmployeeId("EMP001")).Returns(user);

        _service.AddPoints("EMP001", 100, "test reason");

        user.Points.CurrentBalance.Should().Be(100);
        _txRepo.Verify(t => t.Add(It.Is<PointsTransaction>(pt => pt.EmployeeId == "EMP001" && pt.Points == 100 && pt.Type == PointsTransactionType.Earning)), Times.Once);
        _userRepo.Verify(u => u.Update(user), Times.Once);
    }

    [Fact]
    public void SpendPoints_UserInsufficient_ThrowsDomainException()
    {
        var user = new User("EMP002", "e2@x.com", "F", "L");
        _userRepo.Setup(r => r.GetByEmployeeId("EMP002")).Returns(user);

        Action act = () => _service.SpendPoints("EMP002", 50, "buy");

        act.Should().Throw<DomainException>().WithMessage("*Insufficient points*");
    }
}
