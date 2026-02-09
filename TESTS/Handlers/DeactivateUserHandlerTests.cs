using Microsoft.Extensions.Logging;
using Moq;
using FluentAssertions;
using WIN.AGDATA.WIN.APPLICATION.Commands.Users;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.APPLICATION.Handlers.Users;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.Tests.Handlers;

/// <summary>
/// Tests for DeactivateUserHandler implementing safe user deactivation.
/// Tests cover: Hard blocks (self-deactivation, admin-to-admin, pending redemptions, active events),
/// Soft warnings (points balance, completed events, completed redemptions, recent activity),
/// Happy paths (with and without force).
/// </summary>
public class DeactivateUserHandlerTests
{
    private readonly Mock<IUserRepository> _userRepositoryMock;
    private readonly Mock<IRedemptionRepository> _redemptionRepositoryMock;
    private readonly Mock<IEventRepository> _eventRepositoryMock;
    private readonly Mock<ITransactionRepository> _transactionRepositoryMock;
    private readonly Mock<IUnitOfWork> _unitOfWorkMock;
    private readonly Mock<ILogger<DeactivateUserHandler>> _loggerMock;
    private readonly DeactivateUserHandler _handler;

    public DeactivateUserHandlerTests()
    {
        _userRepositoryMock = new Mock<IUserRepository>();
        _redemptionRepositoryMock = new Mock<IRedemptionRepository>();
        _eventRepositoryMock = new Mock<IEventRepository>();
        _transactionRepositoryMock = new Mock<ITransactionRepository>();
        _unitOfWorkMock = new Mock<IUnitOfWork>();
        _loggerMock = new Mock<ILogger<DeactivateUserHandler>>();

        _handler = new DeactivateUserHandler(
            _userRepositoryMock.Object,
            _redemptionRepositoryMock.Object,
            _eventRepositoryMock.Object,
            _transactionRepositoryMock.Object,
            _unitOfWorkMock.Object,
            _loggerMock.Object);
    }

    #region Hard Block Tests - Self-Deactivation

    [Fact]
    public async Task Handle_WhenSelfDeactivation_ReturnsBlockedResult()
    {
        // Arrange - Admin trying to deactivate themselves
        var userId = Guid.NewGuid();
        var user = CreateTestUser(userId, "Admin", isAdmin: true);
        var command = new DeactivateUserCommand(userId, userId, Force: false);

        SetupUserRepositoryForUser(userId, user);
        SetupNoBlockingRedemptionsOrEvents(userId);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Success.Should().BeFalse();
        result.IsBlocked.Should().BeTrue();
        result.Blocked.Should().NotBeNull();
        result.Blocked!.Code.Should().Be("DEACTIVATE_USER_BLOCKED");
        result.Blocked.SelfDeactivation.Should().BeTrue();
        result.Blocked.Reasons.Should().Contain(r => r.Contains("Self-deactivation"));

        // Verify user was not deactivated
        _userRepositoryMock.Verify(r => r.UpdateAsync(It.IsAny<User>()), Times.Never);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Never);
    }

    [Fact]
    public async Task Handle_WhenSelfDeactivationWithForce_StillBlocked()
    {
        // Arrange - Force cannot bypass self-deactivation
        var userId = Guid.NewGuid();
        var user = CreateTestUser(userId, "Admin", isAdmin: true);
        var command = new DeactivateUserCommand(userId, userId, Force: true);

        SetupUserRepositoryForUser(userId, user);
        SetupNoBlockingRedemptionsOrEvents(userId);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsBlocked.Should().BeTrue();
        result.Blocked!.SelfDeactivation.Should().BeTrue();
        _userRepositoryMock.Verify(r => r.UpdateAsync(It.IsAny<User>()), Times.Never);
    }

    #endregion

    #region Hard Block Tests - Admin to Admin

    [Fact]
    public async Task Handle_WhenTargetIsAdmin_ReturnsBlockedResult()
    {
        // Arrange - Admin trying to deactivate another admin
        var targetUserId = Guid.NewGuid();
        var actingAdminId = Guid.NewGuid();
        var targetUser = CreateTestUser(targetUserId, "TargetAdmin", isAdmin: true);
        var actingAdmin = CreateTestUser(actingAdminId, "ActingAdmin", isAdmin: true);
        var command = new DeactivateUserCommand(targetUserId, actingAdminId, Force: false);

        _userRepositoryMock
            .Setup(r => r.GetByIdWithDetailsAsync(targetUserId))
            .ReturnsAsync(targetUser);
        _userRepositoryMock
            .Setup(r => r.GetByIdWithDetailsAsync(actingAdminId))
            .ReturnsAsync(actingAdmin);
        _userRepositoryMock
            .Setup(r => r.GetByIdWithPointsAsync(targetUserId))
            .ReturnsAsync(targetUser);

        SetupNoBlockingRedemptionsOrEvents(targetUserId);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Success.Should().BeFalse();
        result.IsBlocked.Should().BeTrue();
        result.Blocked!.TargetIsAdmin.Should().BeTrue();
        result.Blocked.Reasons.Should().Contain(r => r.Contains("administrator"));
    }

    [Fact]
    public async Task Handle_WhenTargetIsAdminWithForce_StillBlocked()
    {
        // Arrange
        var targetUserId = Guid.NewGuid();
        var actingAdminId = Guid.NewGuid();
        var targetUser = CreateTestUser(targetUserId, "TargetAdmin", isAdmin: true);
        var actingAdmin = CreateTestUser(actingAdminId, "ActingAdmin", isAdmin: true);
        var command = new DeactivateUserCommand(targetUserId, actingAdminId, Force: true);

        _userRepositoryMock
            .Setup(r => r.GetByIdWithDetailsAsync(targetUserId))
            .ReturnsAsync(targetUser);
        _userRepositoryMock
            .Setup(r => r.GetByIdWithDetailsAsync(actingAdminId))
            .ReturnsAsync(actingAdmin);

        SetupNoBlockingRedemptionsOrEvents(targetUserId);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsBlocked.Should().BeTrue();
        result.Blocked!.TargetIsAdmin.Should().BeTrue();
    }

    #endregion

    #region Hard Block Tests - Pending/Approved Redemptions

    [Fact]
    public async Task Handle_WhenPendingRedemptionsExist_ReturnsBlockedResult()
    {
        // Arrange
        var targetUserId = Guid.NewGuid();
        var actingAdminId = Guid.NewGuid();
        var targetUser = CreateTestUser(targetUserId, "Employee", isAdmin: false);
        var actingAdmin = CreateTestUser(actingAdminId, "Admin", isAdmin: true);
        var command = new DeactivateUserCommand(targetUserId, actingAdminId, Force: false);

        SetupUserRepositoryForBothUsers(targetUserId, targetUser, actingAdminId, actingAdmin);

        _redemptionRepositoryMock
            .Setup(r => r.GetPendingAndApprovedCountsForUserAsync(targetUserId))
            .ReturnsAsync(new PendingApprovedCounts(3, 0));

        _eventRepositoryMock
            .Setup(r => r.GetUserEventRegistrationStatsAsync(targetUserId))
            .ReturnsAsync((0, 0));

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsBlocked.Should().BeTrue();
        result.Blocked!.PendingRedemptionsCount.Should().Be(3);
        result.Blocked.Reasons.Should().Contain(r => r.Contains("pending redemption"));
    }

    [Fact]
    public async Task Handle_WhenApprovedRedemptionsExist_ReturnsBlockedResult()
    {
        // Arrange
        var targetUserId = Guid.NewGuid();
        var actingAdminId = Guid.NewGuid();
        var targetUser = CreateTestUser(targetUserId, "Employee", isAdmin: false);
        var actingAdmin = CreateTestUser(actingAdminId, "Admin", isAdmin: true);
        var command = new DeactivateUserCommand(targetUserId, actingAdminId, Force: false);

        SetupUserRepositoryForBothUsers(targetUserId, targetUser, actingAdminId, actingAdmin);

        _redemptionRepositoryMock
            .Setup(r => r.GetPendingAndApprovedCountsForUserAsync(targetUserId))
            .ReturnsAsync(new PendingApprovedCounts(0, 2));

        _eventRepositoryMock
            .Setup(r => r.GetUserEventRegistrationStatsAsync(targetUserId))
            .ReturnsAsync((0, 0));

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsBlocked.Should().BeTrue();
        result.Blocked!.ApprovedRedemptionsCount.Should().Be(2);
        result.Blocked.Reasons.Should().Contain(r => r.Contains("approved redemption"));
    }

    [Fact]
    public async Task Handle_WhenBothPendingAndApprovedExist_ReturnsBlockedWithBothCounts()
    {
        // Arrange
        var targetUserId = Guid.NewGuid();
        var actingAdminId = Guid.NewGuid();
        var targetUser = CreateTestUser(targetUserId, "Employee", isAdmin: false);
        var actingAdmin = CreateTestUser(actingAdminId, "Admin", isAdmin: true);
        var command = new DeactivateUserCommand(targetUserId, actingAdminId, Force: false);

        SetupUserRepositoryForBothUsers(targetUserId, targetUser, actingAdminId, actingAdmin);

        _redemptionRepositoryMock
            .Setup(r => r.GetPendingAndApprovedCountsForUserAsync(targetUserId))
            .ReturnsAsync(new PendingApprovedCounts(2, 1));

        _eventRepositoryMock
            .Setup(r => r.GetUserEventRegistrationStatsAsync(targetUserId))
            .ReturnsAsync((0, 0));

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsBlocked.Should().BeTrue();
        result.Blocked!.PendingRedemptionsCount.Should().Be(2);
        result.Blocked.ApprovedRedemptionsCount.Should().Be(1);
        result.Blocked.Reasons.Should().HaveCountGreaterThan(1);
    }

    #endregion

    #region Hard Block Tests - Active Event Registrations

    [Fact]
    public async Task Handle_WhenActiveEventRegistrationsExist_ReturnsBlockedResult()
    {
        // Arrange
        var targetUserId = Guid.NewGuid();
        var actingAdminId = Guid.NewGuid();
        var targetUser = CreateTestUser(targetUserId, "Employee", isAdmin: false);
        var actingAdmin = CreateTestUser(actingAdminId, "Admin", isAdmin: true);
        var command = new DeactivateUserCommand(targetUserId, actingAdminId, Force: false);

        SetupUserRepositoryForBothUsers(targetUserId, targetUser, actingAdminId, actingAdmin);

        _redemptionRepositoryMock
            .Setup(r => r.GetPendingAndApprovedCountsForUserAsync(targetUserId))
            .ReturnsAsync(new PendingApprovedCounts(0, 0));

        _eventRepositoryMock
            .Setup(r => r.GetUserEventRegistrationStatsAsync(targetUserId))
            .ReturnsAsync((2, 0)); // 2 active events

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsBlocked.Should().BeTrue();
        result.Blocked!.ActiveEventRegistrationsCount.Should().Be(2);
        result.Blocked.Reasons.Should().Contain(r => r.Contains("active event"));
    }

    [Fact]
    public async Task Handle_WhenActiveEventRegistrationsExistWithForce_StillBlocked()
    {
        // Arrange
        var targetUserId = Guid.NewGuid();
        var actingAdminId = Guid.NewGuid();
        var targetUser = CreateTestUser(targetUserId, "Employee", isAdmin: false);
        var actingAdmin = CreateTestUser(actingAdminId, "Admin", isAdmin: true);
        var command = new DeactivateUserCommand(targetUserId, actingAdminId, Force: true);

        SetupUserRepositoryForBothUsers(targetUserId, targetUser, actingAdminId, actingAdmin);

        _redemptionRepositoryMock
            .Setup(r => r.GetPendingAndApprovedCountsForUserAsync(targetUserId))
            .ReturnsAsync(new PendingApprovedCounts(0, 0));

        _eventRepositoryMock
            .Setup(r => r.GetUserEventRegistrationStatsAsync(targetUserId))
            .ReturnsAsync((0, 0));

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsBlocked.Should().BeTrue();
        _userRepositoryMock.Verify(r => r.UpdateAsync(It.IsAny<User>()), Times.Never);
    }

    #endregion

    #region Hard Block Tests - Multiple Blocking Conditions

    [Fact]
    public async Task Handle_WhenMultipleBlockingConditionsExist_ReturnsAllReasons()
    {
        // Arrange - Self-deactivation + has pending redemptions + active events
        var userId = Guid.NewGuid();
        var user = CreateTestUser(userId, "Admin", isAdmin: true);
        var command = new DeactivateUserCommand(userId, userId, Force: false);

        SetupUserRepositoryForUser(userId, user);

        _redemptionRepositoryMock
            .Setup(r => r.GetPendingAndApprovedCountsForUserAsync(userId))
            .ReturnsAsync(new PendingApprovedCounts(1, 1));

        _eventRepositoryMock
            .Setup(r => r.GetUserEventRegistrationStatsAsync(userId))
            .ReturnsAsync((0, 0));

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.IsBlocked.Should().BeTrue();
        result.Blocked!.SelfDeactivation.Should().BeTrue();
        result.Blocked.PendingRedemptionsCount.Should().Be(1);
        result.Blocked.ApprovedRedemptionsCount.Should().Be(1);
        result.Blocked.ActiveEventRegistrationsCount.Should().Be(1);
        result.Blocked.Reasons.Should().HaveCountGreaterThanOrEqualTo(3);
    }

    #endregion

    #region Soft Warning Tests

    [Fact]
    public async Task Handle_WhenPointsBalanceGreaterThanZero_ReturnsWarningsWithoutForce()
    {
        // Arrange
        var targetUserId = Guid.NewGuid();
        var actingAdminId = Guid.NewGuid();
        var targetUser = CreateTestUser(targetUserId, "Employee", isAdmin: false, pointsBalance: 500);
        var actingAdmin = CreateTestUser(actingAdminId, "Admin", isAdmin: true);
        var command = new DeactivateUserCommand(targetUserId, actingAdminId, Force: false);

        SetupUserRepositoryForBothUsers(targetUserId, targetUser, actingAdminId, actingAdmin);
        SetupNoBlockingRedemptionsOrEvents(targetUserId);
        SetupSoftWarningsData(targetUserId, completedEvents: 0, completedRedemptions: 0, lastActivity: null);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Success.Should().BeFalse();
        result.HasWarnings.Should().BeTrue();
        result.Warnings.Should().NotBeNull();
        result.Warnings!.Code.Should().Be("DEACTIVATE_USER_WARNINGS");
        result.Warnings.PointsBalance.Should().Be(500);
    }

    [Fact]
    public async Task Handle_WhenCompletedEventsExist_ReturnsWarningsWithoutForce()
    {
        // Arrange
        var targetUserId = Guid.NewGuid();
        var actingAdminId = Guid.NewGuid();
        var targetUser = CreateTestUser(targetUserId, "Employee", isAdmin: false, pointsBalance: 0);
        var actingAdmin = CreateTestUser(actingAdminId, "Admin", isAdmin: true);
        var command = new DeactivateUserCommand(targetUserId, actingAdminId, Force: false);

        SetupUserRepositoryForBothUsers(targetUserId, targetUser, actingAdminId, actingAdmin);
        
        _redemptionRepositoryMock
            .Setup(r => r.GetPendingAndApprovedCountsForUserAsync(targetUserId))
            .ReturnsAsync(new PendingApprovedCounts(0, 0));

        _eventRepositoryMock
            .Setup(r => r.GetUserEventRegistrationStatsAsync(targetUserId))
            .ReturnsAsync((0, 0)); // 5 completed events

        SetupSoftWarningsData(targetUserId, completedEvents: 5, completedRedemptions: 0, lastActivity: null);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.HasWarnings.Should().BeTrue();
        result.Warnings!.CompletedEventsCount.Should().Be(5);
    }

    [Fact]
    public async Task Handle_WhenCompletedRedemptionsExist_ReturnsWarningsWithoutForce()
    {
        // Arrange
        var targetUserId = Guid.NewGuid();
        var actingAdminId = Guid.NewGuid();
        var targetUser = CreateTestUser(targetUserId, "Employee", isAdmin: false, pointsBalance: 0);
        var actingAdmin = CreateTestUser(actingAdminId, "Admin", isAdmin: true);
        var command = new DeactivateUserCommand(targetUserId, actingAdminId, Force: false);

        SetupUserRepositoryForBothUsers(targetUserId, targetUser, actingAdminId, actingAdmin);
        SetupNoBlockingRedemptionsOrEvents(targetUserId);
        SetupSoftWarningsData(targetUserId, completedEvents: 0, completedRedemptions: 3, lastActivity: null);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.HasWarnings.Should().BeTrue();
        result.Warnings!.CompletedRedemptionsCount.Should().Be(3);
    }

    [Fact]
    public async Task Handle_WhenRecentActivityExists_ReturnsWarningsWithoutForce()
    {
        // Arrange
        var targetUserId = Guid.NewGuid();
        var actingAdminId = Guid.NewGuid();
        var targetUser = CreateTestUser(targetUserId, "Employee", isAdmin: false, pointsBalance: 0);
        var actingAdmin = CreateTestUser(actingAdminId, "Admin", isAdmin: true);
        var command = new DeactivateUserCommand(targetUserId, actingAdminId, Force: false);
        var recentActivity = DateTime.UtcNow.AddDays(-5); // 5 days ago (within 30-day threshold)

        SetupUserRepositoryForBothUsers(targetUserId, targetUser, actingAdminId, actingAdmin);
        SetupNoBlockingRedemptionsOrEvents(targetUserId);
        SetupSoftWarningsData(targetUserId, completedEvents: 0, completedRedemptions: 0, lastActivity: recentActivity);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.HasWarnings.Should().BeTrue();
        result.Warnings!.LastActivityDate.Should().BeCloseTo(recentActivity, TimeSpan.FromSeconds(1));
        result.Warnings.DaysSinceLastActivity.Should().Be(5);
    }

    [Fact]
    public async Task Handle_WhenWarningsExistAndForceIsTrue_Succeeds()
    {
        // Arrange
        var targetUserId = Guid.NewGuid();
        var actingAdminId = Guid.NewGuid();
        var targetUser = CreateTestUser(targetUserId, "Employee", isAdmin: false, pointsBalance: 500);
        var actingAdmin = CreateTestUser(actingAdminId, "Admin", isAdmin: true);
        var command = new DeactivateUserCommand(targetUserId, actingAdminId, Force: true);

        SetupUserRepositoryForBothUsers(targetUserId, targetUser, actingAdminId, actingAdmin);
        SetupNoBlockingRedemptionsOrEvents(targetUserId);
        SetupSoftWarningsData(targetUserId, completedEvents: 3, completedRedemptions: 2, lastActivity: DateTime.UtcNow.AddDays(-10));

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Success.Should().BeTrue();
        result.HasWarnings.Should().BeFalse();
        result.IsBlocked.Should().BeFalse();

        // Verify user was deactivated
        _userRepositoryMock.Verify(r => r.UpdateAsync(targetUser), Times.Once);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        targetUser.IsActive.Should().BeFalse();
    }

    #endregion

    #region Happy Path Tests

    [Fact]
    public async Task Handle_WhenNoBlockersOrWarnings_SucceedsImmediately()
    {
        // Arrange
        var targetUserId = Guid.NewGuid();
        var actingAdminId = Guid.NewGuid();
        var targetUser = CreateTestUser(targetUserId, "Employee", isAdmin: false, pointsBalance: 0);
        var actingAdmin = CreateTestUser(actingAdminId, "Admin", isAdmin: true);
        var command = new DeactivateUserCommand(targetUserId, actingAdminId, Force: false);

        SetupUserRepositoryForBothUsers(targetUserId, targetUser, actingAdminId, actingAdmin);
        SetupNoBlockingRedemptionsOrEvents(targetUserId);
        SetupSoftWarningsData(targetUserId, completedEvents: 0, completedRedemptions: 0, lastActivity: null);

        // Act
        var result = await _handler.Handle(command, CancellationToken.None);

        // Assert
        result.Success.Should().BeTrue();
        result.HasWarnings.Should().BeFalse();
        result.IsBlocked.Should().BeFalse();

        _userRepositoryMock.Verify(r => r.UpdateAsync(targetUser), Times.Once);
        _unitOfWorkMock.Verify(u => u.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once);
        targetUser.IsActive.Should().BeFalse();
    }

    [Fact]
    public async Task Handle_WhenTargetUserNotFound_ThrowsInvalidOperationException()
    {
        // Arrange
        var targetUserId = Guid.NewGuid();
        var actingAdminId = Guid.NewGuid();
        var actingAdmin = CreateTestUser(actingAdminId, "Admin", isAdmin: true);
        var command = new DeactivateUserCommand(targetUserId, actingAdminId, Force: false);

        _userRepositoryMock
            .Setup(r => r.GetByIdWithDetailsAsync(targetUserId))
            .ReturnsAsync((User?)null);

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(
            () => _handler.Handle(command, CancellationToken.None));
    }

    [Fact]
    public async Task Handle_WhenActingAdminNotFound_ThrowsInvalidOperationException()
    {
        // Arrange
        var targetUserId = Guid.NewGuid();
        var actingAdminId = Guid.NewGuid();
        var targetUser = CreateTestUser(targetUserId, "Employee", isAdmin: false);
        var command = new DeactivateUserCommand(targetUserId, actingAdminId, Force: false);

        _userRepositoryMock
            .Setup(r => r.GetByIdWithDetailsAsync(targetUserId))
            .ReturnsAsync(targetUser);
        _userRepositoryMock
            .Setup(r => r.GetByIdWithDetailsAsync(actingAdminId))
            .ReturnsAsync((User?)null);

        // Act & Assert
        await Assert.ThrowsAsync<InvalidOperationException>(
            () => _handler.Handle(command, CancellationToken.None));
    }

    #endregion

    #region Helper Methods

    private User CreateTestUser(Guid userId, string name, bool isAdmin, int pointsBalance = 0)
    {
        var user = new User(
            EmployeeId.Create($"EMP{userId.ToString()[..8]}"),
            EmailAddress.Create($"{name.ToLower()}@example.com"),
            PersonName.Create(name),
            PersonName.Create("TestUser"),
            "TestPassword123!");

        // Use reflection to set the Id
        var idProperty = typeof(User).BaseType?.GetProperty("Id");
        idProperty?.SetValue(user, userId);

        // Set up points balance using reflection
        if (user.PointsAccount != null && pointsBalance > 0)
        {
            user.PointsAccount.AddPoints(pointsBalance, Guid.NewGuid());
        }

        // Add Admin role if needed
        if (isAdmin)
        {
            var role = new Role("Admin");
            // Set role Id using reflection
            var roleIdProperty = typeof(Role).BaseType?.GetProperty("Id");
            roleIdProperty?.SetValue(role, Guid.NewGuid());

            user.AssignRole(role, Guid.NewGuid());
        }

        return user;
    }

    private void SetupUserRepositoryForUser(Guid userId, User user)
    {
        _userRepositoryMock
            .Setup(r => r.GetByIdWithDetailsAsync(userId))
            .ReturnsAsync(user);
        _userRepositoryMock
            .Setup(r => r.GetByIdWithPointsAsync(userId))
            .ReturnsAsync(user);
    }

    private void SetupUserRepositoryForBothUsers(Guid targetUserId, User targetUser, Guid actingAdminId, User actingAdmin)
    {
        _userRepositoryMock
            .Setup(r => r.GetByIdWithDetailsAsync(targetUserId))
            .ReturnsAsync(targetUser);
        _userRepositoryMock
            .Setup(r => r.GetByIdWithDetailsAsync(actingAdminId))
            .ReturnsAsync(actingAdmin);
        _userRepositoryMock
            .Setup(r => r.GetByIdWithPointsAsync(targetUserId))
            .ReturnsAsync(targetUser);
    }

    private void SetupNoBlockingRedemptionsOrEvents(Guid userId)
    {
        _redemptionRepositoryMock
            .Setup(r => r.GetPendingAndApprovedCountsForUserAsync(userId))
            .ReturnsAsync(new PendingApprovedCounts(0, 0));

        _eventRepositoryMock
            .Setup(r => r.GetUserEventRegistrationStatsAsync(userId))
            .ReturnsAsync((0, 0));
    }

    private void SetupSoftWarningsData(Guid userId, int completedEvents, int completedRedemptions, DateTime? lastActivity)
    {
        // Event stats include completed events
        _eventRepositoryMock
            .Setup(r => r.GetUserEventRegistrationStatsAsync(userId))
            .ReturnsAsync((0, 0));

        _redemptionRepositoryMock
            .Setup(r => r.GetCompletedRedemptionsCountForUserAsync(userId))
            .ReturnsAsync(completedRedemptions);

        _transactionRepositoryMock
            .Setup(r => r.GetLastTransactionDateForUserAsync(userId))
            .ReturnsAsync(lastActivity);
    }

    #endregion
}
