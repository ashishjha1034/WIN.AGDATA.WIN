using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly ApplicationDbContext _context;

    public UserRepository(ApplicationDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public User? GetById(Guid userId)
    {
        return _context.Users.FirstOrDefault(u => u.Id == userId);
    }

    public User? GetByEmployeeId(string employeeId)
    {
        if (string.IsNullOrWhiteSpace(employeeId))
            return null;

        var normalized = NormalizeId(employeeId);
        return _context.Users.FirstOrDefault(u => u.Identity.EmployeeId == normalized);
    }

    public List<User> GetAll()
    {
        return _context.Users.ToList();
    }

    public void Add(User user)
    {
        _context.Users.Add(user);
        _context.SaveChanges();
    }

    public void Update(User user)
    {
        _context.Users.Update(user);
        _context.SaveChanges();
    }

    public void Delete(Guid userId)
    {
        var user = GetById(userId);
        if (user != null)
        {
            _context.Users.Remove(user);
            _context.SaveChanges();
        }
    }

    private static string NormalizeId(string id)
    {
        // Keep normalization simple and consistent with domain guards
        return id.Trim().ToUpperInvariant();
    }
}
