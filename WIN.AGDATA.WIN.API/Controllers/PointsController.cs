using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Points;

namespace WIN.AGDATA.WIN.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PointsController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly ILogger<PointsController> _logger;

        public PointsController(IUserRepository userRepo, ILogger<PointsController> logger)
        {
            _userRepo = userRepo ?? throw new ArgumentNullException(nameof(userRepo));
            _logger = logger;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddPoints([FromBody] AddPointsRequest dto)
        {
            var user = await _userRepo.GetByEmployeeIdAsync(dto.EmployeeId);
            if (user == null) return NotFound();

            user.EarnPoints(dto.Points, User?.Identity?.Name ?? "SYSTEM");
            await _userRepo.UpdateAsync(user);
            return NoContent();
        }

        [HttpPost("spend")]
        public async Task<IActionResult> SpendPoints([FromBody] SpendPointsRequest dto)
        {
            var user = await _userRepo.GetByEmployeeIdAsync(dto.EmployeeId);
            if (user == null) return NotFound();

            user.SpendPoints(dto.Points, User?.Identity?.Name ?? "SYSTEM");
            await _userRepo.UpdateAsync(user);
            return NoContent();
        }

        [HttpPost("refund")]
        public async Task<IActionResult> RefundPoints([FromBody] RefundPointsRequest dto)
        {
            var user = await _userRepo.GetByEmployeeIdAsync(dto.EmployeeId);
            if (user == null) return NotFound();

            user.RefundPoints(dto.Points, User?.Identity?.Name ?? "SYSTEM");
            await _userRepo.UpdateAsync(user);
            return NoContent();
        }
    }
}