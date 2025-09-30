using WIN.AGDATA.WIN.Domain.Exceptions;

namespace Domain.Entities.Users
{
    public class Identity
    {
        public string EmployeeId { get; }
        public string Email { get; private set; }
        public string FirstName { get; private set; }
        public string LastName { get; private set; }

        public Identity(string employeeId, string email, string firstName, string lastName)
        {
            EmployeeId = employeeId?.Trim().ToUpper() ?? throw new DomainException("Employee ID required");
            Email = email?.Trim().ToLower() ?? throw new DomainException("Email required");
            FirstName = firstName?.Trim() ?? throw new DomainException("First name required");
            LastName = lastName?.Trim() ?? throw new DomainException("Last name required");

            ValidateEmail(Email);
        }

        public void UpdateEmail(string newEmail)
        {
            ValidateEmail(newEmail);
            Email = newEmail.Trim().ToLower();
        }

        public void UpdateName(string firstName, string lastName)
        {
            FirstName = firstName?.Trim() ?? throw new DomainException("First name required");
            LastName = lastName?.Trim() ?? throw new DomainException("Last name required");
        }

        private void ValidateEmail(string email)
        {
            if (!email.Contains("@")) throw new DomainException("Invalid email");
        }
    }
}