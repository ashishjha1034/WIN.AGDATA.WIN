using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Admin;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Transactions;
using WIN.AGDATA.WIN.Domain.ValueObjects;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Admin;

public class AdjustPointsHandler : IRequestHandler<AdjustPointsCommand>
{
    private readonly IUserRepository _userRepository;
    private readonly ITransactionRepository _transactionRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ICurrentUserService _currentUserService;

    public AdjustPointsHandler(
        IUserRepository userRepository,
        ITransactionRepository transactionRepository,
        IUnitOfWork unitOfWork,
        ICurrentUserService currentUserService)
    {
        _userRepository = userRepository;
        _transactionRepository = transactionRepository;
        _unitOfWork = unitOfWork;
        _currentUserService = currentUserService;
    }

    public async Task Handle(AdjustPointsCommand request, CancellationToken ct)
    {
        var user = await _userRepository.GetByIdWithPointsAsync(request.UserId)
                   ?? throw new InvalidOperationException("User not found");

        var currentUserId = _currentUserService.GetCurrentUserId();
        var balanceBefore = user.PointsAccount.CurrentBalance;

        if (request.Amount > 0)
        {
            user.PointsAccount.AddPoints(request.Amount, currentUserId);
        }
        else
        {
            user.PointsAccount.SpendPoints(Math.Abs(request.Amount), currentUserId);
        }

        // Create transaction record
        var transaction = UserPointsTransaction.CreateAdjusted(
            userId: request.UserId,
            points: Points.Create(request.Amount),
            source: "Admin Adjustment",
            sourceId: null,
            description: request.Reason,
            balanceAfter: user.PointsAccount.CurrentBalance,
            processedBy: currentUserId
        );

        _transactionRepository.Add(transaction);

        await _unitOfWork.SaveChangesAsync(ct);
    }
}
