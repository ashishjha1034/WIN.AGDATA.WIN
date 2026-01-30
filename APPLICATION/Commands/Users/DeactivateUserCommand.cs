using MediatR;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Users;

/// <summary>
/// Command to deactivate a user with business rule enforcement.
/// Returns a result indicating success, warnings, or blocks.
/// </summary>
/// <param name="TargetUserId">The ID of the user to deactivate</param>
/// <param name="ActingAdminUserId">The ID of the admin performing the deactivation</param>
/// <param name="Force">If true, bypasses soft warnings but not hard blocks</param>
public record DeactivateUserCommand(
    Guid TargetUserId, 
    Guid ActingAdminUserId, 
    bool Force = false
) : IRequest<DeactivateUserResult>;
