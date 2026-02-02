using MediatR;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Events;

/// <summary>
/// Command to batch check-in all registered participants for an active event.
/// Admin-only operation.
/// </summary>
public record BatchCheckInCommand(Guid EventId) : IRequest<BatchCheckInResult>;

/// <summary>
/// Result of a batch check-in operation.
/// </summary>
public record BatchCheckInResult(
    int TotalRegistered,
    int CheckedIn,
    int AlreadyCheckedIn,
    int Failed
);
