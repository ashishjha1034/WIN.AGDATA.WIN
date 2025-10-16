using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN_AGDATA_WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.API.Controllers;

public class EventsController : ApiControllerBase
{
    private readonly IEventService _eventService;

    public EventsController(IEventService eventService)
    {
        _eventService = eventService ?? throw new ArgumentNullException(nameof(eventService));
    }

    [HttpPost]
    public IActionResult CreateEvent([FromBody] CreateEventRequest request)
    {
        try
        {
            var prizes = request.Prizes.Select(p => new EventPrizeTier(p.Rank, p.Points, p.Description)).ToList();
            var eventObj = _eventService.CreateEvent(request.EventId, request.Name, request.Description, request.EventDate, prizes);

            return CreatedAtAction(nameof(GetEventById),
                new { eventId = eventObj.EventId },
                new EventResponse(eventObj));
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet("{eventId}")]
    public IActionResult GetEventById(string eventId)
    {
        try
        {
            var eventObj = _eventService.GetEventById(eventId);
            return OkOrNotFound(eventObj == null ? null : new EventResponse(eventObj));
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet]
    public IActionResult GetAllEvents()
    {
        try
        {
            var events = _eventService.GetAllEvents();
            var response = events.Select(e => new EventResponse(e));
            return Ok(response);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet("active")]
    public IActionResult GetActiveEvents()
    {
        try
        {
            var events = _eventService.GetActiveEvents();
            var response = events.Select(e => new EventResponse(e));
            return Ok(response);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpGet("upcoming")]
    public IActionResult GetUpcomingEvents()
    {
        try
        {
            var events = _eventService.GetUpcomingEvents();
            var response = events.Select(e => new EventResponse(e));
            return Ok(response);
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPost("{eventId}/complete")]
    public IActionResult CompleteEvent(string eventId, [FromBody] CompleteEventRequest request)
    {
        try
        {
            var winners = request.Winners.Select(w => new EventWinner(w.EmployeeId, w.Rank)).ToList();
            _eventService.CompleteEvent(eventId, winners);

            return Ok(new { message = "Event completed successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPost("{eventId}/deactivate")]
    public IActionResult DeactivateEvent(string eventId, [FromBody] DeactivateEventRequest? request = null)
    {
        try
        {
            _eventService.DeactivateEvent(eventId, request?.Reason ?? "Manual deactivation");
            return Ok(new { message = "Event deactivated successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPost("{eventId}/reactivate")]
    public IActionResult ReactivateEvent(string eventId)
    {
        try
        {
            _eventService.ReactivateEvent(eventId);
            return Ok(new { message = "Event reactivated successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPost("{eventId}/prizes")]
    public IActionResult AddPrizeTier(string eventId, [FromBody] AddPrizeTierRequest request)
    {
        try
        {
            var prizeTier = new EventPrizeTier(request.Rank, request.Points, request.Description);
            _eventService.AddPrizeTier(eventId, prizeTier);

            return Ok(new { message = "Prize tier added successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }

    [HttpPost("process-expired")]
    public IActionResult ProcessExpiredEvents()
    {
        try
        {
            _eventService.ProcessExpiredEvents();
            return Ok(new { message = "Expired events processed successfully" });
        }
        catch (Exception ex)
        {
            return HandleException(ex);
        }
    }
}

public record CreateEventRequest(string EventId, string Name, string Description, DateTime EventDate, List<PrizeTierRequest> Prizes);
public record PrizeTierRequest(int Rank, int Points, string Description);
public record CompleteEventRequest(List<WinnerRequest> Winners);
public record WinnerRequest(string EmployeeId, int Rank);
public record DeactivateEventRequest(string Reason);
public record AddPrizeTierRequest(int Rank, int Points, string Description);

public record EventResponse(
    string EventId,
    string Name,
    string Description,
    DateTime EventDate,
    bool IsActive,
    bool IsCompleted,
    bool IsUpcoming,
    bool IsRecent,
    List<PrizeTierResponse> Prizes,
    List<WinnerResponse> Winners,
    DateTime CreatedAt)
{
    public EventResponse(Event eventObj) : this(
        eventObj.EventId,
        eventObj.Info.Name,
        eventObj.Info.Description,
        eventObj.Info.EventDate,
        eventObj.Status.IsActive,
        eventObj.Status.IsCompleted,
        eventObj.Info.IsUpcoming,
        eventObj.Info.IsRecent,
        eventObj.Prizes.Select(p => new PrizeTierResponse(p.Rank, p.Points, p.Description)).ToList(),
        eventObj.Status.Winners.Select(w => new WinnerResponse(w.EmployeeId, w.Rank, w.WonAt)).ToList(),
        eventObj.Status.CreatedAt)
    { }
}

public record PrizeTierResponse(int Rank, int Points, string Description);
public record WinnerResponse(string EmployeeId, int Rank, DateTime WonAt);
