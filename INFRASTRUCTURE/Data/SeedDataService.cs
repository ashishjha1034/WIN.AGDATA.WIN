using Microsoft.EntityFrameworkCore;

namespace WIN.AGDATA.WIN.Infrastructure.Data;

public class SeedDataService
{
    private readonly ApplicationDbContext _context;

    public SeedDataService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task SeedAsync()
    {
        await _context.Database.MigrateAsync();

        if (await _context.Users.AnyAsync())
            return;

        await Task.CompletedTask;
    }
}
