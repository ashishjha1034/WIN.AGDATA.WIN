using MediatR;
using System.Threading;
using System.Threading.Tasks;
using WIN.AGDATA.WIN.Application.Commands;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Application.Mappers;
using WIN.AGDATA.WIN.APPLICATION.DTOs.Redemptions;
using WIN.AGDATA.WIN.Domain.Exceptions;

namespace WIN.AGDATA.WIN.Application.Handlers;

public class RejectRedemptionHandler : IRequestHandler<RejectRedemptionCommand, RedemptionDto>
{
    private readonly IRedemptionRepository _redemptionRepo;
    private readonly IUnitOfWork _uow;

    public RejectRedemptionHandler(IRedemptionRepository redemptionRepo, IUnitOfWork uow)
    {
        _redemptionRepo = redemptionRepo;
        _uow = uow;
    }

    public async Task<RedemptionDto> Handle(RejectRedemptionCommand request, CancellationToken cancellationToken)
    {
        var redemption = await _redemptionRepo.GetByIdAsync(request.RedemptionId);
        if (redemption == null) throw new DomainException("Redemption not found");

        redemption.Reject(request.Reason, request.RejectedBy);
        await _redemptionRepo.UpdateAsync(redemption);
        await _uow.SaveChangesAsync();

        return RedemptionMapper.ToDto(redemption);
    }
}