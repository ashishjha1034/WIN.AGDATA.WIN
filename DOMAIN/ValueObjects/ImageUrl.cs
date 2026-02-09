namespace WIN.AGDATA.WIN.Domain.ValueObjects;

/// <summary>
/// Value object representing an image URL.
/// Ensures the URL is valid and uses HTTPS protocol only.
/// </summary>
public sealed record ImageUrl
{
    public string Value { get; }

    private ImageUrl(string value)
    {
        Value = value;
    }

    public static ImageUrl Create(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Image URL is required", nameof(value));

        var trimmed = value.Trim();

        if (!Uri.TryCreate(trimmed, UriKind.Absolute, out var uri))
            throw new ArgumentException($"Invalid URL format: '{value}'", nameof(value));

        if (!string.Equals(uri.Scheme, Uri.UriSchemeHttps, StringComparison.OrdinalIgnoreCase))
            throw new ArgumentException($"Image URL must use HTTPS protocol. Provided: '{value}'", nameof(value));

        return new ImageUrl(trimmed);
    }

    public static ImageUrl? CreateOptional(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return null;

        return Create(value);
    }

    public static implicit operator string(ImageUrl url) => url.Value;
    public override string ToString() => Value;
}
