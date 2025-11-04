using System;
using System.Text.RegularExpressions;

namespace WIN.AGDATA.WIN.Domain.Common;

public static class ValidationGuards
{
    private static readonly Regex IdRegex = new(@"^[A-Za-z0-9]+$", RegexOptions.Compiled);
    private static readonly Regex NameRegex = new(@"^[a-zA-Z\s\-'.]+$", RegexOptions.Compiled);
    private static readonly Regex EmailRegex = new(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", RegexOptions.Compiled | RegexOptions.IgnoreCase);

    public static string ValidateAndNormalizeId(string? id, string fieldName, int minLength = 3, int maxLength = 20)
    {
        if (string.IsNullOrWhiteSpace(id))
            throw new DomainException($"{fieldName} is required");

        var normalized = id.Trim().ToUpperInvariant();

        if (normalized.Length < minLength || normalized.Length > maxLength)
            throw new DomainException($"{fieldName} must be between {minLength} and {maxLength} characters");

        if (!IdRegex.IsMatch(normalized))
            throw new DomainException($"{fieldName} can only contain alphanumeric characters");

        return normalized;
    }

    public static string ValidateAndNormalizeName(string? name, string fieldName, int minLength = 1, int maxLength = 100)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new DomainException($"{fieldName} is required");

        var normalized = name.Trim();

        if (normalized.Length < minLength || normalized.Length > maxLength)
            throw new DomainException($"{fieldName} must be between {minLength} and {maxLength} characters");

        return normalized;
    }

    public static string ValidateAndNormalizeDescription(string? description, int minLength = 10, int maxLength = 500)
    {
        if (string.IsNullOrWhiteSpace(description))
            throw new DomainException("Description is required");

        var normalized = description.Trim();

        if (normalized.Length < minLength || normalized.Length > maxLength)
            throw new DomainException($"Description must be between {minLength} and {maxLength} characters");

        return normalized;
    }

    public static string ValidateAndNormalizeEmail(string? email)
    {
        if (string.IsNullOrWhiteSpace(email))
            throw new DomainException("Email is required");

        var normalized = email.Trim().ToLowerInvariant();

        if (!EmailRegex.IsMatch(normalized))
            throw new DomainException("Invalid email address format");

        return normalized;
    }

    public static void ValidateRank(int rank, int minRank = 1, int maxRank = 5)
    {
        if (rank < minRank || rank > maxRank)
            throw new DomainException($"Rank must be between {minRank} and {maxRank}");
    }

    public static void ValidatePoints(int points, int minPoints = 1, int maxPoints = 10000)
    {
        if (points < minPoints || points > maxPoints)
            throw new DomainException($"Points must be between {minPoints} and {maxPoints}");
    }

    public static void ValidateStock(int stock, int minStock = 0)
    {
        if (stock < minStock)
            throw new DomainException($"Stock must be at least {minStock}");
    }

    public static void ValidateRequired<T>(T? value, string fieldName) where T : class
    {
        if (value == null)
            throw new DomainException($"{fieldName} is required");
    }

    public static void ValidatePositiveNumber(int value, string fieldName)
    {
        if (value <= 0)
            throw new DomainException($"{fieldName} must be a positive number");
    }

    public static void ValidateFutureDate(DateTime date, string fieldName)
    {
        if (date <= DateTime.UtcNow)
            throw new DomainException($"{fieldName} must be in the future");
    }
}
