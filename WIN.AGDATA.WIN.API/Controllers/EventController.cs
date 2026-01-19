using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.API.Controllers;

/// <summary>
/// Event management endpoints for participation and points awards
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Authorize(Policy = "PasswordChanged")]
[SwaggerTag("Events")]
public class EventController : ControllerBase
{
    private readonly IEventRepository _eventRepository;
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    private readonly ICurrentUserService _currentUserService;

    public EventController(
        IEventRepository eventRepository,
        IMediator mediator,
        IMapper mapper,
        ICurrentUserService currentUserService)
    {
        _eventRepository = eventRepository;
        _mediator = mediator;
        _mapper = mapper;
        _currentUserService = currentUserService;
    }

    /// <summary>
    /// Get all events
    /// </summary>
    /// <remarks>
    /// Retrieve list of all events including upcoming and past events.
    /// No authentication required.
    /// </remarks>
    /// <returns>List of events</returns>
    /// <response code="200">Events retrieved successfully</response>
    [HttpGet]
    [AllowAnonymous]
    [SwaggerOperation(Summary = "Get all events", Description = "List all events")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    public async Task<ActionResult> GetEvents()
    {
        try
        {
            var events = await _eventRepository.GetAllAsync();

            return Ok(new
            {
                count = events.Count,
                data = _mapper.Map<List<EventDto>>(events)
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve events", error = ex.Message });
        }
    }

    /// <summary>
    /// Get event by ID
    /// </summary>
    /// <remarks>
    /// Retrieve detailed information for a specific event.
    /// No authentication required.
    /// </remarks>
    /// <param name="id">Event ID</param>
    /// <returns>Event details with participant count</returns>
    /// <response code="200">Event found</response>
    /// <response code="404">Event not found</response>
    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    [SwaggerOperation(Summary = "Get event by ID", Description = "Retrieve specific event details")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetEvent(Guid id)
    {
        try
        {
            var @event = await _eventRepository.GetByIdWithParticipantsAsync(id);

            if (@event == null)
                return NotFound(new { message = "Event not found" });

            return Ok(new
            {
                data = _mapper.Map<EventDto>(@event),
                participantCount = @event.Participants.Count
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve event", error = ex.Message });
        }
    }

    /// <summary>
    /// Create new event
    /// </summary>
    /// <remarks>
    /// Create a new event for employee participation and points awards.
    /// Requires authentication.
    /// 
    /// Example:
    ///
    ///     POST /api/events
    ///     {
    ///       "name": "Q4 Awards Ceremony",
    ///       "eventDate": "2025-04-15T09:00:00Z",
    ///       "description": "Quarterly employee recognition event",
    ///       "totalPointsPool": 5000,
    ///       "location": "Main Hall",
    ///       "maxParticipants": 100
    ///     }
    /// </remarks>
    /// <param name="request">Event creation details</param>
    /// <returns>Created event</returns>
    /// <response code="201">Event created successfully</response>
    /// <response code="400">Invalid input</response>
    /// <response code="401">Unauthorized</response>
    [HttpPost]
    [Authorize]
    [SwaggerOperation(Summary = "Create event", Description = "Add new event")]
    [ProducesResponseType(typeof(EventDto), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<EventDto>> CreateEvent([FromBody] CreateEventRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var command = new CreateEventCommand(
                request.Name,
                request.EventDate,
                request.Description,
                request.TotalPointsPool,
                request.Location,
                request.MaxParticipants,
                request.RegistrationEndDate,
                request.BannerImageUrl
            );

            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetEvent), new { id = result.Id }, result);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to create event", error = ex.Message });
        }
    }

    /// <summary>
    /// Register for event
    /// </summary>
    /// <remarks>
    /// Register the current user for participation in an event.
    /// User must be authenticated.
    /// Each user can only register once per event.
    /// </remarks>
    /// <param name="id">Event ID to register for</param>
    /// <returns>Registration confirmation</returns>
    /// <response code="200">Registered successfully</response>
    /// <response code="400">Already registered or event not found</response>
    /// <response code="401">Unauthorized</response>
    [HttpPost("{id:guid}/register")]
    [Authorize(Policy = "PasswordChanged")]
    [SwaggerOperation(Summary = "Register for event", Description = "Join an event")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult> RegisterForEvent(Guid id)
    {
        try
        {
            var userId = _currentUserService.GetCurrentUserId();

            var command = new RegisterEventParticipantCommand(id, userId);
            await _mediator.Send(command);

            return Ok(new { message = "Registered for event successfully", eventId = id, userId = userId });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { 
                message = ex.Message,
                error = ex.InnerException?.Message,
                eventId = id
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { 
                    message = "Failed to register for event", 
                    error = ex.Message,
                    innerError = ex.InnerException?.Message,
                    eventId = id
                });
        }
    }

    /// <summary>
    /// Award points to event participant
    /// </summary>
    /// <remarks>
    /// Award points to a participant for event participation.
    /// Admin only operation.
    /// </remarks>
    /// <param name="eventId">Event ID</param>
    /// <param name="participantId">Participant user ID</param>
    /// <param name="request">Points to award</param>
    /// <returns>Confirmation message</returns>
    /// <response code="200">Points awarded</response>
    /// <response code="400">Invalid request</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpPost("{eventId:guid}/award-points/{participantId:guid}")]
    [Authorize(Roles = "Admin")]
    [SwaggerOperation(Summary = "Award event points", Description = "Grant points to participant (admin only)")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> AwardPoints(Guid eventId, Guid participantId, [FromBody] AwardPointsRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var command = new AwardEventPointsCommand(eventId, participantId, request.Points);
            await _mediator.Send(command);

            return Ok(new
            {
                message = "Points awarded successfully",
                eventId,
                participantId,
                points = request.Points
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to award points", error = ex.Message });
        }
    }

    /// <summary>
    /// Get current user's events
    /// </summary>
    /// <remarks>
    /// List all events the current user is registered for.
    /// Requires authentication.
    /// </remarks>
    /// <returns>List of user's events</returns>
    /// <response code="200">Events retrieved</response>
    /// <response code="401">Unauthorized</response>
    [HttpGet("user/my-events")]
    [Authorize]
    [SwaggerOperation(Summary = "Get my events", Description = "List events you're registered for")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult> GetMyEvents()
    {
        try
        {
            var userId = _currentUserService.GetCurrentUserId();
            var myEvents = await _eventRepository.GetUserEventsAsync(userId);

            return Ok(new
            {
                count = myEvents.Count,
                data = _mapper.Map<List<EventDto>>(myEvents)
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve events", error = ex.Message });
        }
    }
}
