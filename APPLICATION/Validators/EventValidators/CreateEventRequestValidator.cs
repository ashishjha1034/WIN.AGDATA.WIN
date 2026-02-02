using FluentValidation;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

namespace WIN.AGDATA.WIN.APPLICATION.Validators.EventValidators;

/// <summary>
/// FluentValidation validator for CreateEventRequest DTO.
/// Enforces all event validation rules for creation.
/// </summary>
public class CreateEventRequestValidator : AbstractValidator<CreateEventRequest>
{
    public CreateEventRequestValidator()
    {
        // Event Name: Required, unique, alphanumeric words only, 1-7 words, 2-50 chars (excluding spaces)
        RuleFor(x => x.Name)
            .NotEmpty()
            .WithMessage("Event name is required.")
            .Must(name => !string.IsNullOrWhiteSpace(name) && name == name.Trim())
            .WithMessage("Event name cannot have leading or trailing spaces.")
            .Must(name => name == null || !name.Contains("  "))
            .WithMessage("Event name cannot have consecutive spaces. Use single spaces only.")
            .Must(name =>
            {
                if (string.IsNullOrWhiteSpace(name)) return true;
                var charCount = name.Trim().Replace(" ", "").Length;
                return charCount >= SharedValidationRules.EventNameMinLength;
            })
            .WithMessage($"Event name must have at least {SharedValidationRules.EventNameMinLength} characters (excluding spaces).")
            .Must(name =>
            {
                if (string.IsNullOrWhiteSpace(name)) return true;
                var charCount = name.Trim().Replace(" ", "").Length;
                return charCount <= SharedValidationRules.EventNameMaxLength;
            })
            .WithMessage($"Event name cannot exceed {SharedValidationRules.EventNameMaxLength} characters (excluding spaces).")
            .Must(name =>
            {
                if (string.IsNullOrWhiteSpace(name)) return true;
                var words = name.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);
                return words.Length >= SharedValidationRules.EventNameMinWords;
            })
            .WithMessage($"Event name must have at least {SharedValidationRules.EventNameMinWords} word(s).")
            .Must(name =>
            {
                if (string.IsNullOrWhiteSpace(name)) return true;
                var words = name.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);
                return words.Length <= SharedValidationRules.EventNameMaxWords;
            })
            .WithMessage($"Event name cannot exceed {SharedValidationRules.EventNameMaxWords} words.")
            .Must(SharedValidationRules.IsAlphanumericWords)
            .WithMessage("Event name must contain only alphanumeric words (letters and numbers only, separated by single spaces).");

        // Description: Required, 20-500 chars, 3-100 words
        RuleFor(x => x.Description)
            .NotEmpty()
            .WithMessage("Description is required.")
            .Must(desc =>
            {
                if (string.IsNullOrWhiteSpace(desc)) return true;
                return desc.Trim().Length >= SharedValidationRules.EventDescriptionMinLength;
            })
            .WithMessage($"Description must have at least {SharedValidationRules.EventDescriptionMinLength} characters.")
            .Must(desc =>
            {
                if (string.IsNullOrWhiteSpace(desc)) return true;
                return desc.Trim().Length <= SharedValidationRules.EventDescriptionMaxLength;
            })
            .WithMessage($"Description cannot exceed {SharedValidationRules.EventDescriptionMaxLength} characters.")
            .Must(desc =>
            {
                if (string.IsNullOrWhiteSpace(desc)) return true;
                var words = desc.Trim().Split(new[] { ' ', '\t', '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries);
                return words.Length >= SharedValidationRules.EventDescriptionMinWords;
            })
            .WithMessage($"Description must have at least {SharedValidationRules.EventDescriptionMinWords} words.")
            .Must(desc =>
            {
                if (string.IsNullOrWhiteSpace(desc)) return true;
                var words = desc.Trim().Split(new[] { ' ', '\t', '\n', '\r' }, StringSplitOptions.RemoveEmptyEntries);
                return words.Length <= SharedValidationRules.EventDescriptionMaxWords;
            })
            .WithMessage($"Description cannot exceed {SharedValidationRules.EventDescriptionMaxWords} words.");

        // Location: Optional, but if provided must be alphanumeric words, 2-100 chars, max 16 words
        RuleFor(x => x.Location)
            .Must(loc =>
            {
                if (string.IsNullOrWhiteSpace(loc)) return true;
                return loc == loc.Trim();
            })
            .WithMessage("Location cannot have leading or trailing spaces.")
            .Must(loc =>
            {
                if (string.IsNullOrWhiteSpace(loc)) return true;
                return !loc.Contains("  ");
            })
            .WithMessage("Location cannot have consecutive spaces. Use single spaces only.")
            .Must(loc =>
            {
                if (string.IsNullOrWhiteSpace(loc)) return true;
                var charCount = loc.Trim().Replace(" ", "").Length;
                return charCount >= SharedValidationRules.EventLocationMinLength;
            })
            .WithMessage($"Location must have at least {SharedValidationRules.EventLocationMinLength} characters (excluding spaces).")
            .When(x => !string.IsNullOrWhiteSpace(x.Location))
            .Must(loc =>
            {
                if (string.IsNullOrWhiteSpace(loc)) return true;
                var charCount = loc.Trim().Replace(" ", "").Length;
                return charCount <= SharedValidationRules.EventLocationMaxLength;
            })
            .WithMessage($"Location cannot exceed {SharedValidationRules.EventLocationMaxLength} characters (excluding spaces).")
            .Must(loc =>
            {
                if (string.IsNullOrWhiteSpace(loc)) return true;
                var words = loc.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);
                return words.Length <= SharedValidationRules.EventLocationMaxWords;
            })
            .WithMessage($"Location cannot exceed {SharedValidationRules.EventLocationMaxWords} words.")
            .Must(loc => string.IsNullOrWhiteSpace(loc) || SharedValidationRules.IsAlphanumericWords(loc))
            .WithMessage("Location must contain only alphanumeric words (letters and numbers only, separated by single spaces).");

        // Event Date: Required, must be in the future
        RuleFor(x => x.EventDate)
            .NotEmpty()
            .WithMessage("Event date is required.")
            .Must(date => date > DateTime.UtcNow)
            .WithMessage("Event date must be in the future.");

        // Registration End Date: Required, must be in the future, must be before EventDate
        RuleFor(x => x.RegistrationEndDateUtc)
            .NotEmpty()
            .WithMessage("Registration deadline is required.")
            .Must(date => date > DateTime.UtcNow)
            .WithMessage("Registration deadline must be in the future.")
            .Must((request, regEnd) => regEnd < request.EventDate)
            .WithMessage("Registration deadline must be strictly earlier than event date. Same day is allowed if times differ.");

        // Max Participants: Optional, but if provided must be 1-100,000
        RuleFor(x => x.MaxParticipants)
            .GreaterThanOrEqualTo(SharedValidationRules.EventMaxParticipantsMin)
            .WithMessage($"Max participants must be at least {SharedValidationRules.EventMaxParticipantsMin}. Zero is not allowed.")
            .When(x => x.MaxParticipants.HasValue)
            .LessThanOrEqualTo(SharedValidationRules.EventMaxParticipantsMax)
            .WithMessage($"Max participants cannot exceed {SharedValidationRules.EventMaxParticipantsMax:N0}.")
            .When(x => x.MaxParticipants.HasValue);

        // Total Points Pool: Optional, but if provided must be 1-1,000,000
        RuleFor(x => x.TotalPointsPool)
            .GreaterThanOrEqualTo(SharedValidationRules.EventPointsPoolMin)
            .WithMessage($"Points pool must be at least {SharedValidationRules.EventPointsPoolMin}. Zero is not allowed.")
            .When(x => x.TotalPointsPool.HasValue)
            .LessThanOrEqualTo(SharedValidationRules.EventPointsPoolMax)
            .WithMessage($"Points pool cannot exceed {SharedValidationRules.EventPointsPoolMax:N0}.")
            .When(x => x.TotalPointsPool.HasValue);

        // Banner Image URL: Optional, but if provided must be valid HTTPS URL
        RuleFor(x => x.BannerImageUrl)
            .Must(url =>
            {
                if (string.IsNullOrWhiteSpace(url)) return true;
                return Uri.TryCreate(url, UriKind.Absolute, out var uri) && 
                       uri.Scheme.Equals("https", StringComparison.OrdinalIgnoreCase);
            })
            .WithMessage("Banner image URL must be a valid HTTPS URL.")
            .When(x => !string.IsNullOrWhiteSpace(x.BannerImageUrl))
            .MaximumLength(SharedValidationRules.ImageUrlMaxLength)
            .WithMessage($"Banner image URL cannot exceed {SharedValidationRules.ImageUrlMaxLength} characters.")
            .When(x => !string.IsNullOrWhiteSpace(x.BannerImageUrl));
    }
}
