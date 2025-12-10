using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Admin;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Admin;

public class AdjustPointsHandler : IRequestHandler<AdjustPointsCommand>
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public AdjustPointsHandler(
        IUserRepository userRepository,
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task Handle(AdjustPointsCommand request, CancellationToken ct)
    {
        var user = await _userRepository.GetByIdWithPointsAsync(request.UserId)
                   ?? throw new InvalidOperationException("User not found");

        var currentUserId = _currentUserService.GetCurrentUserId();

        if (request.Amount > 0)
        {
            user.PointsAccount.AddPoints(request.Amount, currentUserId);
        }
        else
        {
            user.PointsAccount.SpendPoints(Math.Abs(request.Amount), currentUserId);
        }

        await _unitOfWork.SaveChangesAsync(ct);
    }
}
