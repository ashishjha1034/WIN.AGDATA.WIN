using MediatR;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Events;

/// <summary>
/// Command to activate an event, transitioning from Draft to Active.
/// Admin-only operation.
/// </summary>
public record ActivateEventCommand(Guid EventId) : IRequest;

/// <summary>
/// Command to complete an event, transitioning from Active to Completed.
/// Admin-only operation.
/// </summary>
public record CompleteEventCommand(Guid EventId) : IRequest;

/// <summary>
/// Command to cancel an event. Can be cancelled from Draft or Active states.
/// Admin-only operation.
/// </summary>
public record CancelEventCommand(Guid EventId) : IRequest;
