using FluentAssertions;
using WIN.AGDATA.WIN.Domain.ValueObjects;
using Xunit;

namespace WIN.AGDATA.WIN.Tests.Domain.ValueObjects;

public class EmailAddressTests
{
    [Theory]
    [InlineData("test@company.com")]
    [InlineData("john.doe@example.org")]
    [InlineData("user+tag@domain.co.uk")]
    [InlineData("123@456.com")]
    public void CreateEmailAddress_WithValidEmail_ShouldCreateSuccessfully(string email)
    {
        var emailAddress = new EmailAddress(email);

        emailAddress.Value.Should().Be(email.ToLowerInvariant());
    }

    [Fact]
    public void CreateEmailAddress_WithMixedCase_ShouldNormalizeToLowercase()
    {
        var emailAddress = new EmailAddress("John.Doe@COMPANY.COM");

        emailAddress.Value.Should().Be("john.doe@company.com");
    }

    [Theory]
    [InlineData("")]
    [InlineData("  ")]
    [InlineData("invalid")]
    [InlineData("@company.com")]
    [InlineData("user@")]
    [InlineData("user@.com")]
    [InlineData("user space@company.com")]
    public void CreateEmailAddress_WithInvalidEmail_ShouldThrowException(string email)
    {
        var act = () => new EmailAddress(email);

        act.Should().Throw<DomainException>();
    }

    [Fact]
    public void ImplicitOperator_ShouldConvertToString()
    {
        var emailAddress = new EmailAddress("test@company.com");

        string email = emailAddress;

        email.Should().Be("test@company.com");
    }

    [Fact]
    public void ExplicitOperator_ShouldConvertFromString()
    {
        var emailAddress = (EmailAddress)"test@company.com";

        emailAddress.Value.Should().Be("test@company.com");
    }

    [Fact]
    public void ToString_ShouldReturnValue()
    {
        var emailAddress = new EmailAddress("test@company.com");

        emailAddress.ToString().Should().Be("test@company.com");
    }
}
