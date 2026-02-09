using System.Text.RegularExpressions;

namespace WIN.AGDATA.WIN.Domain.ValueObjects;

/// <summary>
/// Value object representing an Employee ID.
/// Must be exactly 9 alphanumeric characters (uppercase).
/// </summary>
public sealed record EmployeeId
{
    private const int ExactLength = 9;
    private static readonly Regex AlphanumericRegex = new(@"^[A-Z0-9]{9}$", RegexOptions.Compiled);

    public string Value { get; }

    private EmployeeId(string value)
    {
        Value = value;
    }

    public static EmployeeId Create(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            throw new ArgumentException("Employee ID is required", nameof(value));

        var normalized = value.Trim().ToUpperInvariant();

        if (normalized.Length != ExactLength)
            throw new ArgumentException($"Employee ID must be exactly {ExactLength} characters. Provided: '{value}' (length: {normalized.Length})", nameof(value));

        if (!AlphanumericRegex.IsMatch(normalized))
            throw new ArgumentException($"Employee ID must contain only alphanumeric characters. Provided: '{value}'", nameof(value));

        return new EmployeeId(normalized);
    }

    public static implicit operator string(EmployeeId employeeId) => employeeId.Value;
    public override string ToString() => Value;
}
