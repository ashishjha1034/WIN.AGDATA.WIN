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
}
