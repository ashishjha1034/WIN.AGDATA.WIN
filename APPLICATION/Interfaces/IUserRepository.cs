using WIN.AGDATA.WIN.Domain.Entities.Users;

namespace WIN.AGDATA.WIN.APPLICATION.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByIdAsync(Guid id);
    Task<User?> GetByIdWithDetailsAsync(Guid id);
    Task<User?> GetByIdWithPointsAsync(Guid id);
    Task<User?> GetByEmployeeIdAsync(string employeeId);
    Task<User?> GetByEmailAsync(string email);
    Task<Role?> GetRoleByNameAsync(string name);
    Task<IReadOnlyList<User>> GetAllAsync();
    Task<IReadOnlyList<User>> GetActiveUsersAsync();
    void Add(User user);
    Task UpdateAsync(User user);
}