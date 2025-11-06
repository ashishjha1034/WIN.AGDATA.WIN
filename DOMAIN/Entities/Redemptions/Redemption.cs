using System;
using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.Domain.Entities.Redemptions;

public class Redemption
{
    [Key]
    [Required]
    public Guid Id { get; private set; }

    [Required]
    [StringLength(20, MinimumLength = 3)]
    public string EmployeeId { get; private set; }

    [Required]
    public Guid ProductId { get; private set; }

    [Required]
    [Range(1, 10000)]
    public int PointsCost { get; private set; }

    [Required]
    public RedemptionStatus Status { get; private set; }

    [Required]
    public DateTime RequestedAt { get; private set; }

    [Required]
    [StringLength(50)]
    public string CreatedBy { get; private set; }

    private Redemption() { }

    public Redemption(string employeeId, Guid productId, int pointsCost)
    {
        Id = Guid.NewGuid();
        EmployeeId = ValidationGuards.ValidateAndNormalizeId(employeeId, "Employee ID");
        ProductId = productId;
        PointsCost = pointsCost;
        Status = new RedemptionStatus(Id);  // ← PASS THE ID HERE
        RequestedAt = DateTime.UtcNow;
        CreatedBy = "SYSTEM";
    }
}
