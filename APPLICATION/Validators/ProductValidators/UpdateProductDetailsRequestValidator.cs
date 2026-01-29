using FluentValidation;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using System.Text.RegularExpressions;

namespace WIN.AGDATA.WIN.APPLICATION.Validators.ProductValidators;

/// <summary>
/// FluentValidation validator for UpdateProductDetailsRequest
/// Enforces: name pattern (≤4 words, alnum), description length/word count, category exists, numeric bounds, HTTPS URL
/// </summary>
public class UpdateProductDetailsRequestValidator : AbstractValidator<UpdateProductDetailsRequest>
{
    private readonly IProductRepository _productRepository;

    // Validation constants
    private const int NameMinLength = 2;
    private const int NameMaxLength = 50;
    private const int MaxWords = 4;
    private const int DescriptionMinLength = 20;
    private const int DescriptionMaxLength = 500;
    private const int DescriptionMinWords = 3;
    private const int DescriptionMaxWords = 100;
    private const int PointsCostMin = 0;
    private const int PointsCostMax = 10_000_000;
    private const int ImageUrlMaxLength = 1000;

    public UpdateProductDetailsRequestValidator(IProductRepository productRepository)
    {
        _productRepository = productRepository;

        // Product Name (optional): if provided, 2-50 chars, up to 4 words, alphanumeric words only
        RuleFor(x => x.Name)
            .MinimumLength(NameMinLength).WithMessage($"Product name must be at least {NameMinLength} characters.")
            .MaximumLength(NameMaxLength).WithMessage($"Product name cannot exceed {NameMaxLength} characters.")
            .Must(BeValidProductName).WithMessage($"Product name must contain 1-{MaxWords} words, each word alphanumeric only, separated by single spaces.")
            .When(x => !string.IsNullOrWhiteSpace(x.Name));

        // Description (optional): if provided, 20-500 chars, 3-100 words
        RuleFor(x => x.Description)
            .MinimumLength(DescriptionMinLength).WithMessage($"Description must be at least {DescriptionMinLength} characters.")
            .MaximumLength(DescriptionMaxLength).WithMessage($"Description cannot exceed {DescriptionMaxLength} characters.")
            .Must(HaveValidWordCount).WithMessage($"Description must contain between {DescriptionMinWords} and {DescriptionMaxWords} words.")
            .When(x => !string.IsNullOrWhiteSpace(x.Description));

        // Category (optional): if provided, must reference existing category
        RuleFor(x => x.CategoryId)
            .MustAsync(CategoryExists!).WithMessage("Selected category does not exist.")
            .When(x => x.CategoryId.HasValue && x.CategoryId.Value != Guid.Empty);

        // Points Cost (optional): if provided, 0-10,000,000
        RuleFor(x => x.PointsCost)
            .GreaterThanOrEqualTo(PointsCostMin).WithMessage($"Points cost must be at least {PointsCostMin}.")
            .LessThanOrEqualTo(PointsCostMax).WithMessage($"Points cost cannot exceed {PointsCostMax:N0}.")
            .When(x => x.PointsCost.HasValue);

        // Image URL (optional): if provided, must be valid HTTPS URL, max 1000 chars
        RuleFor(x => x.ImageUrl)
            .MaximumLength(ImageUrlMaxLength).WithMessage($"Image URL cannot exceed {ImageUrlMaxLength} characters.")
            .Must(BeValidHttpsUrl).WithMessage("Image URL must be a valid HTTPS URL.")
            .When(x => !string.IsNullOrWhiteSpace(x.ImageUrl));
    }

    private bool BeValidProductName(string? name)
    {
        if (string.IsNullOrWhiteSpace(name)) return true; // Optional

        var words = name.Split(' ', StringSplitOptions.RemoveEmptyEntries);
        
        if (words.Length < 1 || words.Length > MaxWords) return false;

        var alphanumericPattern = new Regex(@"^[a-zA-Z0-9]+$");
        if (!words.All(w => alphanumericPattern.IsMatch(w))) return false;

        if (name.Contains("  ")) return false;

        return true;
    }

    private bool HaveValidWordCount(string? description)
    {
        if (string.IsNullOrWhiteSpace(description)) return true; // Optional

        var words = description.Split(new[] { ' ', '\t', '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries);
        return words.Length >= DescriptionMinWords && words.Length <= DescriptionMaxWords;
    }

    private async Task<bool> CategoryExists(Guid? categoryId, CancellationToken cancellationToken)
    {
        if (!categoryId.HasValue || categoryId.Value == Guid.Empty) return false;
        var category = await _productRepository.GetCategoryByIdAsync(categoryId.Value);
        return category != null;
    }

    private bool BeValidHttpsUrl(string? url)
    {
        if (string.IsNullOrWhiteSpace(url)) return true;

        if (Uri.TryCreate(url, UriKind.Absolute, out var uri))
        {
            return uri.Scheme.Equals("https", StringComparison.OrdinalIgnoreCase);
        }

        return false;
    }
}
