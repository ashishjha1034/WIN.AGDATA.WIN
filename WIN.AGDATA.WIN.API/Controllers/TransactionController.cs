using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Transactions;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransactionsController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly ITransactionRepository _transactionRepository;

    public TransactionsController(IMapper mapper, ITransactionRepository transactionRepository)
    {
        _mapper = mapper;
        _transactionRepository = transactionRepository;
    }

    [HttpGet("{id:guid}")]
    public async Task<ActionResult<TransactionDto>> GetTransaction(Guid id)
    {
        var transaction = await _transactionRepository.GetByIdAsync(id);
        if (transaction == null) return NotFound();

        return Ok(_mapper.Map<TransactionDto>(transaction));
    }
}
