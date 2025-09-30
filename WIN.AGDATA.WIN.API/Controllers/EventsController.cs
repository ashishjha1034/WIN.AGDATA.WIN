using Microsoft.AspNetCore.Mvc;
using System.Linq;
using WIN.AGDATA.WIN.API.Controllers;
using WIN.AGDATA.WIN.Domain.Entities.Events;
using WIN_AGDATA_WIN.Application.Interfaces;
using WIN_AGDATA_WIN.Domain.Entities.Events;

namespace WIN_AGDATA_WIN.API.Controllers
{
    public class EventsController : ApiControllerBase
    {
        private readonly IEventService _eventService;
        private readonly IPointsService _pointsService;

        public EventsController(IEventService eventService, IPointsService pointsService)
        {
            _eventService = eventService;
            _pointsService = pointsService;
        }

        [HttpPost]
        public IActionResult CreateEvent([FromBody] CreateEventRequest request)
        {
            try
            {
                var prizeTiers = request.PrizeTiers.Select(pt =>
                    new PrizeTier(pt.Rank, pt.Points, pt.Description)).ToList();

                var eventObj = _eventService.CreateEvent(
                    request.Name,
                    request.Description,
                    request.EventDate,
                    prizeTiers
                );

                return Ok(new EventResponse(eventObj));
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpGet("{eventId}")]
        public IActionResult GetEvent(string eventId)  // Changed from Guid to string
        {
            try
            {
                var eventObj = _eventService.GetEvent(eventId);
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

        [HttpPost("{eventId}/complete")]
        public IActionResult CompleteEvent(string eventId, [FromBody] CompleteEventRequest request)  // Changed from Guid to string
        {
            try
            {
                var winners = request.Winners.Select(w =>
                    new Winner(w.EmployeeEmail, w.Rank, w.EmployeeName)).ToList();

                _eventService.CompleteEvent(eventId, winners);

                // Allocate points to winners
                var eventObj = _eventService.GetEvent(eventId);
                foreach (var winner in winners)
                {
                    var points = eventObj!.GetPointsForRank(winner.Rank);
                    if (points.HasValue)
                    {
                        _pointsService.AllocatePoints(
                            winner.EmployeeEmail, // Using email as identifier
                            points.Value,
                            eventId,  // Now using string eventId
                            $"Awarded for {eventObj.Info.Name} - Rank {winner.Rank}"
                        );
                    }
                }

                return Ok(new { message = "Event completed and points allocated to winners" });
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }

        [HttpPost("{eventId}/prize-tiers")]
        public IActionResult AddPrizeTier(string eventId, [FromBody] AddPrizeTierRequest request)  // Changed from Guid to string
        {
            try
            {
                var prizeTier = new PrizeTier(request.Rank, request.Points, request.Description);
                _eventService.AddPrizeTier(eventId, prizeTier);
                return Ok(new { message = "Prize tier added successfully" });
            }
            catch (Exception ex)
            {
                return HandleException(ex);
            }
        }
    }

    // Request/Response DTOs (Updated EventResponse)
    public record CreateEventRequest(
        string Name,
        string Description,
        DateTime EventDate,
        List<PrizeTierRequest> PrizeTiers
    );

    public record PrizeTierRequest(int Rank, int Points, string Description);

    public record CompleteEventRequest(List<WinnerRequest> Winners);

    public record WinnerRequest(string EmployeeEmail, int Rank, string EmployeeName);

    public record AddPrizeTierRequest(int Rank, int Points, string Description);

    public record EventResponse(
        string EventId,  // Simple string ID
        string Name,
        string Description,
        DateTime EventDate,
        bool IsActive,
        bool IsCompleted,
        List<PrizeTierResponse> PrizeTiers,
        List<WinnerResponse> Winners
    )
    {
        public EventResponse(Event eventObj) : this(
            eventObj.EventId,  // Simple string ID
            eventObj.Info.Name,
            eventObj.Info.Description,
            eventObj.Info.Date,
            eventObj.Status.IsActive,
            eventObj.Status.IsCompleted,
            eventObj.Prizes.Tiers.Select(pt => new PrizeTierResponse(pt)).ToList(),
            eventObj.Status.Winners.Select(w => new WinnerResponse(w)).ToList()
        )
        { }
    }

    public record PrizeTierResponse(int Rank, int Points, string Description)
    {
        public PrizeTierResponse(PrizeTier prizeTier) : this(
            prizeTier.Rank,
            prizeTier.Points,
            prizeTier.Description
        )
        { }
    }

    public record WinnerResponse(string EmployeeEmail, int Rank, string EmployeeName)
    {
        public WinnerResponse(Winner winner) : this(
            winner.EmployeeEmail,
            winner.Rank,
            winner.EmployeeName
        )
        { }
    }
}