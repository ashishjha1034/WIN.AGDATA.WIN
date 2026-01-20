using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Events;

public class RegisterEventParticipantHandler : IRequestHandler<RegisterEventParticipantCommand>
{
    private readonly IEventRepository _eventRepository;
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public RegisterEventParticipantHandler(IEventRepository eventRepository, IUserRepository userRepository, IUnitOfWork unitOfWork)
    {
        _eventRepository = eventRepository;
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(RegisterEventParticipantCommand request, CancellationToken ct)
    {
        try
        {
            // Validate user exists
            var user = await _userRepository.GetByIdAsync(request.UserId);
            if (user == null)
                throw new InvalidOperationException($"User with ID {request.UserId} not found");

            // Load event with participants to use domain-level validation
            var @event = await _eventRepository.GetByIdWithParticipantsAsync(request.EventId);
            if (@event == null)
                throw new InvalidOperationException($"Event with ID {request.EventId} not found");

            // Validate using domain guards before registration
            // This throws DomainException with clear error messages if validation fails
            if (!@event.CanRegister(DateTime.UtcNow))
            {
                if (@event.Status != Domain.Enums.EventStatus.Draft)
                    throw new InvalidOperationException($"Registration is closed. Event status is {@event.Status}. Registration is only allowed for Draft events.");

                if (!@event.RegistrationEndDate.HasValue)
                    throw new InvalidOperationException("Registration deadline is not set for this event.");

                throw new InvalidOperationException($"Registration deadline has passed. Deadline was {@event.RegistrationEndDate.Value:u}.");
            }

            // Check if already registered
            if (await _eventRepository.IsUserRegisteredForEventAsync(request.EventId, request.UserId))
                throw new InvalidOperationException("You are already registered for this event");

            // Check max participants
            if (@event.MaxParticipants.HasValue && @event.Participants.Count >= @event.MaxParticipants.Value)
                throw new InvalidOperationException($"Event has reached maximum capacity of {@event.MaxParticipants.Value} participants.");

            // Use repository method to ensure proper EF tracking
            // (This bypasses domain Register method but we already validated with domain guards above)
            await _eventRepository.AddParticipantAsync(request.EventId, request.UserId);
        }
        catch (DomainException ex)
        {
            // Re-throw domain exceptions with clear message
            throw new InvalidOperationException(ex.Message, ex);
        }
        catch (InvalidOperationException)
        {
            throw;
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Failed to register for event: {ex.Message}", ex);
        }
    }
}
