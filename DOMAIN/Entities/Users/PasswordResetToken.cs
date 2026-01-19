using WIN.AGDATA.WIN.Domain.Common;

namespace WIN.AGDATA.WIN.Domain.Entities.Users;

public class PasswordResetToken
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Token { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public DateTime ExpiresAt { get; set; }
    public bool IsUsed { get; set; } = false;
    public DateTime? UsedAt { get; set; }

    // Navigation property
    public User User { get; set; } = null!;

    // Constructor for creating new token
    public PasswordResetToken(Guid userId, string token, int expiryMinutes = 30)
    {
        Id = Guid.NewGuid();
        UserId = userId;
        Token = token;
        CreatedAt = DateTime.UtcNow;
        ExpiresAt = DateTime.UtcNow.AddMinutes(expiryMinutes);
        IsUsed = false;
    }

    // For EF Core
    public PasswordResetToken() { }

    // Method to mark token as used
    public void MarkAsUsed()
    {
        IsUsed = true;
        UsedAt = DateTime.UtcNow;
    }

    // Check if token is still valid
    public bool IsValid() => !IsUsed && DateTime.UtcNow <= ExpiresAt;
}
