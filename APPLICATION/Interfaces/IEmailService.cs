namespace WIN.AGDATA.WIN.APPLICATION.Interfaces;

public interface IEmailService
{
    Task<bool> SendPasswordResetEmailAsync(
        string toEmail,
        string toName,
        string resetLink,
        CancellationToken cancellationToken = default);

    Task<bool> SendUserInvitationEmailAsync(
        string toEmail,
        string toName,
        string temporaryPassword,
        CancellationToken cancellationToken = default);
}
