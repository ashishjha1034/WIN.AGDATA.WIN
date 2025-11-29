// DOMAIN/Entities/Redemptions/Redemption.cs
using System;
using System.ComponentModel.DataAnnotations;
using WIN.AGDATA.WIN.Domain.Common;

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

    public Redemption(string employeeId, Guid productId, int pointsCost, string createdBy = "SYSTEM")
    {
        Id = Guid.NewGuid();
        EmployeeId = ValidationGuards.ValidateAndNormalizeId(employeeId, "Employee ID");
        ProductId = productId;

        
        if (pointsCost < 1 || pointsCost > 10000)
            throw new DomainException("Points cost must be between 1 and 10000");

        PointsCost = pointsCost;

        
        Status = new RedemptionStatus(Id);
        RequestedAt = DateTime.UtcNow;
        CreatedBy = createdBy;
    }

    public void Approve(string modifiedBy = "SYSTEM")
    {
        Status.Approve();
        UpdateModificationInfo(modifiedBy);
    }

    public void Reject(string reason, string modifiedBy = "SYSTEM")
    {
        Status.Reject(reason);
        UpdateModificationInfo(modifiedBy);
    }

    public void MarkDelivered(string modifiedBy = "SYSTEM")
    {
        Status.MarkDelivered();
        UpdateModificationInfo(modifiedBy);
    }

    private void UpdateModificationInfo(string modifiedBy)
    {
        
    }

    public override string? ToString() => $"Redemption: {Id} - {EmployeeId} - {PointsCost} pts - Status: {Status}";
}
