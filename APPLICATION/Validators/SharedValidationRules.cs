using FluentValidation;
using System.Text.RegularExpressions;

namespace WIN.AGDATA.WIN.APPLICATION.Validators;

/// <summary>
/// Shared validation constants and rules used across all validators.
/// This ensures consistency between frontend and backend validation.
/// </summary>
public static class SharedValidationRules
{
    // Name validation
    public const int NameMinLength = 2;
    public const int NameMaxLength = 50;
    
    // Employee ID
    public const int EmployeeIdLength = 9;
    
    // Password
    public const int PasswordMinLength = 12;
    
    // Corporate email
    public const string CorporateDomain = "@agdata.com";
    public const int CorporateEmailLocalPartMinLength = 5;
    
    // Product
    public const int ProductNameMaxWords = 4;
    public const int DescriptionMinLength = 20;
    public const int DescriptionMaxLength = 500;
    public const int DescriptionMinWords = 3;
    public const int DescriptionMaxWords = 100;
    
    // Numeric bounds
    public const int PointsCostMin = 1;  // Changed from 0 to 1 - must be positive
    public const int PointsCostMax = 10_000_000;
    public const int StockMin = 1;  // Changed from 0 to 1
    public const int StockMax = 1_000_000;
    public const int ImageUrlMaxLength = 1000;

    // =============================================
    // EVENT VALIDATION CONSTANTS
    // =============================================
    
    // Event Name: Required, unique, alphanumeric words only
    public const int EventNameMinLength = 2;
    public const int EventNameMaxLength = 50;
    public const int EventNameMinWords = 1;
    public const int EventNameMaxWords = 7;
    
    // Event Description
    public const int EventDescriptionMinLength = 20;
    public const int EventDescriptionMaxLength = 500;
    public const int EventDescriptionMinWords = 3;
    public const int EventDescriptionMaxWords = 100;
    
    // Event Location
    public const int EventLocationMinLength = 2;
    public const int EventLocationMaxLength = 100;
    public const int EventLocationMaxWords = 16;
    
    // Event Participants
    public const int EventMaxParticipantsMin = 1;
    public const int EventMaxParticipantsMax = 100_000;
    
    // Event Points Pool
    public const int EventPointsPoolMin = 1;
    public const int EventPointsPoolMax = 1_000_000;
    
    // IST Timezone offset (UTC+5:30)
    public static readonly TimeSpan IstOffset = TimeSpan.FromHours(5.5);
    public const string IstTimeZoneId = "India Standard Time";

    /// <summary>
    /// Validates corporate email: must end with @agdata.com and have local-part >= 5 chars
    /// </summary>
    public static bool IsValidCorporateEmail(string? email)
    {
        if (string.IsNullOrWhiteSpace(email)) return false;
        
        var emailLower = email.ToLowerInvariant();
        
        // Must end with corporate domain
        if (!emailLower.EndsWith(CorporateDomain, StringComparison.OrdinalIgnoreCase))
            return false;
        
        // Extract local part (before @)
        var atIndex = emailLower.LastIndexOf('@');
        if (atIndex < 0) return false;
        
        var localPart = emailLower.Substring(0, atIndex);
        
        // Local part must be at least 5 characters
        return localPart.Length >= CorporateEmailLocalPartMinLength;
    }
    
    /// <summary>
    /// Gets the corporate email validation error message
    /// </summary>
    public static string GetCorporateEmailErrorMessage()
    {
        return $"Use your corporate email. At least {CorporateEmailLocalPartMinLength} characters before {CorporateDomain}.";
    }

    /// <summary>
    /// Validates name contains only letters (a-zA-Z)
    /// </summary>
    public static bool IsAlphaOnly(string? value)
    {
        if (string.IsNullOrWhiteSpace(value)) return false;
        return Regex.IsMatch(value, @"^[a-zA-Z]+$");
    }

    /// <summary>
    /// Validates Employee ID: exactly 9 alphanumeric characters
    /// </summary>
    public static bool IsValidEmployeeId(string? employeeId)
    {
        if (string.IsNullOrWhiteSpace(employeeId)) return false;
        return employeeId.Length == EmployeeIdLength && 
               Regex.IsMatch(employeeId, @"^[a-zA-Z0-9]+$");
    }

    /// <summary>
    /// Validates product name: 1-4 alphanumeric words, single spaces only
    /// </summary>
    public static bool IsValidProductName(string? name)
    {
        if (string.IsNullOrWhiteSpace(name)) return false;

        // No consecutive spaces
        if (name.Contains("  ")) return false;

        var words = name.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        
        // Must have 1-4 words
        if (words.Length < 1 || words.Length > ProductNameMaxWords) return false;

        // Each word must be alphanumeric
        var alphanumericPattern = new Regex(@"^[a-zA-Z0-9]+$");
        return words.All(w => alphanumericPattern.IsMatch(w));
    }

    /// <summary>
    /// Validates description word count is within bounds
    /// </summary>
    public static bool HasValidWordCount(string? description)
    {
        if (string.IsNullOrWhiteSpace(description)) return false;

        var words = description.Split(new[] { ' ', '\t', '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries);
        return words.Length >= DescriptionMinWords && words.Length <= DescriptionMaxWords;
    }

    /// <summary>
    /// Validates URL is HTTPS
    /// </summary>
    public static bool IsValidHttpsUrl(string? url)
    {
        if (string.IsNullOrWhiteSpace(url)) return true; // Optional field

        if (Uri.TryCreate(url, UriKind.Absolute, out var uri))
        {
            return uri.Scheme.Equals("https", StringComparison.OrdinalIgnoreCase);
        }

        return false;
    }

    /// <summary>
    /// Validates strong password with composition rules
    /// </summary>
    public static (bool isValid, List<string> errors) ValidateStrongPassword(
        string? password, 
        string? firstName = null, 
        string? lastName = null, 
        string? employeeId = null)
    {
        var errors = new List<string>();
        
        if (string.IsNullOrEmpty(password))
        {
            errors.Add("Password is required");
            return (false, errors);
        }

        if (password.Length < PasswordMinLength)
            errors.Add($"At least {PasswordMinLength} characters required");
        
        if (!Regex.IsMatch(password, @"[A-Z]"))
            errors.Add("At least one uppercase letter required");
        
        if (!Regex.IsMatch(password, @"[a-z]"))
            errors.Add("At least one lowercase letter required");
        
        if (!Regex.IsMatch(password, @"[0-9]"))
            errors.Add("At least one digit required");
        
        if (!Regex.IsMatch(password, @"[!@#$%^&*()_+\-=\[\]{};':""\\|,.<>\/?]"))
            errors.Add("At least one special character required");
        
        if (password.Contains(' '))
            errors.Add("Spaces are not allowed");

        // Check for personal info
        var passwordLower = password.ToLowerInvariant();
        
        if (!string.IsNullOrWhiteSpace(firstName) && firstName.Length > 1 && 
            passwordLower.Contains(firstName.ToLowerInvariant()))
            errors.Add("Password cannot contain your first name");
        
        if (!string.IsNullOrWhiteSpace(lastName) && lastName.Length > 1 && 
            passwordLower.Contains(lastName.ToLowerInvariant()))
            errors.Add("Password cannot contain your last name");
        
        if (!string.IsNullOrWhiteSpace(employeeId) && employeeId.Length > 1 && 
            passwordLower.Contains(employeeId.ToLowerInvariant()))
            errors.Add("Password cannot contain your employee ID");

        return (errors.Count == 0, errors);
    }

    // =============================================
    // EVENT VALIDATION METHODS
    // =============================================

    /// <summary>
    /// Validates event name: 1-7 alphanumeric words, single spaces only, no consecutive/leading/trailing spaces.
    /// Characters are counted after trimming; words are counted by spaces.
    /// </summary>
    public static (bool isValid, string? errorMessage) ValidateEventName(string? name)
    {
        if (string.IsNullOrWhiteSpace(name))
            return (false, "Event name is required.");

        var trimmed = name.Trim();

        // Check for leading/trailing spaces (before trim comparison)
        if (name != trimmed)
            return (false, "Event name cannot have leading or trailing spaces.");

        // Check for consecutive spaces
        if (name.Contains("  "))
            return (false, "Event name cannot have consecutive spaces. Use single spaces only.");

        // Count characters (trimmed, excluding spaces for char limit)
        var charCountNoSpaces = trimmed.Replace(" ", "").Length;
        if (charCountNoSpaces < EventNameMinLength)
            return (false, $"Event name must have at least {EventNameMinLength} characters (excluding spaces).");
        if (charCountNoSpaces > EventNameMaxLength)
            return (false, $"Event name cannot exceed {EventNameMaxLength} characters (excluding spaces).");

        // Count words (split by spaces)
        var words = trimmed.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        if (words.Length < EventNameMinWords)
            return (false, $"Event name must have at least {EventNameMinWords} word(s).");
        if (words.Length > EventNameMaxWords)
            return (false, $"Event name cannot exceed {EventNameMaxWords} words. Currently: {words.Length} words.");

        // Each word must be alphanumeric only
        var alphanumericPattern = new Regex(@"^[a-zA-Z0-9]+$");
        foreach (var word in words)
        {
            if (!alphanumericPattern.IsMatch(word))
                return (false, $"Event name words must be alphanumeric only. Invalid word: '{word}'.");
        }

        return (true, null);
    }

    /// <summary>
    /// Validates event description: required, min/max chars and words.
    /// </summary>
    public static (bool isValid, string? errorMessage) ValidateEventDescription(string? description)
    {
        if (string.IsNullOrWhiteSpace(description))
            return (false, "Description is required.");

        var trimmed = description.Trim();

        // Count characters (trimmed)
        if (trimmed.Length < EventDescriptionMinLength)
            return (false, $"Description must have at least {EventDescriptionMinLength} characters. Currently: {trimmed.Length}.");
        if (trimmed.Length > EventDescriptionMaxLength)
            return (false, $"Description cannot exceed {EventDescriptionMaxLength} characters. Currently: {trimmed.Length}.");

        // Count words
        var words = trimmed.Split(new[] { ' ', '\t', '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries);
        if (words.Length < EventDescriptionMinWords)
            return (false, $"Description must have at least {EventDescriptionMinWords} words. Currently: {words.Length}.");
        if (words.Length > EventDescriptionMaxWords)
            return (false, $"Description cannot exceed {EventDescriptionMaxWords} words. Currently: {words.Length}.");

        return (true, null);
    }

    /// <summary>
    /// Validates event location: optional, but if provided must be alphanumeric words with single spaces.
    /// </summary>
    public static (bool isValid, string? errorMessage) ValidateEventLocation(string? location)
    {
        // Location is optional
        if (string.IsNullOrWhiteSpace(location))
            return (true, null);

        var trimmed = location.Trim();

        // Check for leading/trailing spaces
        if (location != trimmed)
            return (false, "Location cannot have leading or trailing spaces.");

        // Check for consecutive spaces
        if (location.Contains("  "))
            return (false, "Location cannot have consecutive spaces. Use single spaces only.");

        // Count characters (trimmed, excluding spaces)
        var charCountNoSpaces = trimmed.Replace(" ", "").Length;
        if (charCountNoSpaces < EventLocationMinLength)
            return (false, $"Location must have at least {EventLocationMinLength} characters (excluding spaces).");
        if (charCountNoSpaces > EventLocationMaxLength)
            return (false, $"Location cannot exceed {EventLocationMaxLength} characters (excluding spaces).");

        // Count words
        var words = trimmed.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        if (words.Length > EventLocationMaxWords)
            return (false, $"Location cannot exceed {EventLocationMaxWords} words. Currently: {words.Length}.");

        // Each word must be alphanumeric only
        var alphanumericPattern = new Regex(@"^[a-zA-Z0-9]+$");
        foreach (var word in words)
        {
            if (!alphanumericPattern.IsMatch(word))
                return (false, $"Location words must be alphanumeric only. Invalid word: '{word}'.");
        }

        return (true, null);
    }

    /// <summary>
    /// Validates max participants: optional, but if provided must be 1-100,000.
    /// </summary>
    public static (bool isValid, string? errorMessage) ValidateEventMaxParticipants(int? maxParticipants)
    {
        // Optional field
        if (!maxParticipants.HasValue)
            return (true, null);

        if (maxParticipants.Value < EventMaxParticipantsMin)
            return (false, $"Max participants must be at least {EventMaxParticipantsMin}. Zero is not allowed.");
        if (maxParticipants.Value > EventMaxParticipantsMax)
            return (false, $"Max participants cannot exceed {EventMaxParticipantsMax:N0}.");

        return (true, null);
    }

    /// <summary>
    /// Validates total points pool: optional, but if provided must be 1-1,000,000.
    /// </summary>
    public static (bool isValid, string? errorMessage) ValidateEventPointsPool(int? pointsPool)
    {
        // Optional field
        if (!pointsPool.HasValue)
            return (true, null);

        if (pointsPool.Value < EventPointsPoolMin)
            return (false, $"Points pool must be at least {EventPointsPoolMin}. Zero is not allowed.");
        if (pointsPool.Value > EventPointsPoolMax)
            return (false, $"Points pool cannot exceed {EventPointsPoolMax:N0}.");

        return (true, null);
    }

    /// <summary>
    /// Validates event dates: EventDate must be in the future, RegistrationEnd must be strictly before EventDate.
    /// </summary>
    public static (bool isValid, string? errorMessage) ValidateEventDates(
        DateTime eventDate, 
        DateTime registrationEndDate, 
        DateTime? nowUtc = null)
    {
        var now = nowUtc ?? DateTime.UtcNow;

        // EventDate must be in the future
        if (eventDate <= now)
            return (false, "Event date must be in the future.");

        // RegistrationEnd must be in the future
        if (registrationEndDate <= now)
            return (false, "Registration deadline must be in the future.");

        // RegistrationEnd must be strictly earlier than EventDate
        if (registrationEndDate >= eventDate)
            return (false, $"Registration deadline ({registrationEndDate:yyyy-MM-dd HH:mm} UTC) must be strictly earlier than event date ({eventDate:yyyy-MM-dd HH:mm} UTC). Same day is allowed if times differ.");

        return (true, null);
    }

    /// <summary>
    /// Converts UTC DateTime to IST DateTime for display.
    /// </summary>
    public static DateTime ConvertUtcToIst(DateTime utcDateTime)
    {
        return utcDateTime.Add(IstOffset);
    }

    /// <summary>
    /// Converts IST DateTime to UTC DateTime for storage.
    /// </summary>
    public static DateTime ConvertIstToUtc(DateTime istDateTime)
    {
        return istDateTime.Subtract(IstOffset);
    }

    /// <summary>
    /// Normalizes whitespace in a string: trims and collapses consecutive spaces to single spaces.
    /// </summary>
    public static string NormalizeWhitespace(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return string.Empty;

        // Trim and collapse multiple spaces to single space
        return Regex.Replace(value.Trim(), @"\s+", " ");
    }

    /// <summary>
    /// Checks if a string contains only alphanumeric words separated by single spaces.
    /// </summary>
    public static bool IsAlphanumericWords(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return false;

        var trimmed = value.Trim();
        
        // Check for consecutive spaces
        if (trimmed.Contains("  "))
            return false;

        var words = trimmed.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        var alphanumericPattern = new Regex(@"^[a-zA-Z0-9]+$");
        
        return words.All(w => alphanumericPattern.IsMatch(w));
    }
}
