using WIN.AGDATA.WIN.Domain.ValueObjects;
using Xunit;

namespace WIN.AGDATA.WIN.TESTS.Domain.ValueObjects;

public class PointsTests
{
    [Fact]
    public void Create_WithPositiveValue_ShouldSucceed()
    {
        // Arrange & Act
        var points = Points.Create(100.50m);

        // Assert
        Assert.Equal(100.50m, points.Value);
    }

    [Fact]
    public void Create_WithZero_ShouldSucceed()
    {
        // Arrange & Act
        var points = Points.Create(0m);

        // Assert
        Assert.Equal(0m, points.Value);
        Assert.True(points.IsZero());
    }

    [Fact]
    public void Create_WithNegativeValue_ShouldThrowArgumentException()
    {
        // Arrange, Act & Assert
        Assert.Throws<ArgumentException>(() => Points.Create(-10m));
    }

    [Fact]
    public void Add_TwoPoints_ShouldReturnSum()
    {
        // Arrange
        var points1 = Points.Create(50m);
        var points2 = Points.Create(30m);

        // Act
        var result = points1 + points2;

        // Assert
        Assert.Equal(80m, result.Value);
    }

    [Fact]
    public void Subtract_ValidAmount_ShouldReturnDifference()
    {
        // Arrange
        var points1 = Points.Create(100m);
        var points2 = Points.Create(30m);

        // Act
        var result = points1 - points2;

        // Assert
        Assert.Equal(70m, result.Value);
    }

    [Fact]
    public void Subtract_MoreThanAvailable_ShouldThrowInvalidOperationException()
    {
        // Arrange
        var points1 = Points.Create(50m);
        var points2 = Points.Create(100m);

        // Act & Assert
        Assert.Throws<InvalidOperationException>(() => points1 - points2);
    }

    [Fact]
    public void Multiply_ByPositiveFactor_ShouldReturnProduct()
    {
        // Arrange
        var points = Points.Create(10m);

        // Act
        var result = points * 2.5m;

        // Assert
        Assert.Equal(25m, result.Value);
    }

    [Fact]
    public void Divide_ByPositiveDivisor_ShouldReturnQuotient()
    {
        // Arrange
        var points = Points.Create(100m);

        // Act
        var result = points / 4m;

        // Assert
        Assert.Equal(25m, result.Value);
    }

    [Fact]
    public void ComparisonOperators_ShouldWorkCorrectly()
    {
        // Arrange
        var points1 = Points.Create(50m);
        var points2 = Points.Create(30m);
        var points3 = Points.Create(50m);

        // Assert
        Assert.True(points1 > points2);
        Assert.True(points2 < points1);
        Assert.True(points1 >= points3);
        Assert.True(points1 <= points3);
    }

    [Fact]
    public void Equality_SameValue_ShouldBeEqual()
    {
        // Arrange
        var points1 = Points.Create(100m);
        var points2 = Points.Create(100m);

        // Assert
        Assert.Equal(points1, points2);
    }

    [Theory]
    [InlineData(100.123, 100.12)]
    [InlineData(50.567, 50.57)]
    [InlineData(25.125, 25.13)]
    public void Create_ShouldRoundToTwoDecimalPlaces(decimal input, decimal expected)
    {
        // Act
        var points = Points.Create(input);

        // Assert
        Assert.Equal(expected, points.Value);
    }
}
