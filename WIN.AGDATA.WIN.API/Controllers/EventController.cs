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
    /// 
    /// **Automated Transitions (computed on read):**
    /// - Draft → Active: When event start time (EventDate) arrives
    /// - Draft → Cancelled: When registration deadline passes with 0 registrations
    /// </remarks>
    /// <returns>List of events</returns>
    /// <response code="200">Events retrieved successfully</response>
    [HttpGet]
    [AllowAnonymous]
    [SwaggerOperation(Summary = "Get all events", Description = "List all events with automated status computation")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    public async Task<ActionResult> GetEvents()
    {
        try
        {
            var events = await _eventRepository.GetAllAsync();
            var nowUtc = DateTime.UtcNow;
            
            // Apply compute-on-read: automated transitions for Draft events
            var transitionsApplied = false;
            foreach (var @event in events)
            {
                if (@event.ApplyAutomatedTransitions(nowUtc))
                    transitionsApplied = true;
            }
            
            // Persist any status changes (fire-and-forget save)
            if (transitionsApplied)
            {
                try
                {
                    await _eventRepository.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    // Log but don't fail the read - background service will catch up
                    // In a real system, use ILogger here
                    Console.WriteLine($"Warning: Failed to persist automated transitions: {ex.Message}");
                }
            }

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
    /// 
    /// **Automated Transitions (computed on read):**
    /// - Draft → Active: When event start time (EventDate) arrives
    /// - Draft → Cancelled: When registration deadline passes with 0 registrations
    /// </remarks>
    /// <param name="id">Event ID</param>
    /// <returns>Event details with participant count</returns>
    /// <response code="200">Event found</response>
    /// <response code="404">Event not found</response>
    [HttpGet("{id:guid}")]
    [AllowAnonymous]
    [SwaggerOperation(Summary = "Get event by ID", Description = "Retrieve specific event details with automated status computation")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetEvent(Guid id)
    {
        try
        {
            var @event = await _eventRepository.GetByIdWithParticipantsAsync(id);

            if (@event == null)
                return NotFound(new { message = "Event not found" });

            // Apply compute-on-read: automated transitions for Draft events
            var nowUtc = DateTime.UtcNow;
            if (@event.ApplyAutomatedTransitions(nowUtc))
            {
                try
                {
                    await _eventRepository.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Warning: Failed to persist automated transition: {ex.Message}");
                }
            }

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
    /// Get event participants
    /// </summary>
    /// <remarks>
    /// Retrieve list of all participants for a specific event.
    /// Admin only. Returns participant details including attendance status and awarded points.
    /// </remarks>
    /// <param name="id">Event ID</param>
    /// <returns>List of participants</returns>
    /// <response code="200">Participants retrieved successfully</response>
    /// <response code="404">Event not found</response>
    [HttpGet("{id:guid}/participants")]
    [Authorize(Policy = "AdminOnly")]
    [SwaggerOperation(Summary = "Get event participants", Description = "Admin only. List all participants for an event.")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetEventParticipants(Guid id)
    {
        try
        {
            var @event = await _eventRepository.GetByIdWithParticipantsAsync(id);

            if (@event == null)
                return NotFound(new { message = "Event not found", eventId = id });

            var participantDtos = @event.Participants.Select(p => new EventParticipantDto
            {
                Id = p.Id,
                UserId = p.UserId,
                Name = p.User != null ? $"{p.User.FirstName} {p.User.LastName}" : "Unknown",
                Email = p.User?.Email?.Value ?? "",
                EmployeeId = p.User?.EmployeeId ?? "",
                AttendanceStatus = p.AttendanceStatus.ToString(),
                PointsAwarded = p.PointsAwarded,
                EventRank = p.EventRank,
                RegisteredAt = p.RegisteredAt,
                CheckedInAt = p.CheckedInAt,
                AwardedAt = p.AwardedAt,
                AwardedBy = p.AwardedBy
            }).OrderBy(p => p.Name).ToList();

            return Ok(new
            {
                eventId = id,
                eventName = @event.Name,
                total = participantDtos.Count,
                data = participantDtos
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to retrieve participants", error = ex.Message });
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
        catch (ValidationException ex)
        {
            // Return ProblemDetails for validation errors
            return BadRequest(new ProblemDetails
            {
                Title = "Validation Error",
                Status = StatusCodes.Status400BadRequest,
                Detail = ex.Message,
                Instance = HttpContext.Request.Path,
                Extensions = { ["errors"] = ex.Errors }
            });
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
        catch (ValidationException ex)
        {
            // Return ProblemDetails for validation errors
            return BadRequest(new ProblemDetails
            {
                Title = "Validation Error",
                Status = StatusCodes.Status400BadRequest,
                Detail = ex.Message,
                Instance = HttpContext.Request.Path,
                Extensions = { ["errors"] = ex.Errors, ["eventId"] = id }
            });
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

    /// <summary>
    /// Batch check-in all registered participants
    /// </summary>
    /// <remarks>
    /// Admin-only. Checks in all registered participants for an event at once.
    /// 
    /// **Batch Check-in Rules:**
    /// - Event must be in Active status
    /// - Already checked-in participants are skipped
    /// - Returns count of newly checked-in, already checked-in, and failed
    /// </remarks>
    /// <param name="id">Event ID</param>
    /// <returns>Batch check-in result with counts</returns>
    /// <response code="200">Batch check-in completed</response>
    /// <response code="400">Event not active</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpPost("{id:guid}/batch-check-in")]
    [Authorize(Policy = "AdminOnly")]
    [SwaggerOperation(Summary = "Batch check-in all participants", Description = "Admin only. Check in all registered participants at once. Event must be Active.")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> BatchCheckInParticipants(Guid id)
    {
        try
        {
            var command = new BatchCheckInCommand(id);
            var result = await _mediator.Send(command);

            return Ok(new 
            { 
                message = "Batch check-in completed",
                eventId = id,
                totalRegistered = result.TotalRegistered,
                checkedIn = result.CheckedIn,
                alreadyCheckedIn = result.AlreadyCheckedIn,
                failed = result.Failed
            });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message, eventId = id });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to batch check in participants", error = ex.Message });
        }
    }

    /// <summary>
    /// Update participant attendance status
    /// </summary>
    /// <remarks>
    /// Admin-only. Toggle attendance status between Registered and Checked-In.
    /// 
    /// **Rules:**
    /// - Event must be in Active status for check-in
    /// - Participant must be registered for the event
    /// - Cannot change status if participant has been awarded points
    /// </remarks>
    /// <param name="id">Event ID</param>
    /// <param name="participantId">Participant's user ID</param>
    /// <param name="request">New attendance status</param>
    /// <returns>Success message</returns>
    /// <response code="200">Status updated</response>
    /// <response code="400">Invalid operation or participant already awarded</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpPatch("{id:guid}/participants/{participantId:guid}/status")]
    [Authorize(Policy = "AdminOnly")]
    [SwaggerOperation(Summary = "Update attendance status", Description = "Admin only. Toggle participant attendance status.")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> UpdateParticipantStatus(Guid id, Guid participantId, [FromBody] UpdateAttendanceRequest request)
    {
        try
        {
            var @event = await _eventRepository.GetByIdWithParticipantsAsync(id);
            if (@event == null)
                return NotFound(new { message = "Event not found", eventId = id });

            var participant = @event.Participants.FirstOrDefault(p => p.UserId == participantId);
            if (participant == null)
                return NotFound(new { message = "Participant not found", eventId = id, participantId });

            // Validate - cannot change status if points awarded
            if (participant.PointsAwarded > 0)
                return BadRequest(new { message = "Cannot change status for participant who has been awarded points", eventId = id, participantId });

            // Toggle or set status based on request
            if (request.Status?.ToLower() == "attended" || request.Status?.ToLower() == "checked-in")
            {
                if (@event.Status.ToString() != "Active")
                    return BadRequest(new { message = "Event must be Active to check-in participants", eventId = id, currentStatus = @event.Status.ToString() });
                
                participant.MarkCheckedIn();
            }
            else if (request.Status?.ToLower() == "registered")
            {
                // Use reflection to set back to Registered (or create a method in domain)
                // For MVP, we'll just validate they can't undo if awarded
                return BadRequest(new { message = "Cannot revert checked-in status in MVP. Use delete instead if needed." });
            }

            await _eventRepository.UpdateAsync(@event);

            return Ok(new { 
                message = "Participant status updated successfully", 
                eventId = id, 
                participantId = participantId,
                newStatus = participant.AttendanceStatus.ToString()
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to update participant status", error = ex.Message });
        }
    }

    /// <summary>
    /// Remove participant from event
    /// </summary>
    /// <remarks>
    /// Admin-only. Removes a participant from the event.
    /// 
    /// **Rules:**
    /// - Cannot remove participant who has been awarded points
    /// - Works for events in any status except Completed
    /// </remarks>
    /// <param name="id">Event ID</param>
    /// <param name="participantId">Participant's user ID</param>
    /// <returns>Success message</returns>
    /// <response code="200">Participant removed</response>
    /// <response code="400">Cannot remove - participant has been awarded or event completed</response>
    /// <response code="403">Forbidden - admin only</response>
    /// <response code="404">Participant not found</response>
    [HttpDelete("{id:guid}/participants/{participantId:guid}")]
    [Authorize(Policy = "AdminOnly")]
    [SwaggerOperation(Summary = "Remove participant", Description = "Admin only. Remove participant from event.")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> RemoveParticipant(Guid id, Guid participantId)
    {
        try
        {
            var @event = await _eventRepository.GetByIdWithParticipantsAsync(id);
            if (@event == null)
                return NotFound(new { message = "Event not found", eventId = id });

            if (@event.Status.ToString() == "Completed")
                return BadRequest(new { message = "Cannot remove participants from completed events", eventId = id });

            var participant = @event.Participants.FirstOrDefault(p => p.UserId == participantId);
            if (participant == null)
                return NotFound(new { message = "Participant not found in this event", eventId = id, participantId });

            // Validate - cannot remove if points awarded
            if (participant.PointsAwarded > 0)
                return BadRequest(new { message = "Cannot remove participant who has been awarded points", eventId = id, participantId });

            @event.RemoveParticipant(participantId);
            await _eventRepository.UpdateAsync(@event);

            return Ok(new { message = "Participant removed successfully", eventId = id, participantId = participantId });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to remove participant", error = ex.Message });
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
    /// - Cannot exceed remaining points in event pool (if pool is set)
    /// 
    /// **Example:**
    /// 
    ///     POST /api/event/{eventId}/award-points/{participantId}
    ///     {
    ///       "points": 100,
    ///       "rank": 1
    ///     }
    /// </remarks>
    /// <param name="eventId">Event ID</param>
    /// <param name="participantId">Participant user ID</param>
    /// <param name="request">Points to award and optional rank</param>
    /// <returns>Confirmation message</returns>
    /// <response code="200">Points awarded</response>
    /// <response code="400">Invalid request, not checked-in, double-award, pool exceeded, or wrong event status</response>
    /// <response code="403">Forbidden - admin only</response>
    [HttpPost("{eventId:guid}/award-points/{participantId:guid}")]
    [Authorize(Policy = "AdminOnly")]
    [SwaggerOperation(Summary = "Award event points", Description = "Admin only. Grant points to checked-in participant. Event must be Active. No double awards. Pool enforcement.")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    public async Task<ActionResult> AwardPoints(Guid eventId, Guid participantId, [FromBody] AwardPointsRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var command = new AwardEventPointsCommand(eventId, participantId, request.Points, request.Rank);
            await _mediator.Send(command);

            return Ok(new
            {
                message = "Points awarded successfully",
                eventId,
                participantId,
                points = request.Points,
                rank = request.Rank
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
    /// Bulk award points to multiple participants
    /// </summary>
    /// <remarks>
    /// Award points to multiple participants in a single atomic operation.
    /// Admin only operation.
    /// 
    /// **All-or-Nothing Semantics:**
    /// - If ANY participant is ineligible (not checked-in, already awarded, not found), the ENTIRE request fails
    /// - Either all participants receive their awards, or none do
    /// 
    /// **Award Rules:**
    /// - Event must be in Active status
    /// - All participants must be checked-in (AttendanceStatus = Attended)
    /// - No participant can already have points awarded
    /// - Total requested points cannot exceed remaining pool (if pool is set)
    /// 
    /// **Example:**
    /// 
    ///     POST /api/event/{eventId}/bulk-award-points
    ///     {
    ///       "awards": [
    ///         { "participantId": "guid1", "points": 100, "rank": 1 },
    ///         { "participantId": "guid2", "points": 75, "rank": 2 },
    ///         { "participantId": "guid3", "points": 50, "rank": 3 }
    ///       ]
    ///     }
    /// </remarks>
    /// <param name="eventId">Event ID</param>
    /// <param name="request">Bulk award request with list of participant awards</param>
    /// <returns>Result of bulk award operation</returns>
    /// <response code="200">All points awarded successfully</response>
    /// <response code="400">Invalid request, ineligible participants, or pool exceeded</response>
    /// <response code="403">Forbidden - admin only</response>
    /// <response code="409">Concurrency conflict - retry request</response>
    [HttpPost("{eventId:guid}/bulk-award-points")]
    [Authorize(Policy = "AdminOnly")]
    [SwaggerOperation(Summary = "Bulk award event points", Description = "Admin only. Award points to multiple participants. All-or-nothing semantics. Pool enforcement. Supports distribution modes: Manual, EqualSplit, RankBased.")]
    [ProducesResponseType(typeof(BulkAwardPointsResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status400BadRequest)]
    [ProducesResponseType(typeof(object), StatusCodes.Status403Forbidden)]
    [ProducesResponseType(typeof(object), StatusCodes.Status409Conflict)]
    public async Task<ActionResult<BulkAwardPointsResponse>> BulkAwardPoints(Guid eventId, [FromBody] BulkAwardPointsRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        try
        {
            var awards = request.Awards
                .Select(a => new ParticipantAward(a.ParticipantId, a.Points, a.Rank))
                .ToList();

            var command = new BulkAwardEventPointsCommand(
                EventId: eventId, 
                Awards: awards,
                Mode: request.Mode,
                ConsumeEntirePool: request.ConsumeEntirePool,
                RankPoints: request.RankPoints
            );
            var result = await _mediator.Send(command);

            return Ok(new BulkAwardPointsResponse
            {
                Success = result.Success,
                Message = result.RemainingPoolPoints == 0 
                    ? "Bulk award completed successfully. Event auto-completed (pool exhausted)."
                    : "Bulk award completed successfully",
                EventId = eventId,
                TotalPointsAwarded = result.TotalPointsAwarded,
                ParticipantsAwarded = result.ParticipantsAwarded,
                RemainingPoolPoints = result.RemainingPoolPoints
            });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message, eventId });
        }
        catch (DomainException ex)
        {
            return BadRequest(new { message = ex.Message, eventId });
        }
        catch (Microsoft.EntityFrameworkCore.DbUpdateConcurrencyException)
        {
            return Conflict(new { 
                message = "Concurrency conflict: Another operation modified the event pool. Please retry.", 
                eventId,
                retryable = true
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to bulk award points", error = ex.Message });
        }
    }

    /// <summary>
    /// Get event pool status
    /// </summary>
    /// <remarks>
    /// Get the current status of the event's points pool.
    /// Shows total pool, distributed points, and remaining points.
    /// </remarks>
    /// <param name="eventId">Event ID</param>
    /// <returns>Pool status</returns>
    /// <response code="200">Pool status retrieved</response>
    /// <response code="404">Event not found</response>
    [HttpGet("{eventId:guid}/pool-status")]
    [Authorize(Policy = "AdminOnly")]
    [SwaggerOperation(Summary = "Get event pool status", Description = "Admin only. Get current pool distribution status.")]
    [ProducesResponseType(typeof(object), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(object), StatusCodes.Status404NotFound)]
    public async Task<ActionResult> GetPoolStatus(Guid eventId)
    {
        try
        {
            var @event = await _eventRepository.GetByIdWithParticipantsAsync(eventId);
            
            if (@event == null)
                return NotFound(new { message = "Event not found", eventId });

            var participantsAwarded = @event.Participants.Count(p => p.PointsAwarded > 0);
            var totalParticipants = @event.Participants.Count;

            return Ok(new
            {
                eventId,
                eventName = @event.Name,
                status = @event.Status.ToString(),
                pool = new
                {
                    totalPool = @event.TotalPointsPool,
                    distributedPoints = @event.DistributedPoints,
                    remainingPoints = @event.RemainingPoints,
                    isUnlimited = !@event.TotalPointsPool.HasValue
                },
                participants = new
                {
                    total = totalParticipants,
                    awarded = participantsAwarded,
                    pending = totalParticipants - participantsAwarded
                }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Failed to get pool status", error = ex.Message });
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
