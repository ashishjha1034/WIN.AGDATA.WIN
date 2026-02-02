using WIN.AGDATA.WIN.Domain.Common;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Domain.Entities.Users;

public class UserPointsAccount : Entity<Guid>
{
    public Guid UserId { get; private set; }
    public decimal CurrentBalance { get; private set; } = 0;
    public decimal TotalEarned { get; private set; } = 0;
    public decimal TotalRedeemed { get; private set; } = 0;
    public DateTime LastUpdatedAt { get; private set; }

    // Navigation
    public User User { get; private set; } = null!;

    // EF Core requires parameterless constructor
    internal UserPointsAccount() { }

    public UserPointsAccount(Guid userId)
        : base(Guid.NewGuid())
    {
        UserId = userId;
        CurrentBalance = 0;
        TotalEarned = 0;
        TotalRedeemed = 0;
        LastUpdatedAt = DateTime.UtcNow;
    }

    public decimal Balance => CurrentBalance;
    public void Credit(decimal points, Guid transactionId)
    {
        if (points <= 0) throw new DomainException("Points must be positive");
        CurrentBalance += points;
        TotalEarned += points;
        UpdateAudit(transactionId);
    }

    public void Debit(decimal points, Guid transactionId)
    {
        if (points <= 0) throw new DomainException("Points must be positive");
        if (CurrentBalance < points) throw new DomainException("Insufficient points balance");
        CurrentBalance -= points;
        TotalRedeemed += points;
        UpdateAudit(transactionId);
    }

    
    public void AddPoints(decimal points, Guid processedBy)
        => Credit(points, processedBy);

    public void SpendPoints(decimal points, Guid processedBy)
        => Debit(points, processedBy);

    public void RefundPoints(decimal points, Guid processedBy, string reason)
        => Credit(points, processedBy);

    public void AdjustPoints(decimal points, Guid processedBy, string reason)
    {
        if (points > 0)
            Credit(points, processedBy);
        else
            Debit(Math.Abs(points), processedBy);
    }

    private void UpdateAudit(Guid processedBy)
    {
        LastUpdatedAt = DateTime.UtcNow;
        UpdatedBy = processedBy;
    }

}