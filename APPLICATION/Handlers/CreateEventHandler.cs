using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Events;

public class CreateEventHandler : IRequestHandler<CreateEventCommand, EventDto>
{
    private readonly IMapper _mapper;
    private readonly IEventRepository _eventRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ILogger<CreateEventHandler> _logger;

    public CreateEventHandler(
        IMapper mapper, 
        IEventRepository eventRepository, 
        IUnitOfWork unitOfWork,
        ILogger<CreateEventHandler> logger)
    {
        _mapper = mapper;
        _eventRepository = eventRepository;
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task<EventDto> Handle(CreateEventCommand request, CancellationToken ct)
    {
        var nowUtc = DateTime.UtcNow;

        // Validate RegistrationEndDateUtc is provided (MVP requirement)
        if (!request.RegistrationEndDateUtc.HasValue)
        {
            _logger.LogWarning("Event creation failed: RegistrationEndDateUtc is required");
            throw new ValidationException("RegistrationEndDateUtc", "Registration deadline is required.");
        }

        // Validate EventDate is provided
        if (request.EventDate == default)
        {
            _logger.LogWarning("Event creation failed: EventDate is required");
            throw new ValidationException("EventDate", "Event start date/time is required.");
        }

        // NEW VALIDATION: RegistrationEndDateUtc must be STRICTLY EARLIER than EventDate
        // Same-day is allowed as long as RegEnd time < EventStart time
        if (request.RegistrationEndDateUtc.Value >= request.EventDate)
        {
            _logger.LogWarning(
                "Event creation failed: RegistrationEndDateUtc ({RegEnd}) must be earlier than EventDate ({EventDate})",
                request.RegistrationEndDateUtc.Value.ToString("o"), 
                request.EventDate.ToString("o"));
            throw new ValidationException(
                "RegistrationEndDateUtc",
                $"Registration end ({request.RegistrationEndDateUtc.Value:yyyy-MM-dd HH:mm} UTC) must be strictly earlier than event start ({request.EventDate:yyyy-MM-dd HH:mm} UTC). Same-day is allowed if times differ.");
        }

        // Validate dates are in the future (warn but allow for testing)
        if (request.RegistrationEndDateUtc.Value <= nowUtc)
        {
            _logger.LogWarning(
                "Event created with past RegistrationEndDateUtc: {RegEnd}. This may trigger immediate auto-cancel if no registrations.",
                request.RegistrationEndDateUtc.Value.ToString("o"));
        }

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

        _logger.LogInformation(
            "Event created: {EventId} ({EventName}), EventDate={EventDate}, RegEnd={RegEnd}",
            @event.Id, @event.Name, @event.EventDate.ToString("o"), @event.RegistrationEndDate?.ToString("o"));

        return _mapper.Map<EventDto>(@event);
    }
}
