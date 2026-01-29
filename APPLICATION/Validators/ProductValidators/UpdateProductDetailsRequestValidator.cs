using FluentValidation;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

namespace WIN.AGDATA.WIN.APPLICATION.Validators.ProductValidators;

/// <summary>
/// FluentValidation validator for UpdateProductDetailsRequest
/// Enforces: name pattern (≤4 words, alnum), description length/word count, numeric bounds, HTTPS URL
/// NOTE: Category existence is validated in the handler (Option A) to avoid async validation issues
/// Values are trimmed during validation using custom Must predicates
/// </summary>
public class UpdateProductDetailsRequestValidator : AbstractValidator<UpdateProductDetailsRequest>
{
    public UpdateProductDetailsRequestValidator()
    {
        // Product Name (optional): if provided, 2-50 chars, up to 4 words, alphanumeric words only
        // Trim is applied within validation predicates to match frontend behavior
        RuleFor(x => x.Name)
            .Must(name => string.IsNullOrWhiteSpace(name) || name.Trim().Length >= SharedValidationRules.NameMinLength)
            .WithMessage($"Product name must be at least {SharedValidationRules.NameMinLength} characters.")
            .Must(name => string.IsNullOrWhiteSpace(name) || name.Trim().Length <= SharedValidationRules.NameMaxLength)
            .WithMessage($"Product name cannot exceed {SharedValidationRules.NameMaxLength} characters.")
            .Must(name => string.IsNullOrWhiteSpace(name) || !name.Trim().Contains("  "))
            .WithMessage("Only single spaces between words allowed.")
            .Must(name => string.IsNullOrWhiteSpace(name) || SharedValidationRules.IsValidProductName(name.Trim()))
            .WithMessage($"Product name must contain 1-{SharedValidationRules.ProductNameMaxWords} words, each word alphanumeric only.")
            .When(x => !string.IsNullOrWhiteSpace(x.Name));

        // Description (optional): if provided, 20-500 chars, 3-100 words
        // Trim is applied within validation predicates
        RuleFor(x => x.Description)
            .Must(desc => string.IsNullOrWhiteSpace(desc) || desc.Trim().Length >= SharedValidationRules.DescriptionMinLength)
            .WithMessage($"Description must be at least {SharedValidationRules.DescriptionMinLength} characters.")
            .Must(desc => string.IsNullOrWhiteSpace(desc) || desc.Trim().Length <= SharedValidationRules.DescriptionMaxLength)
            .WithMessage($"Description cannot exceed {SharedValidationRules.DescriptionMaxLength} characters.")
            .Must(desc => string.IsNullOrWhiteSpace(desc) || SharedValidationRules.HasValidWordCount(desc.Trim()))
            .WithMessage($"Description must contain between {SharedValidationRules.DescriptionMinWords} and {SharedValidationRules.DescriptionMaxWords} words.")
            .When(x => !string.IsNullOrWhiteSpace(x.Description));

        // Category (optional): CategoryId must not be empty GUID if provided (existence validated in handler)
        RuleFor(x => x.CategoryId)
            .Must(id => !id.HasValue || id.Value != Guid.Empty).WithMessage("Invalid category ID.")
            .When(x => x.CategoryId.HasValue);

        // Points Cost (optional): if provided, 1-10,000,000
        RuleFor(x => x.PointsCost)
            .GreaterThanOrEqualTo(SharedValidationRules.PointsCostMin).WithMessage($"Points cost must be at least {SharedValidationRules.PointsCostMin}.")
            .LessThanOrEqualTo(SharedValidationRules.PointsCostMax).WithMessage($"Points cost cannot exceed {SharedValidationRules.PointsCostMax:N0}.")
            .When(x => x.PointsCost.HasValue);

        // Image URL (optional): if provided, must be valid HTTPS URL, max 1000 chars
        // Trim is applied within validation predicates
        RuleFor(x => x.ImageUrl)
            .Must(url => string.IsNullOrWhiteSpace(url) || url.Trim().Length <= SharedValidationRules.ImageUrlMaxLength)
            .WithMessage($"Image URL cannot exceed {SharedValidationRules.ImageUrlMaxLength} characters.")
            .Must(url => string.IsNullOrWhiteSpace(url) || SharedValidationRules.IsValidHttpsUrl(url.Trim()))
            .WithMessage("Image URL must be a valid HTTPS URL (must start with https://).")
            .When(x => !string.IsNullOrWhiteSpace(x.ImageUrl));
    }
}
