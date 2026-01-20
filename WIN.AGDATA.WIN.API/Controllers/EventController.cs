using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.API.Controllers;

/// <summary>
/// Event management endpoints for participation and points awards.
/// Implements MVP Event Lifecycle: Created (Draft) → Active → Completed/Cancelled.
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
    /// Status values: "Created" (Draft), "Active", "Completed", "Cancelled".
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
    /// Status values: "Created" (Draft), "Active", "Completed", "Cancelled".
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
    /// Requires authentication. Event starts in "Created" (Draft) status.
    /// 
    /// **RegistrationEndDateUtc is REQUIRED** - specifies when registration closes (inclusive).
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
    ///       "maxParticipants": 100,
    ///       "registrationEndDateUtc": "2025-04-14T23:59:59Z"
    ///     }
    /// </remarks>
    /// <param name="request">Event creation details</param>
    /// <returns>Created event</returns>
    /// <response code="201">Event created successfully</response>
    /// <response code="400">Invalid input or missing RegistrationEndDateUtc</response>
    /// <response code="401">Unauthorized</response>
    [HttpPost]
    [Authorize]
    [SwaggerOperation(Summary = "Create event", Description = "Add new event. RegistrationEndDateUtc is required.")]
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
                request.RegistrationEndDateUtc,
                request.BannerImageUrl
            );

            var result = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetEvent), new { id = result.Id }, result);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to create event", error = ex.Message });
        }
    }

    /// <summary>
    /// Update event
    /// </summary>
    /// <remarks>
    /// Update an existing event's details.
    /// Admin only operation.
    /// 
    /// **Edit Rules:**
    /// - Only events in "Created" (Draft) status can be updated
    /// - Cannot edit after event is activated, completed, or cancelled
    /// - RegistrationEndDateUtc must be in the future
    /// 
    /// Example:
    ///
    ///     PUT /api/event/{id}
    ///     {
    ///       "name": "Updated Event Name",
    ///       "eventDate": "2025-05-15T09:00:00Z",
    ///       "description": "Updated description",
    ///       "totalPointsPool": 6000,
    ///       "location": "Updated Location",
    ///       "maxParticipants": 150,
    ///       "registrationEndDateUtc": "2025-05-14T23:59:59Z"
    ///     }
    /// </remarks>
    /// <param name="id">Event ID</param>
    /// <param name="request">Updated event details</param>
    /// <returns>Updated event</returns>
    /// <response code="200">Event updated successfully</response>
    /// <response code="400">Invalid input or event cannot be edited (not in Created status)</response>
    /// <response code="403">Forbidden - admin only</response>
    /// <response code="404">Event not found</response>
    [HttpPut("{id:guid}")]
    [Authorize(Policy = "AdminOnly")]
    [SwaggerOperation(Summary = "Update event", Description = "Update event details. Admin only. Event must be in Created (Draft) status.")]
    [ProducesResponseType(typeof(EventDto), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult<EventDto>> UpdateEvent(Guid id, [FromBody] UpdateEventRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var command = new UpdateEventCommand(
                EventId: id,
                Name: request.Name,
                Description: request.Description,
                EventDate: request.EventDate,
                RegistrationEndDateUtc: request.RegistrationEndDateUtc,
                Location: request.Location,
                MaxParticipants: request.MaxParticipants,
                BannerImageUrl: request.BannerImageUrl,
                TotalPointsPool: request.TotalPointsPool
            );

            var result = await _mediator.Send(command);
            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            // Check if it's a not found error
            if (ex.Message.Contains("not found"))
                return NotFound(new { message = ex.Message, eventId = id });

            // Otherwise it's a validation error (e.g., event not in Draft status)
            return BadRequest(new { message = ex.Message, eventId = id });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to update event", error = ex.Message, eventId = id });
        }
    }

    /// <summary>
    /// Register for event
    /// </summary>
    /// <remarks>
    /// Register the current user for participation in an event.
    /// 
    /// **Registration Rules:**
    /// - Registration is allowed only when event status is "Created" (Draft)
    /// - Registration is allowed until RegistrationEndDateUtc (inclusive)
    /// - Each user can only register once per event
    /// - Cannot register if event is Active, Completed, or Cancelled
    /// </remarks>
    /// <param name="id">Event ID to register for</param>
    /// <returns>Registration confirmation</returns>
    /// <response code="200">Registered successfully</response>
    /// <response code="400">Registration closed, deadline passed, already registered, or event not found</response>
    /// <response code="401">Unauthorized</response>
    [HttpPost("{id:guid}/register")]
    [Authorize(Policy = "PasswordChanged")]
    [SwaggerOperation(Summary = "Register for event", Description = "Join an event. Registration allowed until RegistrationEndDateUtc (inclusive) while event is in Created status.")]
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

    #region Admin-only Lifecycle Endpoints

    /// <summary>
    /// Activate event (Draft → Active)
    /// </summary>
    /// <remarks>
    /// Admin-only. Transitions event from Created (Draft) to Active.
    /// After activation:
    /// - Registration is closed
    /// - Check-in becomes available
    /// - Points can be awarded to checked-in participants
    /// </remarks>
    /// <param name="id">Event ID</param>
    /// <returns>Success message</returns>
    /// <response code="200">Event activated</response>
    /// <response code="400">Invalid state transition</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpPost("{id:guid}/activate")]
    [Authorize(Policy = "AdminOnly")]
    [SwaggerOperation(Summary = "Activate event", Description = "Admin only. Transition event from Created to Active. Closes registration.")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> ActivateEvent(Guid id)
    {
        try
        {
            var command = new ActivateEventCommand(id);
            await _mediator.Send(command);

            return Ok(new { message = "Event activated successfully", eventId = id, status = "Active" });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message, eventId = id });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to activate event", error = ex.Message });
        }
    }

    /// <summary>
    /// Complete event (Active → Completed)
    /// </summary>
    /// <remarks>
    /// Admin-only. Transitions event from Active to Completed.
    /// After completion:
    /// - No further awards can be made
    /// - No check-ins allowed
    /// - Event becomes read-only
    /// </remarks>
    /// <param name="id">Event ID</param>
    /// <returns>Success message</returns>
    /// <response code="200">Event completed</response>
    /// <response code="400">Invalid state transition</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpPost("{id:guid}/complete")]
    [Authorize(Policy = "AdminOnly")]
    [SwaggerOperation(Summary = "Complete event", Description = "Admin only. Transition event from Active to Completed. No further awards allowed.")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> CompleteEvent(Guid id)
    {
        try
        {
            var command = new CompleteEventCommand(id);
            await _mediator.Send(command);

            return Ok(new { message = "Event completed successfully", eventId = id, status = "Completed" });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message, eventId = id });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to complete event", error = ex.Message });
        }
    }

    /// <summary>
    /// Cancel event (Draft/Active → Cancelled)
    /// </summary>
    /// <remarks>
    /// Admin-only. Cancels the event from Created (Draft) or Active state.
    /// After cancellation:
    /// - Event becomes read-only
    /// - No registrations, check-ins, or awards allowed
    /// </remarks>
    /// <param name="id">Event ID</param>
    /// <returns>Success message</returns>
    /// <response code="200">Event cancelled</response>
    /// <response code="400">Invalid state transition (already completed or cancelled)</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpPost("{id:guid}/cancel")]
    [Authorize(Policy = "AdminOnly")]
    [SwaggerOperation(Summary = "Cancel event", Description = "Admin only. Cancel event from Created or Active state.")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> CancelEvent(Guid id)
    {
        try
        {
            var command = new CancelEventCommand(id);
            await _mediator.Send(command);

            return Ok(new { message = "Event cancelled successfully", eventId = id, status = "Cancelled" });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message, eventId = id });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to cancel event", error = ex.Message });
        }
    }

    /// <summary>
    /// Check-in participant
    /// </summary>
    /// <remarks>
    /// Admin-only. Marks a participant as checked-in (attended).
    /// 
    /// **Check-in Rules:**
    /// - Event must be in Active status
    /// - Participant must be registered for the event
    /// - After check-in, participant can receive point awards
    /// </remarks>
    /// <param name="id">Event ID</param>
    /// <param name="participantId">Participant's user ID</param>
    /// <returns>Success message</returns>
    /// <response code="200">Participant checked in</response>
    /// <response code="400">Event not active or participant not found</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpPost("{id:guid}/check-in/{participantId:guid}")]
    [Authorize(Policy = "AdminOnly")]
    [SwaggerOperation(Summary = "Check-in participant", Description = "Admin only. Mark participant as attended. Event must be Active.")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> CheckInParticipant(Guid id, Guid participantId)
    {
        try
        {
            var command = new CheckInParticipantCommand(id, participantId);
            await _mediator.Send(command);

            return Ok(new { message = "Participant checked in successfully", eventId = id, participantId = participantId });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message, eventId = id, participantId = participantId });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to check in participant", error = ex.Message });
        }
    }

    #endregion

    /// <summary>
    /// Award points to event participant
    /// </summary>
    /// <remarks>
    /// Award points to a participant for event participation.
    /// Admin only operation.
    /// 
    /// **Award Rules:**
    /// - Event must be in Active status
    /// - Participant must be checked-in (AttendanceStatus = Attended)
    /// - Cannot award points twice to the same participant (no double-award)
    /// - Cannot award after event is Completed or Cancelled
    /// </remarks>
    /// <param name="eventId">Event ID</param>
    /// <param name="participantId">Participant user ID</param>
    /// <param name="request">Points to award</param>
    /// <returns>Confirmation message</returns>
    /// <response code="200">Points awarded</response>
    /// <response code="400">Invalid request, not checked-in, double-award, or wrong event status</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpPost("{eventId:guid}/award-points/{participantId:guid}")]
    [Authorize(Policy = "AdminOnly")]
    [SwaggerOperation(Summary = "Award event points", Description = "Admin only. Grant points to checked-in participant. Event must be Active. No double awards.")]
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
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message, eventId, participantId });
        }
        catch (DomainException ex)
        {
            return BadRequest(new { message = ex.Message, eventId, participantId });
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
