using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.APPLICATION.Validators;
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

        // Normalize whitespace on text fields
        var normalizedName = SharedValidationRules.NormalizeWhitespace(request.Name);
        var normalizedDescription = SharedValidationRules.NormalizeWhitespace(request.Description);
        var normalizedLocation = SharedValidationRules.NormalizeWhitespace(request.Location);

        // Validate event name
        var (nameValid, nameError) = SharedValidationRules.ValidateEventName(normalizedName);
        if (!nameValid)
        {
            _logger.LogWarning("Event creation failed: {Error}", nameError);
            throw new ValidationException("Name", nameError!);
        }

        // Validate description
        var (descValid, descError) = SharedValidationRules.ValidateEventDescription(normalizedDescription);
        if (!descValid)
        {
            _logger.LogWarning("Event creation failed: {Error}", descError);
            throw new ValidationException("Description", descError!);
        }

        // Validate location (if provided)
        var (locValid, locError) = SharedValidationRules.ValidateEventLocation(normalizedLocation);
        if (!locValid)
        {
            _logger.LogWarning("Event creation failed: {Error}", locError);
            throw new ValidationException("Location", locError!);
        }

        // Validate max participants
        var (partValid, partError) = SharedValidationRules.ValidateEventMaxParticipants(request.MaxParticipants);
        if (!partValid)
        {
            _logger.LogWarning("Event creation failed: {Error}", partError);
            throw new ValidationException("MaxParticipants", partError!);
        }

        // Validate points pool
        var (poolValid, poolError) = SharedValidationRules.ValidateEventPointsPool(request.TotalPointsPool);
        if (!poolValid)
        {
            _logger.LogWarning("Event creation failed: {Error}", poolError);
            throw new ValidationException("TotalPointsPool", poolError!);
        }

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

        // Validate dates (future and RegistrationEnd < EventDate)
        var (datesValid, datesError) = SharedValidationRules.ValidateEventDates(
            request.EventDate, 
            request.RegistrationEndDateUtc.Value, 
            nowUtc);
        if (!datesValid)
        {
            // Determine which field the error relates to
            var fieldName = datesError!.Contains("Registration") ? "RegistrationEndDateUtc" : "EventDate";
            _logger.LogWarning("Event creation failed: {Error}", datesError);
            throw new ValidationException(fieldName, datesError);
        }

        // Check event name uniqueness
        var nameExists = await _eventRepository.ExistsByNameAsync(normalizedName);
        if (nameExists)
        {
            _logger.LogWarning("Event creation failed: Event name '{Name}' is already in use", normalizedName);
            throw new ValidationException("Name", "An event with this name already exists. Please choose a different name.");
        }

        var @event = new Event(
            normalizedName,
            normalizedDescription,
            request.EventDate,
            request.TotalPointsPool,
            string.IsNullOrWhiteSpace(normalizedLocation) ? null : normalizedLocation,
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
