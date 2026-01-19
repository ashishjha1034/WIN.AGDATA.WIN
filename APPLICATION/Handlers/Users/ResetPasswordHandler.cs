using MediatR;
using WIN.AGDATA.WIN.APPLICATION.Commands.Users;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Users;

public class ResetPasswordHandler : IRequestHandler<ResetPasswordCommand, bool>
{
    private readonly IPasswordResetTokenRepository _tokenRepository;
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;

    public ResetPasswordHandler(
        IPasswordResetTokenRepository tokenRepository,
        IUserRepository userRepository,
        IUnitOfWork unitOfWork)
    {
        _tokenRepository = tokenRepository;
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<bool> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        // Validate token
        var resetToken = await _tokenRepository.GetByTokenAsync(request.Token);

        if (resetToken == null)
            throw new InvalidOperationException("Invalid or expired token");

        if (resetToken.ExpiresAt <= DateTime.UtcNow)
            throw new InvalidOperationException("Reset token has expired");

        if (resetToken.IsUsed)
            throw new InvalidOperationException("Reset token has already been used");

        // Load user
        var user = await _userRepository.GetByIdAsync(resetToken.UserId)
            ?? throw new InvalidOperationException("User not found");

        // Set new password (clears MustChangePassword and sets LastPasswordChangedAt)
        user.SetPassword(request.NewPassword);

        // Mark token as used
        resetToken.MarkAsUsed();

        // Update both user and token
        await _userRepository.UpdateAsync(user);
        await _tokenRepository.UpdateAsync(resetToken);
        await _unitOfWork.SaveChangesAsync(cancellationToken);

        Console.WriteLine($"? Password reset successful for user {user.Id}");
        return true;
    }
}
