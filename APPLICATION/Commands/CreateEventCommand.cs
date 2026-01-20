using MediatR;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Events;

/// <summary>
/// Command to create a new event. RegistrationEndDateUtc is required for MVP.
/// </summary>
public record CreateEventCommand(
    string Name,
    DateTime EventDate,
    string Description,
    int? TotalPointsPool = null,
    string? Location = null,
    int? MaxParticipants = null,
    DateTime? RegistrationEndDateUtc = null,
    string? BannerImageUrl = null
) : IRequest<EventDto>;

