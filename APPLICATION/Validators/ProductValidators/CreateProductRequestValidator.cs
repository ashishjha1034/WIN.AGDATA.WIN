using FluentValidation;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;

namespace WIN.AGDATA.WIN.APPLICATION.Validators.ProductValidators;

/// <summary>
/// FluentValidation validator for CreateProductRequest
/// Enforces: name pattern (≤4 words, alnum), description length/word count, numeric bounds, HTTPS URL
/// NOTE: Category existence is validated in the handler (Option A) to avoid async validation issues
/// </summary>
public class CreateProductRequestValidator : AbstractValidator<CreateProductRequest>
{
    public CreateProductRequestValidator()
    {
        // Product Name: 2-50 chars, up to 4 words, alphanumeric words only, single spaces
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Product name is required.")
            .MinimumLength(SharedValidationRules.NameMinLength).WithMessage($"Product name must be at least {SharedValidationRules.NameMinLength} characters.")
            .MaximumLength(SharedValidationRules.NameMaxLength).WithMessage($"Product name cannot exceed {SharedValidationRules.NameMaxLength} characters.")
            .Must(SharedValidationRules.IsValidProductName).WithMessage($"Product name must contain 1-{SharedValidationRules.ProductNameMaxWords} words, each word alphanumeric only, separated by single spaces.");

        // Description: 20-500 chars, 3-100 words
        RuleFor(x => x.Description)
            .NotEmpty().WithMessage("Description is required.")
            .MinimumLength(SharedValidationRules.DescriptionMinLength).WithMessage($"Description must be at least {SharedValidationRules.DescriptionMinLength} characters.")
            .MaximumLength(SharedValidationRules.DescriptionMaxLength).WithMessage($"Description cannot exceed {SharedValidationRules.DescriptionMaxLength} characters.")
            .Must(SharedValidationRules.HasValidWordCount).WithMessage($"Description must contain between {SharedValidationRules.DescriptionMinWords} and {SharedValidationRules.DescriptionMaxWords} words.");

        // Category: required (existence validated in handler)
        RuleFor(x => x.CategoryId)
            .NotEmpty().WithMessage("Category is required.");

        // Points Cost: 1-10,000,000 integer (must be positive)
        RuleFor(x => x.PointsCost)
            .GreaterThanOrEqualTo(SharedValidationRules.PointsCostMin).WithMessage($"Points cost must be at least {SharedValidationRules.PointsCostMin}.")
            .LessThanOrEqualTo(SharedValidationRules.PointsCostMax).WithMessage($"Points cost cannot exceed {SharedValidationRules.PointsCostMax:N0}.");

        // Initial Stock: 1-1,000,000 integer (required, minimum 1)
        RuleFor(x => x.InitialStock)
            .NotNull().WithMessage("Initial stock is required.")
            .GreaterThanOrEqualTo(SharedValidationRules.StockMin).WithMessage($"Initial stock must be at least {SharedValidationRules.StockMin}.")
            .LessThanOrEqualTo(SharedValidationRules.StockMax).WithMessage($"Initial stock cannot exceed {SharedValidationRules.StockMax:N0}.");

        // Image URL: if provided, must be valid HTTPS URL, max 1000 chars
        RuleFor(x => x.ImageUrl)
            .MaximumLength(SharedValidationRules.ImageUrlMaxLength).WithMessage($"Image URL cannot exceed {SharedValidationRules.ImageUrlMaxLength} characters.")
            .Must(SharedValidationRules.IsValidHttpsUrl).WithMessage("Image URL must be a valid HTTPS URL.")
            .When(x => !string.IsNullOrWhiteSpace(x.ImageUrl));
    }
}
