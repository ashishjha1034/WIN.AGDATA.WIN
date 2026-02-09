using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Events;

/// <summary>
/// Orchestrates event participant registration.
/// Business rules are enforced in the domain (Event.RegisterParticipant).
/// </summary>
public class RegisterEventParticipantHandler : IRequestHandler<RegisterEventParticipantCommand>
{
    private readonly IEventRepository _eventRepository;
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public RegisterEventParticipantHandler(
        IEventRepository eventRepository,
        IUserRepository userRepository,
        IUnitOfWork unitOfWork)
    {
        _eventRepository = eventRepository;
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(RegisterEventParticipantCommand request, CancellationToken ct)
    {
        // Validate user exists
        var user = await _userRepository.GetByIdAsync(request.UserId);
        if (user == null)
            throw new InvalidOperationException($"User with ID {request.UserId} not found");

        // Load event with participants
        var @event = await _eventRepository.GetByIdWithParticipantsAsync(request.EventId);
        if (@event == null)
            throw new InvalidOperationException($"Event with ID {request.EventId} not found");

        // Domain method enforces all business rules:
        // - Registration deadline validation
        // - Duplicate check
        // - Capacity check
        // - Status validation (must be Draft)
        @event.RegisterParticipant(request.UserId, DateTime.UtcNow);

        await _unitOfWork.SaveChangesAsync(ct);
    }
}