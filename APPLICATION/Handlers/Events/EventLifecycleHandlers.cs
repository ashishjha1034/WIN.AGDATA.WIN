using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Events;

/// <summary>
/// Handler for activating an event (Draft → Active).
/// </summary>
public class ActivateEventHandler : IRequestHandler<ActivateEventCommand>
{
    private readonly IEventRepository _eventRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public ActivateEventHandler(
        IEventRepository eventRepository,
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _eventRepository = eventRepository;
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task Handle(ActivateEventCommand request, CancellationToken ct)
    {
        var @event = await _eventRepository.GetByIdAsync(request.EventId)
                     ?? throw new InvalidOperationException("Event not found");

        var currentUserId = _currentUserService.GetCurrentUserId();

        try
        {
            @event.Activate(currentUserId);
            await _unitOfWork.SaveChangesAsync(ct);
        }
        catch (DomainException ex)
        {
            throw new InvalidOperationException(ex.Message, ex);
        }
    }
}

/// <summary>
/// Handler for completing an event (Active → Completed).
/// </summary>
public class CompleteEventHandler : IRequestHandler<CompleteEventCommand>
{
    private readonly IEventRepository _eventRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public CompleteEventHandler(
        IEventRepository eventRepository,
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _eventRepository = eventRepository;
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task Handle(CompleteEventCommand request, CancellationToken ct)
    {
        var @event = await _eventRepository.GetByIdAsync(request.EventId)
                     ?? throw new InvalidOperationException("Event not found");

        var currentUserId = _currentUserService.GetCurrentUserId();

        try
        {
            // Validate that 100% of points have been awarded before completing
            if (@event.TotalPointsPool.HasValue && @event.TotalPointsPool.Value > 0)
            {
                if (@event.DistributedPoints < @event.TotalPointsPool.Value)
                {
                    var awardedPercent = (@event.DistributedPoints * 100m / @event.TotalPointsPool.Value);
                    throw new DomainException(
                        $"Cannot mark event as Completed until 100% of points are awarded. " +
                        $"Currently {Math.Round(awardedPercent, 2)}% awarded " +
                        $"({@event.DistributedPoints}/{@event.TotalPointsPool.Value} points).");
                }
            }

            @event.CompleteEvent(currentUserId);
            await _unitOfWork.SaveChangesAsync(ct);
        }
        catch (DomainException ex)
        {
            throw new InvalidOperationException(ex.Message, ex);
        }
    }
}

/// <summary>
/// Handler for cancelling an event (Draft/Active → Cancelled).
/// </summary>
public class CancelEventHandler : IRequestHandler<CancelEventCommand>
{
    private readonly IEventRepository _eventRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public CancelEventHandler(
        IEventRepository eventRepository,
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _eventRepository = eventRepository;
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task Handle(CancelEventCommand request, CancellationToken ct)
    {
        var @event = await _eventRepository.GetByIdAsync(request.EventId)
                     ?? throw new InvalidOperationException("Event not found");

        var currentUserId = _currentUserService.GetCurrentUserId();

        try
        {
            @event.CancelEvent(currentUserId);
            await _unitOfWork.SaveChangesAsync(ct);
        }
        catch (DomainException ex)
        {
            throw new InvalidOperationException(ex.Message, ex);
        }
    }
}
