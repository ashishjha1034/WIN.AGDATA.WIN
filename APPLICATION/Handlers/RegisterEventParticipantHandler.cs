using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

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

            // Validate event exists
            var @event = await _eventRepository.GetByIdAsync(request.EventId);
            if (@event == null)
                throw new InvalidOperationException($"Event with ID {request.EventId} not found");

            // Register participant using repository method (avoids concurrency issues)
            await _eventRepository.AddParticipantAsync(request.EventId, request.UserId);
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
