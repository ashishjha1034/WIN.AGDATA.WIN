using FluentAssertions;
using FluentValidation.TestHelper;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using WIN.AGDATA.WIN.APPLICATION.Validators;
using WIN.AGDATA.WIN.APPLICATION.Validators.ProductValidators;

namespace WIN.AGDATA.WIN.Tests.Validators;

/// <summary>
/// Unit tests for CreateProductRequestValidator.
/// Tests all validation rules for product creation.
/// </summary>
[Trait("Category", "Unit")]
[Trait("Component", "Validation")]
public class CreateProductRequestValidatorTests
{
    private readonly CreateProductRequestValidator _validator;

    public CreateProductRequestValidatorTests()
    {
        _validator = new CreateProductRequestValidator();
    }

    #region Name Validation Tests

    [Fact]
    public void Validate_ValidName_NoErrors()
    {
        var request = CreateValidRequest();
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Validate_EmptyName_HasError()
    {
        var request = CreateValidRequest();
        request.Name = "";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Name)
            .WithErrorMessage("Product name is required.");
    }

    [Fact]
    public void Validate_NameTooShort_HasError()
    {
        var request = CreateValidRequest();
        request.Name = "A";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Validate_NameTooLong_HasError()
    {
        var longName = new string('A', SharedValidationRules.NameMaxLength + 1);
        var request = CreateValidRequest();
        request.Name = longName;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Validate_NameWithTooManyWords_HasError()
    {
        // More than 4 words
        var request = CreateValidRequest();
        request.Name = "One Two Three Four Five";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Validate_NameWithSpecialCharacters_HasError()
    {
        var request = CreateValidRequest();
        request.Name = "Product@Name";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Theory]
    [InlineData("Laptop")]
    [InlineData("Gaming Mouse")]
    [InlineData("USB Cable")]
    [InlineData("Premium Headphones")]
    public void Validate_ValidProductNames_NoErrors(string name)
    {
        var request = CreateValidRequest();
        request.Name = name;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.Name);
    }

    #endregion

    #region Description Validation Tests

    [Fact]
    public void Validate_ValidDescription_NoErrors()
    {
        var request = CreateValidRequest();
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.Description);
    }

    [Fact]
    public void Validate_EmptyDescription_HasError()
    {
        var request = CreateValidRequest();
        request.Description = "";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Description)
            .WithErrorMessage("Description is required.");
    }

    [Fact]
    public void Validate_DescriptionTooShort_HasError()
    {
        var request = CreateValidRequest();
        request.Description = "Too short";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Description);
    }

    [Fact]
    public void Validate_DescriptionTooLong_HasError()
    {
        var longDescription = new string('A', SharedValidationRules.DescriptionMaxLength + 1);
        var request = CreateValidRequest();
        request.Description = longDescription;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Description);
    }

    [Fact]
    public void Validate_DescriptionTooFewWords_HasError()
    {
        // Less than 3 words but meets character count
        var request = CreateValidRequest();
        request.Description = "SingleWordDescriptionThatIsTwentyCharsPlus";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Description);
    }

    #endregion

    #region Category Validation Tests

    [Fact]
    public void Validate_ValidCategoryId_NoErrors()
    {
        var request = CreateValidRequest();
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.CategoryId);
    }

    [Fact]
    public void Validate_EmptyCategoryId_HasError()
    {
        var request = CreateValidRequest();
        request.CategoryId = Guid.Empty;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.CategoryId)
            .WithErrorMessage("Category is required.");
    }

    #endregion

    #region Points Cost Validation Tests

    [Fact]
    public void Validate_ValidPointsCost_NoErrors()
    {
        var request = CreateValidRequest();
        request.PointsCost = 500;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.PointsCost);
    }

    [Fact]
    public void Validate_ZeroPointsCost_HasError()
    {
        var request = CreateValidRequest();
        request.PointsCost = 0;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.PointsCost);
    }

    [Fact]
    public void Validate_NegativePointsCost_HasError()
    {
        var request = CreateValidRequest();
        request.PointsCost = -100;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.PointsCost);
    }

    [Fact]
    public void Validate_PointsCostAboveMax_HasError()
    {
        var request = CreateValidRequest();
        request.PointsCost = SharedValidationRules.PointsCostMax + 1;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.PointsCost);
    }

    [Fact]
    public void Validate_MinimumPointsCost_NoErrors()
    {
        var request = CreateValidRequest();
        request.PointsCost = SharedValidationRules.PointsCostMin;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.PointsCost);
    }

    [Fact]
    public void Validate_MaximumPointsCost_NoErrors()
    {
        var request = CreateValidRequest();
        request.PointsCost = SharedValidationRules.PointsCostMax;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.PointsCost);
    }

    #endregion

    #region Initial Stock Validation Tests

    [Fact]
    public void Validate_ValidInitialStock_NoErrors()
    {
        var request = CreateValidRequest();
        request.InitialStock = 100;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.InitialStock);
    }

    [Fact]
    public void Validate_ZeroInitialStock_HasError()
    {
        var request = CreateValidRequest();
        request.InitialStock = 0;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.InitialStock);
    }

    [Fact]
    public void Validate_NegativeInitialStock_HasError()
    {
        var request = CreateValidRequest();
        request.InitialStock = -1;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.InitialStock);
    }

    [Fact]
    public void Validate_InitialStockAboveMax_HasError()
    {
        var request = CreateValidRequest();
        request.InitialStock = SharedValidationRules.StockMax + 1;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.InitialStock);
    }

    [Fact]
    public void Validate_MinimumInitialStock_NoErrors()
    {
        var request = CreateValidRequest();
        request.InitialStock = SharedValidationRules.StockMin;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.InitialStock);
    }

    #endregion

    #region Image URL Validation Tests

    [Fact]
    public void Validate_NullImageUrl_NoErrors()
    {
        var request = CreateValidRequest();
        request.ImageUrl = null;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.ImageUrl);
    }

    [Fact]
    public void Validate_EmptyImageUrl_NoErrors()
    {
        var request = CreateValidRequest();
        request.ImageUrl = "";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.ImageUrl);
    }

    [Fact]
    public void Validate_ValidHttpsImageUrl_NoErrors()
    {
        var request = CreateValidRequest();
        request.ImageUrl = "https://example.com/product.jpg";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.ImageUrl);
    }

    [Fact]
    public void Validate_HttpImageUrl_HasError()
    {
        var request = CreateValidRequest();
        request.ImageUrl = "http://example.com/product.jpg";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.ImageUrl)
            .WithErrorMessage("Image URL must be a valid HTTPS URL.");
    }

    [Fact]
    public void Validate_InvalidImageUrl_HasError()
    {
        var request = CreateValidRequest();
        request.ImageUrl = "not-a-url";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.ImageUrl);
    }

    [Fact]
    public void Validate_ImageUrlTooLong_HasError()
    {
        var longUrl = "https://example.com/" + new string('a', SharedValidationRules.ImageUrlMaxLength);
        var request = CreateValidRequest();
        request.ImageUrl = longUrl;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.ImageUrl);
    }

    #endregion

    #region Complete Request Validation Tests

    [Fact]
    public void Validate_AllFieldsValid_NoErrors()
    {
        var request = CreateValidRequest();
        
        var result = _validator.TestValidate(request);
        
        result.IsValid.Should().BeTrue();
        result.Errors.Should().BeEmpty();
    }

    [Fact]
    public void Validate_AllFieldsInvalid_HasMultipleErrors()
    {
        var request = new CreateProductRequest
        {
            Name = "",
            Description = "",
            CategoryId = Guid.Empty,
            PointsCost = 0,
            InitialStock = 0,
            ImageUrl = "http://invalid"
        };
        
        var result = _validator.TestValidate(request);
        
        result.IsValid.Should().BeFalse();
        result.Errors.Count.Should().BeGreaterThan(1);
    }

    #endregion

    #region Helper Methods

    private static CreateProductRequest CreateValidRequest()
    {
        return new CreateProductRequest
        {
            Name = "Gaming Laptop",
            Description = "This is a high-performance gaming laptop with excellent graphics and fast processing speed.",
            CategoryId = Guid.NewGuid(),
            PointsCost = 5000,
            InitialStock = 50,
            ImageUrl = "https://example.com/laptop.jpg"
        };
    }

    #endregion
}
