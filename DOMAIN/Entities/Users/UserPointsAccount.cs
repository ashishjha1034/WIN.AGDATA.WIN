using WIN.AGDATA.WIN.Domain.Common;

namespace WIN.AGDATA.WIN.Domain.Entities.Users;

public class UserPointsAccount : Entity<Guid>
{
    public Guid Id { get; private set; }
    public Guid UserId { get; private set; }
    public int CurrentBalance { get; private set; }
    public int TotalEarned { get; private set; }
    public int TotalRedeemed { get; private set; }
    public DateTime LastUpdatedAt { get; private set; }
    public Guid? UpdatedBy { get; private set; }

    // Navigation
    public User User { get; private set; } = null!;

    private UserPointsAccount() { }

    public UserPointsAccount(Guid userId)
    {
        Id = Guid.NewGuid();
        UserId = userId;
        CurrentBalance = 0;
        TotalEarned = 0;
        TotalRedeemed = 0;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public void AddPoints(int points, Guid processedBy)
    {
        if (points <= 0) throw new DomainException("Points must be positive");
        CurrentBalance += points;
        TotalEarned += points;
        UpdateAudit(processedBy);
    }

    public void SpendPoints(int points, Guid processedBy)
    {
        if (points <= 0) throw new DomainException("Points must be positive");
        if (CurrentBalance < points) throw new DomainException("Insufficient points");
        CurrentBalance -= points;
        TotalRedeemed += points;
        UpdateAudit(processedBy);
    }

    private void UpdateAudit(Guid processedBy)
    {
        LastUpdatedAt = DateTime.UtcNow;
        UpdatedBy = processedBy;
    }
}