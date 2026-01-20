using MediatR;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Events;

/// <summary>
/// Command to update an existing event.
/// Only events in Draft (Created) status can be updated.
/// </summary>
public record UpdateEventCommand(
    Guid EventId,
    string Name,
    string Description,
    DateTime EventDate,
    DateTime RegistrationEndDateUtc,
    string? Location = null,
    int? MaxParticipants = null,
    string? BannerImageUrl = null,
    int? TotalPointsPool = null
) : IRequest<EventDto>;
