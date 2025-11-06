namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IUserService
{
    User CreateUser(string employeeId, string email, string firstName, string lastName);
    User? GetUserById(Guid userId);
    User? GetUserByEmployeeId(string employeeId);
    List<User> GetAllUsers();
    void UpdateUserInfo(string employeeId, string firstName, string lastName, string email);
    void PromoteToAdmin(string employeeId);
    void DemoteToEmployee(string employeeId);
    void DeactivateUser(string employeeId, string reason);
    void ActivateUser(string employeeId);
}
