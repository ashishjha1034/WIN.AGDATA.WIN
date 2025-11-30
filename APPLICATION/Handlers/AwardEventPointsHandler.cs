using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Events;

public class AwardEventPointsHandler : IRequestHandler<AwardEventPointsCommand>
{
    private readonly IEventRepository _eventRepository;
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public AwardEventPointsHandler(IEventRepository eventRepository, IUserRepository userRepository, IUnitOfWork unitOfWork)
    {
        _eventRepository = eventRepository;
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(AwardEventPointsCommand request, CancellationToken ct)
    {
        var @event = await _eventRepository.GetByIdWithParticipantsAsync(request.EventId)
                     ?? throw new InvalidOperationException("Event not found");

        var participant = @event.Participants.FirstOrDefault(p => p.Id == request.ParticipantId)
                          ?? throw new InvalidOperationException("Participant not found");

        var user = await _userRepository.GetByIdWithPointsAsync(participant.UserId)
                   ?? throw new InvalidOperationException("User not found");

        user.PointsAccount.AddPoints(request.Points, $"Award for event: {@event.Name}");

        participant.AwardPoints(request.Points);

        await _unitOfWork.SaveChangesAsync(ct);
    }
}
