using MediatR;
using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.APPLICATION.Commands.Users;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Users;

/// <summary>
/// Handler for DeactivateUserCommand with business rule enforcement.
/// Implements hard blocks (no bypass) and soft warnings (force bypasses).
/// </summary>
public class DeactivateUserHandler : IRequestHandler<DeactivateUserCommand, DeactivateUserResult>
{
    private readonly IUserRepository _userRepository;
    private readonly IRedemptionRepository _redemptionRepository;
    private readonly IEventRepository _eventRepository;
    private readonly ITransactionRepository _transactionRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<DeactivateUserHandler> _logger;

    // Activity threshold: users with activity within this many days get a warning
    private const int RecentActivityDaysThreshold = 30;

    public DeactivateUserHandler(
        IUserRepository userRepository,
        IRedemptionRepository redemptionRepository,
        IEventRepository eventRepository,
        ITransactionRepository transactionRepository,
        IUnitOfWork unitOfWork,
        ILogger<DeactivateUserHandler> logger)
    {
        _userRepository = userRepository;
        _redemptionRepository = redemptionRepository;
        _eventRepository = eventRepository;
        _transactionRepository = transactionRepository;
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task<DeactivateUserResult> Handle(DeactivateUserCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation(
            "Processing user deactivation request. TargetUserId: {TargetUserId}, ActingAdminId: {ActingAdminId}, Force: {Force}",
            request.TargetUserId, request.ActingAdminUserId, request.Force);

        // 1. Load target user with details (roles, points)
        var targetUser = await _userRepository.GetByIdWithDetailsAsync(request.TargetUserId);
        if (targetUser == null)
        {
            _logger.LogWarning("User deactivation failed: Target user {TargetUserId} not found", request.TargetUserId);
            throw new InvalidOperationException($"User with ID '{request.TargetUserId}' not found");
        }

        // 2. Load acting admin to verify identity
        var actingAdmin = await _userRepository.GetByIdWithDetailsAsync(request.ActingAdminUserId);
        if (actingAdmin == null)
        {
            _logger.LogWarning("User deactivation failed: Acting admin {ActingAdminId} not found", request.ActingAdminUserId);
            throw new InvalidOperationException($"Acting admin with ID '{request.ActingAdminUserId}' not found");
        }

        // 3. Check HARD BLOCKS (cannot be bypassed with force)
        var blockReasons = new List<string>();
        var blocked = new DeactivateUserBlocked();

        // 3a. Self-deactivation check
        if (request.TargetUserId == request.ActingAdminUserId)
        {
            blocked = blocked with { SelfDeactivation = true };
            blockReasons.Add("Self-deactivation is not allowed. An admin cannot deactivate their own account.");
            _logger.LogWarning(
                "User deactivation BLOCKED: Self-deactivation attempt by admin {AdminId}",
                request.ActingAdminUserId);
        }

        // 3b. Target is Admin check
        var targetIsAdmin = targetUser.Roles?.Any(r => r.Role.Name == "Admin") ?? false;
        if (targetIsAdmin && request.TargetUserId != request.ActingAdminUserId)
        {
            blocked = blocked with { TargetIsAdmin = true };
            blockReasons.Add("Cannot deactivate another administrator. Admin accounts require special handling.");
            _logger.LogWarning(
                "User deactivation BLOCKED: Attempt to deactivate admin {TargetUserId} by admin {ActingAdminId}",
                request.TargetUserId, request.ActingAdminUserId);
        }

        // 3c. Pending/Approved redemptions check
        var redemptionCounts = await _redemptionRepository.GetPendingAndApprovedCountsForUserAsync(request.TargetUserId);
        if (redemptionCounts.PendingCount > 0 || redemptionCounts.ApprovedCount > 0)
        {
            blocked = blocked with
            {
                PendingRedemptionsCount = redemptionCounts.PendingCount,
                ApprovedRedemptionsCount = redemptionCounts.ApprovedCount
            };

            if (redemptionCounts.PendingCount > 0)
                blockReasons.Add($"User has {redemptionCounts.PendingCount} pending redemption(s) that must be resolved first.");
            if (redemptionCounts.ApprovedCount > 0)
                blockReasons.Add($"User has {redemptionCounts.ApprovedCount} approved redemption(s) awaiting fulfillment.");

            _logger.LogWarning(
                "User deactivation BLOCKED: User {TargetUserId} has {PendingCount} pending and {ApprovedCount} approved redemptions",
                request.TargetUserId, redemptionCounts.PendingCount, redemptionCounts.ApprovedCount);
        }

        // 3d. Active event registrations check (Draft/Active events)
        var eventStats = await _eventRepository.GetUserEventRegistrationStatsAsync(request.TargetUserId);
        if (eventStats.ActiveEventRegistrations > 0)
        {
            blocked = blocked with { ActiveEventRegistrationsCount = eventStats.ActiveEventRegistrations };
            blockReasons.Add($"User is registered in {eventStats.ActiveEventRegistrations} active event(s) that haven't completed yet.");
            _logger.LogWarning(
                "User deactivation BLOCKED: User {TargetUserId} has {ActiveEventCount} active event registrations",
                request.TargetUserId, eventStats.ActiveEventRegistrations);
        }

        // If any hard blocks exist, return blocked result
        if (blockReasons.Count > 0)
        {
            var message = blockReasons.Count == 1
                ? blockReasons[0]
                : "Cannot deactivate user due to multiple blocking conditions.";

            return DeactivateUserResult.WithBlock(blocked with
            {
                Reasons = blockReasons,
                Message = message
            });
        }

        // 4. Check SOFT WARNINGS (can be bypassed with force=true)
        // Load points balance
        var userWithPoints = await _userRepository.GetByIdWithPointsAsync(request.TargetUserId);
        var pointsBalance = userWithPoints?.PointsAccount?.CurrentBalance ?? 0;

        // Get completed redemptions count
        var completedRedemptionsCount = await _redemptionRepository.GetCompletedRedemptionsCountForUserAsync(request.TargetUserId);

        // Get last activity (based on most recent transaction)
        var lastActivityDate = await _transactionRepository.GetLastTransactionDateForUserAsync(request.TargetUserId);
        int? daysSinceLastActivity = null;
        bool hasRecentActivity = false;

        if (lastActivityDate.HasValue)
        {
            daysSinceLastActivity = (int)(DateTime.UtcNow - lastActivityDate.Value).TotalDays;
            hasRecentActivity = daysSinceLastActivity <= RecentActivityDaysThreshold;
        }

        // Check if there are any soft warnings
        var hasWarnings = pointsBalance > 0
            || eventStats.CompletedEventCount > 0
            || completedRedemptionsCount > 0
            || hasRecentActivity;

        // If there are warnings and force is not set, return warnings for UI confirmation
        if (hasWarnings && !request.Force)
        {
            _logger.LogInformation(
                "User deactivation WARNING: User {TargetUserId} has soft warnings. Points: {Points}, CompletedEvents: {Events}, CompletedRedemptions: {Redemptions}, DaysSinceActivity: {Days}",
                request.TargetUserId, pointsBalance, eventStats.CompletedEventCount, completedRedemptionsCount, daysSinceLastActivity);

            return DeactivateUserResult.WithWarnings(new DeactivateUserWarnings
            {
                PointsBalance = pointsBalance,
                CompletedEventsCount = eventStats.CompletedEventCount,
                CompletedRedemptionsCount = completedRedemptionsCount,
                LastActivityDate = lastActivityDate,
                DaysSinceLastActivity = daysSinceLastActivity,
                Message = "This user has activity history. To proceed, confirm the deactivation with force=true."
            });
        }

        // 5. Perform deactivation
        targetUser.Deactivate($"Deactivated by admin {actingAdmin.Email.Value}");

        await _userRepository.UpdateAsync(targetUser);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        _logger.LogInformation(
            "User deactivation SUCCESS: User {TargetUserId} ({TargetEmail}) deactivated by admin {ActingAdminId} ({ActingAdminEmail}). Force: {Force}",
            request.TargetUserId, targetUser.Email.Value, request.ActingAdminUserId, actingAdmin.Email.Value, request.Force);

        return DeactivateUserResult.Succeeded();
    }
}
