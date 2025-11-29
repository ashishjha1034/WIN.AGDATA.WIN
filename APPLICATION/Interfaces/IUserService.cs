// WIN.AGDATA.WIN.Application/Interfaces/IUserService.cs
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Domain.Entities.Users;

namespace WIN.AGDATA.WIN.Application.Interfaces
{
    public interface IUserService
    {
        Task<User> CreateUserAsync(string employeeId, string email, string firstName, string lastName);
        Task<User?> GetUserByIdAsync(Guid userId);
        Task<User?> GetUserByEmployeeIdAsync(string employeeId);
        Task<List<User>> GetAllUsersAsync();
        Task UpdateUserInfoAsync(string employeeId, string firstName, string lastName, string email);
        Task PromoteToAdminAsync(string employeeId);
        Task DemoteToEmployeeAsync(string employeeId);
        Task DeactivateUserAsync(string employeeId, string reason);
        Task ActivateUserAsync(string employeeId);
    }
}
