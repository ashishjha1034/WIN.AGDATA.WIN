using FluentAssertions;
using Microsoft.Extensions.Logging;
using Moq;
using WIN.AGDATA.WIN.Domain.Enums;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Application.Services;

public class UserServiceTests
{
    private readonly Mock<IUserRepository> _mockRepository;
    private readonly Mock<ILogger<UserService>> _mockLogger;
    private readonly UserService _userService;

    public UserServiceTests()
    {
        _mockRepository = new Mock<IUserRepository>();
        _mockLogger = new Mock<ILogger<UserService>>();
        _userService = new UserService(_mockRepository.Object, _mockLogger.Object);
    }

    [Fact]
    public void CreateUser_WithValidData_ShouldCreateSuccessfully()
    {
        _mockRepository.Setup(r => r.GetByEmployeeId("EMP001")).Returns((User?)null);
        _mockRepository.Setup(r => r.GetByEmail("john@company.com")).Returns((User?)null);

        var result = _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");

        result.Should().NotBeNull();
        result.Identity.EmployeeId.Should().Be("EMP001");
        _mockRepository.Verify(r => r.Add(It.IsAny<User>()), Times.Once);
    }

    [Fact]
    public void CreateUser_WithExistingEmployeeId_ShouldThrowException()
    {
        var existingUser = new User("EMP001", "existing@company.com", "Existing", "User");
        _mockRepository.Setup(r => r.GetByEmployeeId("EMP001")).Returns(existingUser);

        var act = () => _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");

        act.Should().Throw<DomainException>()
           .WithMessage("User with Employee ID 'EMP001' already exists");
    }

    [Fact]
    public void CreateUser_WithExistingEmail_ShouldThrowException()
    {
        var existingUser = new User("EMP002", "john@company.com", "Existing", "User");
        _mockRepository.Setup(r => r.GetByEmployeeId("EMP001")).Returns((User?)null);
        _mockRepository.Setup(r => r.GetByEmail("john@company.com")).Returns(existingUser);

        var act = () => _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");

        act.Should().Throw<DomainException>()
           .WithMessage("User with email 'john@company.com' already exists");
    }

    [Fact]
    public void UpdateUserEmail_WithValidEmail_ShouldUpdateSuccessfully()
    {
        var user = new User("EMP001", "john@company.com", "John", "Doe");
        _mockRepository.Setup(r => r.GetByEmployeeId("EMP001")).Returns(user);
        _mockRepository.Setup(r => r.GetByEmail("john.doe@company.com")).Returns((User?)null);

        _userService.UpdateUserEmail("EMP001", "john.doe@company.com", "ADMIN001");

        user.Identity.Email.Value.Should().Be("john.doe@company.com");
        _mockRepository.Verify(r => r.Update(user), Times.Once);
    }

    [Fact]
    public void UpdateUserEmail_WithEmailInUse_ShouldThrowException()
    {
        var user = new User("EMP001", "john@company.com", "John", "Doe");
        var otherUser = new User("EMP002", "john.doe@company.com", "Other", "User");
        _mockRepository.Setup(r => r.GetByEmployeeId("EMP001")).Returns(user);
        _mockRepository.Setup(r => r.GetByEmail("john.doe@company.com")).Returns(otherUser);

        var act = () => _userService.UpdateUserEmail("EMP001", "john.doe@company.com", "ADMIN001");

        act.Should().Throw<DomainException>()
           .WithMessage("Email 'john.doe@company.com' is already in use");
    }

    [Fact]
    public void PromoteToAdmin_WithValidUser_ShouldPromoteSuccessfully()
    {
        var user = new User("EMP001", "john@company.com", "John", "Doe");
        _mockRepository.Setup(r => r.GetByEmployeeId("EMP001")).Returns(user);

        _userService.PromoteToAdmin("EMP001", "ADMIN001");

        user.Role.Should().Be(UserRole.Admin);
        user.IsAdmin.Should().BeTrue();
        _mockRepository.Verify(r => r.Update(user), Times.Once);
    }

    [Fact]
    public void GetUserByEmployeeId_WithNonExistentUser_ShouldReturnNull()
    {
        _mockRepository.Setup(r => r.GetByEmployeeId("EMP999")).Returns((User?)null);

        var result = _userService.GetUserByEmployeeId("EMP999");

        result.Should().BeNull();
    }
}
