using System;
using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.Domain.Entities.Transactions;

/// <summary>
/// Consolidated points transaction entity
/// Represents earning, spending, or refund of points
/// Replaces separate PointsEarning, PointsSpending classes
/// </summary>
public class PointsTransaction
{
    [Key]
    [Required]
    public Guid Id { get; private set; }

    [Required]
    [StringLength(20, MinimumLength = 3)]
    public string EmployeeId { get; private set; }

    [Required]
    [Range(1, 10000)]
    public int Points { get; private set; }

    [Required]
    [EnumDataType(typeof(PointsTransactionType))]
    public PointsTransactionType Type { get; private set; }

    [Required]
    [StringLength(500)]
    public string Description { get; private set; }

    [StringLength(20)]
    public string? EventId { get; private set; }

    public Guid? RedemptionId { get; private set; }

    [Required]
    public DateTime TransactionDate { get; private set; }

    public PointsTransaction(
        string employeeId,
        int points,
        PointsTransactionType type,
        string description,
        string? eventId = null,
        Guid? redemptionId = null)
    {
        Id = Guid.NewGuid();
        EmployeeId = ValidationGuards.ValidateAndNormalizeId(employeeId, "Employee ID");
        ValidationGuards.ValidatePoints(points, 1, 10000); // Validate only
        Points = points; // Assign after validation
        Type = type;
        Description = ValidationGuards.ValidateAndNormalizeName(description, "Description", 5, 500);
        EventId = eventId;
        RedemptionId = redemptionId;
        TransactionDate = DateTime.UtcNow;
    }


    public override string? ToString() => $"{Type}: {Points} points on {TransactionDate:yyyy-MM-dd}";
}
