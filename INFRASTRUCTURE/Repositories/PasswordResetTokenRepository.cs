using Microsoft.EntityFrameworkCore;
using WIN.AGDATA.WIN.APPLICATION.Interfaces;
using WIN.AGDATA.WIN.Domain.Entities.Users;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public class PasswordResetTokenRepository : IPasswordResetTokenRepository
{
    private readonly ApplicationDbContext _context;

    public PasswordResetTokenRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PasswordResetToken?> GetByTokenAsync(string token)
    {
        return await _context.PasswordResetTokens
            .Include(p => p.User)
            .FirstOrDefaultAsync(p => p.Token == token);
    }

    public async Task<IReadOnlyList<PasswordResetToken>> GetByUserIdAsync(Guid userId)
    {
        return await _context.PasswordResetTokens
            .Where(p => p.UserId == userId)
            .OrderByDescending(p => p.CreatedAt)
            .ToListAsync();
    }

    public async Task<int> CountTokensInLast24HoursAsync(Guid userId)
    {
        var cutoff = DateTime.UtcNow.AddHours(-24);
        return await _context.PasswordResetTokens
            .Where(p => p.UserId == userId && p.CreatedAt >= cutoff)
            .CountAsync();
    }

    public void Add(PasswordResetToken token)
    {
        _context.PasswordResetTokens.Add(token);
    }

    public async Task UpdateAsync(PasswordResetToken token)
    {
        _context.PasswordResetTokens.Update(token);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(PasswordResetToken token)
    {
        _context.PasswordResetTokens.Remove(token);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteExpiredTokensAsync()
    {
        var expiredTokens = await _context.PasswordResetTokens
            .Where(p => p.ExpiresAt < DateTime.UtcNow)
            .ToListAsync();

        if (expiredTokens.Any())
        {
            _context.PasswordResetTokens.RemoveRange(expiredTokens);
            await _context.SaveChangesAsync();
        }
    }
}
