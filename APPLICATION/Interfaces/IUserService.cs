using Domain.Entities.Users;


namespace WIN.AGDATA.WIN.Application.Interfaces
{
    public interface IUserService
    {
        User CreateUser(string employeeId, string email, string firstName, string lastName);
        User? GetUserByEmail(string email);
        User? GetUserByEmployeeId(string employeeId);
        List<User> GetAllUsers();
        void UpdateUserEmail(string employeeId, string newEmail);
        void DeactivateUser(string employeeId);
        void ReactivateUser(string employeeId);
    }
}