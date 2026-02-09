using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.APPLICATION.Validators;
using WIN.AGDATA.WIN.Domain.Exceptions;
using WIN.AGDATA.WIN.Domain.ValueObjects;

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

        // Normalize whitespace on text fields
        var normalizedName = SharedValidationRules.NormalizeWhitespace(request.Name);
        var normalizedDescription = SharedValidationRules.NormalizeWhitespace(request.Description);
        var normalizedLocation = SharedValidationRules.NormalizeWhitespace(request.Location);

        // Validate event name
        var (nameValid, nameError) = SharedValidationRules.ValidateEventName(normalizedName);
        if (!nameValid)
        {
            _logger.LogWarning("Event update failed: {Error} for Event {EventId}", nameError, request.EventId);
            throw new ValidationException("Name", nameError!);
        }

        // Validate description
        var (descValid, descError) = SharedValidationRules.ValidateEventDescription(normalizedDescription);
        if (!descValid)
        {
            _logger.LogWarning("Event update failed: {Error} for Event {EventId}", descError, request.EventId);
            throw new ValidationException("Description", descError!);
        }

        // Validate location (if provided)
        var (locValid, locError) = SharedValidationRules.ValidateEventLocation(normalizedLocation);
        if (!locValid)
        {
            _logger.LogWarning("Event update failed: {Error} for Event {EventId}", locError, request.EventId);
            throw new ValidationException("Location", locError!);
        }

        // Validate max participants
        var (partValid, partError) = SharedValidationRules.ValidateEventMaxParticipants(request.MaxParticipants);
        if (!partValid)
        {
            _logger.LogWarning("Event update failed: {Error} for Event {EventId}", partError, request.EventId);
            throw new ValidationException("MaxParticipants", partError!);
        }

        // Validate points pool
        var (poolValid, poolError) = SharedValidationRules.ValidateEventPointsPool(request.TotalPointsPool);
        if (!poolValid)
        {
            _logger.LogWarning("Event update failed: {Error} for Event {EventId}", poolError, request.EventId);
            throw new ValidationException("TotalPointsPool", poolError!);
        }

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

        // Validate dates (future and RegistrationEnd < EventDate)
        var (datesValid, datesError) = SharedValidationRules.ValidateEventDates(
            request.EventDate, 
            request.RegistrationEndDateUtc, 
            nowUtc);
        if (!datesValid)
        {
            // Determine which field the error relates to
            var fieldName = datesError!.Contains("Registration") ? "RegistrationEndDateUtc" : "EventDate";
            _logger.LogWarning("Event update failed: {Error} for Event {EventId}", datesError, request.EventId);
            throw new ValidationException(fieldName, datesError);
        }

        // Check event name uniqueness (excluding current event)
        var nameExists = await _eventRepository.ExistsByNameAsync(normalizedName, request.EventId);
        if (nameExists)
        {
            _logger.LogWarning("Event update failed: Event name '{Name}' is already in use for Event {EventId}", normalizedName, request.EventId);
            throw new ValidationException("Name", "An event with this name already exists. Please choose a different name.");
        }

        try
        {
            // Use domain method which enforces:
            // - Event must be in Draft (Created) status
            // - Throws DomainException if event is Active, Completed, or Cancelled
            @event.UpdateDetails(
                name: normalizedName,
                description: normalizedDescription,
                eventDate: request.EventDate,
                totalPointsPool: request.TotalPointsPool.HasValue ? Points.Create(request.TotalPointsPool.Value) : (Points?)null,
                location: string.IsNullOrWhiteSpace(normalizedLocation) ? null : normalizedLocation,
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
