using FluentAssertions;
using WIN.AGDATA.WIN.Domain.Enums;
using WIN.AGDATA.WIN.Domain.ValueObjects;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Domain.Users;

public class UserTests
{
    [Fact]
    public void CreateUser_WithValidData_ShouldCreateSuccessfully()
    {
        var user = new User("EMP001", "john@company.com", "John", "Doe");

        user.Identity.EmployeeId.Should().Be("EMP001");
        user.Identity.Email.Value.Should().Be("john@company.com");
        user.Identity.FirstName.Should().Be("John");
        user.Identity.LastName.Should().Be("Doe");
        user.Role.Should().Be(UserRole.Employee);
        user.IsActive.Should().BeTrue();
        user.CreatedBy.Should().Be("SYSTEM");
    }

    [Fact]
    public void CreateUser_WithAdminRole_ShouldSetRoleCorrectly()
    {
        var user = new User("ADM001", "admin@company.com", "Admin", "User", UserRole.Admin, "SYSTEM");

        user.Role.Should().Be(UserRole.Admin);
        user.IsAdmin.Should().BeTrue();
        user.CanManageUsers.Should().BeTrue();
    }

    [Fact]
    public void UpdateEmail_WithValidEmail_ShouldUpdateSuccessfully()
    {
        var user = new User("EMP001", "john@company.com", "John", "Doe");
        var newEmail = new EmailAddress("john.doe@company.com");

        user.UpdateEmail(newEmail, "ADMIN001");

        user.Identity.Email.Value.Should().Be("john.doe@company.com");
        user.LastModifiedBy.Should().Be("ADMIN001");
        user.LastModifiedAt.Should().BeCloseTo(DateTime.UtcNow, TimeSpan.FromSeconds(1));
    }

    [Fact]
    public void PromoteToAdmin_FromEmployee_ShouldPromoteSuccessfully()
    {
        var user = new User("EMP001", "john@company.com", "John", "Doe");

        user.PromoteToAdmin("ADMIN001");

        user.Role.Should().Be(UserRole.Admin);
        user.IsAdmin.Should().BeTrue();
        user.LastModifiedBy.Should().Be("ADMIN001");
    }

    [Fact]
    public void PromoteToAdmin_FromSuperAdmin_ShouldThrowException()
    {
        var user = new User("SA001", "super@company.com", "Super", "Admin", UserRole.SuperAdmin);

        var act = () => user.PromoteToAdmin("ADMIN001");

        act.Should().Throw<DomainException>()
           .WithMessage("Super admin role cannot be changed");
    }

    [Fact]
    public void Deactivate_ActiveUser_ShouldDeactivateSuccessfully()
    {
        var user = new User("EMP001", "john@company.com", "John", "Doe");

        user.Deactivate("ADMIN001");

        user.IsActive.Should().BeFalse();
        user.LastModifiedBy.Should().Be("ADMIN001");
    }

    [Theory]
    [InlineData("")]
    [InlineData("  ")]
    [InlineData("AB")]
    [InlineData("ABCDEFGHIJKLMNOPQRSTUVWXYZ")]
    public void CreateUser_WithInvalidEmployeeId_ShouldThrowException(string employeeId)
    {
        var act = () => new User(employeeId, "test@company.com", "Test", "User");

        act.Should().Throw<DomainException>();
    }
}
