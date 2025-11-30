using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Admin;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Admin;

public class AdjustPointsHandler : IRequestHandler<AdjustPointsCommand>
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public AdjustPointsHandler(IUserRepository userRepository, IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(AdjustPointsCommand request, CancellationToken ct)
    {
        var user = await _userRepository.GetByIdWithPointsAsync(request.UserId)
                   ?? throw new InvalidOperationException("User not found");

        if (request.Amount > 0)
        {
            user.PointsAccount.AddPoints(request.Amount, request.Reason);
        }
        else
        {
            user.PointsAccount.SpendPoints(Math.Abs(request.Amount), request.Reason);
        }

        await _unitOfWork.SaveChangesAsync(ct);
    }
}
