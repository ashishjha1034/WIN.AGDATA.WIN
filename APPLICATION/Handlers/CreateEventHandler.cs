using AutoMapper;
using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Events;

public class CreateEventHandler : IRequestHandler<CreateEventCommand, EventDto>
{
    private readonly IMapper _mapper;
    private readonly IEventRepository _eventRepository;
    private readonly IUnitOfWork _unitOfWork;

    public CreateEventHandler(IMapper mapper, IEventRepository eventRepository, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _eventRepository = eventRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<EventDto> Handle(CreateEventCommand request, CancellationToken ct)
    {
        // Validate RegistrationEndDateUtc is provided (MVP requirement)
        if (!request.RegistrationEndDateUtc.HasValue)
            throw new InvalidOperationException("RegistrationEndDateUtc is required. Registration deadline must be specified.");

        // Validate RegistrationEndDateUtc is in the future
        if (request.RegistrationEndDateUtc.Value <= DateTime.UtcNow)
            throw new InvalidOperationException("RegistrationEndDateUtc must be in the future.");

        var @event = new Event(
            request.Name,
            request.Description,
            request.EventDate,
            request.TotalPointsPool,
            request.Location,
            request.MaxParticipants,
            request.RegistrationEndDateUtc,
            request.BannerImageUrl);

        _eventRepository.Add(@event);
        await _unitOfWork.SaveChangesAsync(ct);

        return _mapper.Map<EventDto>(@event);
    }
}
