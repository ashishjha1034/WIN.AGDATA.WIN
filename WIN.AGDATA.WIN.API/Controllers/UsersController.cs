using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Application.Commands;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Application.Mappers;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Users;

namespace WIN.AGDATA.WIN.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly IMediator _mediator;
        private readonly ILogger<UsersController> _logger;

        public UsersController(IUserRepository userRepo, IMediator mediator, ILogger<UsersController> logger)
        {
            _userRepo = userRepo;
            _mediator = mediator;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
        {
            var users = await _userRepo.GetAllAsync();
            var dtos = users.Select(UserMapper.ToDto);
            return Ok(dtos);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<UserDto>> GetById(Guid id)
        {
            var user = await _userRepo.GetByIdAsync(id);
            if (user == null) return NotFound();
            return Ok(UserMapper.ToDto(user));
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> Create([FromBody] CreateUserRequest dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var createdBy = User?.Identity?.Name ?? "SYSTEM";
            var result = await _mediator.Send(new CreateUserCommand(dto, createdBy));
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult> Update(Guid id, [FromBody] UpdateUserInfoRequest dto)
        {
            var existing = await _userRepo.GetByIdAsync(id);
            if (existing == null) return NotFound();
            existing.UpdateUserInfo(dto.FirstName, dto.LastName, dto.Email, User?.Identity?.Name ?? "SYSTEM");
            await _userRepo.UpdateAsync(existing);
            return NoContent();
        }
    }
}