using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Events;

public class AwardEventPointsHandler : IRequestHandler<AwardEventPointsCommand>
{
    private readonly IEventRepository _eventRepository;
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public AwardEventPointsHandler(
        IEventRepository eventRepository,
        IUserRepository userRepository,
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _eventRepository = eventRepository;
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task Handle(AwardEventPointsCommand request, CancellationToken ct)
    {
        var @event = await _eventRepository.GetByIdWithParticipantsAsync(request.EventId)
                     ?? throw new InvalidOperationException("Event not found");

        var participant = @event.Participants.FirstOrDefault(p => p.Id == request.ParticipantId)
                          ?? throw new InvalidOperationException("Participant not found");

        var user = await _userRepository.GetByIdWithPointsAsync(participant.UserId)
                   ?? throw new InvalidOperationException("User not found");

        var currentUserId = _currentUserService.GetCurrentUserId();

        user.PointsAccount.AddPoints(request.Points, currentUserId);

        // AwardPoints requires: (int points, int? rank, Guid awardedBy)
        participant.AwardPoints(request.Points, rank: null, currentUserId);

        await _unitOfWork.SaveChangesAsync(ct);
    }
}
