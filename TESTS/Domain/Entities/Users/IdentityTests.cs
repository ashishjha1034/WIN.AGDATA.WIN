using FluentAssertions;
using System.Security.Principal;
using WIN.AGDATA.WIN.Domain.ValueObjects;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Domain.Users;

public class IdentityTests
{
    [Fact]
    public void CreateIdentity_WithValidData_ShouldCreateSuccessfully()
    {
        var identity = new UserIdentity("EMP001", "john@company.com", "John", "Doe");

        identity.EmployeeId.Should().Be("EMP001");
        identity.Email.Value.Should().Be("john@company.com");
        identity.FirstName.Should().Be("John");
        identity.LastName.Should().Be("Doe");
        identity.FullName.Should().Be("John Doe");
    }

    [Fact]
    public void CreateIdentity_WithLowercaseEmployeeId_ShouldNormalizeToUppercase()
    {
        var identity = new UserIdentity("emp001", "john@company.com", "John", "Doe");

        identity.EmployeeId.Should().Be("EMP001");
    }

    [Fact]
    public void UpdateEmail_WithValidEmail_ShouldUpdate()
    {
        var identity = new UserIdentity("EMP001", "john@company.com", "John", "Doe");
        var newEmail = new EmailAddress("john.doe@company.com");

        identity.UpdateEmail(newEmail);

        identity.Email.Value.Should().Be("john.doe@company.com");
    }

    [Fact]
    public void UpdateName_WithValidNames_ShouldUpdate()
    {
        var identity = new UserIdentity("EMP001", "john@company.com", "John", "Doe");

        identity.UpdateName("Johnny", "Smith");

        identity.FirstName.Should().Be("Johnny");
        identity.LastName.Should().Be("Smith");
        identity.FullName.Should().Be("Johnny Smith");
    }

    [Theory]
    [InlineData("")]
    [InlineData("  ")]
    [InlineData("AB")]
    public void CreateIdentity_WithInvalidEmployeeId_ShouldThrowException(string employeeId)
    {
        var act = () => new UserIdentity(employeeId, "test@company.com", "Test", "User");

        act.Should().Throw<DomainException>();
    }

    [Theory]
    [InlineData("")]
    [InlineData("  ")]
    public void CreateIdentity_WithInvalidFirstName_ShouldThrowException(string firstName)
    {
        var act = () => new UserIdentity("EMP001", "test@company.com", firstName, "User");

        act.Should().Throw<DomainException>();
    }
}
