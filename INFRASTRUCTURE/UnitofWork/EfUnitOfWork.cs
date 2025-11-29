using System.Threading.Tasks;
using WIN.AGDATA.WIN.Application.Interfaces;
using WIN.AGDATA.WIN.Infrastructure.Data;

namespace WIN.AGDATA.WIN.Infrastructure.UnitOfWork
{
    public class EfUnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        public EfUnitOfWork(ApplicationDbContext context) { _context = context; }
        public void SaveChanges() { _context.SaveChanges(); }
        public Task SaveChangesAsync() { return _context.SaveChangesAsync(); }
    }
}
