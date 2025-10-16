using System;
using Xunit;
using FluentAssertions;

namespace WIN.AGDATA.WIN.Tests.Application.Services;

public class ProductServiceTests
{
    [Fact]
    public void SimpleTest_ShouldPass()
    {
        // Arrange
        var result = "Hello" + " World";

        // Assert
        result.Should().Be("Hello World");
    }
}
