using WIN.AGDATA.WIN.Domain.ValueObjects;
using Xunit;

namespace WIN.AGDATA.WIN.TESTS.Domain.ValueObjects;

public class EmployeeIdTests
{
    [Theory]
    [InlineData("ABC123456")]
    [InlineData("123456789")]
    [InlineData("ABCDEFGHI")]
    public void Create_WithValid9AlphanumericCharacters_ShouldSucceed(string value)
    {
        // Act
        var employeeId = EmployeeId.Create(value);

        // Assert
        Assert.Equal(value.ToUpperInvariant(), employeeId.Value);
    }

    [Theory]
    [InlineData("abc123456", "ABC123456")] // lowercase should be uppercased
    [InlineData("  ABC123456  ", "ABC123456")] // whitespace should be trimmed
    public void Create_ShouldNormalizeToUppercase(string input, string expected)
    {
        // Act
        var employeeId = EmployeeId.Create(input);

        // Assert
        Assert.Equal(expected, employeeId.Value);
    }

    [Theory]
    [InlineData("")] // empty
    [InlineData("   ")] // whitespace only
    [InlineData("ABC12345")] // too short (8 chars)
    [InlineData("ABC1234567")] // too long (10 chars)
    [InlineData("ABC-12345")] // contains hyphen
    [InlineData("ABC 12345")] // contains space
    [InlineData("ABC@12345")] // contains special char
    public void Create_WithInvalidFormat_ShouldThrowArgumentException(string value)
    {
        // Act & Assert
        Assert.Throws<ArgumentException>(() => EmployeeId.Create(value));
    }

    [Fact]
    public void Create_WithNull_ShouldThrowArgumentException()
    {
        // Act & Assert
        Assert.Throws<ArgumentException>(() => EmployeeId.Create(null!));
    }

    [Fact]
    public void Equality_SameValue_ShouldBeEqual()
    {
        // Arrange
        var id1 = EmployeeId.Create("ABC123456");
        var id2 = EmployeeId.Create("ABC123456");

        // Assert
        Assert.Equal(id1, id2);
    }
}
