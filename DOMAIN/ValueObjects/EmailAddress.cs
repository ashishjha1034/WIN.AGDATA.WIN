using System.Text.RegularExpressions;

namespace WIN.AGDATA.WIN.Domain.ValueObjects;

public record EmailAddress
{
    private static readonly Regex EmailRegex = new Regex(
        @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$",
        RegexOptions.Compiled | RegexOptions.IgnoreCase);

    [Required]
    [EmailAddress]
    public string Value { get; }

    public EmailAddress(string email)
    {
        Value = ValidationGuards.ValidateAndNormalizeEmail(email);
    }

    public static implicit operator string(EmailAddress email) => email.Value;
    public static explicit operator EmailAddress(string email) => new(email);

    public override string ToString() => Value;
}
