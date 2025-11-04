using System;
using System.Collections.Generic;
using System.Linq;
using WIN.AGDATA.WIN.Infrastructure.Data;

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

    public Redemption? GetStatusById(Guid redemptionId)
    {
        return _context.Redemptions.FirstOrDefault(r => r.Id == redemptionId);
    }

    public Redemption? GetByStatus(RedemptionStatus status)
    {
        return _context.Redemptions.FirstOrDefault(r => r.Status == status);
    }

    public List<Redemption> GetByEmployeeId(string employeeId)
    {
        return _context.Redemptions.Where(r => r.EmployeeId == employeeId).ToList();
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

    public void UpdateStatus(Guid redemptionId, RedemptionStatus status)
    {
        var redemption = GetById(redemptionId);
        if (redemption != null)
        {
            // Update status logic
            _context.Redemptions.Update(redemption);
            _context.SaveChanges();
        }
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
}
