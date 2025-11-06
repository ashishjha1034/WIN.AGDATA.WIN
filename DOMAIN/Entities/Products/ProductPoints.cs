using System;
using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.Domain.Entities.Products;

public class ProductPoints
{
    [Required]
    [Range(1, 100000)]
    public int RequiredPoints { get; private set; }

    [Required]
    public DateTime LastUpdated { get; private set; }

    private ProductPoints() { }

    public ProductPoints(int requiredPoints)
    {
        ValidationGuards.ValidatePoints(requiredPoints, 1, 100000);
        RequiredPoints = requiredPoints;
        LastUpdated = DateTime.UtcNow;
    }

    public void UpdatePoints(int newPoints)
    {
        ValidationGuards.ValidatePoints(newPoints, 1, 100000);
        RequiredPoints = newPoints;
        LastUpdated = DateTime.UtcNow;
    }

    public bool HasSufficientPoints(int userPoints) => userPoints >= RequiredPoints;

    // Keep for backward compatibility
    public bool CanAfford(int userPoints) => HasSufficientPoints(userPoints);

    public override string? ToString() => $"{RequiredPoints} points";
}
