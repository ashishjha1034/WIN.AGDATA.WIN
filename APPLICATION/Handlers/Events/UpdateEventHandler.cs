using AutoMapper;
using MediatR;
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

    public UpdateEventHandler(
        IEventRepository eventRepository,
        IUnitOfWork unitOfWork,
        IMapper mapper)
    {
        _eventRepository = eventRepository;
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<EventDto> Handle(UpdateEventCommand request, CancellationToken ct)
    {
        // Load the event
        var @event = await _eventRepository.GetByIdAsync(request.EventId)
            ?? throw new InvalidOperationException($"Event with ID {request.EventId} not found");

        // Validate RegistrationEndDateUtc is in the future
        if (request.RegistrationEndDateUtc <= DateTime.UtcNow)
            throw new InvalidOperationException("RegistrationEndDateUtc must be in the future.");

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

            return _mapper.Map<EventDto>(@event);
        }
        catch (DomainException ex)
        {
            // Re-throw domain exceptions as InvalidOperationException with clear message
            throw new InvalidOperationException(ex.Message, ex);
        }
    }
}
