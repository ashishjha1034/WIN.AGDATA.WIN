using WIN.AGDATA.WIN.Domain.ValueObjects;
using Xunit;

namespace WIN.AGDATA.WIN.TESTS.Domain.ValueObjects;

public class PersonNameTests
{
    [Theory]
    [InlineData("John")]
    [InlineData("Mary Jane")]
    [InlineData("O'Brien")]
    [InlineData("Jean-Paul")]
    [InlineData("Dr. Smith")]
    public void Create_WithValidName_ShouldSucceed(string name)
    {
        // Act
        var personName = PersonName.Create(name);

        // Assert
        Assert.Equal(name, personName.Value);
    }

    [Theory]
    [InlineData("  John  ", "John")]
    [InlineData("Mary   ", "Mary")]
    public void Create_ShouldTrimWhitespace(string input, string expected)
    {
        // Act
        var personName = PersonName.Create(input);

        // Assert
        Assert.Equal(expected, personName.Value);
    }

    [Theory]
    [InlineData("")] // empty
    [InlineData("   ")] // whitespace only
    [InlineData("John123")] // contains numbers
    [InlineData("John@Doe")] // contains special char
    [InlineData("John_Doe")] // contains underscore
    public void Create_WithInvalidCharacters_ShouldThrowArgumentException(string name)
    {
        // Act & Assert
        Assert.Throws<ArgumentException>(() => PersonName.Create(name));
    }

    [Fact]
    public void Create_WithNull_ShouldThrowArgumentException()
    {
        // Act & Assert
        Assert.Throws<ArgumentException>(() => PersonName.Create(null!));
    }

    [Fact]
    public void Equality_SameValue_ShouldBeEqual()
    {
        // Arrange
        var name1 = PersonName.Create("John");
        var name2 = PersonName.Create("John");

        // Assert
        Assert.Equal(name1, name2);
    }
}
