using System.Text.RegularExpressions;

namespace WIN.AGDATA.WIN.Domain.ValueObjects;

/// <summary>
/// Value object representing a person's name (first or last).
/// Ensures the name contains only letters, spaces, hyphens, apostrophes, and periods.
/// </summary>
public sealed record PersonName
{
    private const int MinLength = 1;
    private const int MaxLength = 100;
    private static readonly Regex NameRegex = new(@"^[a-zA-Z\s\-'.]+$", RegexOptions.Compiled);

    public string Value { get; }

    private PersonName(string value)
    {
        Value = value;
    }

    public static PersonName Create(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Name is required", nameof(value));

        var trimmed = value.Trim();

        if (trimmed.Length < MinLength || trimmed.Length > MaxLength)
            throw new ArgumentException($"Name must be between {MinLength} and {MaxLength} characters. Provided: '{value}' (length: {trimmed.Length})", nameof(value));

        if (!NameRegex.IsMatch(trimmed))
            throw new ArgumentException($"Name can only contain letters, spaces, hyphens, apostrophes, and periods. Provided: '{value}'", nameof(value));

        return new PersonName(trimmed);
    }

    public static implicit operator string(PersonName name) => name.Value;
    public override string ToString() => Value;
}
