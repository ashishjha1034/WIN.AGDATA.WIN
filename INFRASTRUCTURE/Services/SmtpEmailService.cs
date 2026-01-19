using Microsoft.Extensions.Configuration;
using System.Net;
using System.Net.Mail;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;

namespace WIN.AGDATA.WIN.Infrastructure.Services;

public class SmtpEmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly string? _smtpHost;
    private readonly int _smtpPort;
    private readonly bool _useSsl;
    private readonly string? _smtpUsername;
    private readonly string? _smtpPassword;
    private readonly string? _fromEmail;
    private readonly string? _fromName;

    public SmtpEmailService(IConfiguration configuration)
    {
        _configuration = configuration;
        _smtpHost = _configuration["Smtp:Host"];
        _useSsl = bool.TryParse(_configuration["Smtp:UseSsl"], out var ssl) && ssl;
        _fromEmail = _configuration["Smtp:FromEmail"];
        _fromName = _configuration["Smtp:FromName"] ?? "WIN.AGDATA Support";
        _smtpUsername = _configuration["Smtp:Username"];
        _smtpPassword = _configuration["Smtp:Password"];

        if (!int.TryParse(_configuration["Smtp:Port"], out var port))
            _smtpPort = _useSsl ? 587 : 25; // Default to TLS port or standard SMTP
        else
            _smtpPort = port;
    }

    public async Task<bool> SendPasswordResetEmailAsync(
        string toEmail,
        string toName,
        string resetLink,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(_smtpHost))
        {
            // Log warning that SMTP is not configured
            Console.WriteLine("??  SMTP is not configured. Password reset email not sent.");
            return true; // Return success to avoid breaking the flow
        }

        try
        {
            var subject = "Reset Your Password - WIN.AGDATA Rewards";
            var body = BuildPasswordResetEmailBody(toName, resetLink);

            await SendEmailAsync(toEmail, toName, subject, body, cancellationToken);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"? Failed to send password reset email: {ex.Message}");
            // Log the error but don't throw - let the password reset process complete
            return true;
        }
    }

    public async Task<bool> SendUserInvitationEmailAsync(
        string toEmail,
        string toName,
        string temporaryPassword,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(_smtpHost))
        {
            Console.WriteLine("??  SMTP is not configured. Invitation email not sent.");
            return true;
        }

        try
        {
            var subject = "Welcome to WIN.AGDATA Rewards - Your Account Invitation";
            var body = BuildUserInvitationEmailBody(toName, toEmail, temporaryPassword);

            await SendEmailAsync(toEmail, toName, subject, body, cancellationToken);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"? Failed to send invitation email: {ex.Message}");
            return true;
        }
    }

    private async Task SendEmailAsync(
        string toEmail,
        string toName,
        string subject,
        string body,
        CancellationToken cancellationToken)
    {
        using var client = new SmtpClient(_smtpHost, _smtpPort)
        {
            EnableSsl = _useSsl,
            DeliveryMethod = SmtpDeliveryMethod.Network,
            UseDefaultCredentials = string.IsNullOrWhiteSpace(_smtpUsername)
        };

        if (!string.IsNullOrWhiteSpace(_smtpUsername) && !string.IsNullOrWhiteSpace(_smtpPassword))
        {
            client.Credentials = new NetworkCredential(_smtpUsername, _smtpPassword);
        }

        using var message = new MailMessage
        {
            From = new MailAddress(_fromEmail ?? "noreply@agdata.com", _fromName),
            Subject = subject,
            Body = body,
            IsBodyHtml = true
        };

        message.To.Add(new MailAddress(toEmail, toName));

        await client.SendMailAsync(message, cancellationToken);
        Console.WriteLine($"? Email sent to {toEmail}");
    }

    private string BuildPasswordResetEmailBody(string userName, string resetLink)
    {
        var html = @$"<!DOCTYPE html>
<html>
<head>
    <meta charset=""utf-8"">
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }}
        .header {{ background-color: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }}
        .content {{ padding: 20px; }}
        .button {{ display: inline-block; padding: 10px 20px; background-color: #3498db; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
        .footer {{ background-color: #ecf0f1; padding: 10px; text-align: center; font-size: 12px; border-radius: 0 0 5px 5px; }}
    </style>
</head>
<body>
    <div class=""container"">
        <div class=""header"">
            <h1>Password Reset Request</h1>
        </div>
        <div class=""content"">
            <p>Hi {userName},</p>
            <p>We received a request to reset your password. Click the button below to set a new password:</p>
            <a href=""{resetLink}"" class=""button"">Reset Password</a>
            <p>Or copy and paste this link in your browser:</p>
            <p>{resetLink}</p>
            <p><strong>This link expires in 30 minutes.</strong></p>
            <p>If you did not request a password reset, please ignore this email. Your account security is important to us.</p>
        </div>
        <div class=""footer"">
            <p>&copy; 2024 WIN.AGDATA Rewards. All rights reserved.</p>
        </div>
    </div>
</body>
</html>";
        return html;
    }

    private string BuildUserInvitationEmailBody(string userName, string email, string temporaryPassword)
    {
        var html = @$"<!DOCTYPE html>
<html>
<head>
    <meta charset=""utf-8"">
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }}
        .header {{ background-color: #2c3e50; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }}
        .content {{ padding: 20px; }}
        .credentials {{ background-color: #ecf0f1; padding: 15px; border-radius: 5px; margin: 20px 0; font-family: monospace; }}
        .button {{ display: inline-block; padding: 10px 20px; background-color: #27ae60; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
        .footer {{ background-color: #ecf0f1; padding: 10px; text-align: center; font-size: 12px; border-radius: 0 0 5px 5px; }}
    </style>
</head>
<body>
    <div class=""container"">
        <div class=""header"">
            <h1>Welcome to WIN.AGDATA Rewards!</h1>
        </div>
        <div class=""content"">
            <p>Hi {userName},</p>
            <p>You have been invited to join the WIN.AGDATA Rewards program. Use the credentials below to log in:</p>
            <div class=""credentials"">
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Temporary Password:</strong> {temporaryPassword}</p>
            </div>
            <p><strong>Important:</strong> You will be required to change your password when you first log in.</p>
            <p>Thank you for being part of our rewards program!</p>
        </div>
        <div class=""footer"">
            <p>&copy; 2024 WIN.AGDATA Rewards. All rights reserved.</p>
        </div>
    </div>
</body>
</html>";
        return html;
    }
}
