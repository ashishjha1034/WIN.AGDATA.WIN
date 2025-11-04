using System;
using System.ComponentModel.DataAnnotations;

namespace WIN.AGDATA.WIN.Domain.Entities.Users;

public class UserStatus
{
    [Required]
    public bool IsActive { get; private set; }

    public DateTime? DeactivatedAt { get; private set; }

    [StringLength(255)]
    public string? DeactivationReason { get; private set; }


    public UserStatus()
    {
        IsActive = true;
    }

    public void Activate()
    {
        IsActive = true;
        DeactivatedAt = null;
        DeactivationReason = null;
    }

    public void Deactivate(string reason)
    {
        if (!IsActive)
            throw new DomainException("User already inactive");

        IsActive = false;
        DeactivatedAt = DateTime.UtcNow;
        DeactivationReason = reason ?? "No reason provided";
    }

    public bool CanParticipateInEvents() => IsActive;

    public override string? ToString() => IsActive ? "Active" : "Inactive";
}
