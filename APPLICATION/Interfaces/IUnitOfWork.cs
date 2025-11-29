namespace WIN.AGDATA.WIN.APPLICATION.Interfaces;

public interface IUnitOfWork
{
    Task<int> SaveChangesAsync(CancellationToken ct = default);
}