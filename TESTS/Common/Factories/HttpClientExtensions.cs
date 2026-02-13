using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace WIN.AGDATA.WIN.Tests.Api.Setup;

/// <summary>
/// Extension methods for HttpClient to simplify API testing.
/// </summary>
public static class HttpClientExtensions
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
        Converters = { new JsonStringEnumConverter() }
    };

    /// <summary>
    /// Posts JSON content and returns the response without deserializing.
    /// </summary>
    public static async Task<HttpResponseMessage> PostJsonAsync<T>(this HttpClient client, string requestUri, T content)
    {
        return await client.PostAsJsonAsync(requestUri, content, JsonOptions);
    }

    /// <summary>
    /// Puts JSON content and returns the response without deserializing.
    /// </summary>
    public static async Task<HttpResponseMessage> PutJsonAsync<T>(this HttpClient client, string requestUri, T content)
    {
        return await client.PutAsJsonAsync(requestUri, content, JsonOptions);
    }

    /// <summary>
    /// Patches JSON content and returns the response.
    /// </summary>
    public static async Task<HttpResponseMessage> PatchJsonAsync<T>(this HttpClient client, string requestUri, T content)
    {
        var jsonContent = JsonContent.Create(content, mediaType: null, JsonOptions);
        var request = new HttpRequestMessage(HttpMethod.Patch, requestUri) { Content = jsonContent };
        return await client.SendAsync(request);
    }

    /// <summary>
    /// Reads response as typed JSON.
    /// </summary>
    public static async Task<T?> ReadAsAsync<T>(this HttpContent content)
    {
        return await content.ReadFromJsonAsync<T>(JsonOptions);
    }

    /// <summary>
    /// Reads response body as dynamic JSON document.
    /// </summary>
    public static async Task<JsonDocument> ReadAsJsonDocumentAsync(this HttpContent content)
    {
        var stream = await content.ReadAsStreamAsync();
        return await JsonDocument.ParseAsync(stream);
    }

    /// <summary>
    /// Gets a property from a JSON response.
    /// </summary>
    public static async Task<string?> GetJsonPropertyAsync(this HttpResponseMessage response, string propertyName)
    {
        using var doc = await response.Content.ReadAsJsonDocumentAsync();
        if (doc.RootElement.TryGetProperty(propertyName, out var element))
        {
            return element.ToString();
        }
        return null;
    }

    /// <summary>
    /// Asserts response contains a specific JSON property.
    /// </summary>
    public static async Task<JsonElement> GetJsonElementAsync(this HttpResponseMessage response)
    {
        var json = await response.Content.ReadAsStringAsync();
        return JsonDocument.Parse(json).RootElement;
    }

    /// <summary>
    /// Helper to assert response JSON structure.
    /// </summary>
    public static async Task<T> DeserializeAsync<T>(this HttpResponseMessage response)
    {
        var content = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<T>(content, JsonOptions);
        return result ?? throw new InvalidOperationException($"Failed to deserialize response to {typeof(T).Name}");
    }
}

/// <summary>
/// Standard error response structure returned by ExceptionHandlingMiddleware.
/// </summary>
public record ErrorResponse
{
    public string? Message { get; init; }
    public string? Details { get; init; }
    public int StatusCode { get; init; }
}

/// <summary>
/// Standard wrapper for list responses.
/// </summary>
public record ListResponse<T>
{
    public int Count { get; init; }
    public List<T> Data { get; init; } = new();
}

/// <summary>
/// Standard wrapper for paginated responses.
/// </summary>
public record PagedResponse<T>
{
    public List<T> Data { get; init; } = new();
    public PaginationInfo Pagination { get; init; } = new();
}

public record PaginationInfo
{
    public int CurrentPage { get; init; }
    public int PageSize { get; init; }
    public int TotalCount { get; init; }
    public int TotalPages { get; init; }
    public bool HasNextPage { get; init; }
    public bool HasPreviousPage { get; init; }
}

/// <summary>
/// Login response structure.
/// </summary>
public record LoginResponse
{
    public string? Token { get; init; }
    public string? RefreshToken { get; init; }
    public int ExpiresIn { get; init; }
    public bool MustChangePassword { get; init; }
    public LoginUserInfo? User { get; init; }
}

public record LoginUserInfo
{
    public Guid Id { get; init; }
    public string? Email { get; init; }
    public string? FirstName { get; init; }
    public string? LastName { get; init; }
    public string? EmployeeId { get; init; }
    public List<string>? Roles { get; init; }
}
