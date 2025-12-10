using Microsoft.EntityFrameworkCore;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    protected readonly ApplicationDbContext _context;
    protected readonly DbSet<T> _dbSet;

    public Repository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public virtual async Task<T?> GetByIdAsync(Guid id)
        => await _dbSet.FindAsync(id);

    public virtual async Task<IReadOnlyList<T>> GetAllAsync()
        => await _dbSet.ToListAsync();

    public virtual void Add(T entity) => _dbSet.Add(entity);

    public virtual void Update(T entity) => _dbSet.Update(entity);

    public virtual void Delete(T entity) => _dbSet.Remove(entity);

    public virtual async Task UpdateAsync(T entity)
    {
        _dbSet.Update(entity);
        await Task.CompletedTask;
    }
}