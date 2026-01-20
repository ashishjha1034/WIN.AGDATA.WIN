using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Events;

/// <summary>
/// Handler for checking in a participant at an event.
/// </summary>
public class CheckInParticipantHandler : IRequestHandler<CheckInParticipantCommand>
{
    private readonly IEventRepository _eventRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public CheckInParticipantHandler(
        IEventRepository eventRepository,
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _eventRepository = eventRepository;
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task Handle(CheckInParticipantCommand request, CancellationToken ct)
    {
        var @event = await _eventRepository.GetByIdWithParticipantsAsync(request.EventId)
                     ?? throw new InvalidOperationException("Event not found");

        var currentUserId = _currentUserService.GetCurrentUserId();

        try
        {
            // Use domain method which enforces:
            // - Event status must be Active
            // - Participant must exist
            @event.CheckInParticipantByUserId(request.ParticipantUserId, currentUserId);

            await _unitOfWork.SaveChangesAsync(ct);
        }
        catch (DomainException ex)
        {
            throw new InvalidOperationException(ex.Message, ex);
        }
    }
}
