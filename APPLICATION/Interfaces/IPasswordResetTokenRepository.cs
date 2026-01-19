using WIN.AGDATA.WIN.Domain.Entities.Users;

namespace WIN.AGDATA.WIN.APPLICATION.Interfaces;

public interface IPasswordResetTokenRepository
{
    Task<PasswordResetToken?> GetByTokenAsync(string token);
    Task<IReadOnlyList<PasswordResetToken>> GetByUserIdAsync(Guid userId);
    void Add(PasswordResetToken token);
    Task UpdateAsync(PasswordResetToken token);
    Task DeleteAsync(PasswordResetToken token);
    Task DeleteExpiredTokensAsync();
}
