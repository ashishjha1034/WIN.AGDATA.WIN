using WIN.AGDATA.WIN.Application.Services;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace IdentityTests.Application.Services
{
    public class UserServiceTests
    {
        private readonly UserService _userService;

        public UserServiceTests()
        {
            _userService = new UserService();
        }

        [Fact]
        public void CreateUser_WithValidInputs_ShouldCreateAndReturnUser()
        {
            // Arrange
            var employeeId = "EMP001";
            var email = "john.doe@company.com";
            var firstName = "John";
            var lastName = "Doe";

            // Act
            var user = _userService.CreateUser(employeeId, email, firstName, lastName);

            // Assert
            user.Should().NotBeNull();
            user.Identity.EmployeeId.Should().Be("EMP001");
            user.Identity.Email.Should().Be("john.doe@company.com");
            user.Identity.FirstName.Should().Be("John");
            user.Identity.LastName.Should().Be("Doe");
            user.Status.IsActive.Should().BeTrue();
            user.Points.Balance.Should().Be(0);
        }

        [Fact]
        public void CreateUser_WithDuplicateEmployeeId_ShouldThrowDomainException()
        {
            // Arrange
            _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");

            // Act & Assert
            var action = () => _userService.CreateUser("EMP001", "jane@company.com", "Jane", "Smith");
            action.Should().Throw<DomainException>().WithMessage("User with Employee ID EMP001 already exists");
        }

        [Fact]
        public void CreateUser_WithDuplicateEmail_ShouldThrowDomainException()
        {
            // Arrange
            _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");

            // Act & Assert
            var action = () => _userService.CreateUser("EMP002", "john@company.com", "Jane", "Smith");
            action.Should().Throw<DomainException>().WithMessage("User with email john@company.com already exists");
        }

        [Fact]
        public void GetUserByEmail_WithExistingEmail_ShouldReturnUser()
        {
            // Arrange
            var originalUser = _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");

            // Act
            var foundUser = _userService.GetUserByEmail("john@company.com");

            // Assert
            foundUser.Should().NotBeNull();
            foundUser.Identity.EmployeeId.Should().Be(originalUser.Identity.EmployeeId);
        }

        [Fact]
        public void GetUserByEmail_WithNonExistingEmail_ShouldReturnNull()
        {
            // Act
            var foundUser = _userService.GetUserByEmail("nonexistent@company.com");

            // Assert
            foundUser.Should().BeNull();
        }

        [Fact]
        public void GetUserByEmployeeId_WithExistingId_ShouldReturnUser()
        {
            // Arrange
            var originalUser = _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");

            // Act
            var foundUser = _userService.GetUserByEmployeeId("EMP001");

            // Assert
            foundUser.Should().NotBeNull();
            foundUser.Identity.Email.Should().Be(originalUser.Identity.Email);
        }

        [Fact]
        public void GetUserByEmployeeId_WithNonExistingId_ShouldReturnNull()
        {
            // Act
            var foundUser = _userService.GetUserByEmployeeId("NONEXISTENT");

            // Assert
            foundUser.Should().BeNull();
        }

        [Fact]
        public void GetAllUsers_WithMultipleUsers_ShouldReturnAllUsers()
        {
            // Arrange
            _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");
            _userService.CreateUser("EMP002", "jane@company.com", "Jane", "Smith");
            _userService.CreateUser("EMP003", "bob@company.com", "Bob", "Johnson");

            // Act
            var allUsers = _userService.GetAllUsers();

            // Assert
            allUsers.Should().HaveCount(3);
            allUsers.Should().Contain(u => u.Identity.EmployeeId == "EMP001");
            allUsers.Should().Contain(u => u.Identity.EmployeeId == "EMP002");
            allUsers.Should().Contain(u => u.Identity.EmployeeId == "EMP003");
        }

        [Fact]
        public void UpdateUserEmail_WithValidInputs_ShouldUpdateEmail()
        {
            // Arrange
            _userService.CreateUser("EMP001", "old@company.com", "John", "Doe");

            // Act
            _userService.UpdateUserEmail("EMP001", "new@company.com");

            // Assert
            var user = _userService.GetUserByEmployeeId("EMP001");
            user.Identity.Email.Should().Be("new@company.com");
        }

        [Fact]
        public void UpdateUserEmail_WithNonExistentUser_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => _userService.UpdateUserEmail("NONEXISTENT", "new@company.com");
            action.Should().Throw<DomainException>().WithMessage("User with Employee ID NONEXISTENT not found");
        }

        [Fact]
        public void UpdateUserEmail_WithExistingEmail_ShouldThrowDomainException()
        {
            // Arrange
            _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");
            _userService.CreateUser("EMP002", "jane@company.com", "Jane", "Smith");

            // Act & Assert
            var action = () => _userService.UpdateUserEmail("EMP001", "jane@company.com");
            action.Should().Throw<DomainException>().WithMessage("Email jane@company.com is already in use");
        }

        [Fact]
        public void DeactivateUser_WithExistingUser_ShouldDeactivateUser()
        {
            // Arrange
            _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");

            // Act
            _userService.DeactivateUser("EMP001");

            // Assert
            var user = _userService.GetUserByEmployeeId("EMP001");
            user.Status.IsActive.Should().BeFalse();
        }

        [Fact]
        public void DeactivateUser_WithNonExistentUser_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => _userService.DeactivateUser("NONEXISTENT");
            action.Should().Throw<DomainException>().WithMessage("User with Employee ID NONEXISTENT not found");
        }

        [Fact]
        public void ReactivateUser_WithExistingInactiveUser_ShouldReactivateUser()
        {
            // Arrange
            _userService.CreateUser("EMP001", "john@company.com", "John", "Doe");
            _userService.DeactivateUser("EMP001");

            // Act
            _userService.ReactivateUser("EMP001");

            // Assert
            var user = _userService.GetUserByEmployeeId("EMP001");
            user.Status.IsActive.Should().BeTrue();
        }

        [Fact]
        public void ReactivateUser_WithNonExistentUser_ShouldThrowDomainException()
        {
            // Act & Assert
            var action = () => _userService.ReactivateUser("NONEXISTENT");
            action.Should().Throw<DomainException>().WithMessage("User with Employee ID NONEXISTENT not found");
        }
    }
}