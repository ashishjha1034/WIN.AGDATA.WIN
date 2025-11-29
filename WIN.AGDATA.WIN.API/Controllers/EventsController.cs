using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Application.Mappers;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Events;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Products;
using WIN.AGDATA.WIN.Domain.Entities.Events;

namespace WIN.AGDATA.WIN.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventsController : ControllerBase
    {
        private readonly IEventRepository _eventRepo;
        private readonly ILogger<EventsController> _logger;

        public EventsController(IEventRepository eventRepo, ILogger<EventsController> logger)
        {
            _eventRepo = eventRepo ?? throw new ArgumentNullException(nameof(eventRepo));
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetAll()
        {
            var events = await _eventRepo.GetAllAsync() ?? Enumerable.Empty<Event>();
            var dtos = events.Select(EventMapper.ToDto);
            return Ok(dtos);
        }

        [HttpGet("{eventId}")]
        public async Task<ActionResult<EventDto>> GetById(string eventId)
        {
            var ev = await _eventRepo.GetByIdAsync(eventId);
            if (ev == null) return NotFound();
            return Ok(EventMapper.ToDto(ev));
        }

        [HttpPost]
        public ActionResult<EventDto> Create([FromBody] CreateProductRequest createDto)
        {
            return BadRequest("Create Event endpoint not implemented. Add a CreateEventRequest DTO and handler if needed.");
        }

        [HttpPost("{eventId}/complete")]
        public async Task<IActionResult> Complete(string eventId, [FromBody] object payload)
        {
            var ev = await _eventRepo.GetByIdAsync(eventId);
            if (ev == null) return NotFound();

            return NoContent();
        }

        [HttpPost("{eventId}/prizes")]
        public async Task<IActionResult> AddPrize(string eventId, [FromBody] PrizeTier prize)
        {
            var ev = await _eventRepo.GetByIdAsync(eventId);
            if (ev == null) return NotFound();

            ev.AddPrizeTier(prize, User?.Identity?.Name ?? "SYSTEM");
            await _eventRepo.UpdateAsync(ev);
            return NoContent();
        }
    }
}