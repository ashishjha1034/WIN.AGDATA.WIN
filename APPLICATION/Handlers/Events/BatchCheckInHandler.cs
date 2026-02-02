using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Enums;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Events;

/// <summary>
/// Handler for batch checking in all registered participants at an event.
/// </summary>
public class BatchCheckInHandler : IRequestHandler<BatchCheckInCommand, BatchCheckInResult>
{
    private readonly IEventRepository _eventRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public BatchCheckInHandler(
        IEventRepository eventRepository,
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _eventRepository = eventRepository;
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task<BatchCheckInResult> Handle(BatchCheckInCommand request, CancellationToken ct)
    {
        var @event = await _eventRepository.GetByIdWithParticipantsAsync(request.EventId)
                     ?? throw new InvalidOperationException("Event not found");

        if (@event.Status != EventStatus.Active)
            throw new InvalidOperationException($"Cannot batch check-in participants. Event must be Active. Current status: {@event.Status}");

        var currentUserId = _currentUserService.GetCurrentUserId();

        int totalRegistered = 0;
        int checkedIn = 0;
        int alreadyCheckedIn = 0;
        int failed = 0;

        foreach (var participant in @event.Participants)
        {
            totalRegistered++;
            
            // Skip if already checked in (Attended)
            if (participant.AttendanceStatus == AttendanceStatus.Attended)
            {
                alreadyCheckedIn++;
                continue;
            }

            try
            {
                participant.MarkCheckedIn();
                checkedIn++;
            }
            catch
            {
                failed++;
            }
        }

        await _unitOfWork.SaveChangesAsync(ct);

        return new BatchCheckInResult(totalRegistered, checkedIn, alreadyCheckedIn, failed);
    }
}
