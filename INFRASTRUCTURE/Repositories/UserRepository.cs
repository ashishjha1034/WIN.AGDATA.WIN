using Microsoft.EntityFrameworkCore;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public class UserRepository : Repository<User>, IUserRepository
{
    public UserRepository(ApplicationDbContext context) : base(context) { }

    public async Task<User?> GetByIdWithDetailsAsync(Guid id)
        => await _context.Users
            .Include(u => u.PointsAccount)
            .Include(u => u.Roles).ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Id == id);

    public async Task<User?> GetByIdWithPointsAsync(Guid id)
        => await _context.Users
            .Include(u => u.PointsAccount)
            .FirstOrDefaultAsync(u => u.Id == id);

    public async Task<IReadOnlyList<User>> GetByIdsWithPointsAsync(IEnumerable<Guid> ids)
    {
        var idList = ids.ToList();
        return await _context.Users
            .Include(u => u.PointsAccount)
            .Where(u => idList.Contains(u.Id))
            .ToListAsync();
    }

    public async Task<User?> GetByEmployeeIdAsync(string employeeId)
        => await _context.Users.FirstOrDefaultAsync(u => u.EmployeeId == employeeId);

    public async Task<User?> GetByEmailAsync(string email)
        => await _context.Users
            .Include(u => u.Roles).ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Email.Value == email);

    public async Task<Role?> GetRoleByNameAsync(string name)
        => await _context.Roles.FirstOrDefaultAsync(r => r.Name == name);

    public async Task<IReadOnlyList<User>> GetActiveUsersAsync()
        => await _context.Users
            .Include(u => u.PointsAccount)
            .Include(u => u.Roles).ThenInclude(ur => ur.Role)
            .Where(u => u.IsActive).ToListAsync();

    public override async Task<IReadOnlyList<User>> GetAllAsync()
        => await _context.Users
            .Include(u => u.PointsAccount)
            .Include(u => u.Roles).ThenInclude(ur => ur.Role)
            .ToListAsync();

    public async Task UpdateAsync(User user)
    {
        _dbSet.Update(user);
    }

    public async Task DeleteAsync(Guid id)
    {
        var user = await GetByIdAsync(id);
        if (user != null)
        {
            _dbSet.Remove(user);
        }
    }
}