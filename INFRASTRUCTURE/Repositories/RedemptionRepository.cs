using System;
using System.Collections.Generic;
using System.Linq;
using WIN.AGDATA.WIN.Infrastructure.Data;
using WIN.AGDATA.WIN.Domain.Entities.Redemptions;
using WIN.AGDATA.WIN.Application.Interfaces;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public class RedemptionRepository : IRedemptionRepository
{
    private readonly ApplicationDbContext _context;

    public RedemptionRepository(ApplicationDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public Redemption? GetById(Guid redemptionId)
    {
        return _context.Redemptions.FirstOrDefault(r => r.Id == redemptionId);
    }

    public List<Redemption> GetByEmployeeId(string employeeId)
    {
        if (string.IsNullOrWhiteSpace(employeeId))
            return new List<Redemption>();

        var normalized = employeeId.Trim().ToUpperInvariant();
        return _context.Redemptions.Where(r => r.EmployeeId == normalized).ToList();
    }

    public List<Redemption> GetAll()
    {
        return _context.Redemptions.ToList();
    }

    public void Add(Redemption redemption)
    {
        _context.Redemptions.Add(redemption);
        _context.SaveChanges();
    }

    public void Update(Redemption redemption)
    {
        _context.Redemptions.Update(redemption);
        _context.SaveChanges();
    }

    public void Delete(Guid redemptionId)
    {
        var redemption = GetById(redemptionId);
        if (redemption != null)
        {
            _context.Redemptions.Remove(redemption);
            _context.SaveChanges();
        }
    }

    // Domain-first helpers (call domain mutators then persist)
    public void ApproveRedemption(Guid redemptionId)
    {
        var redemption = GetById(redemptionId);
        if (redemption == null) throw new DomainException($"Redemption not found: {redemptionId}");

        redemption.Status.Approve();
        _context.Redemptions.Update(redemption);
        _context.SaveChanges();
    }

    public void RejectRedemption(Guid redemptionId, string reason)
    {
        var redemption = GetById(redemptionId);
        if (redemption == null) throw new DomainException($"Redemption not found: {redemptionId}");

        redemption.Status.Reject(reason);
        _context.Redemptions.Update(redemption);
        _context.SaveChanges();
    }

    public void MarkRedemptionDelivered(Guid redemptionId)
    {
        var redemption = GetById(redemptionId);
        if (redemption == null) throw new DomainException($"Redemption not found: {redemptionId}");

        redemption.Status.MarkDelivered();
        _context.Redemptions.Update(redemption);
        _context.SaveChanges();
    }
}
