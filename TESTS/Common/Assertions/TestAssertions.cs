namespace WIN.AGDATA.WIN.Tests.Assertions;

using FluentAssertions;

/// <summary>
/// Common assertion helpers for API tests
/// Improves test readability and reduces assertion code duplication
/// </summary>
public static class TestAssertions
{
    #region HTTP Status Code Assertions

    /// <summary>
    /// Asserts response is Unauthorized (401)
    /// </summary>
    public static HttpResponseMessage ShouldBeUnauthorized(this HttpResponseMessage response)
    {
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.Unauthorized);
        return response;
    }

    /// <summary>
    /// Asserts response is Forbidden (403)
    /// </summary>
    public static HttpResponseMessage ShouldBeForbidden(this HttpResponseMessage response)
    {
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.Forbidden);
        return response;
    }

    /// <summary>
    /// Asserts response is BadRequest (400)
    /// </summary>
    public static HttpResponseMessage ShouldBeBadRequest(this HttpResponseMessage response)
    {
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.BadRequest);
        return response;
    }

    /// <summary>
    /// Asserts response is NotFound (404)
    /// </summary>
    public static HttpResponseMessage ShouldBeNotFound(this HttpResponseMessage response)
    {
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.NotFound);
        return response;
    }

    /// <summary>
    /// Asserts response is Conflict (409)
    /// </summary>
    public static HttpResponseMessage ShouldBeConflict(this HttpResponseMessage response)
    {
        response.StatusCode.Should().Be(System.Net.HttpStatusCode.Conflict);
        return response;
    }

    /// <summary>
    /// Asserts response succeeded (2xx)
    /// </summary>
    public static HttpResponseMessage ShouldSucceed(this HttpResponseMessage response)
    {
        response.IsSuccessStatusCode.Should().BeTrue(
            because: $"response should succeed but got {response.StatusCode}");
        return response;
    }

    /// <summary>
    /// Asserts response has one of the specified status codes
    /// Useful for tests that may return different valid status codes
    /// </summary>
    public static HttpResponseMessage ShouldBeOneOf(
        this HttpResponseMessage response,
        params System.Net.HttpStatusCode[] expectedCodes)
    {
        response.StatusCode.Should().BeOneOf(expectedCodes);
        return response;
    }

    #endregion

    #region Response Content Assertions

    /// <summary>
    /// Asserts response content deserializes to a valid instance of T
    /// </summary>
    public static async Task<T> ShouldDeserializeTo<T>(this HttpResponseMessage response)
    {
        response.ShouldSucceed();
        var content = await response.Content.ReadAsStringAsync();
        content.Should().NotBeNullOrEmpty();
        
        var deserialized = System.Text.Json.JsonSerializer.Deserialize<T>(content,
            new System.Text.Json.JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        
        deserialized.Should().NotBeNull();
        return deserialized!;
    }

    /// <summary>
    /// Reads response content as string
    /// </summary>
    public static async Task<string> GetContentAsString(this HttpResponseMessage response)
    {
        return await response.Content.ReadAsStringAsync();
    }

    #endregion

    #region Collection Assertions

    /// <summary>
    /// Asserts collection is not empty
    /// </summary>
    public static IEnumerable<T> ShouldNotBeEmpty<T>(this IEnumerable<T> collection)
    {
        collection.Should().NotBeEmpty();
        return collection;
    }

    /// <summary>
    /// Asserts collection has expected count
    /// </summary>
    public static IEnumerable<T> ShouldHaveCount<T>(this IEnumerable<T> collection, int expected)
    {
        collection.Should().HaveCount(expected);
        return collection;
    }

    #endregion

    #region Data Validation Assertions

    /// <summary>
    /// Asserts required properties are populated
    /// </summary>
    public static T ShouldHaveValidData<T>(this T obj, string propertyName)
        where T : class
    {
        var property = typeof(T).GetProperty(propertyName);
        property.Should().NotBeNull($"property {propertyName} should exist");
        
        var value = property!.GetValue(obj);
        value.Should().NotBeNull($"property {propertyName} should not be null");
        
        return obj;
    }

    #endregion
}
