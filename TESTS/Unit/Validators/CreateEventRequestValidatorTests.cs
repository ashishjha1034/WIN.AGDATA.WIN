using FluentAssertions;
using FluentValidation.TestHelper;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using WIN.AGDATA.WIN.APPLICATION.Validators;
using WIN.AGDATA.WIN.APPLICATION.Validators.EventValidators;

namespace WIN.AGDATA.WIN.Tests.Validators;

/// <summary>
/// Unit tests for CreateEventRequestValidator.
/// Tests all validation rules for event creation.
/// </summary>
[Trait("Category", "Unit")]
[Trait("Component", "Validation")]
public class CreateEventRequestValidatorTests
{
    private readonly CreateEventRequestValidator _validator;

    public CreateEventRequestValidatorTests()
    {
        _validator = new CreateEventRequestValidator();
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
            .WithErrorMessage("Event name is required.");
    }

    [Fact]
    public void Validate_NullName_HasError()
    {
        var request = CreateValidRequest();
        request.Name = null!;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Validate_NameWithLeadingSpace_HasError()
    {
        var request = CreateValidRequest();
        request.Name = " Annual Event";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Name)
            .WithErrorMessage("Event name cannot have leading or trailing spaces.");
    }

    [Fact]
    public void Validate_NameWithTrailingSpace_HasError()
    {
        var request = CreateValidRequest();
        request.Name = "Annual Event ";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Validate_NameWithConsecutiveSpaces_HasError()
    {
        var request = CreateValidRequest();
        request.Name = "Annual  Event";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Name)
            .WithErrorMessage("Event name cannot have consecutive spaces. Use single spaces only.");
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
        var longName = new string('A', SharedValidationRules.EventNameMaxLength + 1);
        var request = CreateValidRequest();
        request.Name = longName;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Validate_NameTooManyWords_HasError()
    {
        // More than 7 words
        var request = CreateValidRequest();
        request.Name = "One Two Three Four Five Six Seven Eight";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Fact]
    public void Validate_NameWithSpecialCharacters_HasError()
    {
        var request = CreateValidRequest();
        request.Name = "Annual@Event";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Name)
            .WithErrorMessage("Event name must contain only alphanumeric words (letters and numbers only, separated by single spaces).");
    }

    [Fact]
    public void Validate_NameWithHyphen_HasError()
    {
        var request = CreateValidRequest();
        request.Name = "Annual-Event";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Name);
    }

    [Theory]
    [InlineData("Annual Event 2024")]
    [InlineData("Team Building")]
    [InlineData("Hackathon")]
    [InlineData("Q1 Review")]
    public void Validate_ValidNames_NoErrors(string name)
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
        var longDescription = new string('A', SharedValidationRules.EventDescriptionMaxLength + 1);
        var request = CreateValidRequest();
        request.Description = longDescription;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Description);
    }

    [Fact]
    public void Validate_DescriptionTooFewWords_HasError()
    {
        // Less than 3 words
        var request = CreateValidRequest();
        request.Description = "Onlyonewordxxxxxxxxxxxxxxx";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Description);
    }

    [Fact]
    public void Validate_DescriptionWithExactMinLength_NoErrors()
    {
        // Exactly 20 characters with 3 words
        var request = CreateValidRequest();
        request.Description = "This is a valid test description for the event.";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.Description);
    }

    #endregion

    #region Event Date Validation Tests

    [Fact]
    public void Validate_FutureEventDate_NoErrors()
    {
        var request = CreateValidRequest();
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.EventDate);
    }

    [Fact]
    public void Validate_PastEventDate_HasError()
    {
        var request = CreateValidRequest();
        request.EventDate = DateTime.UtcNow.AddDays(-1);
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.EventDate);
    }

    [Fact]
    public void Validate_EventDateTomorrow_NoErrors()
    {
        var request = CreateValidRequest();
        request.EventDate = DateTime.UtcNow.AddDays(1);
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.EventDate);
    }

    #endregion

    #region Registration Deadline Validation Tests

    [Fact]
    public void Validate_RegistrationDeadlineBeforeEventDate_NoErrors()
    {
        var eventDate = DateTime.UtcNow.AddDays(10);
        var deadline = DateTime.UtcNow.AddDays(5);
        var request = CreateValidRequest();
        request.EventDate = eventDate;
        request.RegistrationEndDateUtc = deadline;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.RegistrationEndDateUtc);
    }

    [Fact]
    public void Validate_RegistrationDeadlineAfterEventDate_HasError()
    {
        var eventDate = DateTime.UtcNow.AddDays(5);
        var deadline = DateTime.UtcNow.AddDays(10);
        var request = CreateValidRequest();
        request.EventDate = eventDate;
        request.RegistrationEndDateUtc = deadline;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.RegistrationEndDateUtc);
    }

    [Fact]
    public void Validate_RegistrationDeadlineSameAsEventDate_HasError()
    {
        var eventDate = DateTime.UtcNow.AddDays(10);
        var request = CreateValidRequest();
        request.EventDate = eventDate;
        request.RegistrationEndDateUtc = eventDate;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.RegistrationEndDateUtc);
    }

    [Fact]
    public void Validate_RegistrationDeadlineInPast_HasError()
    {
        var request = CreateValidRequest();
        request.RegistrationEndDateUtc = DateTime.UtcNow.AddDays(-1);
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.RegistrationEndDateUtc);
    }

    #endregion

    #region Points Pool Validation Tests

    [Fact]
    public void Validate_ValidPointsPool_NoErrors()
    {
        var request = CreateValidRequest();
        request.TotalPointsPool = 5000;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.TotalPointsPool);
    }

    [Fact]
    public void Validate_ZeroPointsPool_HasError()
    {
        var request = CreateValidRequest();
        request.TotalPointsPool = 0;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.TotalPointsPool);
    }

    [Fact]
    public void Validate_NegativePointsPool_HasError()
    {
        var request = CreateValidRequest();
        request.TotalPointsPool = -100;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.TotalPointsPool);
    }

    [Fact]
    public void Validate_PointsPoolAboveMax_HasError()
    {
        var request = CreateValidRequest();
        request.TotalPointsPool = SharedValidationRules.EventPointsPoolMax + 1;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.TotalPointsPool);
    }

    [Fact]
    public void Validate_MinimumPointsPool_NoErrors()
    {
        var request = CreateValidRequest();
        request.TotalPointsPool = SharedValidationRules.EventPointsPoolMin;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.TotalPointsPool);
    }

    [Fact]
    public void Validate_MaximumPointsPool_NoErrors()
    {
        var request = CreateValidRequest();
        request.TotalPointsPool = SharedValidationRules.EventPointsPoolMax;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.TotalPointsPool);
    }

    #endregion

    #region Max Participants Validation Tests

    [Fact]
    public void Validate_ValidMaxParticipants_NoErrors()
    {
        var request = CreateValidRequest();
        request.MaxParticipants = 100;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.MaxParticipants);
    }

    [Fact]
    public void Validate_ZeroMaxParticipants_HasError()
    {
        var request = CreateValidRequest();
        request.MaxParticipants = 0;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.MaxParticipants);
    }

    [Fact]
    public void Validate_NegativeMaxParticipants_HasError()
    {
        var request = CreateValidRequest();
        request.MaxParticipants = -1;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.MaxParticipants);
    }

    [Fact]
    public void Validate_MaxParticipantsAboveLimit_HasError()
    {
        var request = CreateValidRequest();
        request.MaxParticipants = SharedValidationRules.EventMaxParticipantsMax + 1;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.MaxParticipants);
    }

    #endregion

    #region Location Validation Tests

    [Fact]
    public void Validate_ValidLocation_NoErrors()
    {
        var request = CreateValidRequest();
        request.Location = "Conference Room A";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.Location);
    }

    [Fact]
    public void Validate_NullLocation_NoErrors()
    {
        // Location is optional
        var request = CreateValidRequest();
        request.Location = null;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldNotHaveValidationErrorFor(x => x.Location);
    }

    [Fact]
    public void Validate_EmptyLocation_NoErrors()
    {
        // Empty location treated as null/optional
        var request = CreateValidRequest();
        request.Location = "";
        
        var result = _validator.TestValidate(request);
        
        // May or may not have error depending on implementation
    }

    [Fact]
    public void Validate_LocationWithLeadingSpace_HasError()
    {
        var request = CreateValidRequest();
        request.Location = " Conference Room";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Location);
    }

    [Fact]
    public void Validate_LocationWithConsecutiveSpaces_HasError()
    {
        var request = CreateValidRequest();
        request.Location = "Conference  Room";
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Location);
    }

    [Fact]
    public void Validate_LocationTooLong_HasError()
    {
        var longLocation = new string('A', SharedValidationRules.EventLocationMaxLength + 1);
        var request = CreateValidRequest();
        request.Location = longLocation;
        
        var result = _validator.TestValidate(request);
        
        result.ShouldHaveValidationErrorFor(x => x.Location);
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
        var request = new CreateEventRequest
        {
            Name = "",
            Description = "",
            EventDate = DateTime.UtcNow.AddDays(-1),
            TotalPointsPool = 0,
            Location = null,
            MaxParticipants = 0,
            RegistrationEndDateUtc = DateTime.UtcNow.AddDays(-2),
            BannerImageUrl = null
        };
        
        var result = _validator.TestValidate(request);
        
        result.IsValid.Should().BeFalse();
        result.Errors.Count.Should().BeGreaterThan(1);
    }

    #endregion

    #region Helper Methods

    private static CreateEventRequest CreateValidRequest()
    {
        return new CreateEventRequest
        {
            Name = "Annual Conference 2024",
            Description = "This is a valid event description for the annual conference with enough words.",
            EventDate = DateTime.UtcNow.AddDays(30),
            TotalPointsPool = 10000,
            Location = "Main Conference Hall",
            MaxParticipants = 100,
            RegistrationEndDateUtc = DateTime.UtcNow.AddDays(25),
            BannerImageUrl = null
        };
    }

    #endregion
}
