using System;

namespace WIN.AGDATA.WIN.APPLICATION.DTOs.Users
{
    public class CreateUserRequest
    {
        public string EmployeeId { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
    }
}
