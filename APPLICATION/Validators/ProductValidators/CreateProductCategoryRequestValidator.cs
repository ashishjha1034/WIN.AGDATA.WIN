using FluentValidation;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using System.Text.RegularExpressions;

namespace WIN.AGDATA.WIN.APPLICATION.Validators.ProductValidators;

/// <summary>
/// FluentValidation validator for CreateProductCategoryRequest
/// Enforces: name pattern (same as Product Name - ≤4 words, alnum), unique
/// Note: Uniqueness check is handled in the handler (existing behavior); validator enforces format
/// </summary>
public class CreateProductCategoryRequestValidator : AbstractValidator<CreateProductCategoryRequest>
{
    // Validation constants (same as Product Name)
    private const int NameMinLength = 2;
    private const int NameMaxLength = 50;
    private const int MaxWords = 4;

    public CreateProductCategoryRequestValidator()
    {
        // Category Name: 2-50 chars, up to 4 words, alphanumeric words only, single spaces
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Category name is required.")
            .MinimumLength(NameMinLength).WithMessage($"Category name must be at least {NameMinLength} characters.")
            .MaximumLength(NameMaxLength).WithMessage($"Category name cannot exceed {NameMaxLength} characters.")
            .Must(BeValidCategoryName).WithMessage($"Category name must contain 1-{MaxWords} words, each word alphanumeric only, separated by single spaces.");

        // Display Order: optional but if provided must be non-negative
        RuleFor(x => x.DisplayOrder)
            .GreaterThanOrEqualTo(0).WithMessage("Display order must be 0 or greater.");
    }

    private bool BeValidCategoryName(string? name)
    {
        if (string.IsNullOrWhiteSpace(name)) return false;

        var words = name.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        
        if (words.Length < 1 || words.Length > MaxWords) return false;

        var alphanumericPattern = new Regex(@"^[a-zA-Z0-9]+$");
        if (!words.All(w => alphanumericPattern.IsMatch(w))) return false;

        if (name.Contains("  ")) return false;

        return true;
    }
}
