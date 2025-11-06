using System;
using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.Domain.Entities.Users;

public class UserPoints
{
    [Required]
    [Range(0, int.MaxValue)]
    public int EarnedPoints { get; private set; }

    [Required]
    [Range(0, int.MaxValue)]
    public int SpentPoints { get; private set; }

    [Required]
    [Range(0, int.MaxValue)]
    public int CurrentBalance { get; private set; }

    public UserPoints()
    {
        EarnedPoints = 0;
        SpentPoints = 0;
        CurrentBalance = 0;
    }

    public void AddPoints(int points)
    {
        // Use ValidationGuards for validation
        ValidationGuards.ValidatePositiveNumber(points, "Points to add");

        EarnedPoints += points;
        CurrentBalance += points;
    }

    public void SpendPoints(int points)
    {
        // Use ValidationGuards for validation
        ValidationGuards.ValidatePositiveNumber(points, "Points to spend");

        if (CurrentBalance < points)
            throw new DomainException($"Insufficient points. Balance: {CurrentBalance}, Requested: {points}");

        SpentPoints += points;
        CurrentBalance -= points;
    }

    public bool HasSufficientPoints(int requiredPoints) => CurrentBalance >= requiredPoints;

    public void RefundPoints(int points)
    {
        ValidationGuards.ValidatePositiveNumber(points, "Points to refund");

        // Reduce spent points but keep earned points
        SpentPoints -= points;
        CurrentBalance += points;
    }

    public override string? ToString() => $"Balance: {CurrentBalance} (Earned: {EarnedPoints}, Spent: {SpentPoints})";
}
