using WIN.AGDATA.WIN.Domain.ValueObjects;
using Xunit;

namespace WIN.AGDATA.WIN.TESTS.Domain.ValueObjects;

public class ImageUrlTests
{
    [Theory]
    [InlineData("https://example.com/image.jpg")]
    [InlineData("https://cdn.example.com/assets/image.png")]
    [InlineData("https://storage.example.com/path/to/image.gif")]
    public void Create_WithValidHttpsUrl_ShouldSucceed(string url)
    {
        // Act
        var imageUrl = ImageUrl.Create(url);

        // Assert
        Assert.Equal(url, imageUrl.Value);
    }

    [Theory]
    [InlineData("  https://example.com/image.jpg  ", "https://example.com/image.jpg")]
    public void Create_ShouldTrimWhitespace(string input, string expected)
    {
        // Act
        var imageUrl = ImageUrl.Create(input);

        // Assert
        Assert.Equal(expected, imageUrl.Value);
    }

    [Theory]
    [InlineData("http://example.com/image.jpg")] // HTTP not allowed
    [InlineData("ftp://example.com/image.jpg")] // FTP not allowed
    [InlineData("example.com/image.jpg")] // No protocol
    [InlineData("not-a-url")] // Invalid URL
    public void Create_WithNonHttpsUrl_ShouldThrowArgumentException(string url)
    {
        // Act & Assert
        Assert.Throws<ArgumentException>(() => ImageUrl.Create(url));
    }

    [Fact]
    public void Create_WithNull_ShouldThrowArgumentException()
    {
        // Act & Assert
        Assert.Throws<ArgumentException>(() => ImageUrl.Create(null!));
    }

    [Fact]
    public void CreateOptional_WithNull_ShouldReturnNull()
    {
        // Act
        var imageUrl = ImageUrl.CreateOptional(null);

        // Assert
        Assert.Null(imageUrl);
    }

    [Fact]
    public void CreateOptional_WithValidUrl_ShouldReturnImageUrl()
    {
        // Arrange
        var url = "https://example.com/image.jpg";

        // Act
        var imageUrl = ImageUrl.CreateOptional(url);

        // Assert
        Assert.NotNull(imageUrl);
        Assert.Equal(url, imageUrl!.Value);
    }
}
