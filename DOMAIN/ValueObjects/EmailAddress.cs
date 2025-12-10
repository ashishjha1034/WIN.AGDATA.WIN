namespace WIN.AGDATA.WIN.Domain.ValueObjects;

public sealed record EmailAddress
{
    public string Value { get; private set; }

    private EmailAddress(string value)
    {
        Value = value;
    }

    public static EmailAddress Create(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
            throw new ArgumentException("Email cannot be empty", nameof(email));

        if (!email.Contains("@") || !email.Contains("."))
            throw new ArgumentException("Invalid email format", nameof(email));

        return new EmailAddress(email.Trim().ToLowerInvariant());
    }

    public override string ToString() => Value;
}