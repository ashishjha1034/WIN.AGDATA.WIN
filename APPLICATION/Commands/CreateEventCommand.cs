using MediatR;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Events;

public record CreateEventCommand(
    string Name,
    DateTime EventDate,
    string Description,
    int? TotalPointsPool = null,
    string? Location = null,
    int? MaxParticipants = null,
    DateTime? RegistrationEndDate = null,
    string? BannerImageUrl = null
) : IRequest<EventDto>;

