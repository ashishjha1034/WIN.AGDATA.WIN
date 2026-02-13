using FluentAssertions;
using WIN.AGDATA.WIN.APPLICATION.Validators;

namespace WIN.AGDATA.WIN.Tests.Validators;

/// <summary>
/// Unit tests for SharedValidationRules utility methods.
/// Covers corporate email validation, alphanumeric checks, date validation, etc.
/// </summary>
[Trait("Category", "Unit")]
[Trait("Component", "Validation")]
public class SharedValidationRulesTests
{
    #region Corporate Email Validation Tests

    [Theory]
    [InlineData("john.doe@agdata.com", true)]
    [InlineData("admin@agdata.com", true)]
    [InlineData("test123@agdata.com", true)]
    [InlineData("first.last@agdata.com", true)]
    public void IsValidCorporateEmail_ValidEmails_ReturnsTrue(string email, bool expected)
    {
        SharedValidationRules.IsValidCorporateEmail(email).Should().Be(expected);
    }

    [Theory]
    [InlineData("john@gmail.com")] // Wrong domain
    [InlineData("test@agdata.co")] // Close but wrong
    [InlineData("abc@agdata.com")] // Local part < 5 chars
    [InlineData("ab@agdata.com")] // Local part < 5 chars
    [InlineData("@agdata.com")] // No local part
    [InlineData("")] // Empty
    [InlineData(null)] // Null
    public void IsValidCorporateEmail_InvalidEmails_ReturnsFalse(string? email)
    {
        SharedValidationRules.IsValidCorporateEmail(email).Should().BeFalse();
    }

    [Fact]
    public void IsValidCorporateEmail_CaseInsensitive_ReturnsTrue()
    {
        // Email domain check should be case-insensitive (local part must be >= 5 chars)
        SharedValidationRules.IsValidCorporateEmail("TESTS@AGDATA.COM").Should().BeTrue();
        SharedValidationRules.IsValidCorporateEmail("testy@AgData.COM").Should().BeTrue();
        SharedValidationRules.IsValidCorporateEmail("admin@agdata.com").Should().BeTrue();
    }

    [Fact]
    public void GetCorporateEmailErrorMessage_ReturnsFormattedMessage()
    {
        var message = SharedValidationRules.GetCorporateEmailErrorMessage();
        
        message.Should().NotBeNullOrEmpty();
        message.Should().Contain(SharedValidationRules.CorporateDomain);
        message.Should().Contain(SharedValidationRules.CorporateEmailLocalPartMinLength.ToString());
    }

    #endregion

    #region Alpha-Only Validation Tests

    [Theory]
    [InlineData("HelloWorld", true)]
    [InlineData("abc", true)]
    [InlineData("ABC", true)]
    public void IsAlphaOnly_ValidStrings_ReturnsTrue(string value, bool expected)
    {
        SharedValidationRules.IsAlphaOnly(value).Should().Be(expected);
    }

    [Theory]
    [InlineData("Hello World")] // Space
    [InlineData("Test@123")] // Special char
    [InlineData("Test123")] // Contains numbers
    [InlineData("Test-Name")] // Hyphen
    [InlineData("Test_Name")] // Underscore
    [InlineData("")] // Empty
    [InlineData(null)] // Null
    public void IsAlphaOnly_InvalidStrings_ReturnsFalse(string? value)
    {
        SharedValidationRules.IsAlphaOnly(value).Should().BeFalse();
    }

    #endregion

    #region Alphanumeric Words Validation Tests

    [Theory]
    [InlineData("Hello World", true)]
    [InlineData("Test 123 Event", true)]
    [InlineData("SingleWord", true)]
    [InlineData("123", true)]
    public void IsAlphanumericWords_ValidStrings_ReturnsTrue(string value, bool expected)
    {
        SharedValidationRules.IsAlphanumericWords(value).Should().Be(expected);
    }

    [Theory]
    [InlineData("Hello  World")] // Double space
    [InlineData("Test@Event")] // Special char
    [InlineData("Test-Event")] // Hyphen
    [InlineData(" Leading")] // Leading space
    [InlineData("Trailing ")] // Trailing space
    [InlineData("")] // Empty
    [InlineData(null)] // Null
    public void IsAlphanumericWords_InvalidStrings_ReturnsFalse(string? value)
    {
        SharedValidationRules.IsAlphanumericWords(value).Should().BeFalse();
    }

    #endregion

    #region Date Validation Tests

    [Fact]
    public void ValidateEventDates_FutureEventDate_ReturnsValid()
    {
        var eventDate = DateTime.UtcNow.AddDays(10);
        var registrationEndDate = DateTime.UtcNow.AddDays(5);
        
        var result = SharedValidationRules.ValidateEventDates(eventDate, registrationEndDate);
        
        result.isValid.Should().BeTrue();
        result.errorMessage.Should().BeNull();
    }

    [Fact]
    public void ValidateEventDates_PastEventDate_ReturnsInvalid()
    {
        var eventDate = DateTime.UtcNow.AddDays(-1);
        var registrationEndDate = DateTime.UtcNow.AddDays(-5);
        
        var result = SharedValidationRules.ValidateEventDates(eventDate, registrationEndDate);
        
        result.isValid.Should().BeFalse();
    }

    [Fact]
    public void ValidateEventDates_RegistrationBeforeEventDate_ReturnsValid()
    {
        var eventDate = DateTime.UtcNow.AddDays(10);
        var deadline = DateTime.UtcNow.AddDays(5);
        
        var result = SharedValidationRules.ValidateEventDates(eventDate, deadline);
        
        result.isValid.Should().BeTrue();
    }

    [Fact]
    public void ValidateEventDates_RegistrationAfterEventDate_ReturnsInvalid()
    {
        var eventDate = DateTime.UtcNow.AddDays(5);
        var deadline = DateTime.UtcNow.AddDays(10);
        
        var result = SharedValidationRules.ValidateEventDates(eventDate, deadline);
        
        result.isValid.Should().BeFalse();
    }

    [Fact]
    public void ValidateEventDates_RegistrationSameAsEventDate_ReturnsInvalid()
    {
        var eventDate = DateTime.UtcNow.AddDays(10);
        
        var result = SharedValidationRules.ValidateEventDates(eventDate, eventDate);
        
        result.isValid.Should().BeFalse();
    }

    #endregion

    #region Name Length Validation Tests

    [Fact]
    public void IsNameLengthValid_ValidLength_ReturnsTrue()
    {
        var validName = "Test";
        var isValid = validName.Length >= SharedValidationRules.NameMinLength && 
                     validName.Length <= SharedValidationRules.NameMaxLength;
        
        isValid.Should().BeTrue();
    }

    [Fact]
    public void IsNameLengthValid_TooShort_ReturnsFalse()
    {
        var shortName = "A";
        var isValid = shortName.Length >= SharedValidationRules.NameMinLength;
        
        isValid.Should().BeFalse();
    }

    [Fact]
    public void IsNameLengthValid_TooLong_ReturnsFalse()
    {
        var longName = new string('A', SharedValidationRules.NameMaxLength + 1);
        var isValid = longName.Length <= SharedValidationRules.NameMaxLength;
        
        isValid.Should().BeFalse();
    }

    #endregion

    #region Employee ID Validation Tests

    [Fact]
    public void EmployeeIdLength_IsCorrect()
    {
        SharedValidationRules.EmployeeIdLength.Should().Be(9);
    }

    [Theory]
    [InlineData("EMPLO0001", true)]
    [InlineData("ABCDE1234", true)]
    public void EmployeeId_ValidFormat_PassesLengthCheck(string employeeId, bool expectedValid)
    {
        var isValidLength = employeeId.Length == SharedValidationRules.EmployeeIdLength;
        isValidLength.Should().Be(expectedValid);
    }

    [Theory]
    [InlineData("EMP001")] // Too short
    [InlineData("EMPLOYEE001")] // Too long
    public void EmployeeId_InvalidLength_FailsCheck(string employeeId)
    {
        var isValidLength = employeeId.Length == SharedValidationRules.EmployeeIdLength;
        isValidLength.Should().BeFalse();
    }

    #endregion

    #region Password Validation Constants Tests

    [Fact]
    public void PasswordMinLength_IsReasonable()
    {
        SharedValidationRules.PasswordMinLength.Should().BeGreaterThanOrEqualTo(8);
        SharedValidationRules.PasswordMinLength.Should().Be(12); // Current value
    }

    #endregion

    #region Product Validation Constants Tests

    [Fact]
    public void ProductNameMaxWords_IsSet()
    {
        SharedValidationRules.ProductNameMaxWords.Should().Be(4);
    }

    [Fact]
    public void DescriptionMinLength_IsReasonable()
    {
        SharedValidationRules.DescriptionMinLength.Should().Be(20);
    }

    [Fact]
    public void DescriptionMaxLength_IsReasonable()
    {
        SharedValidationRules.DescriptionMaxLength.Should().Be(500);
    }

    [Fact]
    public void PointsCostMin_IsPositive()
    {
        SharedValidationRules.PointsCostMin.Should().Be(1);
    }

    [Fact]
    public void StockMin_IsPositive()
    {
        SharedValidationRules.StockMin.Should().Be(1);
    }

    #endregion

    #region Event Validation Constants Tests

    [Fact]
    public void EventNameMinLength_IsSet()
    {
        SharedValidationRules.EventNameMinLength.Should().Be(2);
    }

    [Fact]
    public void EventNameMaxLength_IsSet()
    {
        SharedValidationRules.EventNameMaxLength.Should().Be(50);
    }

    [Fact]
    public void EventNameMaxWords_IsSet()
    {
        SharedValidationRules.EventNameMaxWords.Should().Be(7);
    }

    [Fact]
    public void EventMaxParticipantsMin_IsPositive()
    {
        SharedValidationRules.EventMaxParticipantsMin.Should().Be(1);
    }

    [Fact]
    public void EventMaxParticipantsMax_IsReasonable()
    {
        SharedValidationRules.EventMaxParticipantsMax.Should().Be(100_000);
    }

    [Fact]
    public void EventPointsPoolMin_IsPositive()
    {
        SharedValidationRules.EventPointsPoolMin.Should().Be(1);
    }

    [Fact]
    public void EventPointsPoolMax_IsReasonable()
    {
        SharedValidationRules.EventPointsPoolMax.Should().Be(1_000_000);
    }

    #endregion
}
