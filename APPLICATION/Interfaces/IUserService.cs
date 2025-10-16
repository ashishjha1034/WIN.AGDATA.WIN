using Domain.Entities.Users;

namespace WIN.AGDATA.WIN.Application.Interfaces;

public interface IUserService
{
    User CreateUser(string employeeId, string email, string firstName, string lastName);
    User CreateAdmin(string employeeId, string email, string firstName, string lastName, string createdBy);
    User? GetUserByEmail(string email);
    User? GetUserByEmployeeId(string employeeId);
    List<User> GetAllUsers();
    List<User> GetAllAdmins();

    void UpdateUserEmail(string employeeId, string newEmail, string modifiedBy);
    void UpdateUserInfo(string employeeId, string firstName, string lastName, string modifiedBy);

    void DeactivateUser(string employeeId, string modifiedBy = "SYSTEM");
    void ReactivateUser(string employeeId, string modifiedBy = "SYSTEM");

    void PromoteToAdmin(string employeeId, string modifiedBy);
    void DemoteToEmployee(string employeeId, string modifiedBy);
}
