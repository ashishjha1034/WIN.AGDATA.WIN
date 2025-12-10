using MediatR;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;

namespace WIN.AGDATA.WIN.APPLICATION.Commands.Events;

public record CreateEventCommand(
    string Name,
    DateTime StartDate,
    DateTime EndDate,
    string Description
) : IRequest<EventDto>;
