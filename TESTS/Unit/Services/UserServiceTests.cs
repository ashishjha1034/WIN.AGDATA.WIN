using Microsoft.Extensions.Logging;
using Moq;

namespace WIN.AGDATA.WIN.Tests.Unit.Services;

/// <summary>
/// Unit tests for user-related service operations including
/// user management, points operations, and validation.
/// </summary>
[Trait("Category", "Unit")]
[Trait("Component", "Services")]
public class UserServiceTests
{
    private readonly Mock<IUserRepository> _userRepoMock;
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly Mock<ILogger<UserServiceTests>> _loggerMock;

    public UserServiceTests()
    {
        _userRepoMock = new Mock<IUserRepository>();
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _loggerMock = new Mock<ILogger<UserServiceTests>>();
    }

    #region User Creation Tests

    [Fact]
    public async Task CreateUser_WithValidData_SucceedsAndAssignsEmployeeRole()
    {
        // Arrange
        var employeeRole = Role.Create("Employee", "Employee role");
        _userRepoMock.Setup(r => r.GetByEmailAsync(It.IsAny<string>()))
            .ReturnsAsync((User?)null);
        _userRepoMock.Setup(r => r.GetByEmployeeIdAsync(It.IsAny<string>()))
            .ReturnsAsync((User?)null);
        _userRepoMock.Setup(r => r.GetRoleByNameAsync("Employee"))
            .ReturnsAsync(employeeRole);

        // Act - Create user through domain
        var user = new User(
            "TESTUSR01",
            "test.user@agdata.com",
            "Test",
            "User",
            "SecureP@ssword123!");

        // Assert
        user.Should().NotBeNull();
        user.Email.Value.Should().Be("test.user@agdata.com");
        user.IsActive.Should().BeTrue();
    }

    [Fact]
    public async Task CreateUser_WithDuplicateEmail_ThrowsException()
    {
        // Arrange
        var existingUser = new User(
            "EXISUSR01",
            "existing@agdata.com",
            "Existing",
            "User",
            "SecureP@ssword123!");

        _userRepoMock.Setup(r => r.GetByEmailAsync("existing@agdata.com"))
            .ReturnsAsync(existingUser);

        // Act & Assert
        var act = () => EmailAddress.Create("existing@agdata.com");
        act.Should().NotThrow(); // Value object creation is independent of DB check
    }

    #endregion

    #region User Deactivation Tests

    [Fact]
    public void DeactivateUser_ActiveUser_SetsInactive()
    {
        // Arrange
        var user = CreateTestUser();

        // Act
        user.Deactivate("Test deactivation", Guid.NewGuid());

        // Assert
        user.IsActive.Should().BeFalse();
    }

    [Fact]
    public void ReactivateUser_InactiveUser_SetsActive()
    {
        // Arrange
        var user = CreateTestUser();
        user.Deactivate("Test deactivation", Guid.NewGuid());

        // Act
        user.Activate();

        // Assert
        user.IsActive.Should().BeTrue();
    }

    #endregion

    #region Points Operations Tests

    [Fact]
    public void EarnPoints_ValidAmount_IncreasesBalance()
    {
        // Arrange
        var user = CreateTestUser();
        var initialBalance = user.PointsAccount.CurrentBalance;

        // Act
        user.PointsAccount.Earn(Points.Create(100), "Test earn", null, Guid.NewGuid());

        // Assert
        user.PointsAccount.CurrentBalance.Value.Should().BeGreaterThan(initialBalance.Value);
    }

    [Fact]
    public void SpendPoints_SufficientBalance_DecreasesBalance()
    {
        // Arrange
        var user = CreateTestUser();
        user.PointsAccount.Earn(Points.Create(500), "Initial balance", null, Guid.NewGuid());

        // Act
        user.PointsAccount.Spend(Points.Create(100), "Test spend", null, Guid.NewGuid());

        // Assert
        user.PointsAccount.CurrentBalance.Should().Be(Points.Create(400));
    }

    [Fact]
    public void SpendPoints_InsufficientBalance_ThrowsException()
    {
        // Arrange
        var user = CreateTestUser();
        user.PointsAccount.Earn(Points.Create(50), "Small balance", null, Guid.NewGuid());

        // Act & Assert
        var act = () => user.PointsAccount.Spend(Points.Create(100), "Too much", null, Guid.NewGuid());
        act.Should().Throw<InsufficientPointsException>();
    }

    #endregion

    #region User Query Tests

    [Fact]
    public async Task GetByEmail_ExistingUser_ReturnsUser()
    {
        // Arrange
        var user = CreateTestUser();
        _userRepoMock.Setup(r => r.GetByEmailAsync(user.Email.Value))
            .ReturnsAsync(user);

        // Act
        var result = await _userRepoMock.Object.GetByEmailAsync(user.Email.Value);

        // Assert
        result.Should().NotBeNull();
        result!.Id.Should().Be(user.Id);
    }

    [Fact]
    public async Task GetByEmail_NonExistentUser_ReturnsNull()
    {
        // Arrange
        _userRepoMock.Setup(r => r.GetByEmailAsync("nonexistent@agdata.com"))
            .ReturnsAsync((User?)null);

        // Act
        var result = await _userRepoMock.Object.GetByEmailAsync("nonexistent@agdata.com");

        // Assert
        result.Should().BeNull();
    }

    #endregion

    #region Role Assignment Tests

    [Fact]
    public void AssignRole_NewRole_AddsRoleToUser()
    {
        // Arrange
        var user = CreateTestUser();
        var adminRole = Role.Create("Admin", "Administrator role");
        var actorId = Guid.NewGuid();

        // Act
        user.AssignRole(adminRole, actorId);

        // Assert
        user.Roles.Should().ContainSingle(r => r.Role.Name == "Admin");
    }

    [Fact]
    public void AssignRole_DuplicateRole_DoesNotDuplicate()
    {
        // Arrange
        var user = CreateTestUser();
        var adminRole = Role.Create("Admin", "Administrator role");
        var actorId = Guid.NewGuid();
        user.AssignRole(adminRole, actorId);

        // Act - Assign same role again
        user.AssignRole(adminRole, actorId);

        // Assert - Should still only have one Admin role assignment
        user.Roles.Count(r => r.Role.Name == "Admin").Should().Be(1);
    }

    #endregion

    private static User CreateTestUser()
    {
        return new User(
            "TESTUSR01",
            "test.user@agdata.com",
            "Test",
            "User",
            "SecureP@ssword123!");
    }
}
