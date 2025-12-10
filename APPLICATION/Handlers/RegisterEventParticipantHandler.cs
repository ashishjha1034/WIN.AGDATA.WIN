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
        var @event = await _eventRepository.GetByIdWithParticipantsAsync(request.EventId)
                     ?? throw new InvalidOperationException("Event not found");

        var user = await _userRepository.GetByIdAsync(request.UserId)
                   ?? throw new InvalidOperationException("User not found");

        @event.AddParticipant(request.UserId);

        await _unitOfWork.SaveChangesAsync(ct);
    }
}
