using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Events;

/// <summary>
/// Handler for updating an existing event.
/// Only Draft (Created) events can be updated.
/// </summary>
public class UpdateEventHandler : IRequestHandler<UpdateEventCommand, EventDto>
{
    private readonly IEventRepository _eventRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly ILogger<UpdateEventHandler> _logger;

    public UpdateEventHandler(
        IEventRepository eventRepository,
        IUnitOfWork unitOfWork,
        IMapper mapper,
        ILogger<UpdateEventHandler> logger)
    {
        _eventRepository = eventRepository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<EventDto> Handle(UpdateEventCommand request, CancellationToken ct)
    {
        var nowUtc = DateTime.UtcNow;

        // Load the event
        var @event = await _eventRepository.GetByIdAsync(request.EventId)
            ?? throw new InvalidOperationException($"Event with ID {request.EventId} not found");

        // Validate EventDate is provided (DateTime is value type, check for default)
        if (request.EventDate == default)
        {
            _logger.LogWarning("Event update failed: EventDate is required for Event {EventId}", request.EventId);
            throw new ValidationException("EventDate", "Event start date/time is required.");
        }

        // Validate RegistrationEndDateUtc is provided (DateTime is value type, check for default)
        if (request.RegistrationEndDateUtc == default)
        {
            _logger.LogWarning("Event update failed: RegistrationEndDateUtc is required for Event {EventId}", request.EventId);
            throw new ValidationException("RegistrationEndDateUtc", "Registration deadline is required.");
        }

        // NEW VALIDATION: RegistrationEndDateUtc must be STRICTLY EARLIER than EventDate
        if (request.RegistrationEndDateUtc >= request.EventDate)
        {
            _logger.LogWarning(
                "Event update failed: RegistrationEndDateUtc ({RegEnd}) must be earlier than EventDate ({EventDate}) for Event {EventId}",
                request.RegistrationEndDateUtc.ToString("o"),
                request.EventDate.ToString("o"),
                request.EventId);
            throw new ValidationException(
                "RegistrationEndDateUtc",
                $"Registration end ({request.RegistrationEndDateUtc:yyyy-MM-dd HH:mm} UTC) must be strictly earlier than event start ({request.EventDate:yyyy-MM-dd HH:mm} UTC). Same-day is allowed if times differ.");
        }

        // Validate dates are in the future (warn but allow for testing)
        if (request.RegistrationEndDateUtc <= nowUtc)
        {
            _logger.LogWarning(
                "Event {EventId} updated with past RegistrationEndDateUtc: {RegEnd}. This may trigger immediate auto-cancel if no registrations.",
                request.EventId,
                request.RegistrationEndDateUtc.ToString("o"));
        }

        try
        {
            // Use domain method which enforces:
            // - Event must be in Draft (Created) status
            // - Throws DomainException if event is Active, Completed, or Cancelled
            @event.UpdateDetails(
                name: request.Name,
                description: request.Description,
                eventDate: request.EventDate,
                totalPointsPool: request.TotalPointsPool,
                location: request.Location,
                maxParticipants: request.MaxParticipants,
                registrationEndDate: request.RegistrationEndDateUtc,
                bannerImageUrl: request.BannerImageUrl);

            // Update the entity in the repository
            await _eventRepository.UpdateAsync(@event);
            await _unitOfWork.SaveChangesAsync(ct);

            _logger.LogInformation(
                "Event updated: {EventId}, EventDate={EventDate}, RegEnd={RegEnd}",
                @event.Id, @event.EventDate.ToString("o"), @event.RegistrationEndDate?.ToString("o"));

            return _mapper.Map<EventDto>(@event);
        }
        catch (DomainException ex)
        {
            // Re-throw domain exceptions as InvalidOperationException with clear message
            throw new InvalidOperationException(ex.Message, ex);
        }
    }
}
