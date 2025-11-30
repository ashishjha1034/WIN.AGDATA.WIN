using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.APPLICATION.Commands.Events;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;
    private readonly IEventRepository _eventRepository;

    public EventsController(IMediator mediator, IMapper mapper, IEventRepository eventRepository)
    {
        _mediator = mediator;
        _mapper = mapper;
        _eventRepository = eventRepository;
    }

    [HttpPost]
    public async Task<ActionResult<EventDto>> CreateEvent([FromBody] CreateEventRequest request)
    {
        var result = await _mediator.Send(new CreateEventCommand(
            request.Name, request.StartDate, request.EndDate, request.Description));

        return CreatedAtAction(nameof(GetEvent), new { id = result.Id }, result);
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<EventDto>>> GetAllEvents()
    {
        var events = await _eventRepository.GetAllAsync();
        return Ok(_mapper.Map<IReadOnlyList<EventDto>>(events));
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<EventDto>> GetEvent(Guid id)
    {
        var @event = await _eventRepository.GetByIdAsync(id);
        if (@event == null) return NotFound();

        return Ok(_mapper.Map<EventDto>(@event));
    }

    [HttpPost("{id:guid}/participants")]
    public async Task<IActionResult> RegisterParticipant(Guid id, [FromBody] RegisterParticipantRequest request)
    {
        await _mediator.Send(new RegisterEventParticipantCommand(id, request.UserId));
        return NoContent();
    }

    [HttpPost("{id:guid}/participants/{participantId:guid}/award")]
    public async Task<IActionResult> AwardPoints(Guid id, Guid participantId, [FromBody] AwardPointsRequest request)
    {
        await _mediator.Send(new AwardEventPointsCommand(id, participantId, request.Points));
        return NoContent();
    }
}
