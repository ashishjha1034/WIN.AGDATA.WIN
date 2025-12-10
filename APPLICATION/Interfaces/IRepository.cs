namespace WIN.AGDATA.WIN.Infrastructure.Repositories;

public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(Guid id);
    Task<IReadOnlyList<T>> GetAllAsync();
    void Add(T entity);
    void Update(T entity);
    void Delete(T entity);
}