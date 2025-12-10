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

    public async Task<User?> GetByEmployeeIdAsync(string employeeId)
        => await _context.Users.FirstOrDefaultAsync(u => u.EmployeeId == employeeId);

    public async Task<User?> GetByEmailAsync(string email)
        => await _context.Users.FirstOrDefaultAsync(u => u.Email.Value == email);

    public async Task<Role?> GetRoleByNameAsync(string name)
        => await _context.Roles.FirstOrDefaultAsync(r => r.Name == name);

    public async Task<IReadOnlyList<User>> GetActiveUsersAsync()
        => await _context.Users.Where(u => u.IsActive).ToListAsync();

    public async Task UpdateAsync(User user)
    {
        _dbSet.Update(user);
    }
}