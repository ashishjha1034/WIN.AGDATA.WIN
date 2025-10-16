using Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.Enums;

namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IUserRepository
{
    void Add(User user);
    void Update(User user);
    void Delete(string employeeId);

    User? GetByEmployeeId(string employeeId);
    User? GetByEmail(string email);
    List<User> GetAll();
    List<User> GetByRole(UserRole role);
    List<User> GetActiveUsers();
    List<User> GetInactiveUsers();

    bool ExistsByEmployeeId(string employeeId);
    bool ExistsByEmail(string email);
}
