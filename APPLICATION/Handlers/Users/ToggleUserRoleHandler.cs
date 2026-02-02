using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.APPLICATION.Commands.Users;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Users;

/// <summary>
/// Handler for ToggleUserRoleCommand to switch a user's role between Admin and Employee.
/// Implements authorization checks and guards against leaving system without any Admin.
/// </summary>
public class ToggleUserRoleHandler : IRequestHandler<ToggleUserRoleCommand, UserDto>
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly ILogger<ToggleUserRoleHandler> _logger;

    public ToggleUserRoleHandler(
        IUserRepository userRepository,
        IUnitOfWork unitOfWork,
        IMapper mapper,
        ILogger<ToggleUserRoleHandler> logger)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<UserDto> Handle(ToggleUserRoleCommand request, CancellationToken cancellationToken)
    {
        _logger.LogInformation(
            "Processing role toggle request. TargetUserId: {TargetUserId}, NewRole: {NewRole}, ActingAdminId: {ActingAdminId}",
            request.UserId, request.NewRole, request.ActingAdminId);

        // Validate new role
        if (request.NewRole != "Admin" && request.NewRole != "Employee")
        {
            throw new InvalidOperationException($"Invalid role '{request.NewRole}'. Must be 'Admin' or 'Employee'.");
        }

        // Load target user with details
        var targetUser = await _userRepository.GetByIdWithDetailsAsync(request.UserId);
        if (targetUser == null)
        {
            _logger.LogWarning("Role toggle failed: Target user {TargetUserId} not found", request.UserId);
            throw new InvalidOperationException($"User with ID '{request.UserId}' not found");
        }

        // Get current roles
        var currentRoles = targetUser.Roles?.Select(r => r.Role.Name).ToList() ?? new List<string>();
        var isCurrentlyAdmin = currentRoles.Contains("Admin");
        var isCurrentlyEmployee = currentRoles.Contains("Employee");

        // Check if role change is actually needed
        if (request.NewRole == "Admin" && isCurrentlyAdmin)
        {
            _logger.LogInformation("User {UserId} is already an Admin, no change needed", request.UserId);
            return _mapper.Map<UserDto>(targetUser);
        }

        if (request.NewRole == "Employee" && isCurrentlyEmployee && !isCurrentlyAdmin)
        {
            _logger.LogInformation("User {UserId} is already just an Employee, no change needed", request.UserId);
            return _mapper.Map<UserDto>(targetUser);
        }

        // Guard against self-demotion if this would leave no admins
        if (request.NewRole == "Employee" && isCurrentlyAdmin)
        {
            // Check if this is self-demotion
            if (request.UserId == request.ActingAdminId)
            {
                // Count active admins
                var allUsers = await _userRepository.GetActiveUsersAsync();
                var adminCount = allUsers.Count(u => 
                    u.Roles?.Any(r => r.Role.Name == "Admin") == true && u.IsActive);
                
                if (adminCount <= 1)
                {
                    _logger.LogWarning(
                        "Role toggle BLOCKED: Self-demotion would leave system without any Admin. UserId: {UserId}",
                        request.UserId);
                    throw new InvalidOperationException(
                        "Cannot demote yourself to Employee. This would leave the system without any Admin user.");
                }
            }
            else
            {
                // Count active admins (excluding target user)
                var allUsers = await _userRepository.GetActiveUsersAsync();
                var adminCount = allUsers.Count(u => 
                    u.Id != request.UserId && 
                    u.Roles?.Any(r => r.Role.Name == "Admin") == true && u.IsActive);
                
                if (adminCount < 1)
                {
                    _logger.LogWarning(
                        "Role toggle BLOCKED: Would leave system without any Admin. TargetUserId: {UserId}",
                        request.UserId);
                    throw new InvalidOperationException(
                        "Cannot demote this user to Employee. This would leave the system without any Admin user.");
                }
            }
        }

        // Get the new role entity
        var newRole = await _userRepository.GetRoleByNameAsync(request.NewRole)
            ?? throw new InvalidOperationException($"Role '{request.NewRole}' not found in the system");

        // Clear existing roles and assign new role
        targetUser.Roles.Clear();
        targetUser.AssignRole(newRole, request.ActingAdminId);

        await _userRepository.UpdateAsync(targetUser);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        _logger.LogInformation(
            "Successfully changed role for user {UserId} from [{OldRoles}] to {NewRole}",
            request.UserId, string.Join(", ", currentRoles), request.NewRole);

        // Reload user to get updated data
        var updatedUser = await _userRepository.GetByIdWithDetailsAsync(request.UserId);
        return _mapper.Map<UserDto>(updatedUser!);
    }
}
