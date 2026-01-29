using MediatR;
using Microsoft.Extensions.Configuration;
using WIN.AGDATA.WIN.APPLICATION.Commands.Users;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Users;

namespace WIN.AGDATA.WIN.APPLICATION.Handlers.Users;

public class ForgotPasswordHandler : IRequestHandler<ForgotPasswordCommand, bool>
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordResetTokenRepository _tokenRepository;
    private readonly IEmailService _emailService;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IConfiguration _configuration;

    public ForgotPasswordHandler(
        IUserRepository userRepository,
        IPasswordResetTokenRepository tokenRepository,
        IEmailService emailService,
        IUnitOfWork unitOfWork,
        IConfiguration configuration)
    {
        _userRepository = userRepository;
        _tokenRepository = tokenRepository;
        _emailService = emailService;
        _unitOfWork = unitOfWork;
        _configuration = configuration;
    }

    public async Task<bool> Handle(ForgotPasswordCommand request, CancellationToken cancellationToken)
    {
        // Lookup user by email - do NOT reveal if user exists
        var user = await _userRepository.GetByEmailAsync(request.Email);

        if (user != null && user.IsActive)
        {
            // Check per-user daily cap (max 3 reset emails per 24 hours)
            const int maxResetEmailsPerDay = 3;
            var tokensInLast24Hours = await _tokenRepository.CountTokensInLast24HoursAsync(user.Id);
            
            if (tokensInLast24Hours >= maxResetEmailsPerDay)
            {
                // Rate limit reached - return success without sending email (prevent enumeration)
                Console.WriteLine($"[ForgotPassword] Daily limit reached for user {user.Id}");
                return true;
            }

            // Generate secure random token (32 bytes = 256 bits entropy)
            var tokenBytes = new byte[32];
            using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
            {
                rng.GetBytes(tokenBytes);
            }
            var secureToken = Convert.ToBase64String(tokenBytes)
                .Replace("+", "-")
                .Replace("/", "_")
                .Replace("=", "");

            // Create password reset token entry
            var resetToken = new PasswordResetToken(user.Id, secureToken, expiryMinutes: 30);
            _tokenRepository.Add(resetToken);
            await _unitOfWork.SaveChangesAsync(cancellationToken);

            // Build reset link
            var resetPasswordUrl = _configuration["Frontend:ResetPasswordUrl"];
            var resetLink = $"{resetPasswordUrl}?token={secureToken}";

            // Send email
            await _emailService.SendPasswordResetEmailAsync(
                user.Email.Value,
                $"{user.FirstName} {user.LastName}",
                resetLink,
                cancellationToken);

            Console.WriteLine($"✓ Password reset token created for user {user.Id}");
        }

        // Always return success to avoid email enumeration attacks
        return true;
    }
}
